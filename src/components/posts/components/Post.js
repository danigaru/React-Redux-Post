import React from 'react'
import Button from '../../../styled-components/Button'
import { Link } from 'react-router-dom'

// realizando destructuring a los props 
const Post = ({post, eliminarPost}) => (

    // componente mostrará el listado de todos los post
    <tr>
        <td>{post.id}</td>
        <td>{post.title}</td>
        <td>{post.body}</td>
        <td >
            {/* redireccionar al usuario a editar el post */}
            <Link to={`/posts/editar/${post.id}`}>
                <Button primary normal>Editar</Button>
            </Link>
            <Button 
                normal
                danger
                onClick={() => eliminarPost(post.id)} 
            >Eliminar</Button>
        </td>
    </tr>
)
 
export default Post;