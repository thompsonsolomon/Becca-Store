import { useState } from "react";
import { Link } from "react-router-dom";
import { FormatCurrency } from "../../../Data";
import { useCart } from "../Hooks/Context";

// eslint-disable-next-line react/prop-types
const ProductCard = ({ id, name, price, cover, description, data,instock }) => {
    const { addToCart } = useCart();
    const [showNotification, setShowNotification] = useState(false);

    const handleAddToCart = () => {
        addToCart({ id, name, price, cover, description, data });

        // Show notification
        setShowNotification(true);

        // Hide after 2 seconds
        setTimeout(() => {
            setShowNotification(false);
        }, 2000);
    };

    return (
        <div className="productCardCon">
            <Link to={`/product/${id}`} className="block">
                <img src={cover} alt={name} className="productimage" />
            </Link>
            <div>
                <div className="NameCon">
                    <h3 className="ProductName">{name}</h3>
                    <p className="amount">{FormatCurrency(price)}</p>
                    <p className={instock ? "in-stock" : "out-stock"}>
                {instock ? "In Stock" : "Out of Stock"}
              </p>
                </div>


                <button
                    onClick={handleAddToCart}
                    className="productBtn"
                >
                    {/* <CartIcon className="size-3 text-s1" /> */}
                    <span>Add to cart</span>
                </button>
            </div>

            {/* Custom Notification */}
            {showNotification && (
                <div className="notification">
                    ✅ Added to Cart!
                </div>
            )}
        </div>
    );
};

export default ProductCard;
