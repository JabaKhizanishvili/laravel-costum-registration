import React from 'react';
import { useForm } from '@inertiajs/inertia-react';
import Swal from 'sweetalert2'
import { info } from 'laravel-mix/src/Log';
const Adminpanel = ({ success, products }) => {
    const Swal = require('sweetalert2')
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        // img: null,
    })

    if (success) {
        Swal.fire({
            title: 'success!',
            text: 'Do you want to continue',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
    }

    console.log(products);
    function submit(e) {
        e.preventDefault()
        post('/addprod')
    }

    return (
        <React.Fragment>
            <h2>Adminpanel</h2>
            <form onSubmit={submit} className='container w-25'>
                <input type="text" className='form-control' value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Name" />
                <input type="number" className='form-control' value={data.price} onChange={e => setData('price', e.target.value)} placeholder="price" />
                {/* {errors.email && <div>{errors.email}</div>} */}
                <input type="file" className='form-control' onChange={e => setData('img', e.target.files[0])} />
                <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
        </React.Fragment>
    )
}

export default Adminpanel;
