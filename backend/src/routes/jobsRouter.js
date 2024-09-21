import { Router } from "express"
import { getAllJobs, jobsPosted, postJob } from "../controllers/job.controller.js";

const jobsRouter = Router();

// POST request to post a new job
jobsRouter.post('/post-job', postJob);
jobsRouter.get('/all-jobs', getAllJobs);
jobsRouter.get('/jobs-posted/:postedBy', jobsPosted);

export default jobsRouter;

