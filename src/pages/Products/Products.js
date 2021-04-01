import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../../components";
import { useData } from "../../context/DataContext";
import axios from "axios";
import faker from "faker";
import styles from "./Products.module.css";
import { data } from "../../api/faker";

faker.seed(123);

export default function Products() {
  const { products, dispatch } = useData();

  console.log(data[0]);

  const fetchData = async () => {
    try {
      // const response = await axios.put(
      //   "https://shop-finsight-default-rtdb.firebaseio.com/products.json",
      //   data
      // );
      const response = await axios.get(
        "https://shop-finsight-default-rtdb.firebaseio.com/products.json"
      );
      console.log("useEffect run");
      dispatch({ type: "INITIALIZE_PRODUCTS", payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      fetchData();
    }
  }, []);

  return (
    <div>
      <h1>Products Page</h1>
      <Link to="/cart">Cart</Link>
      <br />
      <Link to="/wishlist">Wishlist</Link>
      <div className={`grid px-4`}>
        {products.map((productItem) => (
          <ProductCard product={productItem} />
        ))}
      </div>
    </div>
  );
}
