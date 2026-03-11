import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  QueryConstraint,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import type { Sale, Customer, Product, User } from '@/types';

// Collection References
const SALES_COLLECTION = 'sales';
const CUSTOMERS_COLLECTION = 'customers';
const PRODUCTS_COLLECTION = 'products';
const USERS_COLLECTION = 'users';

// Real-time Sales Listener
export const subscribeToSales = (
  vendedorId: string,
  callback: (sales: Sale[]) => void
) => {
  const q = query(
    collection(db, SALES_COLLECTION),
    where('vendedor', '==', vendedorId)
  );

  return onSnapshot(q, (snapshot) => {
    const sales: Sale[] = [];
    snapshot.forEach((doc) => {
      sales.push({ id: doc.id, ...doc.data() } as Sale);
    });
    callback(sales);
  });
};

// Real-time Customers Listener
export const subscribeToCustomers = (callback: (customers: Customer[]) => void) => {
  const q = query(collection(db, CUSTOMERS_COLLECTION));

  return onSnapshot(q, (snapshot) => {
    const customers: Customer[] = [];
    snapshot.forEach((doc) => {
      customers.push({ id: doc.id, ...doc.data() } as Customer);
    });
    callback(customers);
  });
};

// Real-time Products Listener
export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  const q = query(collection(db, PRODUCTS_COLLECTION));

  return onSnapshot(q, (snapshot) => {
    const products: Product[] = [];
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });
    callback(products);
  });
};

// Add Sale
export const addSale = async (sale: Omit<Sale, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, SALES_COLLECTION), {
      ...sale,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return { success: true, id: docRef.id };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Update Sale
export const updateSale = async (saleId: string, updates: Partial<Sale>) => {
  try {
    const saleRef = doc(db, SALES_COLLECTION, saleId);
    await updateDoc(saleRef, {
      ...updates,
      updatedAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Delete Sale
export const deleteSale = async (saleId: string) => {
  try {
    await deleteDoc(doc(db, SALES_COLLECTION, saleId));
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
