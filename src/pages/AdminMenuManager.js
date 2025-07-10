import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import Logo from "../components/Logo";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function AdminMenuManager() {
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", image: "" });

  // Fetch menu items live
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "menuItems"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuItems(items);
    });

    return () => unsubscribe();
  }, []);

  // Add a new menu item
  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.image) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "menuItems"), {
        name: newItem.name,
        price: Number(newItem.price),
        image: newItem.image,
      });
      setNewItem({ name: "", price: "", image: "" });
      alert("Item added!");
    } catch (error) {
      console.error("Error adding item: ", error);
    }
  };

  // Update an item
  const handleUpdateItem = async (id, updatedFields) => {
    const itemRef = doc(db, "menuItems", id);
    await updateDoc(itemRef, updatedFields);
    alert("Item updated!");
  };

  // Delete an item
  const handleDeleteItem = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this item?");
    if (!confirm) return;

    await deleteDoc(doc(db, "menuItems", id));
    alert("Item deleted.");
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#FFD700",
        position: "relative",
      }}
    >
      {/* Logo top-left */}
      <Logo />
      

      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
        Admin Menu Manager
      </h1>

      {/* Add New Item */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newItem.image}
          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
          style={inputStyle}
        />
        <button onClick={handleAddItem} style={buttonStyle}>
          Add
        </button>
      </div>

      {/* Existing Items */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {menuItems.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "#222",
              padding: "20px",
              borderRadius: "10px",
              border: "1px solid #FFD700",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <input
              type="text"
              value={item.name}
              onChange={(e) =>
                handleUpdateItem(item.id, { name: e.target.value })
              }
              style={inputStyle}
            />
            <input
              type="number"
              value={item.price}
              onChange={(e) =>
                handleUpdateItem(item.id, { price: Number(e.target.value) })
              }
              style={inputStyle}
            />
            <input
              type="text"
              value={item.image}
              onChange={(e) =>
                handleUpdateItem(item.id, { image: e.target.value })
              }
              style={inputStyle}
            />
            <button
              onClick={() => handleDeleteItem(item.id)}
              style={{
                ...buttonStyle,
                backgroundColor: "crimson",
                marginTop: "10px",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #444",
  backgroundColor: "#333",
  color: "#FFD700",
  marginTop: "10px",
  width: "100%",
};

const buttonStyle = {
  padding: "10px 16px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: "#FFD700",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer",
};

export default AdminMenuManager;
