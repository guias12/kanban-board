import { IInitialState } from '../models/types';
const getInitialState = (): IInitialState => ({
  searchTerm: '',
  list: [
    {
      title: 'To Do',
      id: 0,
      cards: [
        {
          id: 0,
          text: 'Test kanban board',
        },
        {
          id: 1,
          text: 'alksdajlksdj',
        },
        {
          id: 2,
          text: 'xdddd',
        },
      ],
    },
    {
      title: 'Doing',
      id: 1,
      cards: [],
    },
    {
      title: 'Done',
      id: 2,
      cards: [],
    },
  ],
});

export default getInitialState;
