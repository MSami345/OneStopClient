import {create} from 'zustand';

const useCartStore = create((set) => ({
    cartItems: [],
    addToCart: (product) => set((state) => ({
        cartItems: [...state.cartItems, {...product,quantity:1}],
    })),
    removeFromCart: (productId) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== productId),
    })),
    updateCartItem: (productId, newQuantity) => set((state) => ({
        cartItems: state.cartItems.map(item => 
            item.id === productId ? { ...item, quantity: newQuantity } : item
        ),
    })),
    clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
