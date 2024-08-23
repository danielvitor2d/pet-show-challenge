import { firebaseApp } from "@/libs/firebase-config";
import { Product } from "@/types/product";
import { ref as databaseRef, get, getDatabase, push, remove, set } from "firebase/database";
import { deleteObject, getDownloadURL, getStorage, ref as storageRef, uploadBytes } from "firebase/storage";

const db = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

export const fetchProducts = async () => {
  const ref = databaseRef(db, 'products');
  const snapshot = await get(ref);

  if (snapshot.exists()) {
    const productsData = snapshot.val();
    const productsArray = Object.keys(productsData).map((id) => ({
      id,
      ...productsData[id],
    }));

    return productsArray as Array<Product & { id: string }>;
  } else {
    console.log("No products found");
    return [];
  }
};

export const registerProduct = async (product: Product) => {
  try {
    const ref = databaseRef(db, "products");
    const newProductRef = push(ref);
    await set(newProductRef, product);
    return {}
  } catch (error) {
    console.error("Error: ", error);
    throw error
  }
};

export const uploadImage = async (file: File, folder: string): Promise<string> => {
  try {
    const ref = storageRef(storage, `${folder}/${file.name}`);
    await uploadBytes(ref, file);
    const url = await getDownloadURL(ref);
    return url;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  }
};

export const getImageUrl = async (folder: string, fileName: string): Promise<string> => {
  try {
    const ref = storageRef(storage, `${folder}/${fileName}`);
    const url = await getDownloadURL(ref);
    return url;
  } catch (error) {
    console.error("Error getting image URL: ", error);
    throw error;
  }
};

export const removeProduct = async (productId: string, product: Product) => {
  try {
    for (const variation of product.variations) {
      const mainImageRef = storageRef(storage, variation.mainImage);
      await deleteObject(mainImageRef);

      for (const imageUrl of variation.secondaryImages) {
        const imageRef = storageRef(storage, imageUrl);
        await deleteObject(imageRef);
      }
    }

    const productRef = databaseRef(db, `products/${productId}`);
    await remove(productRef);

    console.log(`Product with ID ${productId} and its images have been removed.`);
  } catch (error) {
    console.error("Error removing product and images: ", error);
    throw error;
  }
};