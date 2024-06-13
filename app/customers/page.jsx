"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { randomBytes } from "crypto";
import "./page.css";
import Header from "../Header";

function Customers() {
  const router = useRouter();

  // setting name, email stats for updating
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [clickCount, setClickCount] = useState(0);


  // getting customers
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  //  const [customerId, setCustomerId] = useState('');
  const [message, setMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const [isReadOnly, setIsReadOnly] = useState(true);

  // update button text
  const [updateButtonText, setUpdateButtonText] = useState(true);

  let randomKey = Math.floor(Math.random() * 1234567890987654321);

  useEffect(() => {
    console.log(Math.floor(Math.random() * 1234567890987654321));

    if (localStorage.getItem("password") == null) {
      window.location.replace("http://localhost:3000/");
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch("/api/customers"); // Replace with your actual API route
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const jsonData = await response.json();
          console.log(jsonData);
          setData(jsonData);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [refreshing]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // deleting customer

  const handleDeleteCustomer = async (customerId) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      // Code to delete the customer
      // alert("Customer deleted!");
      try {
        const response = await fetch("/api/delete-customer", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: customerId }),
        });

        const data = await response.json();

        if (response.ok) {
          //  setMessage('Customer deleted successfully!');

          // switching between true and false to refresh the page using useEffect hook, look at useEffect hook to figure out
          setRefreshing(!refreshing);

          // Additional actions after successful deletion
        } else {
          //  setMessage('Failed to delete customer. Error: ' + data.error);
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred while deleting customer.");
      }

      console.log(refreshing);
    } else {
      // Code to cancel the deletion
      alert("Deletion cancelled.");
    }
  };

  // updating customer

  const handleUpdateCustomer = (customerId) => {
    setUpdateButtonText(true);

     setClickCount(prevCount => prevCount + 1);

    
     

    document
      .querySelectorAll("input[data-customer-id]")
      .forEach(function (item) {
        item.setAttribute("readOnly", true);
        item.style.backgroundColor = "transparent";
        item.style.border = "none";

        if (item.dataset.customerId === customerId.toString()) {
          item.removeAttribute("readonly");
          item.style.backgroundColor = "white";
          item.style.border = "1px solid red";
        }
      });

    // write a code for updating customers infos
    try {
      const response = fetch("/api/update-customer", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: customerId, name, email }), // Include the id
      });

      if (!response.ok) {
        throw new Error("Failed to update customer");
      }

      // setSuccess(true);
    } catch (error) {
      // setError(error.message);
      console.log("this is error message " + error.message);
      
    } finally {
      // setLoading(false);
    }
  

  if(clickCount === 1){
    window.location.reload();
    setClickCount(0);
  }

    

    console.log(customerId);
  };

  // handle logout

  function handleLogOut() {
    localStorage.removeItem("password");
    router.push("/");
  }

  return (
    <div className="customers__page" id="customers__page">
      <Header/>
      <h1>Customers List</h1>
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer) => (
            <tr key={customer.id}>
              <td>
                {" "}
                <input
                  type="text"
                  disabled
                  onChange={(e) => e.target.value}
                  data-customer-id={customer.id}
                  defaultValue={customer.id}
                />
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  data-customer-id={customer.id}
                  readOnly
                  defaultValue={customer.name}
                />
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  data-customer-id={customer.id}
                  readOnly
                  defaultValue={customer.email}
                />
              </td>
              <td>
                {" "}
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteCustomer(customer.id)}
                >
                  delete
                </button>
                <button
                  className="update-btn"
                  data-customer-id={customer.id}
                  onClick={() => handleUpdateCustomer(customer.id)}
                >
                  {/* {updateButtonText && "update" } */}
                  update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Link href="/add-customers">
        <button className="add__customer__button">add customer</button>
      </Link>

      <button className="logout" onClick={() => handleLogOut()}>
        Log Out
      </button>
    </div>
  );
}

export default Customers;
