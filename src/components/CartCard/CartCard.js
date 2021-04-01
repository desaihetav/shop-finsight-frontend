import styles from "./CartCard.module.css";
import { useData } from "../../context/DataContext";

export default function CartCard({ item }) {
  const { title, description, authors, coverURL, price, quantity } = item;
  const { dispatch } = useData();
  return (
    <div class="card">
      <img alt="" src={coverURL} class={`${styles.cardImage}`} />

      <div class="card-content">
        <p class="card-subtitle">{authors[0].name}</p>
        <h3 class="card-title">{title}</h3>
        <div class="row"></div>
        {/* <p class="card-description">{description}</p> */}

        <div class="row wrap w-full mt-4 items-center">
          <span class="card-title">Rs. {price.final * quantity}/-</span>
          <div class="row ml-auto">
            <button
              onClick={() => dispatch({ type: "REMOVE_QTY", payload: item })}
              className="btn btn-ghost btn-icon ml-auto"
            >
              <span class="material-icons-outlined btn-icon-left">
                {item.quantity === 1 ? "delete" : "remove"}
              </span>
            </button>
            <div className="space-x-1"></div>
            <span>{quantity}</span>
            <div className="space-x-1"></div>
            <button
              onClick={() => dispatch({ type: "ADD_QTY", payload: item })}
              className="btn btn-ghost btn-icon"
            >
              <span class="material-icons-outlined btn-icon-left">add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
