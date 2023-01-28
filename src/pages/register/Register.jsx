import axios from "axios";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    phone: undefined,
    country: undefined,
    city: undefined,
  });

  //importing Authcontext state to apply it's switch cases state
  const { loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const navigate = useNavigate();

  //async is needed because of the api request
  const handleClick = async (e) => {
    e.preventDefault();

    //adding first authcontext switch case state which is "login_start" using dispatch & no payload because it is loading the login state and its not returning any state
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("/auth/register", credentials);

      //add the login-success switch case state to run if the login is successful
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      navigate("/login");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-[350px] md:w-[600px] h-[600px] md:h-[300px] my-[10%] mx-auto pb-[100px]">
        <div className="h-[300px]  w-[200px] flex flex-col  items-between justify-between  m-auto">
          <article>
            <input
              className="border-2 px-[4px] rounded-[5px]"
              type="text"
              placeholder="username"
              id="username"
              onChange={handleChange}
            />
          </article>
          <article>
            <input
              className="border-2 px-[4px] rounded-[5px]"
              type="text"
              placeholder="email"
              id="email"
              onChange={handleChange}
            />
          </article>
          <article>
            <input
              className="border-2 px-[4px] rounded-[5px]"
              type="password"
              placeholder="password"
              id="password"
              onChange={handleChange}
            />
          </article>
          <article>
            <input
              className="border-2 px-[4px] rounded-[5px]"
              type="text"
              placeholder="phone"
              id="phone"
              onChange={handleChange}
            />
          </article>
          <article>
            <input
              className="border-2 px-[4px] rounded-[5px]"
              type="text"
              placeholder="country"
              id="country"
              onChange={handleChange}
            />
          </article>
          <article>
            <input
              className="border-2 px-[4px] rounded-[5px]"
              type="text"
              placeholder="city"
              id="city"
              onChange={handleChange}
            />
          </article>
          <article>
            <button
              disabled={loading}
              className="lButton bg-[#0071c28c] w-full text-white font-bold"
              onClick={handleClick}
            >
              Login
            </button>
            {error && (
              <span className="mb-[10px] text-red-600">{error.message}</span>
            )}
          </article>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
