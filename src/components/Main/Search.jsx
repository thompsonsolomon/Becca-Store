import "../Styles/Search.css";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormatCurrency } from '../../../Data';
import { SearchIcon } from '../Ui/icons';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Constant/Firebase";

function Search() {
    const [query, setQuery] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    const productsRef = collection(db, "BeccaStoreProducts");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const snapshot = await getDocs(productsRef);
            const list = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(list);
        } catch (err) {
            console.error("Failed to fetch products:", err);
            setError("Failed to load products. Please try again.");
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);
        setError("");
        
        if (!value.trim()) {
            setFilteredProducts([]);
            setShowPopup(false);
            return;
        }

        setLoading(true);
        const lowerCaseQuery = value.toLowerCase();

        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(lowerCaseQuery)
        );

        setFilteredProducts(filtered);
        setShowPopup(true);
        setLoading(false);
    };

    const handleClosePopup = () => {
        setQuery("");
        setFilteredProducts([]);
        setShowPopup(false);
        setError("");
    };

    return (
        <div className="searchCon">
            <div className="search">
                <input
                    type="text"
                    placeholder="I am looking for..."
                    value={query}
                    onChange={handleSearch}
                />
                <button><SearchIcon /></button>
            </div>

            {showPopup && (
                <div className="searchResultCon">
                    <div className="top">
                        <p className="text-sm text-gray-600">Search Results</p>
                        <button onClick={handleClosePopup} className="closeBtn">✕ Close</button>
                    </div>

                    {loading ? (
                        <p className="text-sm text-blue-400 px-4 py-2">Searching...</p>
                    ) : error ? (
                        <p className="text-sm text-red-500 px-4 py-2">{error}</p>
                    ) : filteredProducts.length > 0 ? (
                        <ul>
                            {filteredProducts.map((product) => (
                                <li key={product.id} className="searchElement">
                                    <Link
                                        to={`/product/${product.id}`}
                                        className="flex items-center gap-3"
                                        onClick={handleClosePopup}
                                    >
                                        <img src={product.image} alt={product.name} />
                                        <div>
                                            <p className="text-sm text-blue-300 font-semibold">{product.name}</p>
                                            <p className="text-xs text-gray-500">{FormatCurrency(product.price)}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-400 px-4 py-2">No results found for &quot;{query}&quot;</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Search;
