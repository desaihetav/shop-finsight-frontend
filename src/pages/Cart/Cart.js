import { useData } from "../../context/DataContext";
import { CartCard, Navbar } from "../../components";
import styles from "./Cart.module.css";
import { useHistory } from "react-router-dom";
import rightArrow from "../../assets/images/right_arrow.svg";

export default function Cart() {
  const { cart, cartTotalOG, cartTotalFinal, dispatch } = useData();
  const history = useHistory();
  console.log({ cartTotalOG });
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="mt-8">Cart</h1>
        {cart.length ? (
          <div>
            <div className={`grid`}>
              {cart && cart.map((cartItem) => <CartCard item={cartItem} />)}
            </div>
            <div className="divider"></div>
            <div className="grid mt-8">
              <div className="flex flex-col w-full">
                <div className={`w-full row justify-between`}>
                  <span>SUBTOTAL:</span>
                  <span>₹ {cartTotalFinal}</span>
                </div>
                <div className="space-y-1"></div>
                <div className={`w-full row justify-between`}>
                  <span>SHIPPING COST:</span>
                  <span>+ ₹ 20</span>
                </div>
                <div className="space-y-1"></div>
                <div className="divider"></div>
                <div className="space-y-1"></div>
                <div
                  className={`${styles.subTotal} w-full row justify-between`}
                >
                  <strong>TOTAL:</strong>
                  <strong>₹ {cartTotalFinal + 20}</strong>
                </div>
              </div>
              <button
                className={`btn w-full btn-solid btn-large ${styles.checkoutBtn}`}
              >
                Proceed to checkout
                <img
                  alt=""
                  src={rightArrow}
                  class={`material-icons-outlined btn-icon-right ${styles.arrowIcon}`}
                />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full items-center">
            <h2>Your cart is empty</h2>
            <button
              className={`btn btn-solid btn-large mt-8 ${styles.checkoutBtn}`}
              onClick={() => history.push({ pathname: "/" })}
            >
              Start Shopping
              <img
                alt=""
                src={rightArrow}
                class={`material-icons-outlined btn-icon-right ${styles.arrowIcon}`}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
