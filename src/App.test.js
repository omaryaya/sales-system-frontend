import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Orders from './components/orders/Orders';


import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers/index'

let wrap;
let store;

beforeEach(() => {
  store = createStore(rootReducer, {})
  wrap = shallow(<Provider store={store}><App/></Provider>)
})

it('renders without crashing', () => {
  
  console.debug(toJson(wrap));
  
})



test('empty test', () => {
  /* const { getByText } = render(<Orders />);
  const order = getByText(/orders/i);
  expect(order).toBeInTheDocument(); */
});
