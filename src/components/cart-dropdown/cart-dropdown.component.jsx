import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/cart.context";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import {CartDropDownContainer, EmptyMEss,CartItems} from "./cart-dropdown.styles";

const CartDropDown = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const goToCheckOutHandler = () => {
    navigate("/checkout");
  };

  return (
    <CartDropDownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMEss> Your Cart is Empty </EmptyMEss>
        )}
      </CartItems>
      <Button onClick={goToCheckOutHandler}>Checkout</Button>
    </CartDropDownContainer >
  );
};
export default CartDropDown;
