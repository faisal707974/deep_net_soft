import React, { useEffect, useState } from 'react'
import './index.scss'
import axios from 'axios'

export default function AddProducts() {

    const [categories, setCategories] = useState()

    useEffect(() => {
        async function getCategories() {
            const res = await axios.get('http://localhost:4001/categories')
            setCategories(res.data)
        }
        getCategories()
    }, [])

    async function saveForm(e) {
        e.preventDefault()

        let data =
        {
            product: e.target[0].value,
            category: e.target[1].value
        }
        const res = await axios.post('http://localhost:4001/products', data)
        console.log(res)
    }

    return (
        <>
            <div className='addProducts'>
                <form action="" onSubmit={saveForm}>
                    <div className='first'>

                        <label htmlFor="">Product Name</label>
                        <input type="text" />
                    </div>
                    <div className='second'>
                        <label htmlFor="">Category</label>
                        <select name="" id="">
                            {categories ? categories.map((obj, i) => {
                                return (
                                    <option value={obj.category}>{obj.category}</option>
                                )
                            }) : null}
                        </select>
                    </div>
                    <div className='third'>
                        <button>Save</button>
                    </div>
                </form>

            </div>
        </>
    )
}


