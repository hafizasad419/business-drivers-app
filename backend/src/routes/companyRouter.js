import { Router } from "express";
import { apiResponse } from "../utils/apiResponse.js";
import { getCompanyProfile, loginCompany, logoutCompany, registerCompany } from "../controllers/company.controller.js";
import { upload } from "../utils/multer.js"; // Assuming you have multer configured similarly for file uploads

const companyRouter = Router();

// Route to check if the route is working
companyRouter.get("/", async (req, res) => {
    const hostName = req.hostname;
    res.status(200).json(new apiResponse(200, {
        hostName,
    }, `${req.baseUrl} WORKING COOL.`));
});

// Route to handle company registration with file uploads
companyRouter.post("/register", upload.fields([
    {
        name: "proofOfRegistrationFee",
        maxCount: 1
    },
    {
        name: "avatar",
        maxCount: 1
    }
]), registerCompany);

// Route to handle company login
companyRouter.post("/login", loginCompany);

// Route to handle company logout
companyRouter.post("/logout", logoutCompany);
companyRouter.post("/profile", getCompanyProfile);

export default companyRouter;
