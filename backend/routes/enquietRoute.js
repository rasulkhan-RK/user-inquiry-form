import express from "express";
import {
  enquiryDelete,
  enquiryEdit,
  enquiryInser,
  enquiryList,
  enquiryUpdate,
} from "../controller/userController.js";

const enquiryRoute = express.Router();

enquiryRoute.post("/insert", enquiryInser);
enquiryRoute.get("/list", enquiryList);
enquiryRoute.delete("/delete/:id", enquiryDelete);
enquiryRoute.get("/edit/:id", enquiryEdit);
enquiryRoute.put("/update/:id", enquiryUpdate);

export default enquiryRoute;
