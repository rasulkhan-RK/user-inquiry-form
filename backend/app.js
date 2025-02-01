import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

//local module
import enquiryRoute from "./routes/enquietRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

const server = process.env.PORT || 3000;

// api endpoint
app.use("/api/enquiry", enquiryRoute);

//connecting to mongdb
mongoose
  .connect(process.env.DBURL)
  .then(() => {
    app.listen(server, () => {
      console.log("Server is Running " + `http://127.0.0.1:${server}`);
    });
  })
  .catch((err) => console.log("Error While conecting ", err));
