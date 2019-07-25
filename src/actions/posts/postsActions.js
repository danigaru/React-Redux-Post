// importando los tipos de acciones en posts
import { OBTENER_POSTS, ERROR_CONSULTA,  NUEVO_POST, ELIMINAR_POST, OBTENER_POST, LIMPIAR_POST, EDITAR_POST } from '../../actions/posts/types'

// importando axios para realizar peticiones http
import axios from 'axios'

// TODAS LAS FUNCIONES CREADAS SERAN UNA FUNCION HIGHER ORDER FUNCTIONS 

// api a consultar
const apiURL = 'https://jsonplaceholder.typicode.com/posts'

// funcion para obtener los posts de la api
export const obtenerPost = () => async dispatch => {

    try{

        // realizando la consulta a la api
        const posts = await axios.get(apiURL)
    
        // definiendo el tipo de action que se realizara mediante el dispatch
        dispatch({
            type: OBTENER_POSTS,
            payload: posts.data
        })
    }catch(e) {
        dispatch({
            type: ERROR_CONSULTA,
            payload: true
        })
     
    }
}

// funcion para obtener un posts de la api
export const obtenerOnePost = id => async dispatch => {
    
    try {

        // realizando la consulta a la api
        const post = await axios.get(`${apiURL}/${id}`)
        
        // vallidando que exista una respuesta de la api
        if( post.status === 200 ) {
        // definiendo el tipo de action que se realizara mediante el dispatch
            dispatch({
                type: OBTENER_POST,
                payload: post.data
            })
        }
    } catch (error) {
        // definiendo el tipo de action que se realizara mediante el dispatch
        dispatch({
            type: OBTENER_POST,
            payload: 'error'
        })
    }

}

// funcion para crear un nuevo posts a la api
export const nuevoPost = post => async dispatch => {

        // realizando la consulta a la api
        const newPost = await axios.post(apiURL, post)
    
        // vallidando que exista una respuesta de la api
        if(newPost.status === 201) {
        // definiendo el tipo de action que se realizara mediante el dispatch
            dispatch({
                type: NUEVO_POST,
                payload: newPost.data
            })
        }
    
}

// funcion para editar un posts a la api
export const editarPost = post => async dispatch => {

        // realizando la consulta a la api
    const postEditado = await axios.put(`${apiURL}/${post.id}`)

    // vallidando que exista una respuesta de la api
    if( postEditado.status === 200) {
        // definiendo el tipo de action que se realizara mediante el dispatch
        dispatch({
            type: EDITAR_POST,
            payload: post
        })
    }
}

// funcion para eliminar un  posts a la api
export const eliminarPost = id => async dispatch => {

        // realizando la consulta a la api
    const postEliminado = await axios.delete(`${apiURL}/${id}`)

    // vallidando que exista una respuesta de la api
    if( postEliminado.status === 200 ) {
        // definiendo el tipo de action que se realizara mediante el dispatch
        dispatch({
            type: ELIMINAR_POST,
            payload: id
        })
    }

}

// funcion para limpiar un post 
export const limpiarPost = (post) => dispatch => {
        // definiendo el tipo de action que se realizara mediante el dispatch

    dispatch({
        type: LIMPIAR_POST,
        payload: post
    })
}