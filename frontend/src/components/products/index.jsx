import React, { useEffect, useState } from 'react'
import './index.scss'
import axios from 'axios'

export default function Products() {

    const [categories, setCategories] = useState()
    const [selectedCategory, setSelectedCategory] = useState()

    useEffect(() => {
        async function getCategories() {
            const res = await axios.get('http://localhost:4001/categories')
            setCategories(res.data)
        }
        getCategories()
    }, [])

    async function getCategoryDetails(id, category) {
        const res = await axios.get('http://localhost:4001/category/' + id)
        let data = { subs: res.data[0].subCategories }
        data.subs.push(category)
        const res2 = await axios.put('http://localhost:4001/products', data)

        let output = {
            title: res.data[0].category,
            subCategories: res.data[0].subs,
            products: res2.data
        }
        setSelectedCategory(output)
    }

    return (
        <>
            <div className='products'>
                <h1>products</h1>
                <ul>
                    {categories &&
                        categories.map((obj, i) => {
                            return (
                                <li key={i} onClick={() => getCategoryDetails(obj._id, obj.category)} >{obj.category}</li>
                            )
                        })
                    }
                </ul>


            </div>

            <div className='details'>
                {selectedCategory && selectedCategory.title}
                <h5>Sub categories</h5>
                <ul>
                    {selectedCategory && selectedCategory.subCategories.map((obj, i) => {
                        return (
                            <li key={i} onClick={() => getCategoryDetails(obj._id, obj.category)}>{obj.category}</li>
                        )
                    })}
                </ul>

                <h5>Products</h5>
                <ul>
                    {selectedCategory && selectedCategory.products.map((obj, i) => {
                        return (
                            <li key={i}>{obj.product}</li>
                        )
                    })}
                </ul>
            </div>
        </>
    )
}
