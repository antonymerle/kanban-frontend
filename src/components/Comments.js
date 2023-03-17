import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socketIO from "socket.io-client";

const socket = socketIO.connect("https://kanban-sockets.herokuapp.com");

const Comments = () => {
  const { category, id } = useParams();
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [task, setTask] = useState([]);

  // emitter
  useEffect(() => {
    console.log("fetchComments");
    socket.emit("fetchComments", { category, id });
  }, [category, id]);

  // emitter
  const addComment = (e) => {
    e.preventDefault();

    const newComment = {
      id,
      category,
      comment,
      userId: localStorage.getItem("userId"),
    };

    socket.emit("addComment", newComment);
    console.log(newComment);
    setComment("");
  };

  // listener, triggered when fetchComment or addComment is fired.
  useEffect(() => {
    socket.on("comment", (data) => {
      setCommentList(data);
    });
  }, []);

  // just fetch the task related to the comment
  useEffect(() => {
    fetch(`https://kanban-sockets.herokuapp.com/api/${category}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTask(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="comments__container">
      <h2>{task.length ? task[0].title : ""}</h2>
      <form className="comment__form" onSubmit={addComment}>
        <textarea
          name="comment"
          id="comment"
          value={comment}
          placeholder="Taper ici votre commentaire"
          rows="5"
          required
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <button className="commentBtn">Ajouter commentaire</button>
      </form>
      <div className="comments__section">
        <h3>Commentaires</h3>
        {commentList.map((comment) => (
          <div className="comment__item" key={comment.id}>
            <p>
              <q>{comment.text}</q> par{" "}
              <span className="comment__name">{comment.name}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
