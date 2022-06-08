import React from 'react';
import { useForm } from '@inertiajs/inertia-react'
import Swal from 'sweetalert2';

export default function Reset({ error, success }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    })
    const Swal = require('sweetalert2')
    function submit(e) {
        e.preventDefault()
        post('/resetsend')
    }

    if (success) {
        Swal.fire({
            title: 'success',
            text: 'გაიგზავნა',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
    }
    return (
        <React.Fragment>
            <form onSubmit={submit} className="container w-25 shadow p-3 mb-5 bg-body rounded mt-5" >
                <h2>Reset Password</h2>
                <p>enter your email</p>
                <input className="form-control" type="text" value={data.email} onChange={e => setData('email', e.target.value)} required placeholder="Email" />
                {error ? <p className="alert-danger">araswori meili</p> : ""}
                {errors.email && <div>{errors.email}</div>}
                <button className="btn btn-primary" type="submit" disabled={processing}>reset</button>
            </form>
        </React.Fragment>
    )
}
