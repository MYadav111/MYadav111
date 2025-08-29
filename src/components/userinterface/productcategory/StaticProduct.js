import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Grid from "@mui/material/Unstable_Grid2";
import { serverURL } from "../../../services/FetchNodeAdminServices";
import { getData } from "../../../services/FetchNodeAdminServices";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
import PlusMinusButton from "../homepage/PlusMinusButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector ,useDispatch} from "react-redux";


export default function StaticProduct({ title,refresh,setRefresh }) {
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.up("md"));
  var cartData = useSelector((state)=>state?.cart)
  var keys = Object.keys(cartData)
  console.log("XXXXX",cartData)
  const dispatch = useDispatch();
  const [estatic, setEstatic] = useState([]);
  useEffect(function () {
    fetchAllEstatic();
  }, []);

  const fetchAllEstatic = async () => {
    var result = await getData("userinterface/show_all_productoffer");
    setEstatic(result.data);
  };

  const handleChange=(value,item)=>{
    // alert(value)
    if(value==0)
    {
      dispatch({type:"DELETE_CART", payload:[item.productdetailid]})
      setRefresh(!refresh)
    }
    else{
      item['qty'] =value
    dispatch({type:"ADD_CART", payload:[item.productdetailid, item]})
    setRefresh(!refresh)
    }
    
  }
 
  // var data = [
  //   {
  //     productdetailname: "Maggi 2-Minute Masala Noodles",
  //     weight: 70,
  //     weighttype: "g",
  //     packagingtype: "1",
  //     noofqty: "1",
  //     stock: 5,
  //     price: 15,
  //     offerprice: 13,
  //     offertype: "Festival",
  //     productstatus: "Trending",
  //     picture: "maggi.webp",
  //   },
  //   {
  //     productdetailname: "Amul Butter",
  //     weight: 100,
  //     weighttype: "g",
  //     packagingtype: "1",
  //     noofqty: "1",
  //     stock: 5,
  //     price: 60,
  //     offerprice: 58,
  //     offertype: "Festival",
  //     productstatus: "Trending",
  //     picture: "Amul butter.webp",
  //   },
  //   {
  //     productdetailname: "Fortune Sunlite Refined Sunflower Oil ",
  //     weight: 1,
  //     weighttype: "L",
  //     packagingtype: "1",
  //     noofqty: "1",
  //     stock: 5,
  //     price: 120,
  //     offerprice: 113,
  //     offertype: "Festival",
  //     productstatus: "Trending",
  //     picture: "fortune oil.webp",
  //   },

  //   {
  //     productdetailname: "Closeup Everfresh+ Red Hot Gel Toothpaste",
  //     weight: 150,
  //     weighttype: "g",
  //     packagingtype: "1",
  //     noofqty: "1",
  //     stock: 5,
  //     price: 240,
  //     offerprice: 169,
  //     offertype: "Festival",
  //     productstatus: "Trending",
  //     picture: "closeup.webp",
  //   },

  //   {
  //     productdetailname: "Comfort After Wash Morning Fresh Fabric Conditioner",
  //     weight: 860,
  //     weighttype: "ml",
  //     packagingtype: "1",
  //     noofqty: "1",
  //     stock: 5,
  //     price: 235,
  //     offerprice: 205,
  //     offertype: "Festival",
  //     productstatus: "Trending",
  //     picture: "comfort.webp",
  //   },

  //   {
  //     productdetailname:
  //       "Saffola Active Pro Weight Watchers Rice Bran Based Blended Oil",
  //     weight: 1,
  //     weighttype: "L",
  //     packagingtype: "1",
  //     noofqty: "1",
  //     stock: 5,
  //     price: 160,
  //     offerprice: 125,
  //     offertype: "Festival",
  //     productstatus: "Trending",
  //     picture: "saffola.webp",
  //   },

  //   {
  //     productdetailname: "Parle-G Gold Biscuits",
  //     weight: 1,
  //     weighttype: "kg",
  //     packagingtype: "1",
  //     noofqty: "1",
  //     stock: 5,
  //     price: 150,
  //     offerprice: 136,
  //     offertype: "Festival",
  //     productstatus: "Trending",
  //     picture: "parle-g.webp",
  //   },

  //   {
  //     productdetailname: "Good Life Chakki Atta",
  //     weight: 10,
  //     weighttype: "kg",
  //     packagingtype: "1",
  //     noofqty: "1",
  //     stock: 5,
  //     price: 425,
  //     offerprice: 399,
  //     offertype: "Festival",
  //     productstatus: "Trending",
  //     picture: "chakki.webp",
  //   },
  //   {
  //     productdetailname: "Surf Excel Easy Wash Detergent Powder",
  //     weight: 500,
  //     weighttype: "g",
  //     packagingtype: "1",
  //     noofqty: "1",
  //     stock: 5,
  //     price: 68,
  //     offerprice: 64,
  //     offertype: "Festival",
  //     productstatus: "Trending",
  //     picture: "surf excel.jpg",
  //   },
  //   {
  //     productdetailname: "Good Life Raw Peanuts",
  //     weight: 500,
  //     weighttype: "g",
  //     packagingtype: "1",
  //     noofqty: "1",
  //     stock: 5,
  //     price: 83,
  //     offerprice: 120,
  //     offertype: "Festival",
  //     productstatus: "Trending",
  //     picture: "peanuts.webp",
  //   },
  // ];

  const showImages = () => {
    return estatic.map((item) => {
      var op = parseInt(((item.price - item.offerprice) / item.price) * 100);

      return (
        <div>
          <Grid
            container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 250,
              height: 450,
              flexDirection: "column",
              border: "1px solid grey",
              borderRadius: 10,
              margin: 10, // Add some space between the items
            }}
          >
            <FavoriteBorderIcon />
            <img
              alt={title}
              src={`${serverURL}/images/${item.picture}`}
              style={{ width: 200, height: 180 }}
            />
            <Grid
              style={{
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,
                width: "20%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
            >
              {item.productdetailname}
            </Grid>

            {item.productdetailname.length <= 0 ? (
              <Grid
                style={{
                  fontWeight: 500,
                  fontSize: 14,
                  letterSpacing: -0.07,
                  lineHeight: 1.428571428,
                }}
              >
                &nbsp;
              </Grid>
            ) : (
              <></>
            )}
            <Grid
              style={{
                display: "flex",
                fontWeight: 500,
                fontSize: 14,
                letterSpacing: -0.07,
                lineHeight: 1.428571428,
              }}
            >
              {item.weight} {item.weighttype}
            </Grid>

            {item.offerprice > 0 ? (
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Grid
                  style={{
                    fontWeight: 500,
                    fontSize: 14,
                    letterSpacing: -0.07,
                    lineHeight: 1.428571428,
                  }}
                >
                  <span>&#8377;</span>
                  {item.offerprice}
                </Grid>
                <Grid
                  style={{
                    fontWeight: 500,
                    fontSize: 14,
                    letterSpacing: -0.07,
                    lineHeight: 1.428571428,
                    color: "grey",
                  }}
                >
                  <Grid
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: 12,
                    }}
                  >
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
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Grid>
                <Grid
                  style={{
                    marginTop: 5,
                    fontWeight: 500,
                    fontSize: 14,
                    letterSpacing: -0.07,
                    lineHeight: 1.428571428,
                  }}
                >
                  <span>&#8377;</span>
                  {item.price}
                </Grid>
                <Grid style={{ lineHeight: 1.428571428 }}>&nbsp;</Grid>
              </Grid>
            )}
            <Grid>
              <PlusMinusButton qty={keys.includes(item?.productdetailid+"")?cartData[item?.productdetailid]?.qty:0} onChange={(value)=>handleChange(value,item)}/>
            </Grid>
          </Grid>
        </div>
      );
    });
  };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "right", marginRight: 60}}
      >
        {" "}
        <div
          style={{
            border: "1px solid grey",
            borderRadius: "20px",
            width: 160,
            fontWeight: "bolder",
            display: "flex",
            justifyContent: "center",padding:0
          }}
        >
          Sort by: Popularity
        </div>
      </div>
      <div style={{ position: "relative", display: "flex", flexWrap: "wrap" }}>
        {showImages()}
      </div>
    </div>
  );
}
