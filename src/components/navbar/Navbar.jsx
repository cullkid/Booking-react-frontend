// import "./navbar.css";

import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { RiRadioButtonLine } from "react-icons/ri";

const Navbar = () => {
  const { user } = useContext(AuthContext); //import user from authcontext and used to hide the login and signin buttom when user login

  return (
    <div className="h-[50px] bg-[#585356] flex justify-center">
      <div className="md:w-full md:max-w-[1024px] w-[450px] text-white flex items-center justify-between">
        <Link to="/" className="font-bold">
          Eze's booking
        </Link>

        {user ? (
          <RiRadioButtonLine className="text-green-600" />
        ) : (
          <div className="w-[150px] flex justify-between">
            <Link to="/register" className="bg-gray-400 px-[10px]">
              Register
            </Link>
            <button className="bg-gray-400 px-[10px]">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
