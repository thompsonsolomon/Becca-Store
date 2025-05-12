
import { useState, useEffect } from "react";
import "../Styles/Dashboard.css";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../Constant/Firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FormatCurrency } from "../../../Data";

const AdminProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: 1,
    image: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null); // 🔥 New state
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const productsRef = collection(db, "BeccaStoreProducts");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const snapshot = await getDocs(productsRef);
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProducts(list);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // 🔥 Save file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = form.image;

    if (imageFile) {
      const storageRef = ref(storage, `products/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      imageUrl = await getDownloadURL(storageRef);
    }

    const data = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
      image: imageUrl,
    };

    try {
      if (editingId) {
        const productDoc = doc(db, "BeccaStoreProducts", editingId);
        await updateDoc(productDoc, data);
        setEditingId(null);
      } else {
        await addDoc(productsRef, data);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }

    setForm({
      name: "",
      price: "",
      stock: 1,
      image: "",
      description: "",
    });
    setImageFile(null); // 🔥 Reset image
    setLoading(false);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    const productDoc = doc(db, "BeccaStoreProducts", id);
    await deleteDoc(productDoc);
    fetchProducts();
  };

  return (
    <>
      <div className="ProductTop">
        <div className="ProductFirst">
          <p>
            <span>{products.length}</span>
            Product(s) Left
          </p>
        </div>
      </div>

      <div className="admin-container">
        <h2>Admin Product Manager</h2>

        <form onSubmit={handleSubmit} className="product-form">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />
          <select name="stock" value={form.stock} onChange={handleChange}>
            <option value={1}>In Stock</option>
            <option value={0}>Out of Stock</option>
          </select>

          {/* 🔥 Upload input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <textarea
            name="description"
            placeholder="Product Description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {loading ? "Loading..." : editingId ? "Update Product" : "Add Product"}
          </button>
        </form>

        <div className="product-list">
          {products.map((prod) => (
            <div key={prod.id} className="product-card">
              <img src={prod.image} alt={prod.name} />
              <h3>{prod.name}</h3>
              <p>{prod.description}</p>
              <p><strong>{"#"}{FormatCurrency(prod.price)}</strong></p>
              <p className={prod.stock ? "in-stock" : "out-stock"}>
                {prod.stock ? "In Stock" : "Out of Stock"}
              </p>
              <div className="card-actions">
                <button onClick={() => handleEdit(prod)}>Edit</button>
                <button onClick={() => handleDelete(prod.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminProduct;
