import axios from "axios";
import "./Login.css";
import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
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
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);

      //add the login-success switch case state to run if the login is successful
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-[350px] md:w-[600px] h-[400px] md:h-[300px] mt-[15%] mx-auto pb-[100px]">
        <div className="h-[150px] w-[200px] flex flex-col items-between justify-between mt-[12%] m-auto">
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
              type="password"
              placeholder="password"
              id="password"
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

export default Login;
