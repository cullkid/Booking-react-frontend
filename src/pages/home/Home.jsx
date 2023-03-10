import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
// import Message from "../../components/message/Message";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer mt-[80px] flex flex-col  items-center gap-[50px]">
        <Featured />
        <h1 className="md:w-[1024px] w-[450px] mx-auto text-[20px] top-[0px] font-bold text-black">
          Browse by property type
        </h1>
        <PropertyList />
        <h1 className="md:w-[1024px] w-[450px] mx-auto text-[20px] font-bold text-black">
          Homes guests love
        </h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
        {/* <Message /> */}
      </div>
    </div>
  );
};

export default Home;
