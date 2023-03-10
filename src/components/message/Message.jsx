import React, { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { Link } from "react-router-dom";

const Message = () => {
  const [openMessage, setOpenMessage] = useState(true);

  //   const handleClick = () => {
  //     setOpenMessage(false)
  //   };

  return (
    <div className=" md:w-screen top-[0] left-[0] w-[450px] h-auto mt-[250px] fixed  flex justify-center items-center">
      {openMessage && (
        <div className="relative bg-white p-[24px] border-[2px] border-yellow-600">
          {/* <FaTimesCircle
            onClick={handleClick}
            className="absolute top-[0] right-[0] cursor-pointer"
          /> */}
          <Link to="/">
            <FaTimesCircle
              //   onClick={handleClick}
              className="absolute top-[0] right-[0] cursor-pointer"
            />
          </Link>
          <h1 className="font-[900] text-green-600 text-[25px] mx-auto w-[200px] flex items-center justify-between">
            <span>SUCCESSFUL</span>
            <GiCheckMark />
          </h1>
          <p className="py-[20px]">
            Your reservation was successful and we have send you an email for
            the confirmation, please check your email
          </p>
          <p className="text-center font-bold">Thank you</p>
        </div>
      )}
    </div>
  );
};

export default Message;
