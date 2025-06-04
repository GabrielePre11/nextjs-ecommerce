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

//=============== zustandFavoritesStore INTERFACE ===============//
interface zustandFavoritesStore {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  alreadyOnFavorites: (id: number) => boolean;
  removeFromFavorites: (id: number) => void;
}

export const useFavoritesStore = create<zustandFavoritesStore>()(
  // We use persist to store the favorites in localStorage
  persist(
    (set, get) => ({
      // Initial favorites array is empty
      favorites: [],

      /*
        - addToFavorites receives a product
        - We get the previous favorites and add the new one to the array
      */
      addToFavorites: (product) => {
        const newProducts = [...get().favorites, product];
        set({ favorites: newProducts });
      },

      // Checks if a product is already in the favorites using its ID
      alreadyOnFavorites: (id) => {
        return get().favorites.some((product) => product.id === id);
      },

      // Removes a product from the favorites list by its ID
      removeFromFavorites: (id) => {
        set({
          favorites: get().favorites.filter((product) => product.id !== id),
        });
      },
    }),
    {
      name: "favorites", // Key used in localStorage
    }
  )
);
