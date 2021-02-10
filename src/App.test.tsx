import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';
import storeData from './redux/store/store';
import { Provider } from 'react-redux';
import * as utills from "./utills";


export   const renderApp = (store : any =storeData,props={})=>{
  return render(
    <Provider store={store}>
      <App/>
    </Provider>
  )
}
describe('Test App',()=>{
    test('show loading indicater untill api response', async ()=>{
      renderApp();
      expect(screen.getByRole('heading')).toHaveTextContent('Loading...');
      await waitForElementToBeRemoved(()=> screen.getByText(/Loading/i))
    });
});