import React, { useEffect, useState } from "react";
import CreateTask from "./../modals/CreateTask";
import Card from './Card';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        let arr = localStorage.getItem('taskList');
        if(arr){
            let obj = JSON.parse(arr);
            setTaskList(obj);
        }
    }, [])

    const toggle = () => setModal(!modal);

    const saveTask = (taskObj) => {
        let temptList = taskList;
        temptList.push(taskObj);
        localStorage.setItem('taskList', JSON.stringify(temptList));
        setModal(false);
        setTaskList(temptList);
    }

    const deleteTask = (index) => {
        let tempList = taskList;
        tempList.splice(index, 1);
        localStorage.setItem('taskList', JSON.stringify(tempList));
        setTaskList(tempList);
        window.location.reload();
    }

    const updateListArray = (obj, index) => {
        let tempList = taskList;
        tempList[index] = obj;
        localStorage.setItem('taskList', JSON.stringify(tempList));
        setTaskList(tempList);
        window.location.reload();
    }

    return (
        <>
            <div className="header text-center">
                <h3>Todo List</h3>
                <button className="btn btn-primary mt-2" onClick={() => setModal(true)}>Create Task</button>
            </div>
            <div className="task-container">
                {taskList.map((obj, index) => <Card taskObj = {obj} index = {index} deleteTask = {deleteTask} updateListArray = {updateListArray} />)}
            </div>
            <CreateTask modal = {modal} toggle = {toggle} save={saveTask} />            
        </>
    )
}

export default TodoList;