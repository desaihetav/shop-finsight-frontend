import styles from "./CartCard.module.css";
import { useData, useAuth } from "../../context";
import axios from "axios";

export default function CartCard({ item }) {
  const {
    name,
    description,
    authors,
    cover_url,
    price,
    discount,
    quantity,
    _id: id,
  } = item;
  const { dispatch } = useData();
  const { user } = useAuth();

  const decrementQuantity = async () => {
    try {
      const response = await axios.post(
        `https://shop-finsight.desaihetav.repl.co/cart/${user._id}/${id}`,
        {
          type: "DECREMENT",
          quantity: quantity - 1,
        }
      );
      dispatch({ type: "REMOVE_QTY", payload: item });
    } catch (error) {
      console.log(error);
    }
  };

  const incrementQuantity = async () => {
    try {
      console.log(user._id, id);
      const response = await axios.post(
        `https://shop-finsight.desaihetav.repl.co/cart/${user._id}/${id}`,
        {
          type: "INCREMENT",
          quantity: quantity + 1,
        }
      );
      dispatch({ type: "ADD_QTY", payload: item });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`card ${styles.card}`}>
      <img alt="" src={cover_url} className={`${styles.cardImage}`} />

      <div className="card-content">
        <p className="card-subtitle">{authors[0].name}</p>
        <h3 className="card-title">{name}</h3>
        <div className="row"></div>
        <p className="card-description">{description}</p>

        <div className="row wrap w-full items-center">
          <span className="card-title">
            Rs.{" "}
            {parseFloat(((price * (100 - discount)) / 100) * quantity).toFixed(
              2
            )}
            /-
          </span>
          <div className="row ml-auto">
            <button
              onClick={decrementQuantity}
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
              onClick={incrementQuantity}
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
