import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context";

export default function Navbar() {
  const { cart, wishlist } = useData();
  const { user } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const authBtnHandler = () => {
    user
      ? setShowLogoutModal(true)
      : navigate("/login", { state: { from: pathname } });
  };

  return (
    <div className={`${styles.navOuter}`}>
      {showLogoutModal && (
        <LogoutModal setShowLogoutModal={setShowLogoutModal} />
      )}
      <div className="container row items-center">
        <Link to="/" className={`h-full ${styles.logoContainer}`}>
          <span className={styles.logoText}>FINSIGHT</span>
        </Link>
        <div className="row ml-auto">
          <button
            onClick={authBtnHandler}
            className={`btn btn-solid-reverse btn-small`}
          >
            {user ? "Log Out" : "Log In"}
          </button>
          <Link to="/wishlist">
            <div className="icon-badge-stack">
              <span className={`material-icons-outlined ${styles.navIcon}`}>
                bookmark_border
              </span>
              <div className={`icon-badge ${styles.bookmarkBadge}`}>
                {wishlist?.length}
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
            <div className={`${styles.iconBadge}`}>{cart?.length}</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

const LogoutModal = ({ setShowLogoutModal }) => {
  const { logout } = useAuth();
  const { dispatch } = useData();
  return (
    <div className={`${styles.modalOuter}`}>
      <div className={`${styles.modalInner}`}>
        <h2>Are you sure you want to Logout?</h2>
        <p>Come back soon, we'll miss you!</p>
        <div className="flex items-center justify-center">
          <button
            onClick={() => setShowLogoutModal(false)}
            className="btn btn-outlined btn-small"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              logout();
              dispatch({ type: "LOGOUT" });
              setShowLogoutModal(false);
            }}
            className="btn btn-solid btn-small"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
};
