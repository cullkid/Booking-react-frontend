import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/searchContext";
import axios from "axios";

const Booking = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  // const id = location.pathname.split("/")[2];

  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);

  //import usecontext date to update the unavailable room
  const { dates } = useContext(SearchContext);

  //create a function to make the imported date to give the days the room will be unavailable instead it chosed dat
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime()); //create new date and asign it the booking 'start' date

    //create empty 'dates' aray value to push the loop date there
    let dates = [];

    //create aguements to loop and calculate the 'start' and 'end' booked room
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1); //increasing 'date' by 1
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  //confirm if room number is available before checking or booking
  const isAvailable = (roomNumber) => {
    //use roomnumber(func) to check if the 'some' roomnumber in
    //the db are unavailable, then return/include its duration booked
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound; //because if found then the room is unavailable
  };

  const handleSelect = (e) => {
    const checked = e.target.checked; //target the checked room number when clicked the checkbox
    const value = e.target.value; //target the value of the checked room number which is it's id

    //if there is any checked, take and remove the selectecrooms which is the state of the input
    //if there is no checked one and their value which is their id is not equal to the checked ones, then filter them from the selectedrooms
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  //button handleclick
  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };

  return (
    <div className="md:w-screen w-[450px] md:h-screen h-auto mt-[50px] fixed top-[0] left-[0] flex justify-center items-center">
      <div className="relative bg-white p-[24px] border-[2px] border-yellow-600">
        <FaTimesCircle
          onClick={() => setOpen(false)}
          className="absolute top-[0] right-[0]"
        />
        <span className="text-[15px] font-bold">Select your rooms:</span>
        {data.map((item) => (
          <div className="text-[12px] flex items-center gap-[50px] p-[20px]">
            <div>
              <p className=" font-bold">{item.title}</p>
              <p>{item.desc}</p>
              <p className="w-[100px]">
                Max people: <b>{item.maxPeople}</b>
              </p>
              <p>
                price: <span className="font-bold">{item.price}</span>
              </p>
            </div>
            <div className="grid md:grid-cols-4 grid-cols-2 gap-[30px]">
              {item.roomNumbers.map((roomNumber) => (
                <div className="flex flex-col flex-wrap ">
                  <label className="font-bold w-[70px]">
                    room:{" "}
                    <span className="font-light">{roomNumber.number}</span>{" "}
                  </label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleClick}
          className="bg-blue-700 md:w-[200px] text-white font-bold"
        >
          Reserve Now
        </button>
      </div>
    </div>
  );
};

export default Booking;
