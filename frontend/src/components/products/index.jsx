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

        let reduced = res2.data.reduce((acc, curr) => {
            return acc[curr.category] ? ++acc[curr.category] : acc[curr.category] = 1, acc
        }, {})

        let counted = res.data[0].subs.map((obj) => {
            return ({ ...obj, count: reduced[obj.category] })
        })

        console.log(counted)


        let output = {
            title: res.data[0].category,
            subCategories: counted,
            products: res2.data
        }


        console.log(res.data[0].subs)
        // console.log(output)

        setSelectedCategory(output)
    }
    // console.log(selectedCategory)

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
                            <li key={i} onClick={() => getCategoryDetails(obj._id, obj.category)}>{obj.category} {obj.count && '(' + obj.count + ')'} </li>
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
