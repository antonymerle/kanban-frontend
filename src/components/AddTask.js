import { useState } from "react";

const AddTask = ({ socket }) => {
  const [task, setTask] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    socket.emit("addTask", { task, userId: localStorage.getItem("userId") });
    console.log({ task });
    setTask("");
  };

  return (
    <form className="form__input" onSubmit={handleAddTask}>
      <input
        placeholder="Ajouter tâche"
        type="text"
        name="task"
        id="task"
        value={task}
        className="input"
        required
        onChange={(e) => setTask(e.target.value)}
      />
      <button className="addTodoBtn">Ajouter tâche</button>
    </form>
  );
};

export default AddTask;
