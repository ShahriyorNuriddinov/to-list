import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  startEditTodo,
  saveEditTodo,
  cancelEdit,
} from './store/todos';

function App() {
  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');
  
  const todos = useSelector((state) => state.todos.todos);
  const editingId = useSelector((state) => state.todos.editingId);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const handleEditSubmit = (id) => {
    if (editText.trim()) {
      dispatch(saveEditTodo({ id, newText: editText }));
      setEditText('');
    }
  };

  return (
    <div className="App">
      <h1>Redux Todo List</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Yangi todo kiriting..."
        />
        <button type="submit">Qo'shish</button>
      </form>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editingId === todo.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  defaultValue={todo.text}
                  autoFocus
                />
                <button onClick={() => handleEditSubmit(todo.id)}>
                  Saqlash
                </button>
                <button onClick={() => dispatch(cancelEdit())}>
                  Bekor qilish
                </button>
              </div>
            ) : (
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                />
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#888' : '#000',
                  }}
                >
                  {todo.text}
                </span>
                <div className="todo-actions">
                  <button
                    onClick={() => {
                      dispatch(startEditTodo(todo.id));
                      setEditText(todo.text);
                    }}
                    className="edit-btn"
                  >
                    Tahrirlash
                  </button>
                  <button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    className="delete-btn"
                  >
                    O'chirish
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;