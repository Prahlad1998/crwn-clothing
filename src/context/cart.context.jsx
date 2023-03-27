import { createContext,useState,useEffect } from "react";

const addCartItem=(cartItems,productToAdd)=>{
    //find if cartItems contains ProductToAdd
    const existingCartItems= cartItems.find(
        (cartItem)=>cartItem.id===productToAdd.id);
    //if found true incr quantity
        if(existingCartItems){
            return cartItems.map((cartItem)=>cartItem.id === productToAdd.id?{...cartItem,quantity:cartItem.quantity+1}:cartItem
            );
        }
    //return new array with modified cartItems /new cart items
    return [...cartItems,{...productToAdd, quantity:1 }];

};
const removeCartItem=(cartItems,cartItemToRemove)=>{
    //find the cart item to remove which is in the cart already
    const existingCartItems= cartItems.find(
        (cartItem)=>cartItem.id===cartItemToRemove.id);
    //check if the quantity is equal to one,if it is then remove the item from the cart
    if (existingCartItems.quantity===1){
        return cartItems.filter(cartItem=>cartItem.id!=  cartItemToRemove.id);
    }

    //return back cart items with reduced quantity
    return cartItems.map((cartItem)=>cartItem.id === cartItemToRemove.id?{...cartItem,quantity:cartItem.quantity-1}:cartItem
     );
}
const clearCartItem=(cartItems,cartItemToClear)=>
    cartItems.filter((cartItem)=>cartItem.id != cartItemToClear.id);

export const CartContext=createContext({
    isCartOpen:false,
    setIsCartOpen:()=>{
    },
    cartItems:[],
    addItemToCart:()=>{},
    //function that will be used to add item to the cart
    removeItemFromCart:()=>{},
    cartCount:0,
    clearItemFromCart:()=>{},
   cartTotal:0,
})

export const CartProvider=({children})=>{
    //initialize
    const [isCartOpen,setIsCartOpen]=useState(false);
    const [cartItems,setCartItems]=useState([]);
    const [cartCount,setCartCount]=useState(0);
    const [cartTotal,setCartTotal]=useState(0);
    // we will use useeffect hooks to count the total item in the cart. we will pass a callback function,which will run whenever the dependencies i.e the cartitem's quantity value changes.
    useEffect(()=>{
        const newCartCount=cartItems.reduce((total,cartItem)=>total+cartItem.quantity,0)
        setCartCount(newCartCount);
    },[cartItems]);
//the follwing useEffect for calculating total cart value
    useEffect(()=>{
        const newCartTotal=cartItems.reduce((total,cartItem)=>total+cartItem.quantity*cartItem.price,0)
        setCartTotal(newCartTotal);
    },[cartItems]);


    //the following function will be triggered whenever the user will cick the add to cart button
    const addItemToCart=(productToAdd)=>{
        setCartItems(addCartItem(cartItems,productToAdd));
    }
    const removeItemFromCart=(cartItemToRemove)=>{
        setCartItems(removeCartItem(cartItems,cartItemToRemove));
    }
    const clearItemFromCart=(cartItemToClear)=>{
        setCartItems(clearCartItem(cartItems,cartItemToClear));
    }
    const value =
    {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal,
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}