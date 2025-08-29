import Footer from "../homepage/Footer";
import Header from "../homepage/Header";
import * as React from "react";
import { useState, useEffect } from "react";
import { Divider, Grid } from "@mui/material";
import ProductImageComponent from "../PageCategory/ProductImageComponent";
import ProductDetailsCategory from "../PageCategory/PageDetailsCategory";
import ProductScroll from "../homepage/ProductScroll";
import { useLocation } from "react-router-dom";
export default function PageCategoryDisplay() {
  var location = useLocation();
  var p = location?.state?.product;

  const [popularProducts, setpopularProducts] = useState([]);
  const [product, setProduct] = useState(p);
  const [refresh, setRefresh] = useState(true);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div>
        <Header />
      </div>

      <Grid container>
        <Grid item xs={6}>
          <ProductImageComponent
            refresh={refresh}
            setRefresh={setRefresh}
            product={product}
            setProduct={setProduct}
          />
        </Grid>
        <Grid item xs={6}>
          <ProductDetailsCategory product={product} setProduct={setProduct} />
        </Grid>
      </Grid>

      <div
        style={{
          backgroundColor: "#f5f6fa",
          borderRadius: 40,
          border: "1px #f5f6fa",
          marginBottom: 8,
          marginLeft: 100,
          width: "83%",
          height: 6,
          marginTop: 30,
        }}
      ></div>

      <div style={{ width: "82%", alignSelf: "center", marginTop: 35,fontWeight:"bolder", fontSize:20 }}>POPULAR PRODUCT</div>

      <div style={{ width: "82%", alignSelf: "center", marginTop: 40 }}>
        <ProductScroll  data={popularProducts} />
      </div>

      <div
        style={{
          backgroundColor: "#f5f6fa",
          borderRadius: 40,
          border: "1px #f5f6fa",
          marginBottom: 8,
          marginLeft: 100,
          width: "83%",
          height: 7,
          marginTop: 30,
        }}
      ></div>
      <div style={{ width: "82%", alignSelf: "center", marginTop: 35,fontWeight:"bolder", fontSize:20 }}>SIMILAR CATEGORY</div>

      <div style={{ width: "82%", alignSelf: "center", marginTop: 40 }}>
        <ProductScroll  data={popularProducts} />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
