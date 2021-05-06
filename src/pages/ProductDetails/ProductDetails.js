import { useParams, useHistory } from "react-router-dom";
import { useData } from "../../context/DataContext";
import styles from "./ProductDetails.module.css";
import { ProductCard } from "../../components";

export default function ProductDetails() {
  const { productId } = useParams();
  const { products } = useData();
  const product = products.find((product) => product.id.isbn10 === productId);
  const genres = product && product.genres.map((genre) => genre.name);

  const { cart, wishlist, dispatch } = useData();
  const history = useHistory();

  const isInCart = () =>
    cart.find((cartItem) => cartItem.id.isbn10 === product.id.isbn10);

  const isInWishlist = () =>
    wishlist.filter((wishItem) => wishItem.id.isbn10 === product.id.isbn10)
      .length;

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
                alt={`${product.title} Cover`}
                src={product.coverURL}
                className={styles.coverImage}
              />
            </div>
            <div
              className={`flex flex-col w-full items-start justify-center ${styles.rightContainer}`}
            >
              <h1 className={`${styles.title}`}>{product.title}</h1>
              <span className={`${styles.author}`}>
                by {product.authors[0].name}
              </span>
              <div className="flex items-baseline">
                <span className={`${styles.priceFinal}`}>
                  ₹ {product.price.final}
                </span>
                <span className={`${styles.priceOriginal}`}>
                  ₹ {product.price.final * 2}
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
                  subtitle={`Papaerback, ${product.no_of_pages} pages`}
                />
                <DetailElement
                  title="Language"
                  subtitle={product.languages[0].name}
                />
                <DetailElement
                  title="Publication Date"
                  subtitle={product.publish_date.slice(0, 10)}
                />
                <DetailElement
                  title="Publisher"
                  subtitle={product.publishers.name}
                />
                <DetailElement
                  title="Publication City/Country"
                  subtitle="Maharashtra, India"
                />
                <DetailElement
                  title="ISBN10"
                  subtitle={product.id.isbn10.slice(0, 10)}
                />
                <DetailElement
                  title="ISBN13"
                  subtitle={product.id.isbn13.slice(0, 13)}
                />
              </div>
            </div>
          </section>
          <section className={styles.similarProducts}>
            <h2>Similar Products</h2>
            {products
              .filter((productItem) => {
                const tempGenres = productItem.genres.map(
                  (genre) => genre.name
                );
                return genres.some((genre) => tempGenres.includes(genre));
              })
              .map((prodItem, idx) => (
                <p>{prodItem.title}</p>
              ))}
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
