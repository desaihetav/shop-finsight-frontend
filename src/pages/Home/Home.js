import { GenreGrid, Feature } from "../../components";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className="container">
      <Feature
        title="Discover the best finance content through timeless books by top authors"
        subtitle="Thoughtfully curated collection to help you get started with your personal finance journey."
        ctaText="Get Started"
        ctaLink={`/products`}
        imageURL="/images/hero.png"
      />
      <GenreGrid />
      <h1 className={styles.heading}>Book of the Week</h1>
      <Feature
        title="The Psychology of Money: Timeless Lessons on Wealth, Greed and Happiness"
        subtitle="by Morgan Housel"
        ctaText="Know More"
        ctaLink="/product/6093b58d402f3b00234c6047"
        imageURL="https://images-na.ssl-images-amazon.com/images/I/81Lb75rUhLL.jpg"
        reverse
      />
    </div>
  );
}
