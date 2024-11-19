import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../header copy/header.css";
import Logo from "../../../src/assets/images/logo/newlogo2.jpeg";
import Select from "../selectDrop/select";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import IconHeart from "../../assets/images/icon-heart.svg";
import IconCart from "../../assets/images/icon-cart.svg";
import IconUser from "../../assets/images/icon-user.svg";
import Button from "@mui/material/Button";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { HiShoppingCart } from "react-icons/hi";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Nav from "./nav/nav";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/userActions.js";
import axiosInstance from "../../api/axiosInstance.js";
import {
  fetchCartItems,
  fetchWishItems,
} from "../../redux/actions/cartItemActions";

const Header = (props) => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [isOpenAccDropDown, setIsOpenAccDropDown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenNav, setIsOpenNav] = useState(false);

  const [categories, setCategories] = useState([]);
  const headerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, cartItems, wishItems } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    cartItems: state.cartItemReducer.cartItems || [],
    wishItems: state.cartItemReducer.wishItems || [],
  }));

  const [userAuth, setUserAuth] = useState(false);

  useEffect(() => {
    setUserAuth(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      setUserAuth(true);
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("api/categories");
        setCategories(response.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        headerRef.current.classList.add("fixed");
      } else {
        headerRef.current.classList.remove("fixed");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  const signOut = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    setUserAuth(false);
    navigate("/");
  };

  const openNav = () => setIsOpenNav(true);
  const closeNav = () => {
    setIsOpenNav(false);
    setIsOpenAccDropDown(false);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      dispatch(fetchCartItems(userId));
      dispatch(fetchWishItems(userId));
    }
  }, [dispatch]);

  return (
    <>
      <div className="headerWrapper" ref={headerRef}>
        <header>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-2 part1 d-flex align-items-center">
                <Link to="/">
                  <img
                    style={{ width: "140px", height: "auto" }}
                    src={Logo}
                    className="logo"
                    alt="HERBALEAF Logo"
                  />
                </Link>
                {windowWidth < 992 && (
                  <div className="ml-auto d-flex align-items-center">
                    <ul className="list list-inline mb-0 headerTabs pl-0 mr-4">
                      <li className="list-inline-item">
                        <span>
                          <Link to={"/cart"}>
                            <img src={IconCart} alt="Cart" />
                          </Link>
                        </span>
                      </li>
                    </ul>
                    <div className="navbarToggle mr-2" onClick={openNav}>
                      <MenuIcon />
                    </div>

                    {isAuthenticated && (
                      <div
                        className="myAccDrop"
                        onClick={() => setIsOpenAccDropDown(!isOpenAccDropDown)}
                      >
                        <PersonOutlineOutlinedIcon />
                      </div>
                    )}
                  </div>
                )}
              </div>
              <br /> <br />
              <div className="col-sm-5">
                <div
                  style={{ width: "100%", overflow: "hidden" }}
                  className="scroll-text-container"
                >
                  <h4
                    className="scrolling-text mt-5"
                    style={{
                      fontSize: "1.8em",
                      color: "#144102",
                      fontFamily: "Gill Sans MT",
                    }}
                  >
                    HERBALEAF HERBALS INDIA PVT LTD
                  </h4>
                </div>
              </div>
              <div className="col-sm-5 d-flex part3 res-hide">
                <div className="ml-auto d-flex align-items-center">
                  <ClickAwayListener
                    onClickAway={() => setIsOpenDropDown(false)}
                  >
                    <ul className="list list-inline mb-0 headerTabs">
                      <li className="list-inline-item me-5">
                        <span>
                          <Link to={"/wishlist"}>
                            <img src={IconHeart} alt="Wishlist" />
                            <span className="badge bg-success rounded-circle">
                              {wishItems.length || 0}
                            </span>
                            Wishlist
                          </Link>
                        </span>
                      </li>
                      <li className="list-inline-item me-5">
                        <span>
                          <Link to={"/cart"}>
                            <img src={IconCart} alt="Cart" />
                            <span className="badge bg-success rounded-circle">
                              {cartItems.length || 0}
                            </span>
                            Cart
                          </Link>
                        </span>
                      </li>
                      {isAuthenticated || userAuth ? (
                        <li className="list-inline-item">
                          <span
                            onClick={() => setIsOpenDropDown(!isOpenDropDown)}
                          >
                            <img src={IconUser} alt="User" />
                            Account
                          </span>
                          {isOpenDropDown && (
                            <ul className="dropdownMenu">
                              <li>
                                <Button className="align-items-center">
                                  <Link to="/dash">
                                    <Person2OutlinedIcon /> My Account
                                  </Link>
                                </Button>
                              </li>
                              <li>
                                <Button className="align-items-center">
                                  <Link to="/orders">
                                    <LocationOnOutlinedIcon /> Order Tracking
                                  </Link>
                                </Button>
                              </li>
                              <li>
                                <Button className="align-items-center">
                                  <Link to="/wishlist">
                                    <FavoriteBorderOutlinedIcon /> My Wishlist
                                  </Link>
                                </Button>
                              </li>
                              <li>
                                <Button className="align-items-center">
                                  <Link to="/cart">
                                    <HiShoppingCart /> My Cart
                                  </Link>
                                </Button>
                              </li>
                              <li>
                                <Button onClick={signOut}>
                                  <LogoutOutlinedIcon /> Sign out
                                </Button>
                              </li>
                            </ul>
                          )}
                        </li>
                      ) : (
                        <li className="list-inline-item">
                          <Link to={"/signIn"}>
                            <Button className="btn btn-g">Sign In</Button>
                          </Link>
                        </li>
                      )}
                    </ul>
                  </ClickAwayListener>
                </div>
              </div>
            </div>
          </div>
        </header>
        <Nav data={props.data} openNav={isOpenNav} closeNav={closeNav} />
      </div>
      <div className="afterHeader"></div>
      {isOpenAccDropDown && (
        <>
          <div className="navbarOverlay" onClick={closeNav}></div>
          <ul className="dropdownMenu dropdownMenuAcc" onClick={closeNav}>
            <li>
              <Button className="align-items-center">
                <Link to="/dash">
                  <Person2OutlinedIcon /> My Account
                </Link>
              </Button>
            </li>
            <li>
              <Button className="align-items-center">
                <Link to="">
                  <img src={IconCart} alt="Cart" />
                  Cart
                </Link>
              </Button>
            </li>
            <li>
              <Button>
                <Link to="/">
                  <LocationOnOutlinedIcon /> My Orders
                </Link>
              </Button>
            </li>
            <li>
              <Button onClick={signOut}>
                <LogoutOutlinedIcon /> Sign out
              </Button>
            </li>
          </ul>
        </>
      )}
    </>
  );
};

export default Header;