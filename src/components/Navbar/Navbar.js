import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logoWhite from "../../assets/images/logo_white.svg";
import { useData } from "../../context/DataContext";

export default function Navbar() {
  const { cart, wishlist } = useData();
  return (
    <div className={`${styles.navOuter}`}>
      <div className="container row items-center">
        <Link to="/" className={`h-full ${styles.logoContainer}`}>
          <img
            className={`${styles.logoImage}`}
            alt="Finsight Logo"
            src={logoWhite}
          />
          <span className={styles.logoText}>Finsight</span>
        </Link>
        <div className="row ml-auto">
          <Link to="/wishlist">
            <div className="icon-badge-stack">
              <span class={`material-icons-outlined icon`}>
                bookmark_border
              </span>
              <div class={`icon-badge icon-badge-dark`}>{wishlist.length}</div>
            </div>
          </Link>
          <div className="space-x-1"></div>
          <Link to="/cart">
            <div className="icon-badge-stack">
              <div class={`${styles.iconBadge}`}>{cart.length}</div>
              <span class={`material-icons-outlined icon ${styles.cartIcon}`}>
                shopping_bag
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
