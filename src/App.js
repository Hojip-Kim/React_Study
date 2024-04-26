import React, { useCallback, useState } from 'react';
import './App.css';
import Form from './components/Form';
import Lists from './components/Lists';

const initialTodoData = localStorage.getItem('todoData')
  ? JSON.parse(localStorage.getItem('todoData'))
  : [];

export default function App() {
  console.log('app is rendering');
  const [todoData, setTodoData] = useState(initialTodoData);

  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // form안에 input을 전송할 때 페이지 리로드를 막아줌

    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setTodoData((prev) => [...prev, newTodo]);
    localStorage.setItem('todoData', JSON.stringify([...todoData, newTodo]));
    setValue('');
  };

  const handleClick = useCallback(
    (id) => {
      let newTodoData = todoData.filter((data) => data.id !== id);
      console.log('newTodoData', newTodoData);
      setTodoData(newTodoData);
      localStorage.setItem('todoData', JSON.stringify(newTodoData));
    },
    [todoData]
  );

  const removeAllClick = () => {
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할 일 목록</h1>
          <button onClick={removeAllClick}>deleteAll</button>
        </div>
        <Lists
          handleClick={handleClick}
          todoData={todoData}
          setTodoData={setTodoData}
        />

        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}
