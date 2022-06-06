import React from 'react'

export default function UserPage({ id, email }) {
    return (
        <React.Fragment>
            <h2>Page user id {id} User email {email}</h2>

            <a href='/logout' className='btn btn-danger'>LogOut</a>
        </React.Fragment>
    )
}
