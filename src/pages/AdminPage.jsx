import { useEffect, useState } from "react";
import { logout } from "../auth";

// PRODUCTS
import {
  addProduct,
  getProducts,
  deleteProduct,
} from "../firestore/products";

// SERVICES
import {
  addService,
  getServices,
  deleteService,
} from "../firestore/services";

import "./dashboard.css";

const AdminPage = () => {
  // PRODUCTS STATE
  const [products, setProducts] = useState([]);
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  // SERVICES STATE
  const [services, setServices] = useState([]);
  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
  });

  // LOAD DATA
  const loadProducts = async () => {
    setProducts(await getProducts());
  };

  const loadServices = async () => {
    setServices(await getServices());
  };

  useEffect(() => {
    loadProducts();
    loadServices();
  }, []);

  // PRODUCT HANDLERS
  const handleAddProduct = async () => {
    await addProduct({
      name: productForm.name,
      price: Number(productForm.price),
      description: productForm.description,
    });
    setProductForm({ name: "", price: "", description: "" });
    loadProducts();
  };

  // SERVICE HANDLERS
  const handleAddService = async () => {
    await addService({
      name: serviceForm.name,
      description: serviceForm.description,
    });
    setServiceForm({ name: "", description: "" });
    loadServices();
  };

  return (
    <div className="page">
      <div className="header">
        <h1>Admin Dashboard 👑</h1>
        <button className="btn btn-logout" onClick={logout}>
          Logout
        </button>
      </div>

      {/* ---------------- PRODUCTS ---------------- */}
      <div className="card">
        <h3>Add Product</h3>

        <div className="form">
          <input
            placeholder="Product name"
            value={productForm.name}
            onChange={(e) =>
              setProductForm({ ...productForm, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Price"
            value={productForm.price}
            onChange={(e) =>
              setProductForm({ ...productForm, price: e.target.value })
            }
          />
          <textarea
            placeholder="Description"
            value={productForm.description}
            onChange={(e) =>
              setProductForm({
                ...productForm,
                description: e.target.value,
              })
            }
          />
          <button className="btn btn-primary" onClick={handleAddProduct}>
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

      {/* ---------------- SERVICES ---------------- */}
      <div className="card" style={{ marginTop: "2rem" }}>
        <h3>Add Service</h3>

        <div className="form">
          <input
            placeholder="Service name"
            value={serviceForm.name}
            onChange={(e) =>
              setServiceForm({ ...serviceForm, name: e.target.value })
            }
          />
          <textarea
            placeholder="Service description"
            value={serviceForm.description}
            onChange={(e) =>
              setServiceForm({
                ...serviceForm,
                description: e.target.value,
              })
            }
          />
          <button className="btn btn-primary" onClick={handleAddService}>
            Add Service
          </button>
        </div>
      </div>

      <div className="products">
        {services.map((s) => (
          <div className="card" key={s.id}>
            <h4>{s.name}</h4>
            <p>{s.description}</p>
            <button
              className="btn btn-danger"
              onClick={() => deleteService(s.id)}
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
