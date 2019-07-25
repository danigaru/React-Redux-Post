import React, { Component } from 'react';
// importando el componente de styled-componentes
import Button from '../../../styled-components/Button'

// redux
import { connect} from 'react-redux'
import {  nuevoPost, obtenerOnePost, limpiarPost, editarPost } from '../../../actions/posts/postsActions'

// importando el componente  de confirmacion exitosa
import { success } from '../../alertas/Swal';
// importando el componente de error 
import  Error  from '../../alertas/error'

// creando objeto con el state inicial
const initialState = {
    id: '',
    title: '',
    body: '',
    error: false
}
class NuevoPost extends Component {

     async componentDidMount() {

        // obteniendo el id a editar de la ruta si existe
        const { id } = this.props.match.params

        // validando que existe el id a editar
        if( !id ) {
            this.setState({
                id: ''
            })
           
            return
        }
        // / obteniendo el post a editar
        await this.props.obtenerOnePost(id)

        // realizando destructurin a los props
        const { title, body } = this.props.post
        this.setState({
            title,
            body
        })
       
            // guardando el id en el state
        this.setState({
            id
        })
    }


    // creando una copia  del state inicial
    state = {  
        ...initialState
    }

    // obtener los datos del formulario y colocarlos en el state
    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    // creando el evento para guardar o editar
    handleSubmit = e => {
        e.preventDefault()

        // destructuring al state
        const { title, body, id} = this.state

        // validando el formulario si esta vacio cambiara el state de error a true
        if(title === '' || body === '') {
            this.setState({
                error: true
            })
            return 
        }

        // creando el objeto a enviar 
        const post = {
            title,
            body,
            userId: 1
        }

        // cambiando el state de error a false
        this.setState({
            error: false
        })

        // validando si existe el id -> si existe se creara funcionalidad para editar
        if(id) {

            // creando una copia del objeto post a enviar e ingreando un valor más id
            const editPost = {
                ...post,
                id
            }

            // realizando la consulta a la api para editar el post
            this.props.editarPost(editPost)

            // creando la alerta de éxito
            const titulo = 'Post Editado'
            const text = 'Post ha sido editado con éxito'
            success(titulo, text)
            
        } else {

            // realizando la consulta a la api para crear nuevo post
            this.props.nuevoPost(post)
            // mandando confirmacion al usuario de post creado
            const titulo = 'Post creado'
            const text = 'Post ha sido creado con éxito'
            success(titulo, text)
        }

        // redireccionado al usuario a la vista de todos los posts
        this.props.history.push('/posts')

    }
    render() { 

        // realizando un destructuring al state
        const { error, id } = this.state

        // realizando destructuring a los props
        const { post, errorEdit, history } = this.props


        setTimeout(() => {
            // validando si existe un error al editar
            if(errorEdit) {
                // redireccionando al usuario despues de 2500 segundos
                history.push('/posts')                
            }    
        }, 2500);
        
        // validando si existe un error al editar se mostrara alerta de error
        const editNoValid = errorEdit ? <Error message="Este post no se puede editar  " /> : null
        
        // validando si existe error -> entonces formulario está vacio y mostrara alerta 
        const errorFormulario = error ? <Error message="Todos los campos son requeridos"  /> : null

        return ( 
            <div className="row mt-5">
                <div className="col-12">
                    <h1 className=" text-center ">
                        {/* validando si existe un id el usaurio editara el post  */}
                        {/* si no existe id el usuario creara nuevo post */}

                        { id ? 'Editar Post' : 'Nuevo Post' }
                    </h1>
                </div>

                <div className="col-sm-8 offset-2 mt-5">
                    { editNoValid }
                    
                    {
                        // si el usuario envia el formulario vacio mostrara la alerta
                        errorFormulario
                    }
                    <form
                    // creando el evento submit del formulario para nuevo post o editar post
                        onSubmit={this.handleSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="titulo">Titulo</label>
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Ingresa el titulo"
                                id="titulo"
                                defaultValue={post.title}
                                name="title"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contenido">Contenido</label>
                            <input 
                                type="text" 
                                className="form-control"
                                placeholder="Ingresa el contenido"
                                id="contenido"
                                defaultValue={post ? post.body : ''}
                                name="body"
                                onChange={this.handleChange}
                            />
                        </div>

                        <Button type="submit" primary normal >
                             {/* validando si existe un id el usaurio editara el post  */}
                             {/* si no existe id el usuario creara nuevo post */}

                            { id ? 'Editar Post' : 'Nuevo Post' }
                        </Button>

                    </form>
                </div>
            </div>
         );
    }
}
 
const mapStateToProps = (state, props) => {

    return {
        post: state.posts.post,
        errorEdit: state.posts.errorEdit
    }
}

export default connect( mapStateToProps, { nuevoPost, obtenerOnePost, limpiarPost, editarPost })(NuevoPost);