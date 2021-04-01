import React, {useState} from 'react';
import './App.css';
import {tasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterTypeValue = "All" | "Active" | "Completed";
export type todolistTypeArr = {
    id: string
    title: string
    filter: filterTypeValue
}
type TasksStateType = {
    [key: string]: Array<tasksType>
}

function App() {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<todolistTypeArr>>([
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), text: "HTML and CSS", isDone: true},
            {id: v1(), text: "JS", isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), text: "Milk", isDone: true},
            {id: v1(), text: "React book", isDone: true},
        ]
    });
    
    function changeTaskStatus(taskID: string, isDoneValue: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find( t => t.id === taskID);
        if (task) {
            task.isDone = isDoneValue;
            setTasks({...tasks})
        }
    }

    function addTask(text: string, todolistId: string ) {

        let newTask = {id: v1(), text: text, isDone: false};
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [newTask, ...todolistTasks];
        setTasks({...tasks});
    }

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter( t => t.id != id);

        setTasks({...tasks});

    }

    function changeFilter(value: filterTypeValue, todolistId: string) {
        let todolist =  todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists])
        }
    }

    function removeTodolist( id: string) {
        setTodolists(todolists.filter(tl => tl.id != id))
        delete tasks[id];
        setTasks({...tasks});
    }
    function getTasksForTodoList(todoList: todolistTypeArr): Array<tasksType> {
        switch (todoList.filter){
            case "Active":
                return tasks[todoList.id].filter(t => t.isDone === false)
            case "Completed":
                return tasks[todoList.id].filter(t => t.isDone === true)
            default:
                return tasks[todoList.id]
        }
    }

    return (


        <div className="Todolist">
            {
                todolists.map(tl => {
                  const tasksFilter = getTasksForTodoList(tl)
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        changeTaskStatus={changeTaskStatus}
                        tasks={tasksFilter}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        removeTodolist={removeTodolist}
                    />
                })
            }

        </div>
    )
}


export default App;
