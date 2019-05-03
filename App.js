
import React, {Component} from 'react';
import { Provider } from 'react-redux';

import Store from './apps/store';
import Entry from './apps/pages/entry';


export default class App extends Component {
  render() {
    return <Provider store={Store({})}>
      <Entry/>
      </Provider>
  }
}
