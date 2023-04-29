import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export default function ToDoList() {
    const [todos, createTodos] = useState(() => [])
    var localKeys = Object.keys(localStorage).sort(function (a, b) { return parseInt(a) - parseInt(b) })
    let i = localKeys.length === 0 ? 0 : localKeys.at(-1);
    // console.log(localKeys)
    window.onload = () => {
        let workList = []
        for (let key = parseInt(localKeys[0]); key <= parseInt(localKeys.at(-1)); ++key) {
            if (localStorage.getItem(key) !== null) {
                workList.push(localStorage.getItem(key))
            }
        }
        createTodos(workList)
    }
    const createByEnter = (event) => {
        if (event.key === "Enter") {
            addTodos()
        }
    }
    function addTodos() {
        let value = document.getElementById("createList").value
        if (value.trim() !== "") {
            createTodos([...todos, value])
            localStorage.setItem(++i, value)
        }
        document.getElementById("createList").value = ""
    }
    function deleteItem(id) {
        let index = null
        let div = document.getElementsByClassName("tasks")[id]
        for (let j = parseInt(localKeys[0]); j <= parseInt(localKeys.at(-1)); j++) {
            if (div.children[0].innerHTML === localStorage.getItem(j)) {
                index = j;
                break;
            }
        }
        localStorage.removeItem(index)
        createTodos((oldVal) => {
            return oldVal.filter((val, ind) => {
                return ind !== id
            })
        })
    }
    return (
        <div className="todolist">
            <h1>ToDo List</h1>
            <div className="create">
                <input type="text" id="createList" onKeyDown={createByEnter} />
                <IconButton id="addTask" aria-label="add" size="medium" onClick={addTodos}>
                    <AddIcon />
                </IconButton>
            </div>
            <div className="listBody" id="listbody">
                {todos.map((myWork, index) => {
                    return (
                        <div className="tasks" key={index.toString()} id={index.toString()}>
                            <span>{myWork}
                            </span>
                            <IconButton aria-label="delete" className="deleteTask" onClick={() => {
                                deleteItem(index)
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
