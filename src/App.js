import { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector, useDispatch } from "react-redux";
import { sendCartData, fetchCartData } from './components/store/cart-action';
let isInitial = true;

function App() {
	const dispatch = useDispatch();
	const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);

	useEffect(() => {
		//첫실행때 보내지않음.
		if (isInitial) {
			isInitial = false;
      dispatch(fetchCartData());
			return;
		}
    if (cart.changed)
      dispatch(sendCartData(cart));
	}, [cart, dispatch]);

	return (
		<Fragment>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					msg={notification.msg}
				/>
			)}
			<Layout>
				{cartIsVisible && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
