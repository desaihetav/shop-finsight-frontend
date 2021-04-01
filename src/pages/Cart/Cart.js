import { useData } from "../../context/DataContext";
import { CartCard } from "../../components";

export default function Cart() {
  const { cart, cartTotalOG, cartTotalFinal, dispatch } = useData();
  return (
    <div>
      <h1>Cart Page</h1>
      <div className={`grid`}>
        {cart && cart.map((cartItem) => <CartCard item={cartItem} />)}
      </div>
    </div>
  );
}
