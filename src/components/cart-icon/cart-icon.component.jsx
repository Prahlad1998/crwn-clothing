import { useState,useContext } from 'react';


import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'; 
import { CartContext } from '../../context/cart.context';

import {ShoppingIconSvg,CarticonContainer,ItemCount} from './cart-icon.styles';

const CartIcon=()=>{
    const {isCartOpen, setIsCartOpen,cartCount}=useContext(CartContext);
    const toggleIsCartOpen=()=>{setIsCartOpen(!isCartOpen);}
         
    
    return(
        < CarticonContainer onClick={toggleIsCartOpen}>
             <ShoppingIcon className='shopping-icon'/>
                <ItemCount>{cartCount}</ItemCount>
        </CarticonContainer>
       
    )
}
export default CartIcon;