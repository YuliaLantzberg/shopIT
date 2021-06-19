import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { EMPTY_CART } from '../../constants/cartConstants';

import MetaData from '../layout/MetaData';

const OrderSuccess = () => {
  //Empty cart and local storage
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: EMPTY_CART });
  });

  return (
    <Fragment>
      <MetaData title={'Order Success'} />
      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src="/images/order_success.png"
            alt="Order Success"
            width="200"
            height="200"
          />

          <h2>Your Order has been placed successfully.</h2>

          <Link to="/orders/me">Go to Orders</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;
