import propTypes from "prop-types";
import React, { useState } from "react";

const Home = () => {

  fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr', {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        console.log(resp.text()); // Intentará devolver el resultado exacto como cadena (string)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
      const [inputValue, setInputValue] = useState("");
      const [tasks, setTasks] = useState([]);
      const [hidden, setHidden] = useState("");
      const [counter, setCounter] = useState(0);
    
      const handleChande = (e) => {
        setInputValue(e.target.value);
      };
      const handleKeyDown = (event) => {
        if (event.keyCode == 13) {
          setTasks([...tasks, inputValue]);
          setInputValue("");
          setCounter(counter + 1);
        }
      };
      const handleRemoveTask = () => {
        const newtask = tasks.filter((tasks) => tasks !== e);
        setTasks(newtask);
        setCounter(counter - 1);
      };
      const handleVisible= () => {
        setHidden("xMarkVisible");
      }
      const handleNoVisible= () => {
        setHidden("");
      }
      console.log(data); 
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
                  onMouseEnter={() => handleVisible()}
                  onMouseLeave={() => handleNoVisible()}
                  >{task}</div>
                <div
                  className={`xMark ${hidden} fa fa-xmark`}
                  onClick={() => handleRemoveTask(task)}
                ></div>
              </li>
            ))}
          </ul>
          <div className="counter">{counter} items left</div>
          <div className="final1"></div>
          <div className="final2"></div>
        </div>
      );
        
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });

};

export default Home;
