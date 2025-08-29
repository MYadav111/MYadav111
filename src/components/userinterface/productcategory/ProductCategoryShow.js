import { useState } from "react";
import Header from "../homepage/Header";
import ProductCategory from "./ProductCategory";
import StaticProduct from "./StaticProduct";
import Footer from "../homepage/Footer";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useLocation } from "react-router-dom";

export default function ProductCategoryShow() {
  const [category, setCategory] = useState([]);
  const [refresh, setRefresh] = useState(false);

  var location = useLocation();
  var productData = location?.state > productData;

  console.log("XXXXXXXXXXXXXX:", location);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <div>
        <Header />
      </div>
      <div style={{ color: "#0c5273", display: "flex", alignItems: "center" }}>
        Home
        <KeyboardArrowRightIcon />
        All Category <KeyboardArrowRightIcon />
      </div>
      <div
        style={{
          marginTop: 50,
          display: "flex",
          flexDirection: "column",
          width: "80%",
        }}
      >
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "#fff",
          }}
        >
          <ProductCategory
            data={category}
            subcategoryid={productData[0]?.subcategoryid}
          />
          <StaticProduct
            refresh={refresh}
            setRefresh={setRefresh}
            productData={productData}
          />
        </span>
      </div>
      <div><Footer/></div>
    </div>
  );
}
