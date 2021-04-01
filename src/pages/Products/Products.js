import { useState, useEffect } from "react";
import { ProductCard } from "../../components";
import axios from "axios";
import faker from "faker";
import styles from "./Products.module.css";

faker.seed(123);

export default function Products() {
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      // const response = await axios.post(
      //   "https://shop-finsight-default-rtdb.firebaseio.com/products.json",
      //   {
      //     products: data,
      //   }
      // );
      const response = await axios.get(
        "https://shop-finsight-default-rtdb.firebaseio.com/products/-MX8yC0nmRERFAPbpyh2/products.json"
      );
      console.log("Dekhte Hai");
      setProducts(response.data);
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
      <div className={`${styles.productsContainer} grid`}>
        {products.map((productItem) => (
          <ProductCard product={productItem} />
        ))}
      </div>
    </div>
  );
}
