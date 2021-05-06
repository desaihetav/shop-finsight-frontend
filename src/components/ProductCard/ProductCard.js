import styles from "./ProductCard.module.css";
import { useData } from "../../context/DataContext";
import { Link, useHistory } from "react-router-dom";

export default function ProductCard({ product }) {
  const {
    name,
    description,
    authors,
    cover_url,
    price,
    discount,
    rating,
    rating_count,
    _id: id,
  } = product;
  const { cart, wishlist, dispatch } = useData();
  const history = useHistory();

  const isInCart = cart.find((cartItem) => cartItem._id === product._id);

  const isInWishlist = () =>
    wishlist.filter((wishItem) => wishItem._id === product._id).length;

  const toggleWishlist = () => {
    isInWishlist()
      ? dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product })
      : dispatch({ type: "ADD_TO_WISHLIST", payload: product });
  };

  const cartBtnHandler = () => {
    isInCart
      ? history.push({ pathname: "/cart" })
      : dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    product && (
      <Link to={`/product/${id}`} className="card">
        <img alt="" src={cover_url} className={`${styles.cardImage}`} />
        <div className="card-content">
          <p className="card-subtitle">{authors[0].name}</p>
          <h3 className="card-title">{name}</h3>
          <div className="row">
            <span className="material-icons-round card-rating-yellow card-rating">
              star
            </span>
            <span className="material-icons-round card-rating-yellow card-rating">
              star
            </span>
            <span className="material-icons-round card-rating-yellow card-rating">
              star
            </span>
            <span className="material-icons-round card-rating-yellow card-rating">
              star
            </span>
            <span className="material-icons-round card-rating-gray card-rating">
              star
            </span>
            <div className="space-x-1"></div>
            <span className="card-reviews">{rating_count} reviews</span>
          </div>
          <div className="row">
            <span className="card-price">
              Rs. {price * (1 - discount / 100)}/-
            </span>
            <div className="space-x-1"></div>
            <span className="card-price-original">Rs. {price}/-</span>
          </div>
          <p className="card-description">{description}</p>
          <div className="flex items-center justify-end w-full mt-4">
            <button
              onClick={toggleWishlist}
              className="btn btn-outlined btn-small btn-icon"
            >
              <span className={`material-icons-outlined`}>
                {isInWishlist() ? "bookmark" : "bookmark_border"}
              </span>
            </button>
            <button
              onClick={() => cartBtnHandler()}
              className={`btn btn-solid btn-small ml-auto ${styles.button}`}
            >
              {!isInCart && (
                <span
                  className={`material-icons-outlined btn-icon-left ${styles.bagIcon}`}
                >
                  {" "}
                  shopping_bag{" "}
                </span>
              )}
              {isInCart ? "Go to Bag" : "Add to Bag"}
              {isInCart ? (
                <div
                  className={`material-icons-outlined btn-icon-right ${styles.arrowIcon}`}
                ></div>
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
      </Link>
    )
  );
}
