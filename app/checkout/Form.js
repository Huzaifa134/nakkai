import React, { useState } from 'react';
import Button from "@/utils/Button";
import  Link  from "next/link";

const Form = ({usersCart}) => {
  
  const [billingAddress, setBillingAddress] = useState('');
  const [billingName, setBillingName] = useState('');
  const [billingNumber, setBillingNumber] = useState('');

  const handleBillingAddressChange = (e) => {
    setBillingAddress(e.target.value);
  };
  const handleBillingNameChange = (e) => {
    setBillingName(e.target.value);
  }
  const handleBillingNumberChange = (e) => {
    setBillingNumber(e.target.value);
  }

  const handleSubmit = (e) => {

    // Handle form submission here
    console.log('Billing Address:', billingAddress , billingName, billingNumber);
    // You can perform further actions like submitting the data to a backend server
    setBillingAddress('');
    setBillingName('');
    setBillingNumber('');



  };




  return (
    <div>
      <form onSubmit={handleSubmit}  className='flex flex-col flex-wrap gap-5'>
      <label htmlFor="fulname">Enter Full Name</label>
      <input type="text" name="fulname" id="fulname" required className='border border-gray-300 rounded-md w-full p-2' onChange={handleBillingNameChange} value={billingName}/>
       
      <label htmlFor="num">Enter Phone Number</label>
      <input type="number" name="num" id="num" className='border border-gray-300 rounded-md w-full p-2' required onChange={handleBillingNumberChange} value={billingNumber}/>
        <label htmlFor="billingAddress">Fill billing address</label>
        <textarea
          id="billingAddress"
          cols="30"
          rows="5"
          value={billingAddress}
          onChange={handleBillingAddressChange}
          required
          className='border border-gray-300 rounded-md w-full p-2'
        ></textarea>

       
        <div className="mt-6">
      
       
        <Button usersCart={usersCart} billingAddress={billingAddress}/>
         
        
      </div>
      </form>
    </div>
  );
};

export default Form;
