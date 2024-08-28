'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import styles from './customer.module.css';

interface CustomerDetail {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalAssets: number;
  investmentPreference: string;
  riskTolerance: string;
}

export default function CustomerDetail() {
  const params = useParams();
  const [customer, setCustomer] = useState<CustomerDetail | null>(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockCustomer: CustomerDetail = {
      id: Number(params.id),
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      totalAssets: 1000000,
      investmentPreference: 'Balanced Growth',
      riskTolerance: 'Moderate',
    };
    setCustomer(mockCustomer);
  }, [params.id]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Customer Detail</h1>
      <div className={styles.customerInfo}>
        <h2>{customer.name}</h2>
        <p>Email: {customer.email}</p>
        <p>Phone: {customer.phone}</p>
        <p>Total Assets: ${customer.totalAssets.toLocaleString()}</p>
        <p>Investment Preference: {customer.investmentPreference}</p>
        <p>Risk Tolerance: {customer.riskTolerance}</p>
      </div>
      {/* Add more sections for detailed customer information */}
    </div>
  );
}