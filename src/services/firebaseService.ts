import { firebaseApp } from "@/libs/firebase-config";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore(firebaseApp);

export const fetchProducts = async () => {
  const productsCollection = collection(db, 'products');
  const productSnapshot = await getDocs(productsCollection);
  const productList = productSnapshot.docs.map(doc => doc.data());
  return productList;
};