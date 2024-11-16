import * as React from "react";
import { useState, useEffect } from "react";
import { postData, getData } from "../../../services/FetchNodeAdminServices";
import { Button, Menu, MenuBar, MenuItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

export default function ProductCategory() {

  const [expanded, setExpanded] = React.useState("panel1");
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&::before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} 
    {...props}/>))
    (({ theme }) => ({
    backgroundColor: "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "rgba(255, 255, 255, .05)",
    }),
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget.value);
    fetchAllSubCategory(event.currentTarget.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchAllSubCategory = async (categoryid) => {
    var result = await postData(
      "userinterface/user_get_all_subcategory_by_categoryid",
      {categoryid}
    );
    setSubCategory(result.data);
  };

  const fetchAllCategory = async () => {
    var result = await postData("userinterface/user_display_all_category", {
      status: "limit",
    });
    setCategory(result.data);
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  const showCategoryMenu = () => {
    return category.map((item) => {
      return (
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>
            <Button value={item.subcategoryid} onMouseMove={handleClick} onMouseDown={handleClose} style={{ color: "#000", fontWeight: "bold", marginLeft: 10 }}>
              {item.categoryname}
            </Button>
          </Typography>
        </AccordionSummary>
      );
    });
  };
  const showSubCategoryMenu = () => {
    return subCategory.map((item) => {
      return (
        <MenuItem onMouseLeave={handleClose}>{item.subcategoryname}</MenuItem>
      );
    });
  };
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{showCategoryMenu()}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{showSubCategoryMenu()}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
