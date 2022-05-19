// Main Container of whole application


import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom'

// MARK: Store of application
import reducers from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux';

// MARK: Pages of application
import Home from './Pages/Home/Home'
import Admin from './Pages/Admin/Admin'

import Recommendations from './Pages/Recommendations/Recommendations'
import Welcome from './Pages/Welcome/Welcome';

const store = createStore(reducers)


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter> 
        {
          localStorage.getItem('token') ? <Switch>
            <Route exact path="/" component={Recommendations}/>
            <Route exact path="/list" component={Home} />
            <Route exact path="/admin" component={Admin} />
        </Switch> : <Switch>
            <Route exact path="/" component={Welcome}/>
            <Route exact path="/auth" component={Welcome} />
            <Route exact path="*" component={Welcome}/>
        </Switch>
        }
      </BrowserRouter>
    </Provider>
  );
}

export default App;
