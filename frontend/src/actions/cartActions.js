import axios from 'axios';
import {
  ADD_TO_CART,
  SAVE_TO_STORAGE,
  REMOVE_ITEM_CART,
  REMOVE_FROM_STORAGE,
  SAVE_SHIPPING_INFO,
} from '../constants/cartConstants';

export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  dispatch({
    type: SAVE_TO_STORAGE,
    payload: {
      id: data.product._id,
      quantity,
    },
  });
  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cart.storedItems)
  );
  // localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// export const loadCart = () => async (dispatch, getState) => {
//   const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));
//   const products = await axios.get()
//   await storedCartItems.forEach(async (item) => {
//     const data = await getState().products.products.find(
//       (product) => product._id === item.id
//     );
//     if (data) {
//       console.log('data', data);
//       dispatch({
//         type: ADD_TO_CART,
//         payload: {
//           product: data._id,
//           name: data.name,
//           price: data.price,
//           image: data.images[0].url,
//           stock: data.stock,
//           quantity: item.quantity,
//         },
//       });
//     }
//   });
// };

export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_CART,
    payload: id,
  });

  dispatch({
    type: REMOVE_FROM_STORAGE,
    payload: id,
  });

  localStorage.setItem(
    'cartItems',
    JSON.stringify(getState().cart.storedItems)
  );
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem('shippingInfo', JSON.stringify(data));
};
