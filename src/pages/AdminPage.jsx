import { useEffect, useState } from "react";
import { logout } from "../auth";
import {
  addProduct,
  getProducts,
  deleteProduct,
} from "../firestore/products";
import "./dashboard.css";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const loadProducts = async () => {
    setProducts(await getProducts());
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAdd = async () => {
    await addProduct({
      name: form.name,
      price: Number(form.price),
      description: form.description,
    });
    setForm({ name: "", price: "", description: "" });
    loadProducts();
  };

  return (
    <div className="page">
      <div className="header">
        <h1>Admin Dashboard 👑</h1>
        <button className="btn btn-logout" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="card">
        <h3>Add Product</h3>

        <div className="form">
          <input
            placeholder="Product name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
          <button className="btn btn-primary" onClick={handleAdd}>
            Add Product
          </button>
        </div>
      </div>

      <div className="products">
        {products.map((p) => (
          <div className="card" key={p.id}>
            <h4>{p.name}</h4>
            <p>{p.description}</p>
            <b>₹{p.price}</b>
            <br />
            <button
              className="btn btn-danger"
              onClick={() => deleteProduct(p.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
