import useFetch from "../../hooks/useFetch";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Lisbon,England,Madrid"
  );

  return (
    <div className="featured md:w-full md:max-w-[1024px] w-[450px] md:flex justify-between gap-[20px]">
      {/* featured 1 */}
      {loading ? (
        "loading please wait"
      ) : (
        <>
          <div className="relative text-white rounded-[10px] overflow-hidden h-[250px] flex-1">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className="md:w-full w-[350px] mx-auto h-full object-cover"
            />
            <div className="absolute bottom-[20px] md:left-[20px] left-[70px]">
              <h1>Lisbon</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          {/* featured 2 */}
          <div className="relative md:mt-[0px] mt-[40px] text-white rounded-[10px] overflow-hidden h-[250px] flex-1">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className="md:w-full w-[350px] mx-auto h-full object-cover"
            />
            <div className="absolute bottom-[20px] md:left-[20px] left-[70px]">
              <h1>England</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          {/* featured 3 */}
          <div className="relative md:mt-[0px] mt-[40px] text-white rounded-[10px] overflow-hidden h-[250px] flex-1">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className="md:w-full w-[350px] mx-auto h-full object-cover"
            />
            <div className="absolute bottom-[20px] md:left-[20px] left-[70px]">
              <h1>Madrid</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
