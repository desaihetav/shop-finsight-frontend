import { Link } from "react-router-dom";
import { useData } from "../../context";
import styles from "./GenreGrid.module.css";

export default function GenreCard() {
  const { genres } = useData();
  return (
    <div className={styles.gridWrapper}>
      <h1>Genres</h1>
      <div className={styles.grid}>
        {genres?.map(({ name, slug }) => (
          <Link to={`/genre/${slug}`}>
            <div className={styles.card}>
              <span>{name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
