# Kanban Board

## Problem specification

```txt
Frontend Software Engineer - Code Evaluation

The goal of this project is to create a project management tool (Kanban
board). The page needs to be responsive. You're free to be creative and
build an awesome page but you should focus on efficiency.

Problem Specification:

- Create a responsive page containing a board that handles multiple
  cards and multiple statuses.
- We should be able to:
    - Drag&drop the cards between the statuses.
    - Filter the cards.
    - Search the cards.
    - Inline card edition.
    - Add new cards.

Please implement your solution using React, Redux (or other state
management library) and TypeScript in any combination with SASS, Less
or styled-components etc.
Please also include a brief explanation of your design and assumptions
along with your code, as well as detailed instructions to run your application
in a README file. We will assess a number of things including the design
aspect of your solution, UI/UX skills, your programming skills and your
ability to write unit or integration tests. We expect you to submit what you
believe is “production-quality” code that you would be able to run, maintain
and evolve. You should submit code that you would be happy to produce in
a real project, or that you would be happy to receive from a colleague.

```

## Design

The design of my application was inspired by Trello. Since it is one of the most reliable solutions for kanban board application in the market. Trello it's also a very good example of good UI and UX experiences. This is why I tought it was a good ideia to follow it as my inspiration

The application was build using three main components:

- App: The main container, used to build the backbone of the application, it was also used to connect with the application store and to pass data to the children components when needed.
- List: The list component was used to represent kanban board statuses. Therefore, each list should be able to receive and handle as many cards as needed, the list will also contain an title. The lists can receive cards from other lists through the drag and drop feature, the lists must also be able to reorder their cards with the internal drag and drop in the list itself. The lists will also be the component responsible for handling the insertion of new cards to the board. The values chosen for the lists were the most frequent ones in the kanban boards: 'To do', 'Doing' and 'Done'. I didn't add the feature to add more lists to the board (like in Trello) because I preferred to leave the application with a simpler version, but it would be no problem to implement this feature if it was a requirement.
- Card: These are the components responsible for representing each task on the kanban board. Each card receives a text value entered by the user, the cards also have an id value that will be incremented with each new addition. Card texts can be edited by the user using the inline editing feature, cards can be dragged within the list they belong to to be reordered, or they can be dragged to other lists.

## Usage

To run the application make sure you have [Node](https://nodejs.org/) installed on your machine. It will be required for using [npm](https://www.npmjs.com/) to install the dependencies. You will also need to install [Git](https://git-scm.com/), to be able to clone the repository.

After installing the required programs it should be really simple to run the application.

First step is to clone the repository. In your terminal run:

```sh
git clone https://github.com/guias12/kanban-board.git
```

Then, open the repository folder on your terminal, and install the required dependencies:

```sh
cd kanban-board
npm install
```

After everything is finished, you will be able to run the application with the command:

```sh
npm run start
```

Open you browser and go to http://localhost:3000/ to use it.

Alternatively, you can also run the unit tests using the command

```sh
npm run test
```

## Final considerations

It was a lot of fun to implement this application, I think I was able to present what I know in software and UI development. I also needed to learn about a new library to do the drag and drop feature and it was very rewarding to be able to implement it all. Hope you like the final result 😄
