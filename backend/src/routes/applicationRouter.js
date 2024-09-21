import { Router } from "express";
import { applyForJob, getFreelancerApplications,getJobApplications, updateApplicationStatus } from "../controllers/application.controller.js";


const applicationRouter = Router();

applicationRouter.get('/', (req, res) => {
    res.send('<h1>Application Endpoint is working COOL.</h1>')
})

applicationRouter.post("/apply", applyForJob)
applicationRouter.post("/all-applications", getFreelancerApplications)
applicationRouter.get("/job-applications/:jobId", getJobApplications)
applicationRouter.patch("/status/:applicationId", updateApplicationStatus)

export default applicationRouter;