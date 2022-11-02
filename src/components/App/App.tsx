import React from "react";
import List from "../List";
import { IList } from "../../models/types";
import { IState } from "../../reducers";
import { connect } from "react-redux";

import "./styles.scoped.scss";

interface IAppProps {
  lists: IList[];
}

function App({ lists }: IAppProps) {
  return (
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
  );
}

const mapStateToProps = (state: IState) => ({
  lists: state.lists,
});
export default connect(mapStateToProps)(App);
