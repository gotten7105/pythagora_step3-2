"use client"
import OneCustomerInfoCard from "src/app/components/one_customer_info_card.jsx"
import BackButton from "./back_button";
import fetchCustomer from "./fetchCustomer";
import { useEffect, useState } from 'react';

export default function ReadPage(props) {
  const id = props.params.id;

  const [customerInfo, setCustomerInfo] = useState([]);

  useEffect(() => {
      const fetchAndSetCustomer = async () => {
          const customerData = await fetchCustomer(id);
          setCustomerInfo(customerData);
      };
      fetchAndSetCustomer();
  }, []);


  return (
    <>
      <div className="card bordered bg-white border-blue-200 border-2 max-w-sm m-4">
        <OneCustomerInfoCard {...customerInfo[0]} />
        <BackButton>戻る</BackButton>
      </div>

    </>
  )
}
