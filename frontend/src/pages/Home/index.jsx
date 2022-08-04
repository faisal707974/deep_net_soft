import React, { useEffect, useState } from 'react'
import './index.scss'
import axios from 'axios'
import Categories from '../../components/categories'
import AddProducts from '../../components/addProducts'
import Products from '../../components/products'

export default function Index() {

    const [page, setPage] = useState(2)

    return (
        <>
            <div className="home">
                <ul className='pageHeads'>
                    <li onClick={() => setPage(1)} className={page === 1 && 'active'}>Create Categories</li>
                    <li onClick={() => setPage(2)} className={page === 2 && 'active'}>Add New Products</li>
                    <li onClick={() => setPage(3)} className={page === 3 && 'active'}>Products</li>
                </ul>

                {
                    page === 1 ? <Categories /> :
                        page === 2 ? <AddProducts /> :
                            page === 3 ? <Products /> : null
                }

            </div>
        </>
    )
}