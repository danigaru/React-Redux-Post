import Swal from 'sweetalert2'

// alerta para éxito
export const success = (title, text) => {
    Swal.fire({
        type: 'success',
        title,
        text
    })
}
// alerta para error

export const error = (title, text) => {
    Swal.fire({
        type: 'error',
        title,
        text
      })
}
