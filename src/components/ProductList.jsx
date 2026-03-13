import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { action } from '../redux/slices/cartSlice';

function ProductList(props) {
  const { productList = [] } = props;

  const productLists = productList.map((product) => {
    return {
      id: product._id,
      title: product.name || product.title,
      image: product.productImages?.[0] || product.image,
      price: product.price,
      description: product.description,
      category: product.categories,
      ...product
    };
  });

  const cartProducts = useSelector((store) => store.cartReducer.cartProducts);
  const dispatch = useDispatch();

  const handleAddProduct = (product) => {
    dispatch(action.addToCart(product));
  };

  const handleDeleteProduct = (product) => {
    dispatch(action.deleteFromCart(product));
  };

  if (!productLists.length) {
    return (
      <div className="empty_state">
        <h2>No products found</h2>
        <p>Try changing the search text, category, or sort option.</p>
      </div>
    );
  }

  return (
    <>
      {productLists.map((product) => {
        return (
          <div className="product" key={product.id}>
            <Link
              to={`/product/${product.id}`}
              state={{ product }}
              className="product_link"
            >
              <img
                src={product.image}
                alt={product.title}
                className='product_image'
              />

              <div className="product_meta">
                <p className="product_title">{product.title}</p>
                <p className='Price'>${product.price}</p>
                {product.category && (
                  <p className="product_category">{product.category}</p>
                )}
              </div>
            </Link>

            <div className="add_to_cart_container">
              <IndeterminateCheckBoxIcon
                className="qty_icon"
                onClick={() => {
                  handleDeleteProduct(product);
                }}
              />

              <div className="currentCartCount">
                <PrintCount cartProducts={cartProducts} id={product.id} />
              </div>

              <AddBoxIcon
                className="qty_icon"
                onClick={() => {
                  handleAddProduct(product);
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
}

function PrintCount(props) {
  const { cartProducts, id } = props;
  let quantity = 0;

  for (let i = 0; i < cartProducts.length; i++) {
    if (cartProducts[i].id === id) {
      quantity = cartProducts[i].indQuantity;
    }
  }

  return <>{quantity}</>;
}

export default ProductList;