import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/reducers/cartSlice";
import { BASE_URL } from "../../utils/constants/general";
import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const PRODUCT = {
  price: "",
  title: "",
  description: "",
};

const Products = () => {
  const [state, setState] = useState(PRODUCT);

  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      state.title.trim().length &&
      state.description.trim().length &&
      state.price.trim().length
    ) {
      dispatch(
        cartActions.addCartToList({
          title: state.title,
          description: state.description,
          price: state.price,
          id: Math.random().toString(),
        })
      );
    }
    setState({
      price: "",
      description: "",
      title: "",
    });
  };

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>

      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={state.title}
          onChange={(e) => setState({ ...state, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={state.description}
          onChange={(e) => setState({ ...state, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={state.price}
          onChange={(e) => setState({ ...state, price: e.target.value })}
        />
        <button className={classes.btnToForm} type="submit">
          Add Cart
        </button>
      </form>

      <ul>
        {items?.map((item) => (
          <ProductItem
            key={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
            id={item.id}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
