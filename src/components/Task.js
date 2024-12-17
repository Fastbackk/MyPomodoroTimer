import React, { useContext, useState } from 'react';
import { IoMdAddCircle } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { MyContext } from '../context';

const Task = () => {
    const [newTask, setNewTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const {darkMode,setDarkMode}=useContext(MyContext);

    const add_task = () => {
        if (newTask.trim() !== "") {
            setTasks([...tasks, { task: newTask, completed: false }]);
            setNewTask("");

 
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
        setTasks(updatedTasks);
    };

    const toggleComplete = (index) => {
        const updatedTasks = tasks.map((task, taskIndex) => {
            if (taskIndex === index) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <div style={{ fontFamily: 'Parkinsans, sans-serif' }}>
            <p className="text-center fs-4 m-4" style={{ borderBottom: "3px solid white" }}>Görevlerim</p>
            <div className='d-flex justify-content-center'>
                <input
                    onChange={(e) => setNewTask(e.target.value)}
                    value={newTask}
                    style={{ border: "none", borderRadius: "20px" }}
                    type="text"
                    className="input-box fs-5 p-2"
                    placeholder="Buraya yazabilirsin..."
                    required
                />
                <IoMdAddCircle onClick={add_task} className='icon_add fs-1 m-2' />
            </div>
            <div className="task-list mt-4">
                {tasks.map((task, index) => (
                    <div
                        key={index}
                        style={{
                            justifyContent: 'space-between',
                            padding: '5px',
                            marginBottom: '10px',
                            background: 'white',
                            borderRadius: '10px',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                        {/* Icon Rengi Dinamik */}
                        <IoIosCheckmarkCircle
                            style={{
                                fontSize: '2rem',
                                color: task.completed ? "#10c428" : "gray",
                            }}
                            onClick={() => toggleComplete(index)}
                        />
                        {/* Yazı Dekorasyonu ve Rengi Dinamik */}
                        <p
                            style={{
                                color: task.completed ? "gray" : "black",
                                textDecoration: task.completed ? "line-through" : "none",
                            }}
                        >
                            {task.task}
                        </p>
                        <MdDelete onClick={() => deleteTask(index)} className='delete_icon' />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Task;
