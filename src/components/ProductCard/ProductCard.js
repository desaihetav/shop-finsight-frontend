import styles from "./ProductCard.module.css";
import { useData } from "../../context/DataContext";
import { useHistory } from "react-router-dom";
import rightArrow from "../../assets/images/right_arrow.svg";

export default function ProductCard({ product }) {
  const {
    title,
    description,
    authors,
    coverURL,
    price,
    no_of_rating,
  } = product;
  const { cart, wishlist, dispatch } = useData();
  const history = useHistory();

  const isInCart = () =>
    cart.find((cartItem) => cartItem.id.isbn10 === product.id.isbn10);

  const isInWishlist = () =>
    wishlist.filter((wishItem) => wishItem.id.isbn10 === product.id.isbn10)
      .length;

  const toggleWishlist = () => {
    isInWishlist()
      ? dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product })
      : dispatch({ type: "ADD_TO_WISHLIST", payload: product });
  };

  const cartBtnHandler = () => {
    isInCart()
      ? history.push({ pathname: "/cart" })
      : dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div class="card">
      <img alt="" src={coverURL} class={`${styles.cardImage}`} />
      <div class="card-content">
        <button
          onClick={toggleWishlist}
          className="card-badge card-badge-secondary btn btn-icon absolute top-0 right-0"
        >
          <span class={`material-icons-outlined`}>
            {isInWishlist() ? "bookmark" : "bookmark_border"}
          </span>
        </button>
        <p class="card-subtitle">{authors[0].name}</p>
        <h3 class="card-title">{title}</h3>
        <div class="row">
          <span class="material-icons-round card-rating-yellow card-rating">
            star
          </span>
          <span class="material-icons-round card-rating-yellow card-rating">
            star
          </span>
          <span class="material-icons-round card-rating-yellow card-rating">
            star
          </span>
          <span class="material-icons-round card-rating-yellow card-rating">
            star
          </span>
          <span class="material-icons-round card-rating-gray card-rating">
            star
          </span>
          <div class="space-x-1"></div>
          <span class="card-reviews">{no_of_rating} reviews</span>
        </div>
        <div class="row">
          <span class="card-price">Rs. {price.final}/-</span>
          <div class="space-x-1"></div>
          <span class="card-price-original">Rs. {price.original}/-</span>
        </div>
        <p class="card-description">{description}</p>
        <div class="row w-full mt-4">
          <button
            onClick={() => cartBtnHandler()}
            className={`btn btn-outlined btn-small ml-auto ${styles.button}`}
          >
            {!isInCart() && (
              <span
                class={`material-icons-outlined btn-icon-left ${styles.bagIcon}`}
              >
                {" "}
                shopping_bag{" "}
              </span>
            )}
            {isInCart() ? "Go to Bag" : "Add to Bag"}
            {isInCart() ? (
              <div
                className={`material-icons-outlined btn-icon-right ${styles.arrowIcon}`}
              ></div>
            ) : (
              ""
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
