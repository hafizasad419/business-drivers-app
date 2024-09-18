import { Router } from "express"
import { getAllJobs, postJob } from "../controllers/job.controller.js";

const jobsRouter = Router();

// POST request to post a new job
jobsRouter.post('/post-job', postJob);
jobsRouter.get('/all-jobs', getAllJobs);

export default jobsRouter;

