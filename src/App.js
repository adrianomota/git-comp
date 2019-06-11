import React from 'react';
import { Provider } from 'react-redux';

import Main from './pages/Main';
import GlobalStyle from './styles/global';
import store from './store';

function App() {
  return (
    <>
      <Provider store={store}>
        <GlobalStyle /> <Main />
      </Provider>
    </>
  );
}

export default App;
