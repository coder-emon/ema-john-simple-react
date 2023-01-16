import React, { useEffect, useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const [cart, setCart] = useState([]);
  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exists = cart.find((product) => product.id === selectedProduct.id);
    if (!exists) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
      setCart(newCart);
    } else {
      const rest = cart.filter((product) => product.id !== selectedProduct.id);
      selectedProduct.quantity = exists.quantity + 1;
      newCart = [...rest, selectedProduct];
    }

    setCart(newCart);
    addToDb(selectedProduct.id);
  };

  useEffect(() => {
    const storedCart = getShoppingCart();
    const saveCart = [];
    if (storedCart) {
      for (const id in storedCart) {
        const addedProduct = products.find((product) => product.id === id);
        if (addedProduct) {
          const quantiy = storedCart[id];
          addedProduct.quantity = quantiy;
          saveCart.push(addedProduct);
        }
      }
    }
    setCart(saveCart);
  }, [products, cart]);
  return (
    <div className="shop-container">
      <div className="product-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
