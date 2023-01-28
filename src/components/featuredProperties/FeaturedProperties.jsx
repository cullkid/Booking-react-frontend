import { useState } from "react";
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=3");
  const rates = {
    1: "good",
    2: "very good",
    3: "excelent",
  };

  const [rate, setRate] = useState(1);

  return (
    <div className="md:w-full md:max-w-[1024px] w-[450px] md:flex justify-center gap-[20px]">
      {loading ? (
        "loading please wait"
      ) : (
        <>
          {data.map((item) => (
            <div
              key={item._id}
              className="flex-1 gap-[10px] mb-[40px] flex flex-col"
            >
              <img
                src={item.photos[0]}
                alt=""
                className="mx-auto  w-[300px] h-[250px] object-cover"
              />
              <span className="font-bold w-[300px] mx-auto">{item.name}</span>
              <span className="w-[300px] mx-auto">{item.city}</span>
              <span className="w-[300px] mx-auto">
                Starting from ${item.cheapestPrice}
              </span>

              <div className="flex items-center w-[300px] mx-auto">
                <button className="bg-[#003580] px-[8px] text-white">
                  {item.rating} 6
                </button>
                <span className="text-gray-500 ml-[5px]">{rates.rate}</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
