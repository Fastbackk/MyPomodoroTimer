import React from 'react';
import { useState, useEffect } from 'react';


const Task = () => {
    const [inputTask,setInputTask]=useState("");

    const addTask=()=>{


    };
    return (
        <div className='TaskDiv'>
            <h1 className='trackerTitle'>Görevlerim</h1>
            <li>
                <span>
                    {inputTask}

                </span>
            </li>
            <input type='text' placeholder='Buraya Yazabilirsiniz'></input>
            <button onClick={addTask} type="button" class="btn btn-primary m-40" data-toggle="button" aria-pressed="false" autocomplete="off">
                Ekle
            </button>

        </div>
    );

}; export default Task;


