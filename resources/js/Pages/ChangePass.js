import React from 'react';
import { useForm } from '@inertiajs/inertia-react'

export default function ChangePass({ id }) {
    const { data, setData, post, processing, errors } = useForm({
        new_password: '',
        id: id,
    })
    function submit(e) {
        e.preventDefault()
        post('/resetpassword')
    }
    return (
        <React.Fragment>
            <form onSubmit={submit} className="container w-25 shadow p-3 mb-5 bg-body rounded mt-5" >
                <h2>Reset Password</h2>
                <p>enter new password</p>
                <input className="form-control" type="text" value={data.new_password} onChange={e => setData('new_password', e.target.value)} required placeholder="new_password" />
                {/* <input type='hidden' className="form-control" value={data.id} onChange={e => setData('id', e.target.value)} required placeholder="id" /> */}
                {errors.new_password && <div>{errors.new_password}</div>}
                <button className="btn btn-primary" type="submit" disabled={processing}>reset</button>
            </form>
        </React.Fragment>
    )
}
