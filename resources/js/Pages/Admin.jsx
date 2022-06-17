import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia'
import { useForm } from '@inertiajs/inertia-react';

// export default class Admin extends React.Component {

//     render() {
//         return (
//             <React.Fragment>
//                 <h2>Admin</h2>
//             </React.Fragment>
//         )
//     }
// }


const Admin = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    })

    function submit(e) {
        e.preventDefault()
        post('/adminlogin')
    }
    return (
        <React.Fragment>
            <form onSubmit={submit} className='container w-25'>
                <h2>mail</h2>
                <input type="email" className='form-control' value={data.email} onChange={e => setData('email', e.target.value)} />
                {errors.email && <div>{errors.email}</div>}
                <h2>password</h2>
                <input type="password" className='form-control' value={data.password} onChange={e => setData('password', e.target.value)} />
                {errors.password && <div>{errors.password}</div>}
                <button className='btn btn-primary' type="submit" disabled={processing}>Login</button>
            </form>
        </React.Fragment>
    )
}

export default Admin;
