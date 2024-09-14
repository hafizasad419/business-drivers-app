import { Freelancer } from '../models/freelancer.model.js';
import { apiResponse } from '../utils/apiResponse.js';
import { apiError } from '../utils/apiError.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { validationResult } from 'express-validator';
import { configDotenv } from 'dotenv';
configDotenv()


const generateAccessAndRefereshTokens = async (freelancerId) => {
    try {
        const freelancer = await Freelancer.findById(freelancerId);
        if (!freelancer) {
            throw new apiError(404, "Freelancer not found.");
        }
        const accessToken = freelancer.generateAccessToken();
        const refreshToken = freelancer.generateRefreshToken();

        freelancer.refreshToken = refreshToken;
        await freelancer.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (err) {
        console.log(err.message);
        // Rethrow the error to be handled by loginFreelancer or middleware
        throw new apiError(500, "Something went wrong while generating refresh and access tokens.");

    }
};


const registerFreelancer = async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new apiResponse(400, null, 'Validation failed', errors.array()));
    }

    // Extract fields from request
    const { fullName, email, password, skills, CNIC, bankAccount, currentlyEmployed, companyName, bio } = req.body;
    const proofOfRegistrationFeeFile = req.files['proofOfRegistrationFee'] ? req.files['proofOfRegistrationFee'][0] : null;
    const avatarFile = req.files['avatar'] ? req.files['avatar'][0] : null;

    // console.log('Received Files:', req.files);

    // Check if freelancer already exists
    const existingFreelancer = await Freelancer.findOne({ email });
    if (existingFreelancer) {
        return res.status(400).json(new apiResponse(400, null, 'Freelancer already registered, Please login'));
    }

    // Handle file uploads
    const avatarLocalPath = avatarFile ? avatarFile.path : null;
    const proofOfRegistrationFeeLocalPath = proofOfRegistrationFeeFile ? proofOfRegistrationFeeFile.path : null;

    if (!avatarLocalPath || !proofOfRegistrationFeeLocalPath) {
        throw new apiError(400, "Both Avatar and Proof of Registration Fee files are required.");
    }

    // Upload files to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const proofOfRegistrationFee = await uploadOnCloudinary(proofOfRegistrationFeeLocalPath);



    if (!avatar || !proofOfRegistrationFee) {
        throw new apiError(400, "File uploads failed. Please try again.");
    }


    const newFreelancer = new Freelancer({
        fullName,
        email,
        password, // Hash password before saving
        skills,
        CNIC,
        bankAccount,
        currentlyEmployed,
        companyName: currentlyEmployed ? companyName : null,
        proofOfRegistrationFee: proofOfRegistrationFee.secure_url, // Store Cloudinary URLs
        avatar: avatar.secure_url,
        bio: "Tell companies about yourself.", // Pass bio from req.body
        refreshToken: "", // Initialize empty refreshToken, can be updated later
    });

    try {
        const savedFreelancer = await newFreelancer.save();
        // Remove password field before sending response
        const { password: _password, ...freelancerWithoutPassword } = savedFreelancer.toObject();
        res.status(201).json(new apiResponse(201, freelancerWithoutPassword, 'Freelancer registered successfully'));
    } catch (err) {
        res.status(500).json(new apiError(500, err.message));
    }
};

const loginFreelancer = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json(new apiError(400, "Both Email and Password are required."))
    }

    const freelancer = await Freelancer.findOne({ email })
    if (!freelancer) {
        return res.status(404).json(new apiError(404, "Freelancer With This Email Does Not Exist. Please Signup First."))
    }

    const isPasswordCorrect = await freelancer.comparePassword(password);

    if (!isPasswordCorrect) {
        return res.status(400).json(new apiError(400, "Please Enter Valid Password."))
    }


    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(freelancer._id);


    const loggedInFreelancer = await Freelancer.findById(freelancer._id).select("-password -refreshToken")

    const cookiesOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    }

    return res.status(200)
        .cookie("accessToken", accessToken, cookiesOptions)
        .cookie("refreshToken", refreshToken, cookiesOptions)
        .json(
            new apiResponse(200, {
                freelancer: loggedInFreelancer, accessToken, refreshToken

            }, "Freelancer Successfully Logged In."))



}



export { registerFreelancer, loginFreelancer };
