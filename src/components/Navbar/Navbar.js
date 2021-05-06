import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useData } from "../../context/DataContext";

export default function Navbar() {
  const { cart, wishlist } = useData();
  return (
    <div className={`${styles.navOuter}`}>
      <div className="container row items-center">
        <Link to="/" className={`h-full ${styles.logoContainer}`}>
          {/* <img
            className={`${styles.logoImage}`}
            alt="Finsight Logo"
            src={logoWhite}
          /> */}
          <span className={styles.logoText}>FINSIGHT</span>
        </Link>
        <div className="row ml-auto">
          <Link to="/wishlist">
            <div className="icon-badge-stack">
              <span className={`material-icons-outlined ${styles.navIcon}`}>
                bookmark_border
              </span>
              <div className={`icon-badge ${styles.bookmarkBadge}`}>
                {wishlist.length}
              </div>
            </div>
          </Link>
          <div className="space-x-1"></div>
          <div className="space-x-1"></div>
          <Link className="row" to="/cart">
            <div className="icon-badge-stack">
              <span
                className={`material-icons-outlined ${styles.cartIcon} ${styles.navIcon}`}
              >
                shopping_bag
              </span>
            </div>
            <div className={`${styles.iconBadge}`}>{cart.length}</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
