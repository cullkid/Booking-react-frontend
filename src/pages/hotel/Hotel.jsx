import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/searchContext";
import { AuthContext } from "../../context/AuthContext";
import Booking from "../../components/booking/Booking";

const Hotel = () => {
  const location = useLocation();
  // console.log(location)
  const id = location.pathname.split("/")[2]; // spliting the hotels homepage pathname to get each hotel id
  const [slideNumber, setSlideNumber] = useState(0); //slidenumber state
  const [open, setOpen] = useState(false); //open & close slider state
  const [openmodel, setOpenModel] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);

  //importing searchcontext to update the state 0f destination, dtae and option
  //the "date(func)" is neede to be able to update the how many days is chosed in (destination,"DATE",option) state
  const { dates, options } = useContext(SearchContext);

  const { user } = useContext(AuthContext); //import user from authcontext and used to hide the login and signin buttom when user login
  const navigate = useNavigate();

  //how to calculate the how many days in the chooseed date
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 20;
  function dayDefference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const difDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);

    return difDays;
  }

  const days = dayDefference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  //handleclick of reserve button
  const handleClick = () => {
    if (user) {
      setOpenModel(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading, please wait"
      ) : (
        <>
          <div className="hotelContainer ">
            <div className="md:w-[1024px] w-[450px]">
              {open && (
                <div className="slider ">
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="close"
                    onClick={() => setOpen(false)}
                  />
                  <FontAwesomeIcon
                    icon={faCircleArrowLeft}
                    className="arrow"
                    onClick={() => handleMove("l")}
                  />
                  <div className="sliderWrapper">
                    <img
                      src={data.photos[slideNumber]}
                      alt=""
                      className="sliderImg"
                    />
                  </div>
                  <FontAwesomeIcon
                    icon={faCircleArrowRight}
                    className="arrow"
                    onClick={() => handleMove("r")}
                  />
                </div>
              )}
              <div className="hotelWrapper">
                <button onClick={handleClick} className="bookNow">
                  Reserve or Book Now!
                </button>
                <h1 className="hotelTitle">{data.name}</h1>
                <div className="hotelAddress">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{data.address}</span>
                </div>
                <span className="hotelDistance">
                  Excellent location – {data.distance} from center
                </span>
                <span className="hotelPriceHighlight">
                  Book a stay over ${data.cheapestPrice} at this property and
                  get a free airport taxi
                </span>
                <div className="hotelImages">
                  {data.photos?.map((photo, i) => (
                    <div className="hotelImgWrapper" key={i}>
                      <img
                        onClick={() => handleOpen(i)}
                        src={photo}
                        alt=""
                        className="hotelImg"
                      />
                    </div>
                  ))}
                </div>
                <div className="hotelDetails">
                  <div className="hotelDetailsTexts">
                    <h1 className="hotelTitle">{data.title}</h1>
                    <p className="hotelDesc">{data.desc}</p>
                  </div>
                  <div className="hotelDetailsPrice">
                    <h1>Perfect for a {days}-night stay!</h1>
                    <span>
                      Located in the real heart of Krakow, this property has an
                      excellent location score of 9.8!
                    </span>
                    <h2>
                      <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                      nights)
                    </h2>
                    <button onClick={handleClick}>Reserve or Book Now!</button>
                  </div>
                </div>{" "}
              </div>
            </div>{" "}
            <MailList />
            <Footer />
          </div>
        </>
      )}
      {/* the hotel id is coming from the top of the pathname that contain the each chosed hotel id */}
      {openmodel && <Booking setOpen={setOpenModel} hotelId={id} />}
    </div>
  );
};

export default Hotel;
