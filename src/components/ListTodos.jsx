// File path: components/ListTodos.jsx
import { FaTrashCan } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import SignOut from "./SignOut.jsx";

function ListTodos({ user }) {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const collectionRef = collection(db, "todos");
      const querySnapshot = await getDocs(collectionRef);
      const fetchedTodos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(fetchedTodos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching todos: ", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Both title and description are required.");
      return;
    }
    try {
      const newTodo = {
        title,
        description,
        completed: false,
      };
      const docRef = await addDoc(collection(db, "todos"), newTodo);
      setTodos([...todos, { id: docRef.id, ...newTodo }]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const handleToggleTodo = async (id, currentStatus) => {
    try {
      const docRef = doc(db, "todos", id);
      await updateDoc(docRef, { completed: !currentStatus });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !currentStatus } : todo
        )
      );
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const docRef = doc(db, "todos", id);
      await deleteDoc(docRef);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <div>
      <h3>Welcome, {user.email}</h3>
      <h1>Todo React App</h1>
      <SignOut/>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={title}
          placeholder="Task title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={description}
          placeholder="Task description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">
          <IoMdAdd /> Add Task
        </button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id, todo.completed)}
            />
            <strong>{todo.title}</strong> - {todo.description} -{" "}
            {todo.completed ? "Completed" : "Pending"}
            <button onClick={() => handleDeleteTodo(todo.id)}>
              <FaTrashCan /> Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default ListTodos;
