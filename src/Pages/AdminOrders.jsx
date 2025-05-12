import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../components/Constant/Firebase';

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'BeccaStoreorders'), snapshot => {
      const fetched = snapshot.docs.map(doc => ({
        id: doc.id,
        deliveryStatus: "pending", // Default value in case it's not in DB
        ...doc.data(),
      }));
      setOrders(fetched);
    });
    return () => unsub();
  }, []);

  // const toggleVisibility = async (id, visible) => {
  //   const ref = doc(db, 'orders', id);
  //   await updateDoc(ref, { visible: !visible });
  // };

  const toggleDeliveryStatus = async (id, currentStatus) => {
    const nextStatus =
      currentStatus === "pending"
        ? "in progress"
        : currentStatus === "in progress"
        ? "delivered"
        : "pending";

    const ref = doc(db, 'BeccaStoreorders', id);
    await updateDoc(ref, { deliveryStatus: nextStatus });
  };

  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/dashboard">Home</Link></li>
            <li><Link to="/orders">Orders</Link></li>
          </ul>
        </nav>
      </header>

      <div className="orders-container">
        <h1>All Orders</h1>
        <div className="orders-list">
          {orders.map(order => (
            <div className="order-card" key={order.id}>
              <h3>{order.name}</h3>
              <p><strong>Address:</strong> {order.location}</p>
              <p><strong>Number:</strong> {order.number}</p>
              <p><strong>Date:</strong> {order.date}</p>
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} x{item.quantity} - {item.price}
                  </li>
                ))}
              </ul>
              <p><strong>Total:</strong> {order.total}</p>

              <div className="order-actions">
                {/* <button
                  onClick={() => toggleVisibility(order.id, order.visible)}
                  className="toggle-btn"
                >
                  {order.visible ? 'Hide from Orders' : 'Show in Orders'}
                </button> */}

                <button
                  onClick={() => toggleDeliveryStatus(order.id, order.deliveryStatus || "pending")}
                  className={` toggle-btn status-btn status-${order.deliveryStatus}`}
                >
                  {order.deliveryStatus || "Pending"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
