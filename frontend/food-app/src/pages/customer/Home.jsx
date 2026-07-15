import React from "react";
import TopBar from "../../components/layout/Topbar";
import Navbar from "../../components/layout/Navbar";
import HeroFront from "../../assets/HeroSectionImg/HeroFront.png";
import HeroBack from "../../assets/HeroSectionImg/HeroBack.png";
import Input from "../../components/common/Input";
import Logo from "../../assets/NavbarImg/Logo.png";
import DownloadApp from "../../components/layout/DownloadApp";
import InfoSection from "../../components/menu/InfoSection";
import Footer from "../../components/layout/Footer";
import HomeSectionList from "../../components/layout/HomeSectionList";
import CommonRestaurant from "../../components/layout/CommonRestaurant";

const Home = () => {
  return (
    <>
      <TopBar />
      <Navbar />

      {/* HERO */}
      <section className="max-w-7xl mx-auto mt-5 px-4 lg:px-0">
        <div className="relative lg:h-[570px] rounded-[16px] overflow-hidden bg-[#03081F] flex flex-col lg:flex-row">
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-auto flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-6 py-12 lg:pl-8 lg:py-0 z-10">
            <p className="text-white/80 text-[14px] lg:text-[16px] mb-5">
              Order Restaurant food, takeaway and groceries.
            </p>

            <h1 className="text-white font-semibold text-[42px] leading-[48px] sm:text-[50px] sm:leading-[56px] lg:text-[58px] lg:leading-[65px]">
              Feast Your Senses,
            </h1>

            <h1 className="text-[#FC8A06] font-semibold text-[42px] leading-[48px] sm:text-[50px] sm:leading-[56px] lg:text-[58px] lg:leading-[65px] mb-8">
              Fast and Fresh
            </h1>

            <p className="text-white/70 text-[15px] mb-5">
              Enter a postcode to see what we deliver
            </p>

            <div className="w-full flex justify-center lg:justify-start">
              <div className="w-full max-w-[420px]">
                <Input />
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT (Desktop Only) */}
          <div className="hidden lg:block w-[44%] h-full absolute top-10 right-0 bg-[#FC8A06] rounded-tl-[280px]">
            <img
              src={HeroBack}
              className="w-[900px] h-[480px] absolute top-[50px] right-[395px] opacity-[12%]"
            />

            <img
              src={HeroFront}
              className="w-[360px] h-[480px] absolute top-[50px] right-[355px]"
            />

            {/* Card 1 */}
            <div className="absolute top-[90px] right-[100px] w-[340px] bg-white rounded-xl shadow-xl p-3 z-50">
              <div className="flex justify-between items-center">
                <img src={Logo} alt="" className="h-5" />
                <span className="text-xs text-gray-400">now</span>
              </div>

              <p className="font-semibold text-[13px] mt-2">
                We've Received your order!
              </p>

              <p className="text-[11px] text-gray-500 mt-1">
                Awaiting Restaurant acceptance
              </p>
            </div>

            <h1 className="absolute top-[28px] right-[115px] text-[62px] font-light text-white/60">
              1
            </h1>

            {/* Card 2 */}
            <div className="absolute top-[220px] right-[15px] w-[340px] bg-white rounded-xl shadow-xl p-4 z-50">
              <div className="flex justify-between items-center">
                <img src={Logo} alt="" className="h-5" />
                <span className="text-xs text-gray-400">now</span>
              </div>

              <p className="font-semibold text-[13px] mt-2">
                Order Accepted! ✅
              </p>

              <p className="text-[11px] text-gray-500 mt-1">
                Your order will be delivered shortly
              </p>
            </div>

            <h1 className="absolute top-[148px] right-[22px] text-[62px] font-light text-white/60">
              2
            </h1>

            {/* Card 3 */}
            <div className="absolute top-[380px] right-[48px] w-[350px] bg-white rounded-xl shadow-xl p-4 z-50">
              <div className="flex justify-between items-center">
                <img src={Logo} alt="" className="h-5" />
                <span className="text-xs text-gray-400">now</span>
              </div>

              <p className="font-semibold text-[13px] mt-2">
                Your rider's nearby 🎉
              </p>

              <p className="text-[11px] text-gray-500 mt-1">
                They're almost there — get ready!
              </p>
            </div>

            <h1 className="absolute top-[318px] right-[60px] text-[55px] font-light text-white/60">
              3
            </h1>
          </div>
        </div>
      </section>
      
      <HomeSectionList />
      <CommonRestaurant />
      <DownloadApp />
      <InfoSection />
      <Footer />
    </>
  );
};

export default Home;
