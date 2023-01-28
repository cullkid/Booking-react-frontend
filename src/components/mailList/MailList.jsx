const MailList = () => {
  return (
    <div className="mail w-full mt-[50px] bg-[#003580] text-white flex flex-col items-center gap-[20px] p-[50px]">
      <h1 className="mailTitle">Save time, save money!</h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you
      </span>
      <div className="flex items-center justify-between w-[300px]">
        <input type="text" placeholder="Your Email" className="px-[5px]" />
        <button className="bg-gray-400 px-[10px]">Subscribe</button>
      </div>
    </div>
  );
};

export default MailList;
