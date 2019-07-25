import React from 'react'
// importando la libreria de react-router-dom
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// importando los componentes
import Posts from './components/posts/containers/Posts';
import NuevoPost from './components/posts/containers/NuevoPost';

function Routes() {
    return (
        <Router>
            <div className="container">
                {/* gracias al switch dependiendo de la ruta se renderiza el componente */}
                <Switch>
                    <Route exact path="/" component={ Posts } />
                    <Route exact path="/posts" component={Posts} />
                    <Route exact path="/posts/nuevo" component={ NuevoPost } />
                    <Route exact path="/posts/editar/:id" component={NuevoPost} />
                </Switch>
            </div>
        </Router>
    )
}

export default Routes