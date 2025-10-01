import { mutate } from "swr";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ProductProps {
  _id?: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

interface ProductStore {
  products: ProductProps[];
  setProducts: (products: ProductProps[]) => void;
  createProduct: (product: ProductProps) => void;
  updateProduct: (id: string, data: Partial<ProductProps>) => void;
  deleteProduct: (productId: string) => void;
}

interface LogConfig<S, G, A> {
  (set: (...args: any[]) => void, get: G, api: A): S;
}
type SetState = (...args: any[]) => void;
type GetState = () => any;
type StoreApi = any;
const store = (set: any): ProductStore => ({
  products: [],
  setProducts: (products: ProductProps[]) => set({ products }),
  createProduct: async (newProduct: ProductProps) => {
    try {
      const res = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const result = await res.json();

      if (result.success && result.data) {
        set((state: ProductStore) => ({
          products: [...state.products, result.data],
        }));
      } else {
        console.error("Failed to create product:", result.error);
      }
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  },

  updateProduct: async (id: string, data: Partial<ProductProps>) => {
    try {
      const res = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.success && result.data?.product) {
        set((state: ProductStore) => ({
          products: state.products.map((p) =>
            p._id === id ? result.data.product : p
          ),
        }));
        mutate("/api/products");
      } else {
        console.error("Failed to update product:", result.error);
      }
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  },
  deleteProduct: async (productId) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/products/${productId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = await res.json();

      if (result.success) {
        set((state: ProductStore) => ({
          products: state.products.filter(
            (product) => product._id !== productId
          ),
        }));
        mutate("/api/products");
      } else {
        console.error("Failed to delete product:", result.error);
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  },
});

const log =
  <S, G extends GetState, A extends StoreApi>(config: LogConfig<S, G, A>) =>
  (set: SetState, get: G, api: A): S =>
    config(
      (...args: any[]) => {
        const current = get();
        if (!current) {
          // get state from external source (e.g. server)
        }
        console.log("state", current);
        console.log("dispatch", args);
        set(...args);
      },
      get,
      api
    );

export const useProductStore = create<ProductStore>()(
  log(persist(devtools(store), { name: "ProductStore" }))
);
