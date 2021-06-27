import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import routes from './config/route.js';
import { PrivateRouter } from './components/index.js';


const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/product">Produc</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Switch>
            {routes.map((route) =>
              route.private ? <PrivateRouter {...route} /> : <Route {...route} />
            )}
          </Switch>
        </Switch>

      </div>
    </Router>

  )
}

ReactDOM.render(<App />, document.getElementById("app"))

if (module.hot) {
  module.hot.accept()
}