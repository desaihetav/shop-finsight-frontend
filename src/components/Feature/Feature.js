import { Link } from "react-router-dom";
import styles from "./Feature.module.css";

export default function Feature({
  title,
  subtitle,
  ctaText,
  ctaLink,
  imageURL,
  reverse = false,
}) {
  return (
    <div
      className={`flex ${styles.featureWrapper} ${
        reverse && styles.rowReverse
      }`}
    >
      <div className={`${styles.featureContentWrapper}`}>
        <h1 className={`${styles.featureContentTitle}`}>{title}</h1>
        <p className={`${styles.featureContentSubtitle}`}>{subtitle}</p>
        <Link to={ctaLink}>
          <div
            className={`btn btn-solid btn-large ${styles.featureCTA} ${styles.button}`}
          >
            {ctaText}
            <div
              className={`material-icons-outlined btn-icon-right ${styles.arrowIcon}`}
            ></div>
          </div>
        </Link>
      </div>
      <div className={`${styles.featureImageWrapper}`}>
        <img className={styles.featureImage} src={imageURL} alt="hero" />
      </div>
    </div>
  );
}
