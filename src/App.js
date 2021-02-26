import React, { useState, useEffect } from "react";
import Products from "./components/Products/Products";
import NavBar from "./components/Navbar/Navbar";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { commerce } from "./lib/commerce";
import Cart from "./components/Cart/Cart";
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    try {
      const { data } = await commerce.products.list();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await commerce.cart.retrieve();
      setCart(res);
    } catch (err) {
      console.log(err);
    }
  };
  const emptyCart = async () => {
    const res = await commerce.cart.empty();
    console.log(res);
    setCart(res.cart)
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
    
  };

  const removeCartItem = async(productId) => {
    const res = await commerce.cart.remove(productId);
    console.log(res)
    setCart(res.cart);
  }

  const updateCartItem = async(productId, newquantity) => {
    console.log(`${newquantity}prev quantity`)
    const item = await commerce.cart.update( productId, {quantity: newquantity});
    console.log(`${newquantity}new quantity`)
    console.log(item)
    setCart(item.cart)
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []); //component did mount in class based componenets
  //console.log(products);
  //console.log(cart.total_items);
  console.log(cart);
  return (
    <Router>
      <div>
      <NavBar totalItems={cart.total_items}  />
        <h1>Hello</h1>
        
        <Switch>
        <Route exact path = "/"><Products products={products} onAddtoCart={handleAddToCart} /></Route>
        <Route exact path = "/cart"><Cart cart = {cart} emptyCart={emptyCart} updateCart = {updateCartItem} removeCartItem = {removeCartItem}/></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
