import React from 'react';
import { usePaginationContext } from '../contexts/PaginationContext';

function Categories(props) {
  const { categories, setCurrCategory, currCategory } = props;
  const { setPageNum } = usePaginationContext();

  return (
    <>
      <button
        className={`category_option ${currCategory === "All categories" ? "active" : ""}`}
        onClick={() => {
          setCurrCategory("All categories");
          setPageNum(1);
        }}
      >
        All categories
      </button>

      {categories.map((category) => {
        return (
          <button
            key={category}
            className={`category_option ${currCategory === category ? "active" : ""}`}
            onClick={() => {
              setCurrCategory(category);
              setPageNum(1);
            }}
          >
            {category}
          </button>
        );
      })}
    </>
  );
}

export default Categories;