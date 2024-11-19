import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import { Button, Tooltip, Rating } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/actions/cartActions";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlistActions";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import Confetti from "js-confetti";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ productData }) => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const confettiRef = useRef(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!confettiRef.current) {
      confettiRef.current = new Confetti();
    }
  }, []);

  const authCheck = () => {
    if (!userId) {
      alert("Please login");
      navigate("/signIn");
      return false;
    }
    return true;
  };

  if (!productData || !productData.subProductId) {
    return null;
  }

  const isInWishlist = wishlist.some(
    (item) => item._id === productData.subProductId
  );

  const handleAddToCart = async () => {
    if (!authCheck()) return;
    try {
      const successMessage = await dispatch(
        addToCart(
          userId,
          productData.productId,
          productData.modelId,
          productData.subProductId,
          productData.grams,
          1,
          productData.offerPrice
        )
      );
      setIsAdded(true);
      // confettiRef.current.addConfetti();
      alert(successMessage, { onClose: () => setIsAdded(false) });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    if (!authCheck()) return;
    try {
      const successMessage = await dispatch(
        addToWishlist(
          userId,
          productData.productId,
          productData.modelId,
          productData.subProductId,
          1
        )
      );
      alert(successMessage, { onClose: () => setIsAdded(false) });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRemoveFromWishlist = async (e) => {
    e.preventDefault();
    if (!authCheck()) return;
    try {
      const successMessage = await dispatch(
        removeFromWishlist(userId, productData.subProductId)
      );
      alert(successMessage);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="productThumb">
      <Link
        to={`/product/${productData.productId}/${productData.modelId}/${productData.subProductId}`}
      >
        <div className="imgWrapper">
          <img
            src={`${productData.image}?im=Resize=(320,420)`}
            className="w-100"
            alt={productData.subproductname || ""}
          />
          <div className="overlay transition">
            <ul className="list list-inline mb-0">
              <li className="list-inline-item">
                <Tooltip
                  title={
                    isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"
                  }
                >
                  <a
                    className="cursor"
                    onClick={
                      isInWishlist
                        ? handleRemoveFromWishlist
                        : handleAddToWishlist
                    }
                  >
                    {isInWishlist ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderOutlinedIcon />
                    )}
                  </a>
                </Tooltip>
              </li>
              <li className="list-inline-item">
                <Tooltip title="Quick View">
                  <Link
                    to={`/product/${productData.productId}/${productData.modelId}/${productData.subProductId}`}
                    className="cursor"
                  >
                    <RemoveRedEyeOutlinedIcon />
                  </Link>
                </Tooltip>
              </li>
            </ul>
          </div>
        </div>
      </Link>

      <div className="info">
        <span className="d-block catName">{productData.mainProduct}</span>
        <h4 className="title">
          <Link
            to={`/product/${productData.productId}/${productData.modelId}/${productData.subProductId}`}
          >
            {productData.subproductname
              ? productData.subproductname.substr(0, 50) + "..."
              : ""}
          </Link>
        </h4>
        <div className="d-flex align-items-center justify-content-between">
          <Rating
            name="half-rating-read"
            value={parseFloat(productData.ratings)}
            precision={0.5}
            readOnly
          />
          <div className="icons">
            <Tooltip
              title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <a
                className="cursor"
                onClick={
                  isInWishlist ? handleRemoveFromWishlist : handleAddToWishlist
                }
              >
                {isInWishlist ? (
                  <FavoriteIcon />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </a>
            </Tooltip>
            <Tooltip title="Quick View">
              <Link
                to={`/product/${productData.productId}/${productData.modelId}/${productData.subProductId}`}
                className="cursor"
              >
                <RemoveRedEyeOutlinedIcon />
              </Link>
            </Tooltip>
          </div>
        </div>

        <h2>{productData.shortdescription}</h2>
        <span className="brand d-block text-g">
          By <Link className="text-g">{productData.brand}</Link>
        </span>

        <div className="d-flex align-items-center mt-3">
          <div className="d-flex align-items-center w-100">
            <span className="price text-g font-weight-bold">
              Rs {productData.offerPrice}
            </span>
            <span className="oldPrice ml-auto">
              Rs {productData.currentPrice}
            </span>
          </div>
        </div>

        <Button className="w-100 transition mt-3" onClick={handleAddToCart}>
          <ShoppingCartOutlinedIcon />
          {isAdded ? "Added" : "Add"}
        </Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductCard;
