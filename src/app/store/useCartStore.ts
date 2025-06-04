import { create } from "zustand";
import { persist } from "zustand/middleware";

//=============== PRODUCT INTERFACE ===============//
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  images: string[];
  quantity: number;
  tags: string[];
  discountPercentage: number;
  rating: number;
}

//=============== zustandCartStore INTERFACE ===============//
interface zustandCartStore {
  products: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  alreadyOnCart: (id: number) => boolean;
  increaseProductQuantity: (id: number) => void;
  decreaseProductQuantity: (id: number) => void;
}

export const useCartStore = create<zustandCartStore>()(
  persist(
    // We use persist to keep the cart in localStorage across page reloads
    (set, get) => ({
      products: [],

      //====================== ADD TO CART ======================//
      // - If the product is already in the cart, just increase the quantity
      // - If it's not there, add it with quantity = 1
      addToCart: (product: Product) =>
        set((state) => {
          const existingProduct = state.products.find(
            (existingProd) => existingProd.id === product.id
          );

          if (existingProduct) {
            return {
              products: state.products.map((existingProduct) =>
                existingProduct.id === product.id
                  ? {
                      ...existingProduct,
                      quantity: existingProduct.quantity + 1,
                    }
                  : existingProduct
              ),
            };
          } else {
            return {
              products: [...state.products, { ...product, quantity: 1 }],
            };
          }
        }),

      //====================== REMOVE FROM CART ======================//
      // - Removes a product completely from the cart based on its ID
      removeFromCart: (id: number) =>
        set((state) => {
          const productToRemove = state.products.find((p) => p.id === id);

          if (!productToRemove) return state;

          return {
            products: state.products.filter(
              (productToRemove) => productToRemove.id !== id
            ),
          };
        }),

      //====================== ALREADY ON CART ======================//
      // - Returns true if a product with the given ID is already in the cart
      alreadyOnCart: (id: number) =>
        get().products.some((product) => product.id === id),

      //====================== INCREASE PRODUCT QUANTITY ======================//
      // - Increases the quantity of a product by 1
      increaseProductQuantity: (id: number) =>
        set((state) => {
          const productToUpdate = state.products.find((p) => p.id === id);
          if (!productToUpdate) return state;

          return {
            products: state.products.map((p) =>
              p.id === id ? { ...p, quantity: p.quantity + 1 } : p
            ),
          };
        }),

      //====================== DECREASE PRODUCT QUANTITY ======================//
      // - Decreases the quantity of a product by 1
      // - If the quantity is 1, it removes the product from the cart
      decreaseProductQuantity: (id: number) => {
        set((state) => {
          const productToUpdate = state.products.find((p) => p.id === id);
          if (!productToUpdate) return state;

          if (productToUpdate.quantity === 1) {
            return {
              products: state.products.filter((p) => p.id !== id),
            };
          }

          return {
            products: state.products.map((p) =>
              p.id === id ? { ...p, quantity: p.quantity - 1 } : p
            ),
          };
        });
      },
    }),
    {
      name: "cart", // Key name for localStorage
    }
  )
);
