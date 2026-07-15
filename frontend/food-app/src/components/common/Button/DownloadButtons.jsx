import React from "react";
import AppStore from "../../../assets/DownloadAppImg/AppStore.png";
import GooglePlay from "../../../assets/DownloadAppImg/GooglePlay.png";

const DownloadButtons = () => {
  return (
    <div className="flex justify-center lg:justify-start items-center gap-3 sm:gap-4 mt-6 flex-wrap lg:flex-nowrap lg:mr-[120px]">

      <img
        src={AppStore}
        alt="App Store"
        className="h-10 sm:h-11 lg:h-12 cursor-pointer hover:scale-105 duration-300"
      />

      <img
        src={GooglePlay}
        alt="Google Play"
        className="h-10 sm:h-11 lg:h-12 cursor-pointer hover:scale-105 duration-300"
      />

    </div>
  );
};

export default DownloadButtons;