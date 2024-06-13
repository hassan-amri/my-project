// components/UpdateCustomerInfos.js
"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';


const UpdateCustomerInfos = ({ randomName }) => {
  const [customerId, setCustomerId] = useState("");
  const [message, setMessage] = useState("");
  
  const [name,setName] = useState(randomName);
//   const [email,setEmail] = useState(randomData.name)
  
//   if (!randomData) {
//     return <div>No data available</div>; // Handling case where randomData is undefined
//   }


  

  //   const handleDeleteCustomer = async () => {
  //     try {
  //       const response = await fetch('/api/delete-customer', {
  //         method: 'DELETE',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({ id: customerId })
  //       });

  //       const data = await response.json();

  //       if (response.ok) {
  //         setMessage('Customer deleted successfully!');
  //         // Additional actions after successful deletion
  //       } else {
  //         setMessage('Failed to delete customer. Error: ' + data.error);
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //       setMessage('An error occurred while deleting customer.');
  //     }
  //   };

//   const handleUpdateCustomer = async (customerId, updatedInfo) => {
//     try {
//       const response = await fetch(`/api/update-customer/${customerId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedInfo),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage("Customer information updated successfully!");
//         // Additional actions after successful update
//       } else {
//         setMessage(
//           "Failed to update customer information. Error: " + data.error
//         );
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setMessage("An error occurred while updating customer information.");
//     }
//   };

  return (
    <div>
      <h2>Update Customer</h2>
      <h2>Name: {name}</h2>
      {/* <h2>Email: {email}</h2> */}
      {/* <button onClick={handleUpdateCustomer}>Update Customer</button>
      {message && <p>{message}</p>} */}
    </div>
  );
};

export default UpdateCustomerInfos;
