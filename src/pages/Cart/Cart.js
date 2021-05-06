import { useData } from "../../context/DataContext";
import { CartCard } from "../../components";
import styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import rightArrow from "../../assets/images/right_arrow.svg";

export default function Cart() {
  const { cart, cartTotalOG, cartTotalFinal } = useData();

  return (
    <div>
      <div className="container">
        <h1 className="mt-8">Cart</h1>
        {cart?.length ? (
          <div className={`${styles.cartPage} mt-8`}>
            <div className={`${styles.cartListContainer}`}>
              {cart && cart.map((cartItem) => <CartCard item={cartItem} />)}
            </div>
            <div className={`${styles.checkoutInfo}`}>
              <div className="flex flex-col mt-8">
                <div className="flex flex-col w-full">
                  <div className={`w-full row justify-between`}>
                    <span>SUBTOTAL:</span>
                    <span>₹ {parseFloat(cartTotalFinal).toFixed(2)}</span>
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
                    <strong>
                      ₹ {parseFloat(cartTotalFinal + 20).toFixed(2)}
                    </strong>
                  </div>
                </div>
                <div className="space-y-1"></div>
                <button
                  className={`btn w-full btn-solid btn-large ${styles.checkoutBtn}`}
                >
                  Proceed to checkout
                  <img
                    alt=""
                    src={rightArrow}
                    className={`material-icons-outlined btn-icon-right ${styles.arrowIcon}`}
                  />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
}

function EmptyCart() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-full items-center">
      <h2>Your cart is empty</h2>
      <button
        className={`btn btn-solid btn-large mt-8 ${styles.checkoutBtn}`}
        onClick={() => navigate("/")}
      >
        Start Shopping
        <img
          alt=""
          src={rightArrow}
          className={`material-icons-outlined btn-icon-right ${styles.arrowIcon}`}
        />
      </button>
    </div>
  );
}
