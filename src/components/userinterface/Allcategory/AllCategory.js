import Header from "../homepage/Header";
// import Grid from "@mui/material/Unstable_Grid2"
import { useEffect, useState } from "react";
import { serverURL, getData } from "../../../services/FetchNodeAdminServices";
import Footer from "../homepage/Footer";
import React from "react";
import { Box } from "@mui/material";

export default function AllCatgory() {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(function () {
    fetchAllCategory();
    fetchAllSubCategory();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.target.value);
    fetchAllSubCategory(event.target.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchAllCategory = async () => {
    var result = await getData("category/display_all_category");
    setCategory(result.data);
  };
  const fetchAllSubCategory = async (categoryid) => {
    var result = await getData("userinterface/user_display_subcategory", {
      categoryid,
    });
    setSubCategory(result.data);
  };

  const showImages = () => {
    return category.map((item) => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ alignSelf: "center" }}>
            <img
              style={{ width: 60, hieght: 60, borderRadius: 10 }}
              src={`${serverURL}/images/${item.categoryicon}`}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            {item.categoryname}
          </div>
        </div>
      );
    });
  };

  const handleButton = () => {
    return subCategory.map((item) => {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div>
            <img
              style={{ width: 60, hieght: 60, borderRadius: 10 }}
              src={`${serverURL}/images/${item.subcategoryicon}`}
            />
            {item.subcategoryname}
          </div>
        </div>
      );
    });
  };

  return (
    <div>
      <Header />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "75%",
          paddingLeft: "250px",
        }}
      >
        <div
          sx={4}
          style={{
            display: "column",
            justifyContent: "center",
            fontWeight: "bolder",
            border: "1px solid grey",
            borderRadius: "20px",
            width: 200,
            margin: 20,
          }}
        >
          {showImages()}
        </div>

        <Box
          sx={8}
          style={{
            display: "flex",
            justfyContent: "left",
            fontWeight: "bolder",
            border: "1px solid grey",
            borderRadius: "20px",
            width: "90%",
            margin: 20,
            paddingRight: "250px",
            flexWrap: "wrap",
          }}
        >
          {/* {handleButton()} */}
        </Box>
      </div>

      <Footer />
    </div>
  );
}
