import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app = express();
//cors middleware
app.use(cors());

//body parser middleware
app.use(bodyParser.json());

//json middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static public folder
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
