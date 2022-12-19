import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiActions } from "./store/reducers/uiSlice";
import Notification from "./components/UI/Notification";
import { sendCartData } from "./store/reducers/cartSlice";
let isInitial = true;
function App() {
  const { notification } = useSelector((state) => state.ui);

  const cart = useSelector((state) => state.cart);
  const isShow = useSelector((state) => state.ui.cartVisible);
  const dispatch = useDispatch();

  useEffect(() => {
    let timerId;
    if (notification) {
      timerId = setTimeout(() => {
        dispatch(uiActions.hideNotification());
      }, 2000);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [notification, dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);
  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {isShow && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
