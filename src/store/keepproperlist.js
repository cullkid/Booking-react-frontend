import useFetchType from "../../hooks/fetchByType";

const PropertyList = () => {
  const { data, loading, error } = useFetchType("/hotels/countByType");

  const images = [
    "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",
    "https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",
  ];

  return (
    <div className="md:w-full md:max-w-[1024px] w-[450px] md:flex justify-between gap-[20px]">
      {loading ? (
        "loading"
      ) : (
        <>
          {data &&
            images.map((img, index) => (
              <div className="flex-1 mt-[40px] rounded-[10px] overflow-hidden cursor-pointer">
                <img
                  src={img}
                  alt=""
                  className="pListImg md:w-full mx-auto w-[350px] h-[150px] object-cover"
                />
                <div className="text-[18px] text-[#444] md:w-[0px] w-[350px] md:mx-[0px] mx-auto">
                  <h1>{data[index].type}</h1>
                  <h2>
                    {data[index].count} {data[index].type}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;

{
  /* property 1 */
}
<div className="flex-1 mt-[40px] rounded-[10px] overflow-hidden cursor-pointer">
  <img
    src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
    alt=""
    className="pListImg md:w-full mx-auto w-[350px] h-[150px] object-cover"
  />
  <div className="text-[18px] text-[#444] md:w-[0px] w-[350px] md:mx-[0px] mx-auto">
    <h1>Hotels</h1>
    <h2>233 {type[0]} hotels</h2>
  </div>
</div>;
{
  /* property 2 */
}
<div className="flex-1 mt-[40px] rounded-[10px] overflow-hidden cursor-pointer">
  <img
    src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
    alt=""
    className="md:w-full mx-auto w-[350px] h-[150px] object-cover"
  />
  <div className="text-[18px] text-[#444] md:w-[0px] w-[350px] md:mx-[0px] mx-auto">
    <h1>Apartments</h1>
    <h2>2331 hotels</h2>
  </div>
</div>;
{
  /* property 3 */
}
<div className="flex-1 mt-[40px] rounded-[10px] overflow-hidden cursor-pointer">
  <img
    src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg"
    alt=""
    className="md:w-full mx-auto w-[350px] h-[150px] object-cover"
  />
  <div className="text-[18px] text-[#444] md:w-[0px] w-[350px] md:mx-[0px] mx-auto">
    <h1>Resorts</h1>
    <h2>2331 hotels</h2>
  </div>
</div>;
{
  /* property 4 */
}
<div className="flex-1 mt-[40px] rounded-[10px] overflow-hidden cursor-pointer">
  <img
    src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
    alt=""
    className="md:w-full mx-auto w-[350px] h-[150px] object-cover"
  />
  <div className="text-[18px] text-[#444] md:w-[0px] w-[350px] md:mx-[0px] mx-auto">
    <h1>Villas</h1>
    <h2>2331 hotels</h2>
  </div>
</div>;
{
  /* property 5 */
}
<div className="flex-1 mt-[40px] rounded-[10px] overflow-hidden cursor-pointer">
  <img
    src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg"
    alt=""
    className="pListImg md:w-full mx-auto w-[350px] h-[150px] object-cover"
  />
  <div className="text-[18px] text-[#444] md:w-[0px] w-[350px] md:mx-[0px] mx-auto">
    <h1>Cabins</h1>
    <h2>543 hotels</h2>
  </div>
</div>;
