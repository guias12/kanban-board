import React from 'react';
import List from './index';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { ICard } from '../../models/types';
import { render, screen } from '@testing-library/react';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { getInitialState } from '../../store/initialState';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import fireEvent from '@testing-library/user-event';

describe('List component', () => {
  let store: MockStoreEnhanced<unknown, {}>;
  const cards: ICard[] = [
    { id: 0, text: 'abc' },
    { id: 1, text: '123' },
    { id: 2, text: 'lorem ipsum' },
  ];

  const setup = (searchTerm: string = ''): JSX.Element => {
    const initialState = getInitialState();
    store = configureMockStore()({ list: initialState });

    return (
      <Provider store={store}>
        <DragDropContext onDragEnd={() => {}}>
          <List
            title="Test list"
            id={0}
            cards={cards}
            searchTerm={searchTerm}
          />
        </DragDropContext>
      </Provider>
    );
  };

  it('Should render List component correctly', () => {
    render(setup());
    const listTitle = screen.getByText(/Test list/i);

    expect(listTitle).toBeInTheDocument();
  });

  it('Should allow user to create new card on button click', () => {
    render(setup());
    const newCardButton = screen.getByText(/Create new card/i);
    fireEvent.click(newCardButton);

    const newCardInput = screen.getByTestId('list-create-input');

    expect(newCardInput).toBeInTheDocument();
  });

  it('Should allow user to cancel new card creation on button click', () => {
    render(setup());
    const newCardButton = screen.getByText(/Create new card/i);
    fireEvent.click(newCardButton);

    const cancelCreationButton = screen.getByTestId('list-cancel-button');
    fireEvent.click(cancelCreationButton);

    expect(cancelCreationButton).not.toBeInTheDocument();
  });

  it('Should render Cards filtered in a correct way', () => {
    render(setup(cards[0].text));
    const filteredCard = screen.getByText(cards[0].text);

    expect(filteredCard).toBeInTheDocument();

    const invalidCard = screen.queryByText(cards[1].text);

    expect(invalidCard).not.toBeInTheDocument();
  });

  it('Should not render any Cards if filtering invalid words', () => {
    render(setup('this is not a valid words combination for filtering'));
    const card0 = screen.queryByText(cards[0].text);
    const card1 = screen.queryByText(cards[1].text);
    const card2 = screen.queryByText(cards[2].text);

    expect(card0).not.toBeInTheDocument();
    expect(card1).not.toBeInTheDocument();
    expect(card2).not.toBeInTheDocument();
  });

  it('Should match List snapshot', () => {
    const component = create(setup());
    const componentJson = component.toJSON();

    expect(componentJson).toMatchSnapshot();
  });
});
