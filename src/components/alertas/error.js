import React from 'react'

// componente mostrara un alerta de error
const Error = ({message}) => (
    <div className="alert alert-warning text-uppercase text-center py-3"> { message} </div>
)
 
export default Error;