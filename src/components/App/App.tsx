import React, { useState, ChangeEvent } from 'react';
import List from '../List';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useAppSelector } from '../../store';
import { dragCard, filterCard } from '../../reducers/listSlice';
import { selectState } from '../../reducers/listSlice';
import { useDispatch } from 'react-redux';
import './styles.scoped.scss';

function App() {
  const dispatch = useDispatch();
  const state = useAppSelector(selectState);
  const [searchInput, setSearchInput] = useState<string>('');
  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    dispatch(
      dragCard({
        sourceListId: source.droppableId,
        destinationListId: destination.droppableId,
        sourceCardIndex: source.index,
        destinationCardIndex: destination.index,
      })
    );
  };

  const onChangeFilterInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(event.target.value);
    dispatch(
      filterCard({
        searchTerm: event.target.value,
      })
    );
  };
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="App">
        <h2 className="app-title">My Kanban Board</h2>
        <div className="app-tools">
          <input
            type="text"
            name="search-cards"
            id="search-cards"
            placeholder="Search card"
            className="search-card-input"
            value={searchInput}
            onChange={(e) => onChangeFilterInput(e)}
          />
        </div>
        <div className="app-board-list">
          {state.list.list.map((list) => {
            return (
              <List
                title={list.title}
                cards={list.cards}
                searchTerm={state.list.searchTerm}
                id={list.id}
                key={list.id}
              />
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
}

export default App;
