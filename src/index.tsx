import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import 'normalize.css/normalize.css';

import {
  AddDevicePage,
  AddGesturePage,
  EditDevicePage,
  EditGesturePage,
  Header,
  ListDevicesPage,
  ListGesturesPage,
  Navigation,
  NotFoundPage,
  SettingsPage
} from './components';
import configureStore from './store';

const store = configureStore();

const App: React.FC = () => (
  <Provider store={store}>
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Switch>
        <Redirect exact from="/" to="/devices" />
        <Route path="/devices" component={ListDevicesPage} />
        <Route path="/gestures" component={ListGesturesPage} />
        <Route path="/addDevice" component={AddDevicePage} />
        <Route path="/addGesture" component={AddGesturePage} />
        <Route path="/editDevice/:id" component={EditDevicePage} />
        <Route path="/editGesture/:id" component={EditGesturePage} />
        <Route path="/settings" component={SettingsPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Navigation />
    </HashRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
