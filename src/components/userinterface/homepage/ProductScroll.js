import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../../services/FetchNodeAdminServices";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRef } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { setRef } from "@mui/material";
import { grey } from "@mui/material/colors";
import PlusMinusButton from "./PlusMinusButton";

export default function ProductsScroll({ title }) {
  var scrollRef = useRef();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const xs_matches = useMediaQuery(theme.breakpoints.up("xs"));

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: matches ? 6 : xs_matches ? 3 : 2,
    slidesToScroll: 1,
    arrows: false,
  };

  var data = [
    {
      productdetailname: "Maggi 2-Minute Masala Noodles",
      weight: 70,
      weighttype: "g",
      packagingtype: "1",
      noofqty: "1",
      stock: 5,
      price: 15,
      offerprice: 13,
      offertype: "Festival",
      productstatus: "Trending",
      picture: "maggi.webp",
    },
    {
      productdetailname: "Amul Butter",
      weight: 100,
      weighttype: "g",
      packagingtype: "1",
      noofqty: "1",
      stock: 5,
      price: 60,
      offerprice: 58,
      offertype: "Festival",
      productstatus: "Trending",
      picture: "Amul butter.webp",
    },
    {
      productdetailname: "Fortune Sunlite Refined Sunflower Oil ",
      weight: 1,
      weighttype: "L",
      packagingtype: "1",
      noofqty: "1",
      stock: 5,
      price: 120,
      offerprice: 113,
      offertype: "Festival",
      productstatus: "Trending",
      picture: "fortune oil.webp",
    },

    {
      productdetailname: "Closeup Everfresh+ Red Hot Gel Toothpaste",
      weight: 150,
      weighttype: "g",
      packagingtype: "1",
      noofqty: "1",
      stock: 5,
      price: 240,
      offerprice: 169,
      offertype: "Festival",
      productstatus: "Trending",
      picture: "closeup.webp",
    },

    {
      productdetailname: "Comfort After Wash Morning Fresh Fabric Conditioner",
      weight: 860,
      weighttype: "ml",
      packagingtype: "1",
      noofqty: "1",
      stock: 5,
      price: 235,
      offerprice: 205,
      offertype: "Festival",
      productstatus: "Trending",
      picture: "comfort.webp",
    },

    {
      productdetailname:
        "Saffola Active Pro Weight Watchers Rice Bran Based Blended Oil",
      weight: 1,
      weighttype: "L",
      packagingtype: "1",
      noofqty: "1",
      stock: 5,
      price: 160,
      offerprice: 125,
      offertype: "Festival",
      productstatus: "Trending",
      picture: "saffola.webp",
    },

    {
      productdetailname: "Parle-G Gold Biscuits",
      weight: 1,
      weighttype: "kg",
      packagingtype: "1",
      noofqty: "1",
      stock: 5,
      price: 150,
      offerprice: 136,
      offertype: "Festival",
      productstatus: "Trending",
      picture: "parle-g.webp",
    },

    {
      productdetailname: "Good Life Chakki Atta",
      weight: 10,
      weighttype: "kg",
      packagingtype: "1",
      noofqty: "1",
      stock: 5,
      price: 425,
      offerprice: 399,
      offertype: "Festival",
      productstatus: "Trending",
      picture: "chakki.webp",
    },
    {
      productdetailname: "Surf Excel Easy Wash Detergent Powder",
      weight: 500,
      weighttype: "g",
      packagingtype: "1",
      noofqty: "1",
      stock: 5,
      price: 68,
      offerprice: 64,
      offertype: "Festival",
      productstatus: "Trending",
      picture: "surf excel.jpg",
    },
    {
      productdetailname: "Good Life Raw Peanuts",
      weight: 500,
      weighttype: "g",
      packagingtype: "1",
      noofqty: "1",
      stock: 5,
      price: 83,
      offerprice: 120,
      offertype: "Festival",
      productstatus: "Trending",
      picture: "peanuts.webp",
    },
  ];

  const showImages = () => {
    return data.map((item) => {
      var op = parseInt(((item.price - item.offerprice) / item.price) * 100);
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ alignSelf: "center" }}>
            <img
              src={`${serverURL}/images/${item.picture}`}
              style={{ width: "60%", borderRadius: 10 }}
            />
          </div>

          <div
            style={{
              fontWeight: 500,
              fontSize: 14,
              letterSpacing: -0.07,
              lineHeight: 1.428571428,
              width: "70%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {item.productdetailname}
          </div>

          {item.productdetailname.length <= 24 ? (
            <div
              style={{
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,
              }}
            >
              &nbsp;
            </div>
          ) : (
            <></>
          )}
          <div
            style={{
              fontWeight: 500,
              fontSize: 14,
              letterSpacing: -0.07,
              lineHeight: 1.428571428,
            }}
          >
            {item.weight} {item.weighttype}
          </div>
          {item.offerprice > 0 ? (
            <div
              style={{ marginTop: 7, display: "flex", flexDirection: "column" }}
            >
              <div
                style={{
                  fontWeight: 500,
                  fontSize: 14,
                  letterSpacing: -0.07,
                  lineHeight: 1.428571428,
                }}
              >
                <span>&#8377;</span>
                {item.offerprice}
              </div>
              <div
                style={{
                  fontWeight: 500,
                  fontSize: 14,
                  letterSpacing: -0.07,
                  lineHeight: 1.428571428,
                  color: "grey",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 12,
                  }}
                >
                  {" "}
                  <s>
                    <span>&#8377;{item.price}</span>
                  </s>
                  <span
                    style={{
                      margin: 5,
                      width: 60,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 2,
                      background: "#e5f7ee",
                      color: "#03753c",
                    }}
                  >
                    {op}% OFF
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {" "}
              <div
                style={{
                  marginTop: 7,
                  fontWeight: 500,
                  fontSize: 14,
                  letterSpacing: -0.07,
                  lineHeight: 1.428571428,
                }}
              >
                <span>&#8377;</span>
                {item.price}
              </div>
              <div style={{ lineHeight: 1.428571428 }}>&nbsp;</div>
            </div>
          )}

          <div>
            <PlusMinusButton />
          </div>
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
      {matches ? (
        <div
          onClick={handlePrev}
          style={{
            top: "35%",
            left: "-2%",
            zIndex: 2,
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
      ) : (
        <div></div>
      )}

      <Slider ref={scrollRef} {...settings}>
        {showImages()}
      </Slider>

      <div
        style={{
          fontWeight: 900,
          textTransform: "capitalize",
          fontSize: 24,
          letterSpacing: -0.72,
          lineHeight: 1,
          color: "#141414",
        }}
      >
        {title}
      </div>
      {matches ? (
        <div
          onClick={handleNext}
          style={{
            top: "35%",
            right: "2.8%",
            zIndex: 2,
            position: "absolute",
            opacity: 0.5,
            background: "#b2bec3",
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
      ) : (
        <div></div>
      )}
    </div>
  );
}
