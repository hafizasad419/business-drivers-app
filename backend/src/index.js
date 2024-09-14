import express, { json, urlencoded } from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import connectDB from './db/db.js';
import cookieParser from "cookie-parser"
import freelancerRouter from './routes/freelancerRouter.js';
configDotenv();

const app = express();


const DBFunc = async () => console.log("To Avoid Over Limit Of Atlas")
// connectDB()
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server Chal Pya J, http://localhost:${process.env.PORT} Tay`);

    })
})
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })


// Middlewares

app.use(urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:5173', 'https://business-drivers-frontend.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));
app.use(express.static("public"))
app.use(json());



app.get("/", (req, res) => {
    res.send("<a href='https://asad-riaz-portfolio.vercel.app' target=_blank>Asad Riaz</a>")
})

app.use("/api/v1/freelancer", freelancerRouter)


