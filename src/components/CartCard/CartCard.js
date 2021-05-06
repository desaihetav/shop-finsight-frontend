import styles from "./CartCard.module.css";
import { useData } from "../../context/DataContext";

export default function CartCard({ item }) {
  const { title, description, authors, coverURL, price, quantity } = item;
  const { dispatch } = useData();
  return (
    <div className={`card ${styles.card}`}>
      <img alt="" src={coverURL} className={`${styles.cardImage}`} />

      <div className="card-content">
        <p className="card-subtitle">{authors[0].name}</p>
        <h3 className="card-title">{title}</h3>
        <div className="row"></div>
        <p className="card-description">{description}</p>

        <div className="row wrap w-full items-center">
          <span className="card-title">Rs. {price.final * quantity}/-</span>
          <div className="row ml-auto">
            <button
              onClick={() => dispatch({ type: "REMOVE_QTY", payload: item })}
              className="btn btn-ghost btn-icon btn-small ml-auto"
            >
              <span className="material-icons-outlined btn-icon-left">
                {item.quantity === 1 ? "delete" : "remove"}
              </span>
            </button>
            <div className="space-x-1"></div>
            <span>{quantity}</span>
            <div className="space-x-1"></div>
            <button
              onClick={() => dispatch({ type: "ADD_QTY", payload: item })}
              className="btn btn-ghost btn-icon btn-small"
            >
              <span className="material-icons-outlined btn-icon-left">add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
