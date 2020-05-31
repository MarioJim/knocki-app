import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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
    <BrowserRouter>
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
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
