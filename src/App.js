import React, { useState, useEffect } from "react";
import Products from "./components/Products/Products";
import NavBar from "./components/Navbar/Navbar";
import { commerce } from "./lib/commerce";
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
  };

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
    //console.log(res.cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []); //component did mount in class based componenets
  //console.log(products);
  console.log(cart.total_items);
  return (
    <div>
      <h1>Hello</h1>
      <Products products={products} onAddtoCart={handleAddToCart} />
      <NavBar totalItems={cart.total_items} emptyCart={emptyCart} />
    </div>
  );
};

export default App;
