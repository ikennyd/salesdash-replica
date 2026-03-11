import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { subscribeToAuthChanges } from './auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((authUser) => {
      setUser(authUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
};

export const useAuthContext = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      setCurrentUser(user);
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { isAuthenticated, currentUser, loading };
};

// Firestore Hooks
import {
  subscribeToSales,
  subscribeToCustomers,
  subscribeToProducts
} from './firestore';
import type { Sale, Customer, Product } from '@/types';

export const useSales = (vendedorId: string) => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToSales(vendedorId, (data) => {
      setSales(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [vendedorId]);

  return { sales, loading };
};

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToCustomers((data) => {
      setCustomers(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { customers, loading };
};

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToProducts((data) => {
      setProducts(data);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { products, loading };
};
