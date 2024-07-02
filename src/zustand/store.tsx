import {create} from 'zustand';

type dataType = {
  image: string[];
  title: string;
  description: string;
  price: number;
  id: number;
  quantity: number;
};

type store = {
  cart: dataType[];
  addToCart: (item: dataType) => void;
  removeToCart: (id: number) => void;
  increaseCount: (id: number) => void;
  decreaseCount: (id: number) => void;
};

const useStore = create<store>()(set => ({
  cart: [],
  addToCart: value =>
    set(state => ({cart: [...state.cart, {...value, quantity: 1}]})),
  removeToCart: id =>
    set(state => ({cart: state.cart.filter(item => item.id !== id)})),
  increaseCount: id =>
    set(state => ({
      cart: state.cart.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    })),
  decreaseCount: id =>
    set(state => ({
      cart: state.cart.map(item =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity > 0 ? item.quantity + 1 : item.quantity,
            }
          : item,
      ),
    })),
}));
