import { useData } from "../../context/DataContext";
import { ProductCard } from "../../components";

export default function Wishlist() {
  const { wishlist, dispatch } = useData();
  return (
    <div>
      <h1>Wishlist</h1>
      <div className={`grid`}>
        {wishlist &&
          wishlist.map((wishItem) => <ProductCard product={wishItem} />)}
      </div>
    </div>
  );
}
