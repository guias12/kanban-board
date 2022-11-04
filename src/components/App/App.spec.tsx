import React from 'react';
import { render, screen } from '@testing-library/react';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { getInitialState } from '../../store/initialState';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import App from './App';

describe('App component', () => {
  let store: MockStoreEnhanced<unknown, {}>;
  const setup = (): JSX.Element => {
    const initialState = getInitialState();
    store = configureMockStore()({ list: initialState });

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  };
  it('Should render App component correctly', () => {
    render(setup());
    const pageTitle = screen.getByText(/My Kanban Board/i);

    expect(pageTitle).toBeInTheDocument();
  });

  it('Should match App snapshot', () => {
    const component = create(setup());
    const componentJson = component.toJSON();

    expect(componentJson).toMatchSnapshot();
  });
});
