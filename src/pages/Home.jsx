import React, { useState, useEffect } from 'react';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ProductList from '../components/ProductList';
import Categories from '../components/Categories';
import basicOps from '../utility/basicOps';
import { usePaginationContext } from '../contexts/PaginationContext';
import axios from 'axios';
import URL from '../urlConfig';

function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortDir, setsortDir] = useState(0);
    const [currCategory, setCurrCategory] = useState("All categories");

    const { pageSize, pageNum, setPageNum } = usePaginationContext();

    useEffect(() => {
        (async function () {
            const productData = await axios(URL.GET_PRODUCTS);
            setProducts(productData.data.message || []);
        })();
    }, []);

    useEffect(() => {
        (async function () {
            const categoriesData = await axios(URL.GET_CATEGORIES);
            setCategories(categoriesData.data.message || []);
        })();
    }, []);

    const object = basicOps(products, searchTerm, sortDir, currCategory, pageNum, pageSize) || {
        filteredSortedgroupByArr: [],
        totalPages: 1
    };

    const filteredSortedgroupByArr = object.filteredSortedgroupByArr;
    const totalPages = object.totalPages || 1;

    return (
        <>
            <header className="nav_wrapper">
                <div className="search_sortWrapper">
                    <input
                        className='search_input'
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setPageNum(1);
                        }}
                    />

                    <div className="icons_container">
                        <div
                            className="sort_btn"
                            onClick={() => {
                                setsortDir(1);
                                setPageNum(1);
                            }}
                            title="Sort price low to high"
                        >
                            <ArrowCircleUpIcon style={{ color: "white" }} fontSize="large" />
                        </div>

                        <div
                            className="sort_btn"
                            onClick={() => {
                                setsortDir(-1);
                                setPageNum(1);
                            }}
                            title="Sort price high to low"
                        >
                            <ArrowCircleDownIcon style={{ color: "white" }} fontSize="large" />
                        </div>
                    </div>
                </div>

                <div className="categories_wrapper">
                    <Categories
                        categories={categories}
                        setCurrCategory={setCurrCategory}
                        currCategory={currCategory}
                    />
                </div>
            </header>

            <main className="product_wrapper">
                <ProductList productList={filteredSortedgroupByArr} />
            </main>

            <div className="pagination">
                <button
                    onClick={() => {
                        if (pageNum === 1) return;
                        setPageNum((pageNum) => pageNum - 1);
                    }}
                    disabled={pageNum === 1}
                >
                    <KeyboardArrowLeftIcon fontSize='large' />
                </button>

                <div className="pagenum">{pageNum}</div>

                <button
                    onClick={() => {
                        if (pageNum === totalPages) return;
                        setPageNum((pageNum) => pageNum + 1);
                    }}
                    disabled={pageNum === totalPages}
                >
                    <ChevronRightIcon fontSize='large' />
                </button>
            </div>
        </>
    );
}

export default Home;