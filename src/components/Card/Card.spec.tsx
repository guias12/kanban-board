import React from 'react';
import Card from './index';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import { ICard } from '../../models/types';
import { render, screen } from '@testing-library/react';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { getInitialState } from '../../store/initialState';
import { create } from 'react-test-renderer';
import { Provider } from 'react-redux';
import fireEvent from '@testing-library/user-event';

describe('Card component', () => {
  let store: MockStoreEnhanced<unknown, {}>;
  const setup = (): JSX.Element => {
    const initialState = getInitialState();
    store = configureMockStore()({ list: initialState });

    const card: ICard = {
      id: 0,
      text: 'test card',
    };

    return (
      <Provider store={store}>
        <DragDropContext onDragEnd={() => {}}>
          <Droppable droppableId={`0}`}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Card card={card} id={card.id} index={0} listId={0} />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Provider>
    );
  };

  it('Should render Card component correctly', () => {
    render(setup());
    const cardText = screen.getByTestId('card-text');

    expect(cardText).toBeInTheDocument();
  });

  it('Should allow edit Card text inline', () => {
    render(setup());
    const cardText = screen.getByTestId('card-text');
    fireEvent.click(cardText);

    const cardInput = screen.getByTestId('card-input');
    expect(cardInput).toBeInTheDocument();
  });

  it('Should cancel inline edition of Card text on button click', () => {
    render(setup());
    const cardText = screen.getByTestId('card-text');
    fireEvent.click(cardText);
    const cardInput = screen.getByTestId('card-input');

    const cancelEditionButton = screen.getByTestId('card-input-cancel');
    fireEvent.click(cancelEditionButton);

    expect(cardInput).not.toBeInTheDocument();
  });

  it('Should save inline edition of Card text on button click', () => {
    render(setup());
    const cardText = screen.getByTestId('card-text');
    fireEvent.click(cardText);
    const cardInput = screen.getByTestId('card-input');

    const cancelEditionButton = screen.getByTestId('card-input-save');
    fireEvent.click(cancelEditionButton);

    expect(cardInput).not.toBeInTheDocument();
  });

  it('Should match Card snapshot', () => {
    const component = create(setup());
    const componentJson = component.toJSON();

    expect(componentJson).toMatchSnapshot();
  });
});
