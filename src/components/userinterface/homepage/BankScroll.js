import { React, useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  serverURL,
  getData,
} from "../../../services/FetchNodeAdminServices";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
export default function BankScroll() {
  const[bankoffer, setBankOffer] = useState([]);
  var scrollRef = useRef();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: matches ? 3 : 2,
    slidesToScroll: 1,
    arrows: false,
  };

  useEffect(function () {
    fetchAllBankOffers();
  }, []);

  const fetchAllBankOffers = async () => {
    var result = await getData("userinterface/show_all_bankoffer");
    setBankOffer(result.data);
  };
  
  const showImages2 = () => {
    return bankoffer.map((item) => {
      return (
        <div>
          <img
            src={`${serverURL}/images/${item.filenames}`}
            style={{ width: "96%", borderRadius: 10 }}
          />
        </div>
      );
    });
  };
  
  const handleNext = () => {
    scrollRef.current.slickNext();
  };

  const handlePrev = () => {
    scrollRef.current.slickPrev();
  };
  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={handleNext}
        style={{
          zIndex: 2,
          top: "43%",
          right: "5.8%",
          position: "absolute",
          background: "#b2bec3",
          opacity: 0.5,
          width: 30,
          height: 30,
          borderRadius: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <KeyboardArrowRightIcon style={{ color: "#fff" }} />
      </div>

      <Slider ref={scrollRef} {...settings}>
        {showImages2()}
      </Slider>

      <div
        onClick={handlePrev}
        style={{
          zIndex: 2,
          top: "43%",
          left: "1.5%",
          position: "absolute",
          background: "#b2bec3",
          opacity: 0.5,
          width: 30,
          height: 30,
          borderRadius: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <KeyboardArrowLeftIcon style={{ color: "#fff" }} />
      </div>
    </div>
  );
}
