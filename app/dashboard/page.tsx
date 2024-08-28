'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './dashboard.module.css';

interface Customer {
  id: number;
  name: string;
  totalAssets: number;
}

export default function Dashboard() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [totalAssets, setTotalAssets] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    // TODO: Replace with actual API call
    const mockCustomers: Customer[] = [
      { id: 1, name: 'John Doe', totalAssets: 1000000 },
      { id: 2, name: 'Jane Smith', totalAssets: 1500000 },
      { id: 3, name: 'Bob Johnson', totalAssets: 800000 },
    ];
    setCustomers(mockCustomers);
    setTotalAssets(mockCustomers.reduce((sum, customer) => sum + customer.totalAssets, 0));
    setCustomerCount(mockCustomers.length);
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Relationship Manager Dashboard</h1>
      <div className={styles.stats}>
        <div className={styles.statItem}>
          <h2>Total Assets Under Management</h2>
          <p>${totalAssets.toLocaleString()}</p>
        </div>
        <div className={styles.statItem}>
          <h2>Total Customers</h2>
          <p>{customerCount}</p>
        </div>
      </div>
      <h2 className={styles.subtitle}>Customer List</h2>
      <ul className={styles.customerList}>
        {customers.map((customer) => (
          <li key={customer.id} className={styles.customerItem}>
            <Link href={`/customer/${customer.id}`}>
              <span className={styles.customerName}>{customer.name}</span>
              <span className={styles.customerAssets}>${customer.totalAssets.toLocaleString()}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}