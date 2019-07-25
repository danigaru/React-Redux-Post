// importando los tipos de acciones en posts
import { OBTENER_POSTS, OBTENER_POST, ERROR_CONSULTA, NUEVO_POST, EDITAR_POST, LIMPIAR_POST, ELIMINAR_POST } from '../actions/posts/types'

// state inicial
const initialState = {
    posts: [],
    post: {},
    error: false,
    errorEdit: false,
}

// exportando la funcion de reducers 
export default function(state = initialState, action ) {
    switch(action.type) {

        // caso para oobtener todos los posts
        case OBTENER_POSTS: 
         return {
             ...state,
             posts : action.payload,
             post: {},
             errorEdit: false
         }
        
        // caso para oobtener un post
        case OBTENER_POST: 
            return {
                ...state,
                post: action.payload !== 'error' ? action.payload : {},
                errorEdit: action.payload === 'error' ? true : false
            }

        // caso para crear nuevo post
        case NUEVO_POST: 
            return {
                ...state,
                posts: [...state.posts, action.payload],
                post: {}
            }

         // caso para crear editar post
        case EDITAR_POST:
            return {
                ...state,
                posts: state.posts.map( post => 
                    post.id === parseInt(action.payload.id) ? action.payload : post    
                )
            }

         // caso para eliminar  post
        case ELIMINAR_POST: 
            return {
                ...state,
                posts: state.posts.filter( post => post.id !== action.payload ),
                post: {}
            }

         // caso para limpiar un post
        case LIMPIAR_POST: 
            return {
                ...state,
                post: action.payload
            }

         // caso para cuando existe un error al consultar api
         case ERROR_CONSULTA: 
            return {
                error: action.payload
            }

         default:
            return state
    }
}

