import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropDown from "../../components/cart-dropdown/cart-dropdown.component";
import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";
import { signOutUser } from "../../utills/firebase/firebase.utills";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";

import {
  NavigationContainer,
  Navlink,
  Navlinks,
  LogoContainer,
} from "./navigation.styles";
const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo " />
        </LogoContainer>
        <Navlinks>
          <Navlink to="/shop">SHOP</Navlink>
          {currentUser ? (
            <Navlink as="span" onClick={signOutUser}>
              SIGN OUT
            </Navlink>
          ) : (
            <Navlink to="/auth ">SIGN IN</Navlink>
          )}
          <CartIcon />
        </Navlinks>
        {isCartOpen && <CartDropDown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};
export default Navigation;
