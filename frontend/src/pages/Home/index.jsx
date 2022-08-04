import React, { useEffect, useState } from 'react'
import './index.scss'
import axios from 'axios'
import Categories from '../../components/categories'
import AddProducts from '../../components/addProducts'
import Products from '../../components/products'

export default function Index() {

    // useEffect(() => {
    //     async function connect() {
    //         const res = await axios.get('http://localhost:4001/')
    //         console.log(res.data)
    //     }
    //     connect()
    // }, [])

    const [page, setPage] = useState(1)

    return (
        <>
            <div className="home">
                <ul className='pageHeads'>
                    <li onClick={() => setPage(1)}>Create Categories</li>
                    <li onClick={() => setPage(2)}>Add New Products</li>
                    <li onClick={() => setPage(3)}>Products</li>
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