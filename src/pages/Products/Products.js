import { useState, useEffect } from "react";
import { ProductCard, Navbar } from "../../components";
import { useData } from "../../context/DataContext";
import axios from "axios";
import styles from "./Products.module.css";
import { data } from "../../api/faker";

export default function Products() {
  const {
    products,
    showFastDeliveryOnly,
    showCashOnDeliveryOnly,
    sortParameter,
    dispatch,
  } = useData();

  const [showFilters, setShowFilters] = useState(false);

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

  function getSortedData(products, sortParameter) {
    console.log({ sortParameter });
    if (sortParameter === "PRICE_HIGH_TO_LOW") {
      console.log("PRICE_HIGH_TO_LOW");
      return [...products].sort((a, b) => b.price.final - a.price.final);
    }

    if (sortParameter === "PRICE_LOW_TO_HIGH") {
      console.log("PRICE_LOW_TO_HIGH");
      return [...products].sort((a, b) => a.price.final - b.price.final);
    }
    return products;
  }

  function getFilteredData(
    products,
    { showFastDeliveryOnly, showCashOnDeliveryOnly }
  ) {
    return products
      .filter(({ hasFastDelivery }) =>
        showFastDeliveryOnly ? hasFastDelivery : true
      )
      .filter(({ hasCashOnDelivery }) =>
        showCashOnDeliveryOnly ? hasCashOnDelivery : true
      );
  }

  const sortedData = getSortedData(products, sortParameter);
  const filteredData = getFilteredData(sortedData, {
    showFastDeliveryOnly,
    showCashOnDeliveryOnly,
  });

  const toggleShowFilter = () => setShowFilters((val) => !val);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row items-center justify-between">
          <h1 className="mt-8">All Products</h1>
          <button
            className="btn btn-icon btn-ghost btn-small"
            onClick={() => toggleShowFilter()}
          >
            <span className="material-icons-outlined">filter_alt</span>
          </button>
        </div>
        <div
          className={`${styles.filterContainer} ${
            showFilters || styles.hideFilters
          }`}
        >
          <div className={`w-full p-4`}>
            <span className={`${styles.label}`}>Sort by: </span>
            <br />
            <br />
            <div className="space-x-1"></div>
            <div className={`${styles.optionList}`}>
              <button
                onClick={() =>
                  dispatch({ type: "SORT", payload: "PRICE_HIGH_TO_LOW" })
                }
                className={`btn btn-small ${
                  sortParameter === "PRICE_HIGH_TO_LOW"
                    ? "btn-solid"
                    : "btn-outlined"
                }`}
              >
                Price – High to Low
              </button>
              <div className="space-x-1"></div>
              <button
                onClick={() =>
                  dispatch({ type: "SORT", payload: "PRICE_LOW_TO_HIGH" })
                }
                className={`btn btn-small ${
                  sortParameter === "PRICE_LOW_TO_HIGH"
                    ? "btn-solid"
                    : "btn-outlined"
                }`}
              >
                Price – Low to High
              </button>
            </div>
          </div>
          <div className={`w-full p-4`}>
            <span className={`${styles.label}`}>Filters: </span>
            <br />
            <br />
            <div className="space-x-1"></div>
            <div className={`${styles.optionList}`}>
              <button
                onClick={() => dispatch({ type: "TOGGLE_COD" })}
                className={`btn btn-small ${
                  showCashOnDeliveryOnly ? "btn-solid" : "btn-outlined"
                }`}
              >
                Cash On Delivery
              </button>
              <div className="space-x-1"></div>
              <button
                onClick={() => dispatch({ type: "TOGGLE_FAST_DELIVERY" })}
                className={`btn btn-small ${
                  showFastDeliveryOnly ? "btn-solid" : "btn-outlined"
                }`}
              >
                Fast Delivery
              </button>
            </div>
          </div>
        </div>
        <div className={`grid`}>
          {filteredData.map((productItem) => (
            <ProductCard product={productItem} />
          ))}
        </div>
      </div>
    </div>
  );
}
