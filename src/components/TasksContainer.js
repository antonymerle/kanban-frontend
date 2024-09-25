import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TasksContainer = ({ socket }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = () => {
      console.log("fetch tasks");

      fetch("https://kanban-backend-five.vercel.app/")
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
        });
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    socket.on("tasks", (data) => {
      setTasks(data);
    });
  }, [socket]);

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    )
      return;
    console.log({ source, destination });

    socket.emit("taskDragged", {
      source,
      destination,
    });
  };

  const pardonMyFrench = (cat) => {
    switch (cat) {
      case "pending":
        return "en attente";
      case "ongoing":
        return "en cours";
      case "completed":
        return "terminées";
      default:
        return;
    }
  };

  return (
    <div className="container">
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.entries(tasks).map((task) => (
          <div className={`tasks_container`} key={task[1].category}>
            <h3>Tâches {pardonMyFrench(task[1].category)}</h3>
            <Droppable droppableId={task[1].category}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={
                    snapshot.isDraggingOver
                      ? `${task[1].category}_task_column_dragging`
                      : "task_column"
                  }
                >
                  {task[1].items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={
                            snapshot.isDragging
                              ? "isDragging"
                              : `${task[1].category}__item`
                          }
                        >
                          <p>{item.title}</p>
                          <p className="comment">
                            <Link
                              to={`/comments/${task[1].category}/${item.id}`}
                            >
                              {item.comments.length > 0
                                ? `Voir commentaires`
                                : "Ajouter commentaire"}
                            </Link>
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default TasksContainer;
