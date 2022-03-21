import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
	return async (disp) => {
		const fetchData = async () => {
			const response = await fetch(
				"https://redux-276e6-default-rtdb.firebaseio.com/cart.json"
			);
			if (!response.ok) throw new Error("Could not fetch car data");
			const data = await response.json();
			return data;
		};
		try {
			const cartData = await fetchData();
			disp(cartActions.replaceCart({
				items: cartData.items || [],
				totalQuantity: cartData.totalQuantity,
			}));
		} catch (error) {
			disp(
				uiActions.showNotification({
					status: "error",
					title: "Error",
					msg: "Fetching cart data failed!",
				})
			);
		}
	};
};

//action creator to make side-effect out of reducer.
export const sendCartData = (cart) => {
	return async (disp) => {
		disp(
			uiActions.showNotification({
				status: "pending",
				title: "Sending...",
				msg: "Sending cart data!",
			})
		);
		const sendRequest = async () => {
			const response = await fetch(
				"https://redux-276e6-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					body: JSON.stringify({
						items: cart.items,
						totalQuantity: cart.totalQuantity,
					}),
				}
			);
			if (!response.ok) throw new Error("Sending cart data failed.");
		};
		try {
			await sendRequest();
			disp(
				uiActions.showNotification({
					status: "success",
					title: "Success",
					msg: "Sent cart data sucessfully!",
				})
			);
		} catch (error) {
			disp(
				uiActions.showNotification({
					status: "error",
					title: "Error",
					msg: "Sending cart data failed!",
				})
			);
		}
	};
};