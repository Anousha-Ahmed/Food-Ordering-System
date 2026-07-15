import React from "react";
import People from "../../assets/DownloadAppImg/People.png";
import MenuCard from "../menu/MenuCard.jsx";
import Logo from "../../assets/NavbarImg/Logo.png";
import DownloadButtons from '../common/Button/DownloadButtons.jsx'

//Cards
import Ride from '../../assets/DownloadAppImg/Ride.png';
import Partner from '../../assets/DownloadAppImg/Partner.png';
import HomeSectCards from "./HomeSectCards.jsx";



  //cards
  const cards = [
    {
      id: 1,
      type: "partner",
      image: Partner,
    },
    {
      id: 2,
      type: "partner",
      image: Ride,
    },
  ];
const DownloadApp = () => {
  return (
    <section className="max-w-7xl mx-auto mt-20 px-4 lg:px-0">

  <div className="bg-[#EAEAEA] rounded-2xl overflow-hidden">

    {/* ================= Desktop ================= */}
    <div className="hidden lg:flex h-[450px] items-center relative">

      {/* Left Image */}
      <div className="w-[650px] h-full flex items-end absolute mt-6">
        <img
          src={People}
          alt="people"
          className="h-full object-contain absolute bottom-[20px] right-[60px]"
        />
        <img
          src={People}
          alt="people"
          className="h-full object-contain absolute bottom-[20px] right-[80px] opacity-[15%]"
        />
      </div>

      {/* Right Content */}
      <div className="w-1/2 ml-auto pr-10 flex flex-col items-center justify-center">

        {/* Heading */}
        <div className="flex items-center py-8">
          <img
            src={Logo}
            alt="logo"
            className="h-14 absolute left-[570px] top-[22px] mt-20"
          />

          <h1 className="text-[58px] font-bold text-[#03081F] leading-none absolute left-[788px] top-[22px] mt-20">
            ing is more
          </h1>
        </div>

        {/* Capsule */}
        <div className="bg-[#03081F] rounded-full p-2 py-1 ml-[500px] mt-[68px] w-[600px] mr-[750px]">
          <h2 className="text-[42px] font-semibold text-center ml-[80px]">
            <span className="text-[#FC8A06] underline underline-offset-4">
              Personalised
            </span>

            <span className="text-white">
              {" "} & Instant
            </span>
          </h2>
        </div>

        <p className="mt-5 text-black text-[18px] font-medium mr-[150px]">
          Download the Order.uk app for faster ordering
        </p>

        <DownloadButtons />

      </div>
    </div>

    {/* ================= Mobile & Tablet ================= */}

    <div className="flex lg:hidden flex-col items-center text-center px-6 pt-10">

      {/* Heading */}
      <div className="flex items-center justify-center">
        <img
          src={Logo}
          alt="logo"
          className="h-9"
        />

        <h1 className="text-[28px] sm:text-[36px] font-bold text-[#03081F]">
          ing is more
        </h1>
      </div>

      {/* Personalised */}
      <h2 className="text-[26px] sm:text-[34px] font-bold mt-4">
        <span className="text-[#FC8A06] underline underline-offset-4">
          Personalised
        </span>

        <span className="text-[#03081F]">
          {" "} & Instant
        </span>
      </h2>

      {/* Text */}
      <p className="text-[#03081F] text-base mt-6">
        Download the Order.uk app for faster ordering
      </p>

      {/* Buttons */}
      <div className="mt-6 flex justify-center">
        <DownloadButtons />
      </div>

      {/* Image */}
      <div className="mt-10 w-full flex justify-center">
        <img
          src={People}
          alt="people"
          className="w-[270px] sm:w-[330px] object-contain"
        />
      </div>

    </div>

  </div>

  {/* Cards */}

  <section className="max-w-7xl mx-auto mt-12 lg:mt-20">

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

      {cards.map((item) => (
        <HomeSectCards key={item.id} {...item} />
      ))}

    </div>

  </section>

</section>
  );
};

export default DownloadApp;