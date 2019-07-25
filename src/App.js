import React from 'react';

// importando el routing
import Routes from './routes'

// importando provider  
import { Provider } from 'react-redux'

// importando el store
import store from './store'

function App() {
  return (

    // haciendo que el store esté disponible para todos los componentes.
    <Provider store={store}>

      {/* // agregando el routing */}
      
        <Routes />
    </Provider>
  );
}

export default App;
