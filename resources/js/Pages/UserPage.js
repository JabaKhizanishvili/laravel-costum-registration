import React, { useState } from 'react'
import { useForm } from '@inertiajs/inertia-react'

export default function UserPage({ id, email, images, links, address, products, prodlinks }) {
    const { data, setData, post, progress } = useForm({
        avatar: null,
    })
    const [show, setShowDiv] = useState('false');
    const [color, setColor] = useState('red');
    const changeColor = () => {
        setShowDiv(!show)
        setColor('red')
        if (color == 'red') {
            setColor('green')
        } else {
            setColor('red')
        }
    }

    function submit(e) {
        e.preventDefault()
        post('/img')
    }

    // address add
    const { dataa, setDataa } = useForm({
        address: "",
    })
    function submitAddress(e) {
        e.preventDefault()
        post('/address')
    }

    return (
        <React.Fragment>
            {
                show ? <h2>Page user id {id} User email {email}</h2> : ""
            }


            <a href='/logout' className='btn btn-danger'>LogOut</a>

            <form onSubmit={submit} className='container w-25'>
                <input type="file" className='form-control' onChange={e => setData('avatar', e.target.files[0])} />
                <button type="submit" className='btn btn-primary'>Submit</button>
            </form>

            <h2>Add Address</h2>

            <form onSubmit={submitAddress} className='container w-25'>
                <input type="text" className='form-control' onChange={e => setData('address', e.target.value)} />
                <button type="submit" className='btn btn-primary'>Submit</button>
            </form>


            <button type="submit" className='btn btn-primary' style={{ backgroundColor: color }} onClick={changeColor} >click</button>

            <h3>addresses</h3>
            {
                address.map((e, i) => {
                    return (
                        // <React.Fragment>
                        <p key={i}>{e.address}</p>
                        // </React.Fragment>
                    )
                })
            }
            {
                images.map((e, i) => {
                    return (
                        <div key={i} className='container'>
                            <p>{e.name}</p>
                            <img src={links + "/" + e.name}></img>
                            <p>{links + "/" + e.name}</p>
                            <button className="btn btn-danger" onClick={() => { location.href = '/delImg?id=' + e.id }}>del</button>
                        </div>
                    )
                })
            }

            <div className="shadow p-3 mb-5 bg-body rounded">
                <h2>Products</h2>
                {
                    products.map((e, i) => {
                        return (
                            <div key={i} className="shadow p-3 mb-5 bg-body rounded">
                                <img src={prodlinks + '/' + e.img} />
                                <h5>Name</h5>
                                <p>{e.name}</p>
                                <h5>Price</h5>
                                <p>{e.price}</p>
                            </div>
                        )
                    })
                }
            </div>

        </React.Fragment >
    )
}
