import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./footer.css";
import Icon1 from "../../assets/images/icon-1.svg";
import Icon2 from "../../assets/images/icon-2.svg";
import Icon3 from "../../assets/images/icon-3.svg";
import Icon4 from "../../assets/images/icon-4.svg";
import Icon5 from "../../assets/images/icon-5.svg";
import Logo from "../../../src/assets/images/logo/newlogo2.jpeg";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined";
import paymentImage from "../../assets/images/payment-method.png";
import appStore from "../../assets/images/app-store.jpg";
import googlePlay from "../../assets/images/google-play.jpg";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Newsletter from "../../components/newsletter/index";
import NewsletterImg from "../../assets/banner/Herbals copy.png";
import axiosInstance from "../../api/axiosInstance";

const Footer = () => {
  const [addresses, setAddresses] = useState([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Fetch addresses data from backend
    axiosInstance
      .get("api/gettopnav")
      .then((response) => {
        if (response.data && response.data.length > 0) {
          const topNavData = response.data[0]; // Assuming you are fetching a single topNav record
          setAddresses(topNavData.addresses || []); // Ensure addresses is an array or fallback to empty array
          setEmail(topNavData.email || ""); // Set email from topNavData
          setPhone(topNavData.phone || "");
          setMobile(topNavData.mobileNo || "");
        } else {
          setAddresses([]); // Fallback to empty array if no data returned
        }
      })
      .catch((error) => {
        console.error("Error fetching addresses:", error);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <section className="newsLetterSection">
        <div className="container-fluid">
          <div className="box d-flex align-items-center">
            <div className="info">
        <h2 style={{ marginLeft: "-10px", display: "inline-block" }}>
  Start Shopping With HERBALEAF <br />
</h2>

              {/* <p>
                Discover a wide range of herbal supplements and remedies that
                support your health and wellness goals at Kumar Herbals.
              </p> */}
              <br />
              <br className="res-hide" />
              <Newsletter />
            </div>
            <div className="img">
              <img src={NewsletterImg} className="w-100" alt="Newsletter" />
            </div>
          </div>
        </div>
      </section>
      <div className="footerWrapper">
  <div className="footerBoxes">
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="box d-flex align-items-center w-100">
            <span>
              <img src={Icon1} alt="Best Prices Icon" />
            </span>
            <div className="info">
              <h4>Best Prices & Offers</h4>
              <p>Great deals on natural remedies</p>
              <p>and herbal supplements.</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="box d-flex align-items-center w-100">
            <span>
              <img src={Icon2} alt="Free Delivery Icon" />
            </span>
            <div className="info">
              <h4>Low Shipping Charge </h4>
                    <p>Enjoy your order Low </p>
                    <p>Shipping With HERBALEAF.</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="box d-flex align-items-center w-100">
            <span>
              <img src={Icon3} alt="Great Daily Deal Icon" />
            </span>
            <div className="info">
              <h4>Great Daily Deal</h4>
              <p>Discover daily discounts on our herbal </p>
              <p>with HERBALEAF products.</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="box d-flex align-items-center w-100">
            <span>
              <img src={Icon4} alt="Wide Assortment Icon" />
            </span>
            <div className="info">
              <h4>Wide Assortment</h4>
              <p>Explore wide range with HERBALEAF</p>
              <p>supplements and natural remedies.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <footer style={{ backgroundColor: "#DBFEE2" }}>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 part1">
          <Link to="/">
            <img style={{ width: "20vh", height: "auto" }} src={Logo} alt="Logo" />
          </Link>
          <br />
          <br />
       <p>Shop for high-quality herbal products at our Herbals shop and experience the benefits of natural ingredients</p>
          <br />
        </div>

        <div className="col-md-6 part2">
          <div className="d-flex justify-content-center">
            <div className="col">
              <h3>Quick Links</h3>
              <ul className="footer-list mb-sm-5 mb-md-0" >
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/product">Products</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            <div className="col">
              <h3>Corporate</h3>
              <ul className="footer-list mb-sm-5 mb-md-0">
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                
                <li>
                  <Link to="/terms">Terms &amp; Conditions</Link>
                </li>
                <br/>
                <br/>
         
              </ul>
            </div>

            <div className="col">
              <h3>Product Pages</h3>
              <ul className="footer-list mb-sm-5 mb-md-0">
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
                <li>
                  <Link to="/wishlist">Wishlist</Link>
                </li>
                <li>
                  <Link to="/orders">My Orders</Link>
                </li>
                <br />
              </ul>
            </div>
          </div>
        </div>

        <div className="footerAddressCenter col-md-3 part3">
          <h3 >About</h3>
          <div>
            <p>
              <LocationOnOutlinedIcon /> <b style={{fontSize:"24px"}}>Address: </b> 10, Anbu Nagar, Mullai veethi, nearby aathiparasakthi temple
            </p>
            <p>
              <HeadphonesOutlinedIcon /> <strong style={{fontSize:"24px"}}>Call Us: </strong> 8124798358, 6381476847
            </p>
            <p>
              <EmailOutlinedIcon /> <strong style={{fontSize:"24px"}}>Email: </strong> business@nexusdigitalia.com<br/>vishva@nexusdigitalia.com
            </p>
            <p>
              <WatchLaterOutlinedIcon /> <strong style={{fontSize:"24px"}}>Hours: </strong> 10:00 AM - 6:00 PM, Monday - Saturday
            </p>
          </div>
          <br />
          <p>Secured Payment Gateways</p>
          <img src={paymentImage} alt="Payment Methods" />
        </div>
      </div>

      <hr />

      <div className="row lastStrip ">
        <div className="col-md-3 part_1 text-center">
          <p>© 2024, Nexus Digitalia All rights reserved</p>
        </div>

        <div className="col-md-6 d-flex part_2">
          <div className="m-auto d-flex align-items-center phWrap">
            <div className="phNo d-flex  mx-5">
              {/* <span>
                <HeadphonesOutlinedIcon />
              </span> */}
              <div className="info ml-3">
                <h4 className="text-g mb-0" style={{fontSize:"26px"}}>+91-{phone}</h4>
                <p className="mb-0" style={{fontSize:"24px"}}>24/7 Support Center</p>
              </div>
              <div className="info ml-3">
                <h4 className="text-g mb-0" style={{fontSize:"26px"}}>+91-{mobile}</h4>
                <p className="mb-0" style={{fontSize:"24px"}}>Support Center</p>
              </div>
            </div>
        
          </div>
        </div>

        <div className="col-md-3 part3 part_3">
          <div className="footerFollowContianer text-center">
            <h5 className="text-center">Follow Us</h5>
            <ul className="list list-inline mt-2">
              <li className="list-inline-item">
                <Link to={"https://www.facebook.com/kumarsherbals/"}>
                  <FacebookOutlinedIcon style={{fontSize:"22px", }} />
                </Link>
              </li>
              <li className="list-inline-item">
                <Link
                  to={
                    "https://www.instagram.com/stories/herbashine_2020/3402443749929263985?utm_source=ig_story_item_share&igsh=MTA2MTA3aThkY3l0dw=="
                  }
                >
                  <InstagramIcon style={{fontSize:"22px",}}/>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>


    </>
  );
};

export default Footer;