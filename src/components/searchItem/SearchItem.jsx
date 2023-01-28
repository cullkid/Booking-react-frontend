import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem md:w-[700px] w-[450px] md:p-[10px] p-[5px] border-[1px] border-solid border-gray-400 rounded-[5px] flex justify-between gap-[20px] flex-2 mb-[20px]">
      <img
        src={item.photos[0]}
        // src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="md:w-[200px] w-[150px] md:h-[200px] h-[150px] object-cover"
      />
      <div className="flex flex-col gap-[10px] flex-2">
        <h1 className="md:text-[20px] text-[15px] text-[#0071c2] font-bold">
          {item.name}
        </h1>
        <h1 className="md:text-[20px] text-[15px] text-gray-400">
          Hotels in {item.city}
        </h1>
        <span className="text-[12px]">
          {item.distance} distance from city center
        </span>
        <span className="text-[12px] bg-[#008009] text-white w-max p-[3px] rounded-[5px]">
          Free airport taxi
        </span>
        <span className="text-[12px] font-bold">
          Studio Apartment with Air conditioning
        </span>
        <span className="text-[12px]">{item.desc}</span>
        <span className="text-[12px] text-[#008009] font-bold">
          Free cancellation
        </span>
        <span className="text-[12px] text-[#008009]">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      {/* rate and availability */}
      <div className="flex flex-1 flex-col justify-between">
        {/* rate */}
        {item.rating && (
          <div className="flex justify-betwee">
            <span className="font-bold">Excellent</span>
            <button className="bg-[#003580] text-white p-[3px] font-bold">
              {item.rating}
            </button>
          </div>
        )}
        {/* availability */}
        <div className="text-right flex flex-col gap-[5px]">
          <span className="text-[24px]">{item.cheapestPrice}</span>
          <span className="text-[12px] text-gray-500">
            Includes taxes and fees
          </span>
          <Link to={`/hotels/${item._id}`}>
            <button className="bg-[#0071c2] text-white md:text-[16px] text-[10px] font-bold cursor-pointer rounded-[5px]">
              See availability
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
