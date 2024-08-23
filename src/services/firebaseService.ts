import { firebaseApp } from "@/libs/firebase-config";
import { Product } from "@/types/product";
import { get, getDatabase, push, ref, set } from "firebase/database";

const db = getDatabase(firebaseApp);

export const fetchProducts = async () => {
  const productsRef = ref(db, 'products');
  const snapshot = await get(productsRef);

  if (snapshot.exists()) {
    const productsData = snapshot.val();
    return Object.values(productsData);
  } else {
    console.log("No products found");
    return [];
  }
};

export const registerProduct = async (product: Product) => {
  try {
    const productsRef = ref(db, "products");
    const newProductRef = push(productsRef);
    await set(newProductRef, product);
  } catch (error) {
    console.error("Error: ", error);
    throw error
  }
};
