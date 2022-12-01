import React, { useState} from "react";

const Task = (props) => {
  const [hidden, setHidden] = useState("");
  const handleVisible = () => {
    setHidden("xMarkVisible");
  };
  const handleNoVisible = () => {
    setHidden("");
  };
  return (
    <li
      onMouseEnter={() => handleVisible()}
      onMouseLeave={() => handleNoVisible()}
    >
      <div className="task">{props.task.label}</div>
      <div
        className={`xMark ${hidden} fa fa-xmark`}
        onClick={() => props.handleRemoveTask(props.task)}
      ></div>
    </li>
  );
};

export default Task;
