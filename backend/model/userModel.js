import mongoose from "mongoose";

const userScheme = mongoose.Schema;

const enquiryScheme = new userScheme({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
});

const enquiryModel = mongoose.model("Enquiry", enquiryScheme);

export default enquiryModel;
