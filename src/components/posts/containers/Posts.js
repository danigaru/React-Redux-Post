import React, { Component, Fragment } from 'react';
// importando link de react-router-dom
import {Link} from 'react-router-dom'
// redux
import { connect } from 'react-redux'
// importando mi accion para consultar obtener posts
import { obtenerPost } from '../../../actions/posts/postsActions'
// importando mi accion para consultar eliminar post
import { eliminarPost } from '../../../actions/posts/postsActions'

//importando componente de error
import Error from '../../alertas/error'
import Post from '../components/Post';
// import el componente de styled-component
import Button from '../../../styled-components/Button';
// importando el component de spinner
import Spinner from '../../alertas/Spinner'
// importando componente de alerta de éxito
import { success } from '../../alertas/Swal';
import Swal from 'sweetalert2';

class Posts extends Component {

    componentDidMount() {

        // realizando el llamado a la api 
        this.props.obtenerPost()        
    }

    // realizando funcionalidad para eliminar un post
    eliminarPost = id => {

        Swal.fire({
            title: '¿Estás seguro de eliminar el Post?',
            text: "No podrás revertir esta acción",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar!'
          }).then((result) => {
            if (result.value) {
                
                // si el usuario da click en si eliminar le aparecere la confirmacion de éxito
                const title = 'Post Eliminado'
                const text = 'Post ha sido eliminado correctamente'
                success(title, text)       
                
                // realizando el llamada a la api para eliminar post
                this.props.eliminarPost(id)
             
            }
          })

    }

    render() { 

        // realizando destructuring a los props
        const { posts, error } = this.props

        // validando si no existen posts mostrando un mensaje de error
        if( !posts && error === true ) return <Error message="Lo lamentamos no existen datos. Intenta de nuevo!" />

        // si no existe ningun post se mostrara el spinner de carga
        if( posts &&  posts.length === 0) return  <Spinner />

        return ( 

            <Fragment>
                <div className="row mt-5  d-flex justify-content-between">
                    <h1 className=" text-center ">Posts</h1>
                    <Link to="/posts/nuevo">
                        <Button primary >Nuevo post</Button>
                    </Link>
                </div>
                <div className="row mt-5 ">
                    <div className="col-12">
                        <table className="table table-hover table-bordered ">
                            <thead className="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Titulo</th>
                                    <th>Contenido</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    // reconrriendo los posts obtenidos de la api 
                                    posts.map( post => (
                                        //enviandole cada elemento al componente de Post y enviando funcion para eliminar un post
                                        <Post key={post.id} post={post}  eliminarPost={this.eliminarPost}/>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Fragment>
         );
    }
}
 
// creando la funcion para poder obtener los datos del store global
const mapStateToProps = state => ({
    posts: state.posts.posts,
    error: state.posts.error
})
export default connect(mapStateToProps, {obtenerPost, eliminarPost})(Posts);