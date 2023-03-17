import Nav from "./Nav";
import AddTask from "./AddTask";
import TasksContainer from "./TasksContainer";
import { io } from "socket.io-client";

// On passe socket.io aux composants qui communiquent avec le serveur.

const socket = io("https://kanban-sockets.herokuapp.com");

const Task = () => {
  return (
    <div className="app__view">
      <Nav />
      <AddTask socket={socket} />
      <TasksContainer socket={socket} />
    </div>
  );
};

export default Task;
