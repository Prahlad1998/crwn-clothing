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

export const CartContext=createContext({
    isCartOpen:false,
    setIsCartOpen:()=>{
    },
    cartItems:[],
    addItemToCart:()=>{},//function that will be used to add item to the cart
    cartCount:0,
})

export const CartProvider=({children})=>{
    //initialize
    const [isCartOpen,setIsCartOpen]=useState(false);
    const [cartItems,setCartItems]=useState([]);
    const [cartCount,setCartCount]=useState(0);
    // we will use useeffect hooks to count the total item in the cart. we will pass a callback function,which will run whenever the dependencies i.e the cartitem's quantity value changes.
    useEffect(()=>{
        const newCartCount=cartItems.reduce((total,cartItem)=>total+cartItem.quantity,0)
        setCartCount(newCartCount);
    },[cartItems]);


    //the following function will be triggered whenever the user will cick the add to cart button
    const addItemToCart=(productToAdd)=>{
        setCartItems(addCartItem(cartItems,productToAdd));

    }
    const value ={isCartOpen,setIsCartOpen,addItemToCart,cartItems,cartCount};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}