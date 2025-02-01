/* eslint-disable react/prop-types */

import axios from "axios";
import { enquiryAPI } from "../App";
import { toast } from "react-toastify";

const UserList = ({ data, getEnquiry, setFormData }) => {
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${enquiryAPI}/api/enquiry/delete/${id}`);
      const data = res.data;
      if (data) {
        toast.success(data.message);
        getEnquiry();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.get(`${enquiryAPI}/api/enquiry/edit/${id}`);
      let data = res.data;
      setFormData(data.id);
      toast.success(data.message);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-center mb-5 text-3xl">User List</h1>
      <div className="overflow-x-auto rounded-box ">
        <table className="table">
          {/* head */}
          <thead className="border-b-2 border-gray-400 ">
            <tr>
              <th>Sl no</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          {/* row 1 */}
          {data.length > 0 &&
            data.map((item, index) => (
              <tbody className="border-b border-gray-400" key={item._id}>
                <tr>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    {item.message &&
                      item.message.charAt(0).toUpperCase() +
                        item.message.slice(1)}
                  </td>

                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className=" bg-red-400 px-2 hover:bg-black py-0.5 rounded-md cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleUpdate(item._id)}
                      className=" bg-blue-400 px-2 py-0.5  hover:shadow-2xl hover:bg-black rounded-md  cursor-pointer"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      </div>
    </div>
  );
};

export default UserList;
