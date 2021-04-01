import { useData } from "../../context/DataContext";
import { CartCard, Navbar } from "../../components";
import styles from "./Cart.module.css";

export default function Cart() {
  const { cart, cartTotalOG, cartTotalFinal, dispatch } = useData();
  console.log({ cartTotalOG });
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="mt-8">Cart</h1>
        <div className={`grid`}>
          {cart && cart.map((cartItem) => <CartCard item={cartItem} />)}
        </div>
        <div className="divider"></div>
        <div className="grid mt-8">
          <span className={`${styles.subTotal}`}>
            TOTAL: <strong>Rs. {cartTotalFinal} /-</strong>
          </span>
          <button className={`btn btn-solid btn-large ${styles.checkoutBtn}`}>
            Proceed to checkout
            <span
              class={`material-icons-outlined btn-icon-right ${styles.arrowIcon}`}
            >
              {" "}
              east{" "}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
