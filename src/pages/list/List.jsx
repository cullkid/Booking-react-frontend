import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [options, setOptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  const handleClick = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="flex  mt-[20px]">
        <div className="md:w-[1050px]  mx-auto w-[450px] md:flex gap-[30px]">
          {/* search container */}
          <div className="bg-[#febb02] w-[300px] md:w-[300px] md:mx-[0px] mx-auto p-[10px] md:sticky top-[10px] md:mb-[0px] mb-[40px] h-max">
            <h1 className="text-[20px] text-[#555] mb-[10px]">Search</h1>
            {/* destination */}
            <div className="flex flex-col gap-[5px] mb-[10px]">
              <label>Destination</label>
              <input
                placeholder={destination}
                type="text"
                className="text-gray-500"
              />
            </div>
            {/* date */}
            <div className="flex flex-col gap-[5px] mb-[10px] bg/white">
              <label>Check-in Date</label>
              <span
                className="bg-white flex items-center justify-center cursor-pointer"
                onClick={() => setOpenDate(!openDate)}
              >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            {/* option container 1*/}
            <div className="lsItem flex flex-col gap-[5px] mb-[10px]">
              <label className="text-[15px]">Options</label>
              {/* option container 2 */}
              <div className="p-[10px]">
                {/* min price */}
                <div className="lsOptionItem flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="w-[50px]"
                  />
                </div>
                {/* max price */}
                <div className="flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="w-[50px]"
                  />
                </div>
                {/* adult */}
                <div className="flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="w-[50px]"
                    placeholder={options.adult}
                  />
                </div>
                {/* children */}
                <div className="flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="w-[50px]"
                    placeholder={options.children}
                  />
                </div>
                {/* rooms */}
                <div className="flex justify-between mb-[10px] text-[#555] text-[12px]">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="w-[50px]"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleClick}
              className="bg-[#0071c2] text-white p-[8px] w-full font-bold cursor-pointer"
            >
              Search
            </button>
          </div>
          <div className="listResult flex-3">
            {loading ? (
              "lading, please wait"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
