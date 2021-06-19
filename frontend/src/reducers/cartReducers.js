import {
  ADD_TO_CART,
  SAVE_TO_STORAGE,
  REMOVE_ITEM_CART,
  REMOVE_FROM_STORAGE,
  EMPTY_CART,
  SAVE_SHIPPING_INFO,
} from '../constants/cartConstants';

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExists = state.cartItems.find(
        (i) => i.product === item.product
      );
      if (isItemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExists.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case SAVE_TO_STORAGE:
      const storedItem = action.payload;

      const isStoredItem = state.storedItems.find(
        (item) => item.id === storedItem.id
      );
      if (isStoredItem) {
        return {
          ...state,
          storedItems: state.storedItems.map((i) =>
            i.id === isStoredItem.id ? storedItem : i
          ),
        };
      } else {
        return {
          ...state,
          storedItems: [...state.storedItems, storedItem],
        };
      }
    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };
    case REMOVE_FROM_STORAGE:
      return {
        ...state,
        storedItems: state.storedItems.filter((i) => i.id !== action.payload),
      };
    case EMPTY_CART:
      localStorage.removeItem('cartItems');
      return {
        cart: {},
      };
    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        sgippingInfo: action.payload,
      };
    default:
      return state;
  }
};
