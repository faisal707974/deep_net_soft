import React from 'react'
import { useEffect, useState } from 'react'
import './index.scss'
import axios from 'axios'

export default function Categories() {

    const [categories, setCategories] = useState()

    useEffect(() => {
        async function getCategories() {
            const res = await axios.get('http://localhost:4001/categories')
            setCategories(res.data)
        }
        getCategories()
    }, [])

    async function formSubmission(e) {
        e.preventDefault()

        let subCategories = []
        for (let i = 1; i < e.target.length - 1; i++) {
            if (e.target[i].checked === true) {
                console.log(e.target[i].defaultValue)
                subCategories.push(e.target[i].defaultValue)
            }
        }

        let data =
        {
            category: e.target[0].value,
            subCategories: subCategories
        }

        const res = await axios.post('http://localhost:4001/categories', data)
        console.log(res)
    }

    return (
        <>
            <div className='categories'>
                <form action="" onSubmit={formSubmission}>

                    <div className='first'>
                        <span>
                            <label htmlFor='category'>Category name</label>
                            <input name='category' id='category' type="text" />
                        </span>
                    </div>
                    <div className='second'>
                        <label className='heading'>Sub categories</label>
                        <div className="spans">
                            {
                                categories ? categories.map((object, i) => {
                                    return (
                                        <span key={i}>
                                            <input id={object.category} value={object.category} name={object.category} type="checkbox" />
                                            <label htmlFor="">{object.category}</label>
                                            <br />
                                        </span>
                                    )
                                }) : "category list is empty"
                            }
                        </div>
                    </div>
                    <div className='saveButton'>
                        <button>Save</button>
                    </div>
                </form>

            </div>
        </>
    )
}
