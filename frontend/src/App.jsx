import UserDetails from "./component/UserDetails";
import { ToastContainer } from "react-toastify";

export const enquiryAPI = "http://127.0.0.1:4001";

const App = () => {
  return (
    <div className="bg-slate-600 text-white">
      <UserDetails />
      <ToastContainer />
    </div>
  );
};

export default App;
