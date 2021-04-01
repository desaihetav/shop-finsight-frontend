import styles from "./CartCard.module.css";
import { useData } from "../../context/DataContext";

export default function CartCard({ item }) {
  const { title, description, authors, coverURL, price, no_of_rating } = item;

  return (
    <div class="card">
      <img alt="" src={coverURL} class={`${styles.cardImage}`} />
      <div class="card-content">
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
          <span class="card-price">Rs. {price.original * 0.5}/-</span>
          <div class="space-x-1"></div>
          <span class="card-price-original">Rs. {price.original}/-</span>
        </div>
        <p class="card-description">{description}</p>
        <div class="row w-full">
          {/* <button className="btn btn-solid mt-8">Add to Cart</button> */}
          <button className="btn btn-outlined mt-4 ml-auto">
            <span class="material-icons-outlined btn-icon-left">
              {" "}
              shopping_bag{" "}
            </span>
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
