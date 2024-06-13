"use client";
import Link from "next/link";
import { useState } from "react";
import "./page.css";

import { useRouter } from "next/navigation";

function YourComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/add-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      setName("");
      setEmail("");

      if (!response.ok) {
        throw new Error("Failed to add customer");
      }

      setSuccess(true);

    
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add__customers">
      <h1>Add New Customers</h1>
      {success && (
        <div className="successful__message">Customer added successfully!</div>
      )}
      {error && <div>Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Customer"}
        </button>
      </form>
      <br />
      <br />
      <Link className="customers__page__button" href="/customers"   >
        <button>customers</button>
      </Link>
    </div>
  );
}

export default YourComponent;
