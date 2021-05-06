import { useParams, useHistory } from "react-router-dom";
import { useData } from "../../context/DataContext";
import styles from "./ProductDetails.module.css";
import { getDateInDisplayFormat } from "../../utils/date";
import { ProductCard } from "../../components";

export default function ProductDetails() {
  const { productId } = useParams();
  const { products } = useData();
  const product = products.find((product) => product._id === productId);
  const genres = product && product.genres.map((genre) => genre.name);

  const { cart, wishlist, dispatch } = useData();
  const history = useHistory();

  const isInCart = () => cart.find((cartItem) => cartItem._id === product._id);

  const isInWishlist = () =>
    wishlist.filter((wishItem) => wishItem._id === product._id).length;

  const toggleWishlist = () => {
    isInWishlist()
      ? dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product })
      : dispatch({ type: "ADD_TO_WISHLIST", payload: product });
  };

  const cartBtnHandler = () => {
    isInCart()
      ? history.push({ pathname: "/cart" })
      : dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div>
      {product !== undefined && (
        <div className="container">
          <section className={`flex items-center ${styles.mainSection}`}>
            <div
              className={`flex items-center justify-center w-full ${styles.leftContainer}`}
            >
              <img
                alt={`${product.name} Cover`}
                src={product.cover_url}
                className={styles.coverImage}
              />
            </div>
            <div
              className={`flex flex-col w-full items-start justify-center ${styles.rightContainer}`}
            >
              <h1 className={`${styles.title}`}>{product.name}</h1>
              <span className={`${styles.author}`}>
                by {product.authors[0].name}
              </span>
              <div className="flex items-baseline">
                <span className={`${styles.priceFinal}`}>
                  ₹ {(product.price * (100 - product.discount)) / 100}
                </span>
                <span className={`${styles.priceOriginal}`}>
                  ₹ {product.price}
                </span>
              </div>
              <div className={`flex w-full`}>
                <button
                  onClick={cartBtnHandler}
                  className={`btn btn-solid w-full ${styles.button}`}
                >
                  {isInCart() ? (
                    "Go to Cart"
                  ) : (
                    <span className="flex items-center">
                      {!isInCart() && (
                        <span
                          className={`material-icons-outlined btn-icon-left ${styles.bagIcon}`}
                        >
                          shopping_bag
                        </span>
                      )}
                      Add to Bag
                    </span>
                  )}
                  {isInCart() && (
                    <div
                      className={`material-icons-outlined btn-icon-right ${styles.arrowIcon}`}
                    ></div>
                  )}
                </button>
                <button
                  onClick={toggleWishlist}
                  className="btn btn-outlined btn-icon"
                >
                  <span className={`material-icons`}>
                    {isInWishlist() ? "bookmark" : "bookmark_border"}
                  </span>
                </button>
              </div>
            </div>
          </section>
          <section className={`${styles.metadata}`}>
            <div className={styles.metaLeft}>
              <h2>Description</h2>
              {product.description.split("  ").map((text, index) => (
                <p key={index} className={`${styles.description}`}>
                  {text}
                </p>
              ))}
            </div>
            <div className={styles.metaRight}>
              <h2>Details</h2>
              <div className={styles.metaRightContent}>
                <DetailElement
                  title="Categories"
                  subtitle={product.genres
                    .map((genre) => genre.name)
                    .join(", ")}
                />
                <DetailElement
                  title="Format"
                  subtitle={`Papaerback, ${product.page_count} pages`}
                />
                <DetailElement
                  title="Language"
                  subtitle={product.languages[0]}
                />
                <DetailElement
                  title="Publication Date"
                  subtitle={getDateInDisplayFormat(product.publish_date)}
                />
                <DetailElement
                  title="Publisher"
                  subtitle={product.publisher.name}
                />
                <DetailElement
                  title="Publication City/Country"
                  subtitle="India"
                />
                <DetailElement title="ISBN10" subtitle={product.isbn10} />
                <DetailElement title="ISBN13" subtitle={product.isbn13} />
              </div>
            </div>
          </section>
          <section className={styles.similarProducts}>
            <h2>Similar Products</h2>
            <div className="grid">
              {products
                .filter((productItem) => {
                  const tempGenres = productItem.genres.map(
                    (genre) => genre.name
                  );
                  return (
                    genres.some((genre) => tempGenres.includes(genre)) &&
                    productItem._id !== product._id
                  );
                })
                .map((prodItem, idx) => (
                  <ProductCard product={prodItem} />
                ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function DetailElement({ title, subtitle }) {
  return (
    <div className={`${styles.detailContainer}`}>
      {title && (
        <>
          <span className={`${styles.detailTitle}`}>{title}</span>
          <br />
        </>
      )}
      <span className={`${styles.detailSubtitle}`}>{subtitle}</span>
    </div>
  );
}
