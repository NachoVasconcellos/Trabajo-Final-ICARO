import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
const useCart = create(
  persist(
    (set, get) => ({
      cart: [],
      setCart: (nuevoCarrito) => set(() => ({ cart: nuevoCarrito })),
      clearCart: () => set(() => ({ cart: [] })),
      addProduct: (product) => {
        const cart = get().cart;
        const index = cart.findIndex((p) => p.id === product.id);
        if (index === -1) {
          product.cantidad = 1;
          set({ cart: [...cart, product] });
          return;
        }
        cart[index].cantidad += 1;
        set({ cart });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
export default useCart;