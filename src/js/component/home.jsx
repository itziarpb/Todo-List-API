import React, { useState, useEffect } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  // const [hidden, setHidden] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(()=>{
    fetch('https://assets.breatheco.de/apis/fake/todos/user/itziarpb')
    .then((resp) => {
        console.log(resp.ok)
        return resp.json();
    })
    .then((data) => {
        if (data.length!=0){
          setTasks(data),
        setCounter(data.length)}
    })
     .catch(error => {console.log(error); });
  }, [])

  const handleChande = (e) => {
    setInputValue(e.target.value);
  };
  const handleKeyDown = (event) => {
    if ((event.keyCode == 13)&&(inputValue!="")) {
      const newValue={
        label: inputValue,
        done: false
      }
      setTasks([...tasks, newValue]);
      setInputValue("");
      setCounter(counter +1);
      
      fetch('https://assets.breatheco.de/apis/fake/todos/user/itziarpb', {
        method: 'PUT', // or 'PUT'
        body: JSON.stringify(tasks), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
    }
  };
  const handleRemoveTask = (event) => {
    const newtask = tasks.filter((task) => task !== event);
    setTasks(newtask);
    setCounter(counter - 1);
    fetch('https://assets.breatheco.de/apis/fake/todos/user/itziarpb', {
      method: 'PUT', // or 'PUT'
      body: JSON.stringify(tasks), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  };
  const handleDelete = () => {
    setTasks([]);
    setCounter(0);
    fetch('https://assets.breatheco.de/apis/fake/todos/user/itziarpb', {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  }

  // const handleVisible= () => {
  //   setHidden("xMarkVisible");
  // }
  // const handleNoVisible= () => {
  //   setHidden("");
  // }

  return (
    <div className="container">
      <div>
        <h1 className="todos">todos</h1>
      </div>
      <ul className="list">
        <li>
          <input
            type="text"
            placeholder="What needs to be done?"
            onChange={handleChande}
            onKeyDown={handleKeyDown}
			      value={inputValue}
          ></input>
        </li>
        {tasks.map((task, index) => (
          <li key={index}>
            <div 
              className="task"              
              // onMouseEnter={() => handleVisible()}
              // onMouseLeave={() => handleNoVisible()}
              >{task.label}</div>
            <div
              className={`xMark  fa fa-xmark`}
              onClick={() => handleRemoveTask(task)}
            ></div>
          </li>
        ))}
      </ul>
      <div className="counter">{counter} items left</div>
      <div className="final1"></div>
      <div className="final2"></div>
      <button type="button" class="btn btn-light" onClick={() => handleDelete()}>Restart List</button>
    </div>
  );
};

export default Home;

