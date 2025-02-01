//local module
import enquiryModel from "../model/userModel.js";

const enquiryInser = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const userEmail = await enquiryModel.findOne({ email });
    if (userEmail) {
      res.json({ success: false, message: "Email already exist" });
    }

    let enquiryList = new enquiryModel({
      name,
      email,
      phone,
      message,
    });

    await enquiryList.save();
    res.json({ success: true, message: "Succesfully User Added" });
  } catch (error) {
    console.log(error);
  }
};

const enquiryList = async (req, res) => {
  try {
    const enquiry = await enquiryModel.find();
    res.json({ success: true, enquiry });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

const enquiryDelete = async (req, res) => {
  try {
    const delId = req.params.id;
    const deleteRecord = await enquiryModel.deleteOne({ _id: delId });
    res.json({ success: true, message: "Deleted", deleteRecord });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

const enquiryEdit = async (req, res) => {
  try {
    const editId = req.params.id;
    const id = await enquiryModel.findOne({ _id: editId });
    res.json({ success: true, message: "Got to form Page", id });
  } catch (error) {
    res.json("Error while editing ", error);
  }
};

const enquiryUpdate = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const updateId = req.params.id;
    const updateObj = {
      name,
      email,
      phone,
      message,
    };
    const updateEnquiry = await enquiryModel.updateOne(
      { _id: updateId },
      updateObj
    );
    res.json({ success: true, message: "Updated Successfully", updateEnquiry });
  } catch (error) {
    res.json({ success: false, message: "Error while updating" });
  }
};

export { enquiryInser, enquiryList, enquiryDelete, enquiryEdit, enquiryUpdate };
