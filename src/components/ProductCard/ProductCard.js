import styles from "./ProductCard.module.css";
import { useData } from "../../context/DataContext";
import { Link, useHistory } from "react-router-dom";

export default function ProductCard({ product }) {
  const {
    title,
    description,
    authors,
    coverURL,
    price,
    no_of_rating,
    id: { isbn10 },
  } = product;
  const { cart, wishlist, dispatch } = useData();
  const history = useHistory();

  const isInCart = cart.find(
    (cartItem) => cartItem.id.isbn10 === product.id.isbn10
  );

  const isInWishlist = () =>
    wishlist.filter((wishItem) => wishItem.id.isbn10 === product.id.isbn10)
      .length;

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
      <Link to={`/product/${isbn10}`} className="card">
        <img alt="" src={coverURL} className={`${styles.cardImage}`} />
        <div className="card-content">
          <p className="card-subtitle">{authors[0].name}</p>
          <h3 className="card-title">{title}</h3>
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
            <span className="card-reviews">{no_of_rating} reviews</span>
          </div>
          <div className="row">
            <span className="card-price">Rs. {price.final}/-</span>
            <div className="space-x-1"></div>
            <span className="card-price-original">Rs. {price.original}/-</span>
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
