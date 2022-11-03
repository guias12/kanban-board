import React, { useState, ChangeEvent } from 'react';
import List from '../List';
import { IInitialState, IList } from '../../models/types';
import { IState } from '../../reducers';
import { connect } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { draggableSort, searchCard } from '../../actions';

import './styles.scoped.scss';

interface IAppProps {
  lists: IList[];
  searchTerm: string;
  dispatch: any;
}

function App({ lists, searchTerm, dispatch }: IAppProps) {
  const [searchInput, setSearchInput] = useState<string>('');
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    dispatch(
      draggableSort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId
      )
    );
  };

  const onChangeFilterInput = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(event.target.value);
    dispatch(searchCard(event.target.value));
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
          {lists.map((list) => {
            return (
              <List
                title={list.title}
                cards={list.cards}
                searchTerm={searchTerm}
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

const mapStateToProps = (state: IState) => ({
  lists: (state.lists as IInitialState).list,
  searchTerm: (state.lists as IInitialState).searchTerm,
});
export default connect(mapStateToProps)(App);
