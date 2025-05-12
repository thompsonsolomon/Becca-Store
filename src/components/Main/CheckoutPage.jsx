import { useState, useEffect, useRef } from 'react';
import "../Styles/Checkout.css";
import { PaystackButton } from 'react-paystack';
import { CompanyName, FormatCurrency } from '../../../Data';
import { useCart } from '../Hooks/Context';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Constant/Firebase';
import html2pdf from "html2pdf.js"; // Import html2pdf.js

export const CheckoutPage = () => {
    const receiptRef = useRef();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");
    const [number, setNumber] = useState("");
    const [verify, setVerify] = useState(false);
    const { cart, clearCart } = useCart();

    useEffect(() => {
        if (name && location && number) {
            setVerify(true);
        }
    }, [name, location, number]);

    const generateUniqueId = () => {
        return Math.random().toString(36).substr(2, 5).toUpperCase();
    };

    // Function to save receipt as PDF (no print dialog)
    const saveReceiptAsPDF = () => {
        const element = receiptRef.current;
        const opt = {
            margin: 0.5,
            filename: `Receipt-${generateUniqueId()}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        };
        html2pdf().set(opt).from(element).save();
    };

    const handlePaymentSuccess = async () => {
        if (!name || !location || !number || !email) {
            alert("Please enter all delivery details.");
            return;
        }

        const orderDetails = {
            name,
            email,
            location,
            number,
            date: new Date().toLocaleString(),
            items: cart,
            total: FormatCurrency(cart.reduce((total, item) => total + item.totalPrice, 0)),
            visible: true
        };

        try {
            await addDoc(collection(db, "BeccaStoreorders"), orderDetails);
            alert("Payment Successful! Saving Receipt...");
            setTimeout(() => {
                saveReceiptAsPDF();  // Save receipt as PDF
                clearCart();
            }, 1000);
        } catch (error) {
            console.error("Error saving order:", error);
            alert("Order not saved! Please try again.");
        }
    };

    const paystackProps = {
        email: email,
        amount: cart.reduce((total, item) => total + item.totalPrice, 0) * 100,
        publicKey: import.meta.env.VITE_PAYSTACK_TEST_PUBLIC_kEY,
        onSuccess: handlePaymentSuccess,
    };

    return (
        <div className="checkout-container">
            <div className="checkoutWrapper">
                <div className="cart-summary">
                    <h2>Order Summary</h2>
                    {cart.length > 0 ? cart.map((item, index) => (
                        <div className="cart-item" key={index}>
                            <span>{item.quantity}</span>
                            <img src={item.image} alt={item.name} />
                            <div className="fll">
                                <h4>{item.name}</h4>
                                <p>{FormatCurrency(item.price)}</p>
                            </div>
                            <p>{FormatCurrency(item.totalPrice)}</p>
                        </div>
                    )) : <p>No items in cart</p>}

                    {
                        cart.length > 0 && <div className='totalAmount'>
                            Total Amount :  {FormatCurrency(cart.reduce((total, item) => total + item.totalPrice, 0))}
                        </div>
                    }

                    <div className="payButton">
                        {
                            verify ?
                                <PaystackButton className="pay-button" {...paystackProps}>Pay Now</PaystackButton>
                                :
                                <p>Pls Enter all details</p>
                        }
                    </div>
                </div>

                <div className="delivery-form">
                    <h2>Delivery Details</h2>
                    <form>
                        <input type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Full Name" required />
                        <input type="email" onChange={e => setEmail(e.target.value)} name='email' value={email} placeholder="example@gmail.com" required />
                        <input type="text" onChange={e => setLocation(e.target.value)} value={location} placeholder="Address" required />
                        <input type="number" onChange={e => setNumber(e.target.value)} value={number} placeholder="Phone Number" required />
                    </form>
                </div>
            </div>

            <div style={{ display: "none" }} >
                <div ref={receiptRef} className="receipt">
                    <h2>Receipt</h2>
                    <div className='receiptHeader'>
                        <p>{CompanyName}</p>
                    </div>

                    <div className="receiptBuyerDetails">
                        <label style={{ textDecoration: "underline", marginTop: "30px" }} >Buyer Details</label>
                        <div><span>Name:</span> <span>{name}</span></div>
                        <div><span>Address:</span> <span>{location}</span></div>
                        <div><span>Number:</span> <span>{number}</span></div>
                    </div>

                    {cart.map((item, index) => (
                        <div className='receiptCart' key={index}>
                            <h4>{item.name}</h4>
                            <p>Amount: {FormatCurrency(item.price)}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    ))}

                    <p className='total'>
                        Total Amount : <span>
                            {FormatCurrency(cart.reduce((total, item) => total + item.totalPrice, 0))}
                        </span>
                    </p>
                    <p className='date'>{new Date().toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};
