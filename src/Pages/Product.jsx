import { useEffect, useState } from "react";
import ProductCard from "../components/Main/ProductCard";
import "../components/Styles/Product.css"
import Header from '../components/Ui/Header'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/Constant/Firebase";
import Foot from "../components/Footer/Footer";
import { LoadingProduct } from "../components/Hooks/Loading";

export default function Product() {
  const [products, setProducts] = useState([]);
  const productsRef = collection(db, "BeccaStoreProducts");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    };
    fetchData();
  }, []);

  const fetchProducts = async () => {
    const snapshot = await getDocs(productsRef);
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(list);
  };

  const allData = products || [];

  return (
    <div className="Product">
      <Header />
      <div className="cartWrapper">
        <div className="cardCon">
          {
            loading ?
            <LoadingProduct />
              :
              <>
                {allData.map((item) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    cover={item.image}
                    name={item.name}
                    price={item.price}
                    description={item.description}
                    data={item}
                    qty={item.qty}
                    instock={item.stock}
                  />
                ))}
              </>
          }



        </div>
      </div>
      <Foot />
    </div>
  );
}
