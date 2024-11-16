import { useState } from "react";
import Header from "../homepage/Header";
import Grid from "@mui/material/Unstable_Grid2";
import ProductCategory from "./ProductCategory";
import StaticProduct from "./StaticProduct";

export default function ProductCategoryShow() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "left",
          margin: 10,
          paddingLeft: 100,
          paddingRight:50,
        }}
      >
        <ProductCategory />
        
        <StaticProduct />
      </div>
    </div>
  );
}
