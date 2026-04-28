import { useState, useEffect, ChangeEvent, FormEvent, useMemo } from "react";
import { collection, addDoc, updateDoc, deleteDoc, doc, query, onSnapshot, orderBy, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage, auth } from "../lib/firebase";
import { Product } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trash2, Edit2, Upload, Save, AlertCircle, Search, Filter, Database, Tag, Clock, LogOut, Briefcase } from "lucide-react";
import { signOut, onAuthStateChanged } from "firebase/auth";

const PREDEFINED_CATEGORIES = [
  "Fire Extinguishers",
  "Hydrant Systems",
  "Sprinkler Systems",
  "Fire Alarm & Detection",
  "Suppression Systems",
  "Safety Logistics & PPE",
  "Monitoring & Sensors"
];

export const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
    name: "",
    description: "",
    imageUrl: "",
    category: PREDEFINED_CATEGORIES[0],
    subcategory: ""
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formError, setFormError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  // 🔥 AUTH HANDLING (CRITICAL FIX)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.hash = "/login";
      }
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // 🔥 FIRESTORE FETCH
  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      setProducts(prods);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const stats = useMemo(() => {
    return {
      total: products.length,
      categories: new Set(products.map(p => p.category)).size,
      lastProduct: products[0]
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p =>
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       p.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCategory === "All" || p.category === filterCategory)
    );
  }, [products, searchTerm, filterCategory]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImageFile(e.target.files[0]);
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload();
  };

  const resetForm = () => {
    setCurrentProduct({
      name: "",
      description: "",
      imageUrl: "",
      category: PREDEFINED_CATEGORIES[0],
      subcategory: ""
    });
    setImageFile(null);
    setIsEditing(false);
    setFormError("");
    setUploadProgress(0);
  };

  // 🔥 FIXED SAVE FUNCTION
  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    if (!currentProduct.name || !currentProduct.description || !currentProduct.category || !currentProduct.subcategory) {
      setFormError("All fields are required.");
      return;
    }

    // 🔥 AUTH CHECK
    if (!auth.currentUser) {
      setFormError("Please login again.");
      return;
    }

    if (auth.currentUser.email !== "uniqueengg1976@gmail.com") {
      setFormError("Unauthorized.");
      return;
    }

    setUploading(true);
    setFormError("");

    try {
      let imageUrl = currentProduct.imageUrl || "";

      if (imageFile) {
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        imageUrl = await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snap) => {
              setUploadProgress((snap.bytesTransferred / snap.totalBytes) * 100);
            },
            reject,
            async () => {
              resolve(await getDownloadURL(uploadTask.snapshot.ref));
            }
          );
        });
      }

      const data = {
        name: currentProduct.name,
        description: currentProduct.description,
        imageUrl,
        category: currentProduct.category,
        subcategory: currentProduct.subcategory,
        updatedAt: serverTimestamp()
      };

      if (currentProduct.id) {
        await updateDoc(doc(db, "products", currentProduct.id), data);
      } else {
        await addDoc(collection(db, "products"), {
          ...data,
          createdAt: serverTimestamp()
        });
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      resetForm();

    } catch (err: any) {
      setFormError("Upload failed. Check Firebase rules.");
    } finally {
      setUploading(false);
    }
  };

  // 🔥 FIXED DELETE
  const handleDelete = async (product: Product) => {
    if (!confirm("Delete this product?")) return;

    await deleteDoc(doc(db, "products", product.id!));

    try {
      const path = decodeURIComponent(product.imageUrl.split("/o/")[1].split("?")[0]);
      await deleteObject(ref(storage, path));
    } catch {}
  };

  const startEdit = (p: Product) => {
    setCurrentProduct(p);
    setIsEditing(true);
  };

  if (loading || !authReady) {
    return <div className="h-screen flex items-center justify-center">Loading Admin Panel...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-bold text-xl">Admin Panel</h1>
        <button onClick={handleLogout} className="text-red-600">Logout</button>
      </div>

      {/* FORM */}
      <form onSubmit={handleSave} className="bg-white p-6 rounded-xl mb-10 shadow">
        <input placeholder="Product Name" value={currentProduct.name}
          onChange={e => setCurrentProduct({ ...currentProduct, name: e.target.value })}
          className="w-full mb-3 p-3 border" />

        <textarea placeholder="Description"
          value={currentProduct.description}
          onChange={e => setCurrentProduct({ ...currentProduct, description: e.target.value })}
          className="w-full mb-3 p-3 border" />

        <input type="file" onChange={handleFileChange} className="mb-3" />

        <button disabled={uploading} className="bg-red-600 text-white px-6 py-3">
          {uploading ? "Uploading..." : "Save Product"}
        </button>

        {formError && <p className="text-red-600 mt-2">{formError}</p>}
        {showSuccess && <p className="text-green-600 mt-2">Saved successfully</p>}
      </form>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredProducts.map(p => (
          <div key={p.id} className="bg-white p-4 rounded shadow">
            <img src={p.imageUrl} className="h-40 w-full object-cover mb-3" />
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-sm">{p.description}</p>

            <div className="flex gap-3 mt-3">
              <button onClick={() => startEdit(p)}>Edit</button>
              <button onClick={() => handleDelete(p)} className="text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};