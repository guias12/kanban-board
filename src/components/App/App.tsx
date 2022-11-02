import React from "react";
import List from "../List";
import { IList } from "../../models/types";
import { IState } from "../../reducers";
import { connect } from "react-redux";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { draggableSort } from "../../actions";

import "./styles.scoped.scss";

interface IAppProps {
  lists: IList[];
  dispatch: any;
}

function App({ lists, dispatch }: IAppProps) {
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
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="App">
        <h2 className="app-title">My Kanban Board</h2>
        <div className="app-board-list">
          {lists.map((list) => {
            return (
              <List
                title={list.title}
                cards={list.cards}
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
  lists: state.lists,
});
export default connect(mapStateToProps)(App);
