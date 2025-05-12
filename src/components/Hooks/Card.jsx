import { useState, useEffect } from 'react';
import { ProductsData } from '../../../Data';
import { BookMark } from '../Ui/icons';
import { useCategory } from './Context';

function Card() {
    const [cart, setCart] = useState([]);
        const { currentCategory } = useCategory();

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const addToCart = (item) => {
        const updatedCart = [...cart, item];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

        const newProductArray = ProductsData.filter(function (e) {
            return e.category === currentCategory ;    
        });
    return (
        <div className="trending-container">
            {newProductArray && newProductArray.map((data) => (
                <div className="trending-card" key={data.id}>
                    <img src={data.image} alt={data.name} />
                    <div className="card-disc">
                        <div className="semi-circle">3</div>
                        <div className="circle"><BookMark /></div>
                        <h4>{data.name}</h4>
                        <p>NGN {data.price}</p>
                        <button className="add-to-cart" onClick={() => addToCart(data)}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card;
