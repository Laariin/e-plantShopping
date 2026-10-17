
import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            const plant = action.payload;
            const existingItem = state.items.find(
                (item) => item.name === plant.name
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    ...plant,
                    quantity: 1,
                });
            }
        },

        removeItem: (state, action) => {
            state.items = state.items.filter(
                (item) => item.name !== action.payload
            );
        },

        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload;
            const item = state.items.find(
                (plant) => plant.name === name
            );

            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },
    },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
