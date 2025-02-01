import { useState } from "react";
import UserList from "./UserList";
import axios from "axios";
import { toast } from "react-toastify";

//APIURL
import { enquiryAPI } from "../App";
import { useEffect } from "react";

const UserDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  const [enquiryList, setEnquiryList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData._id) {
      try {
        const res = await axios.put(
          `${enquiryAPI}/api/enquiry/update/${formData._id}`,
          formData
        );
        const data = await res.data;
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          _id: "",
        });
        toast.success(data.message);
        getEnquiry();
      } catch (error) {
        toast.error(error);
      }
    } else {
      try {
        const res = await axios.post(
          enquiryAPI + "/api/enquiry/insert",
          formData
        );
        const userData = res.data;
        if (userData.success) {
          toast.success(userData.message);
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });
        } else {
          toast.error(userData.message);
        }

        getEnquiry();
      } catch (error) {
        toast.error(error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let data = { ...formData, [name]: value };
    setFormData(data);
  };

  const getEnquiry = async () => {
    try {
      const res = await axios.get(
        enquiryAPI + "/api/enquiry/list",
        enquiryList
      );
      const data = res.data;
      setEnquiryList(data.enquiry);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEnquiry();
  }, []);

  return (
    <div className="py-16 px-10">
      <div className="md:grid grid-cols-[30%_auto] gap-2 flex flex-col">
        <div className=" bg-gray-500 rounded-md w-full p-2">
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset text-[17px] w-full h-[550px]">
              <h1 className="text-center mb-5 mt-2 text-3xl">User Details</h1>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="input w-full"
                name="name"
                placeholder="Enter your name"
                onChange={handleChange}
                value={formData.name}
                required
              />

              <label htmlFor="email" className="fieldset-label">
                Email:
              </label>
              <input
                type="email"
                className="input w-full"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                value={formData.email}
                required
              />

              <label htmlFor="phone" className="fieldset-label">
                Phone:
              </label>
              <input
                type="text"
                className="input w-full"
                maxLength="14"
                name="phone"
                placeholder="10 digit number"
                onChange={handleChange}
                value={formData.phone}
                required
              />

              <label htmlFor="message">Message:</label>
              <textarea
                className="textarea w-full resize-none"
                name="message"
                placeholder="Message"
                maxLength={25}
                onChange={handleChange}
                value={formData.message}
                required
              ></textarea>

              <button
                className="btn btn-neutral w-[100px] hover:bg-transparent hover:text-black mt-4 m-auto"
                type="submit"
              >
                {formData._id ? "Update" : "Save"}
              </button>
            </fieldset>
          </form>
        </div>
        {/* Display User List */}
        <div className=" bg-gray-500 rounded-md w-full p-2 overflow-auto">
          <UserList
            data={enquiryList}
            getEnquiry={getEnquiry}
            setFormData={setFormData}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
