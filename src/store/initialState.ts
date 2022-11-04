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
      ],
    },
    {
      title: 'Doing',
      id: 1,
      cards: [
        {
          id: 1,
          text: 'Test kanban board',
        },
        {
          id: 2,
          text: 'Test kanban board',
        },
        {
          id: 3,
          text: 'Test kanban board',
        },
      ],
    },
    {
      title: 'Done',
      id: 2,
      cards: [
        {
          id: 4,
          text: 'Test kanban board',
        },
        {
          id: 5,
          text: 'Test kanban board',
        },
        {
          id: 6,
          text: 'Test kanban board',
        },
      ],
    },
  ],
});

export default getInitialState;
