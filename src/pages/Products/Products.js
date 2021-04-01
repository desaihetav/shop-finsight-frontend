import { useEffect } from "react";
import { ProductCard, Navbar } from "../../components";
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
      <Navbar />
      <div className="container">
        <h1 className="mt-8">All Products</h1>
        <div className={`grid`}>
          {products.map((productItem) => (
            <ProductCard product={productItem} />
          ))}
        </div>
      </div>
    </div>
  );
}
