import { Router } from "express";
import { apiResponse } from "../utils/apiResponse.js";
import { loginFreelancer, registerFreelancer } from "../controllers/freelancer.controller.js";
import {upload} from "../utils/multer.js"

const freelancerRouter = Router()

freelancerRouter.get("", async (req, res) => {
    const hostName = req.hostname
    res.status(200).json(new apiResponse(200, {
        hostName,
    }, `${req.baseUrl} WORKING COOL.`))
})


freelancerRouter.post("/register", upload.fields([
    {
        name: "proofOfRegistrationFee",
        maxCount: 1
    },
    {
        name: "avatar",
        maxCount: 1
    }
]), registerFreelancer)

freelancerRouter.post("/login", loginFreelancer)



export default freelancerRouter