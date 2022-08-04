import React, { useEffect } from 'react'
import './index.scss'
import axios from 'axios'

export default function Index() {

    useEffect(() => {
        async function connect(){
            const res = await axios.get('http://localhost:4001/')
            console.log(res.data)
        }
        connect()
    }, [])

    return (
        <>
            <div className="home">
                <ul>
                    <li>Create Categories</li>
                    <li>Add New Products</li>
                    <li>Products</li>
                </ul>

            </div>
        </>
    )
}