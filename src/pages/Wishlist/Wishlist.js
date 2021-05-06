import { useData } from "../../context/DataContext";
import { ProductCard } from "../../components";

export default function Wishlist() {
  const { wishlist } = useData();
  return (
    <div>
      <div className="container">
        <h1 className="mt-8">Wishlist</h1>
        <div className={`grid`}>
          {wishlist &&
            wishlist.map((wishItem) => <ProductCard product={wishItem} />)}
        </div>
      </div>
    </div>
  );
}
