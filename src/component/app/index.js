import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import createAppStore from '../../lib/store';
import DashboardContainer from '../dashboard-container/index';

const store = createAppStore();

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    store.subscribe(() => {
      console.log(store.getState(), 'CURRENT STATE OF APP');
    })
    
    store.dispatch( {type: null} );
  }
  render() {
    return (
      <section>
        <Provider store={store}>
          <BrowserRouter>
            <Route 
              exact
              path='/'
              component={() => <DashboardContainer/> }
            />
          </BrowserRouter>
        </Provider>
      </section>
    )
  }
}