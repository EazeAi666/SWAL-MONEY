import { collection, addDoc, doc, updateDoc, increment, serverTimestamp, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  console.error(`Firestore Error [${operationType}] at ${path}:`, error);
  // In a real app, we'd throw a structured error for the AIS Agent to catch
}

export const addMoney = async (userId: string, amount: number) => {
  const userRef = doc(db, 'users', userId);
  const txRef = collection(db, 'transactions');

  try {
    // 1. Create transaction record
    await addDoc(txRef, {
      uid: userId,
      type: 'credit',
      category: 'deposit',
      amount: amount,
      description: 'Wallet Top-up',
      timestamp: serverTimestamp(),
      status: 'success'
    });

    // 2. Update user balance
    await updateDoc(userRef, {
      balance: increment(amount)
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'users/transactions');
    throw error;
  }
};

export const makeTransfer = async (userId: string, amount: number, recipientName: string) => {
  const userRef = doc(db, 'users', userId);
  const txRef = collection(db, 'transactions');

  try {
    // 1. Create transaction record
    await addDoc(txRef, {
      uid: userId,
      type: 'debit',
      category: 'transfer',
      amount: amount,
      description: `Transfer to ${recipientName}`,
      timestamp: serverTimestamp(),
      status: 'success'
    });

    // 2. Update user balance
    await updateDoc(userRef, {
      balance: increment(-amount)
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'users/transactions');
    throw error;
  }
};

export const subscribeToTransactions = (userId: string, callback: (transactions: any[]) => void) => {
  const txRef = collection(db, 'transactions');
  const q = query(
    txRef,
    where('uid', '==', userId),
    orderBy('timestamp', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const txs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert Firestore timestamp to Date
      timestamp: doc.data().timestamp?.toDate() || new Date()
    }));
    callback(txs);
  }, (error) => {
    handleFirestoreError(error, OperationType.LIST, 'transactions');
  });
};
