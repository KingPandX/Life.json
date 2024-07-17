import { useState } from "react";
import { task } from "../../electron/modules/life";
import IconButton from "../components/iconbutton";

export default function Task() {
    const [tasks, setTasks] = useState(window.ipcRenderer.getElement('tasks'));

    // form management
    const [title, setTitle] = useState('');

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    function addTask() {
        const task: task = {
            title,
            done: false,
            date: new Date().toDateString()
        }

        if (title === '') return

        window.ipcRenderer.pushElement("tasks", task)
        setTasks(window.ipcRenderer.getElement('tasks'));
        setTitle('');
        const settitle = document.getElementById('input-title')! as HTMLInputElement;
        settitle.value = '';
    }

    function removeTask(index: number) {
        window.ipcRenderer.removeElement("tasks", index);
        setTasks(window.ipcRenderer.getElement('tasks'));
    }

    function toggleDone(index: number) {
        const task = tasks[index];
        task.done = !task.done;
        window.ipcRenderer.updateElement("tasks", index, task);
        setTasks(window.ipcRenderer.getElement('tasks'));
    }

    return (
        <div className="Tasks">
            <div className="TaskAdder">
                <input type="text" placeholder="Add a task" id="input-title" onChange={handleChange} />
                <button onClick={addTask}>Add</button>
            </div>
            <div className="TaskList">
                {
                    tasks.map((task: task, index: number) => {
                        return (
                            <div key={index} className={task.done ? "Task task-done" : "Task"} onDoubleClick={() => { toggleDone(index) }} onContextMenu={() => { removeTask(index) }}>
                                <div>
                                    <IconButton icon="delete" onClick={() => { removeTask(index) }} />
                                </div>

                                <div>
                                    <p>{task.title}</p>
                                </div>

                                <div>
                                    <input type="checkbox" checked={task.done} onChange={() => { toggleDone(index) }} />
                                </div>
                            </div>
                        );
                    })
                }
                {
                    tasks.length === 0 && <h3 className="no-notes">No tasks</h3>
                }
            </div>
        </div>
    );
}