import React from 'react'
import { useForm } from '@inertiajs/inertia-react'
import Swal from 'sweetalert2'

export default function Login({ success }) {
    const Swal = require('sweetalert2')
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    })

    function submit(e) {
        e.preventDefault()
        post('/loginuser')
    }
    if (success) {
        Swal.fire({
            title: 'success',
            text: 'თქვენ წარმატებით გაიარეთ რეგისტრაცია',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
        setTimeout(() => {
            location.reload()
        }, 2000);
    }

    return (
        <React.Fragment>
            <form onSubmit={submit} className="container w-25 shadow p-3 mb-5 bg-body rounded" >
                <h2>Login</h2>
                <input className="form-control" type="text" value={data.email} onChange={e => setData('email', e.target.value)} required placeholder="Email" />
                {errors.email && <div>{errors.email}</div>}
                <input className="form-control" type="password" value={data.password} onChange={e => setData('password', e.target.value)} required placeholder="Password" />
                {errors.password && <div className='alert alert-danger'>{errors.password}</div>}
                <button className="btn btn-primary" type="submit" disabled={processing}>Login</button>
                <p>Forgot Password?</p>
                <a href='/reset' className="btn btn-info">reset password</a>
            </form>

        </React.Fragment>

    )

}
