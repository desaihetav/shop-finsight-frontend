import { useState } from "react";
import { ProductCard } from "../../components";
import { useData } from "../../context/DataContext";
import styles from "./Products.module.css";

export default function Products({ genre }) {
  const {
    products,
    genres: allGenres,
    showFastDeliveryOnly,
    showCashOnDeliveryOnly,
    sortParameter,
    dispatch,
  } = useData();

  const [showFilters, setShowFilters] = useState(false);

  const currentGenre = allGenres.find((genreItem) => genreItem.slug === genre);

  function getSortedData(products, sortParameter) {
    console.log({ sortParameter });
    if (sortParameter === "PRICE_HIGH_TO_LOW") {
      console.log("PRICE_HIGH_TO_LOW");
      return [...products].sort((a, b) => {
        const bfinal = b.price - (b.price * b.discount) / 100;
        const afinal = a.price - (a.price * a.discount) / 100;
        return bfinal - afinal;
      });
    }

    if (sortParameter === "PRICE_LOW_TO_HIGH") {
      console.log("PRICE_LOW_TO_HIGH");
      return [...products].sort((a, b) => {
        const bfinal = b.price - (b.price * b.discount) / 100;
        const afinal = a.price - (a.price * a.discount) / 100;
        return afinal - bfinal;
      });
    }
    return products;
  }

  function getFilteredData(
    products,
    { showFastDeliveryOnly, showCashOnDeliveryOnly }
  ) {
    const genreFiltered = genre
      ? products.filter(({ genres }) =>
          genres.some((genreItem) => genreItem.slug === genre)
        )
      : products;
    return genreFiltered
      .filter(({ has_fast_delivery }) =>
        showFastDeliveryOnly ? has_fast_delivery : true
      )
      .filter(({ has_pay_on_delivery }) =>
        showCashOnDeliveryOnly ? has_pay_on_delivery : true
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
      {products && (
        <div className="container">
          <div className="row items-center justify-between">
            <div className="mt-8">
              {genre && <p>Books In</p>}
              <h1 className="mt-0">
                {genre ? currentGenre.name : "All Books"}
              </h1>
            </div>
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
      )}
    </div>
  );
}
