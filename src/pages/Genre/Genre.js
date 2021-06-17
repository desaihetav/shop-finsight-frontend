import { useParams } from "react-router";
import Products from "../Products/Products";

export default function Genre() {
  const { slug } = useParams();
  return (
    <div>
      <Products genre={slug} />
    </div>
  );
}
