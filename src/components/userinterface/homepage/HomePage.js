import Header from "./Header";
import OfferScroll from "./OfferScroll";
import BankScroll from "./BankScroll";
import ProductScroll from "./ProductScroll";
import BannerScroll from "./BannerScroll"
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Footer from "./Footer";
import { getData, postData } from "../../../services/FetchNodeAdminServices";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function HomePage() {
  const [mainbanner, setMainbanner] = useState([]);
  const [bankOffer, setBankOffer] = useState([]);
  const [adOffer, setAdOffer] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const fetchAllProductDetails = async (productstatus) => {
    var result = await postData(
      "userinterface/display_all_productdetail_by_status",
      { productstatus }
    );
    setPopularProducts(result.data);
  };
  const fetchAllOffers = async () => {
    var result = await getData("userinterface/all_adoffers");
    setAdOffer(result.data);
  };
  const fetchAllMainbanners = async () => {
    var result = await getData("userinterface/show_all_banner");
    setMainbanner(result.data);
  };
  const fetchAllBankOffer = async () => {
    var result = await getData("userinterface/show_all_bankoffer");
    setBankOffer(result.data);
  };
  useEffect(function () {
    fetchAllMainbanners();
    fetchAllBankOffer();
    fetchAllOffers();
    fetchAllProductDetails("Popular");
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div>
      <TableHead>
        <TableRow />
          <Header />
        <TableRow />
      </TableHead>
      </div>
      <div style={{ width: "82%", alignSelf: "center", marginTop: 35 }}>
        <OfferScroll state={"AdOffer"} data={adOffer} style={{ margin: 35 }}/>
      </div>

      <div style={{width:'82%',alignSelf:'center',marginTop:35}}>
        <BannerScroll state={'mainbanner'} data={mainbanner} /></div>
      <div style={{ width: "82%", alignSelf: "center", marginTop: 35,fontWeight:"bolder", fontSize:20 }}>POPULAR PRODUCT</div>
      <div style={{ width: "82%", alignSelf: "center", marginTop: 35 }}>
        <ProductScroll  style={{ margin: 35 }} />
      </div>
      <div style={{ width: "82%", alignSelf: "center", marginTop: 35 ,fontWeight:"bolder", fontSize:20}}>TOP DEALS</div>
      <div style={{ width: "82%", alignSelf: "center", marginTop: 35 }}>
        <ProductScroll  style={{ marginTop: 35 }} />
      </div>

      <div style={{ width: "82%", alignSelf: "center", marginTop: 35 }}>
        <BankScroll title={"Bank Offers"} data={bankOffer} style={{ marginTop: 35 }}  />
      </div>
      {matches ? (
        <div style={{ width: "82%", alignSelf: "center", marginTop: 40 }}>
          <Footer />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
