import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/searchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  //handling the increase/decrease of the  of the (adult,children,room)
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  //use usenavigation to make the button navigate to another page when clicked
  const navigate = useNavigate();

  //importing searchcontext to update the state 0f destination, dtae and option
  //the dispatch(func) will return the current state of (destination, date, option) which is "NEW_SEARCH"
  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    //dispatch will send the new state of (destination, date, option) to the single page that the search found
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  const { user } = useContext(AuthContext); //import user from authcontext and used to hide the login and signin buttom when user login

  return (
    <div className="text-white flex justify-center relative bg-[#585356]">
      <div
        className={
          type === "list"
            ? "mt-[20px]"
            : "md:w-full md:max-w-[1020px] w-[450px] mt-[20px] md:mb-[100px] mb-[200px]"
        }
      >
        {/*  header list */}
        <article className="md:flex grid grid-cols-2 gap-[40px] mb-[50px]">
          {/* bed */}
          <div className="headerListItem active w-[100px] flex items-center gap-[10px]">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          {/* flight */}
          <div className="flex items-center gap-[10px]">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          {/* car rent */}
          <div className="flex items-center gap-[10px]">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          {/* attracton */}
          <div className="flex items-center gap-[10px]">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          {/* taxi */}
          <div className="flex items-center gap-[10px]">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </article>
        {/* header title */}
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="my-[20px]">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account
            </p>
            {!user && (
              <button className="bg-[#0071c2] text-white font-bold border-none p-[10px] cursor-pointer">
                Sign in / Register
              </button>
            )}
            {/* header search */}
            <article className="md:h-[30px] h-[200px] bg-white border-[2px] border-[#febb02] border-solid md:flex items-center justify-around grid grid-cols-2 justify-items-center p-[20px] rounded-[5px] md:w-full md:max-w-[1020px] w-[450px] absolute bottom-[-25px]">
              {/* location */}
              <div className="flex items-center gap-[10px]">
                <FontAwesomeIcon icon={faBed} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="border-none outline-none text-gray-500"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              {/* date */}
              <div className="flex items-center justify-center gap-[10px] md:w-[280px] w-[160px]">
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="text-gray-400"
                />
                <span
                  onClick={() => setOpenDate(!openDate)} //to show the date when clicked
                  className="text-gray-400 cursor-pointer"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && ( //to hide the date by default
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date md:top-[50px] top-[90px]"
                    minDate={new Date()}
                  />
                )}
              </div>
              {/* people */}
              <div className="flex items-center gap-[10px] md:w-[280px] w-[160px]">
                <FontAwesomeIcon icon={faPerson} className="text-gray-400" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="text-gray-400 cursor-pointer"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>

                {openOptions && (
                  <div className="options md:top-[50px] top-[170px]">
                    {/* for adult */}
                    <div className="w-[200px] flex justify-between m-[10px]">
                      <span className="optionText">Adult</span>
                      <div className="flex items-center gap-[10px] text-[12px] text-black">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton w-[30px] h-[30px] border-[1px] border-solid border-[#0071c2] text-[#0071c2] bg-white"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="w-[30px] h-[30px] border-[1px] border-solid border-[#0071c2] text-[#0071c2] bg-white"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* for children */}
                    <div className="w-[200px] flex justify-between m-[10px]">
                      <span className="optionText">Children</span>
                      <div className="flex items-center gap-[10px] text-[12px] text-black">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton w-[30px] h-[30px] border-[1px] border-solid border-[#0071c2] text-[#0071c2] bg-white"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="w-[30px] h-[30px] border-[1px] border-solid border-[#0071c2] text-[#0071c2] bg-white"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    {/* for room */}
                    <div className="w-[200px] flex justify-between m-[10px]">
                      <span className="optionText">Room</span>
                      <div className="flex items-center gap-[10px] text-[12px] text-black">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton w-[30px] h-[30px] border-[1px] border-solid border-[#0071c2] text-[#0071c2] bg-white"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="w-[30px] h-[30px] border-[1px] border-solid border-[#0071c2] text-[#0071c2] bg-white"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* button */}
              <div className="headerSearchItem">
                <button
                  className="bg-[#0071c2] text-white font-bold border-none px-[10px] py-[5px] cursor-pointer"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </div>
            </article>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
