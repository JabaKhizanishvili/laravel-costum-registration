import React, { useState } from 'react'
import { useForm } from '@inertiajs/inertia-react'

export default function UserPage({ id, email, images, links }) {
    const { data, setData, post, progress } = useForm({
        avatar: null,
    })
    const [color, setColor] = useState('red');
    const changeColor = () => {
        setColor('red')
        if (color == 'red') {
            setColor('green')
        } else {
            setColor('red')
        }
        console.log(color);
    }

    function submit(e) {
        e.preventDefault()
        post('/img')
    }

    return (
        <React.Fragment>
            <h2>Page user id {id} User email {email}</h2>

            <a href='/logout' className='btn btn-danger'>LogOut</a>

            <form onSubmit={submit} className='container w-25'>
                <input type="file" className='form-control' onChange={e => setData('avatar', e.target.files[0])} />
                <button type="submit" className='btn btn-primary'>Submit</button>
            </form>

            <button type="submit" className='btn btn-primary' style={{ backgroundColor: color }} onClick={changeColor} >click</button>

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
        </React.Fragment >
    )
}
