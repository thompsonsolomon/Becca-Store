import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../components/Hooks/Context";
import { FormatCurrency } from "../../Data";
import Header from "../components/Ui/Header";
import { BackIcon } from "../components/Ui/icons";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../components/Constant/Firebase";
import Foot from "../components/Footer/Footer";

const ProductDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { addToCart } = useCart();

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const productsRef = collection(db, "BeccaStoreProducts");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const snapshot = await getDocs(productsRef);
                const list = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(list);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const selectedProduct = products.find((item) => item.id === id);

    const Reverse = () => {
        navigate(-1);
    };

    if (loading) {
        return <p className="text-center text-blue-500">Loading...</p>;
    }

    if (!selectedProduct) {
        return <p className="text-center text-red-500">Product not found!</p>;
    }
    return (
        <div>
            <Header />
            <div className="productDetails px-4 py-6 max-w-4xl mx-auto">
                <div className="mb-4">
                    <button className="ReverseButton flex  gap-2 text-sm text-p1" onClick={Reverse}>
                        <BackIcon /> Back
                    </button>
                </div>
                <div className="ProductDetailsWrapper grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Product Image */}
                    <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="w-full h-[300px] object-cover rounded-md shadow"
                    />

                    {/* Product Info */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl text-p1 font-semibold">{selectedProduct.name}</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <p className="text-[#AEAEB2] text-[15px]">{selectedProduct.qty}</p>
                            <span className="w-[10px] h-[10px] bg-[#AEAEB2] rounded-full ml-2"></span>
                        </div>
                        <p className="text-[16px] text-p2 mt-2">{selectedProduct.description}</p>
                        <p className="text-lg text-s3 mt-2 font-bold">{FormatCurrency(selectedProduct.price)}</p>
                        <p className={selectedProduct.stock ? "in-stock" : "out-stock"}>
                        {selectedProduct.stock ? "In Stock" : "Out of Stock"} </p>

                        {/* Add to Cart Button */}
                        <button
                            onClick={() => addToCart(selectedProduct)}
                            className="mt-4 w-[200px] border border-white bg-p5 text-white py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            <Foot />
        </div>
    );
};

export default ProductDetails;
