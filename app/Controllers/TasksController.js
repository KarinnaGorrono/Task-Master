import { tasksService } from "../Services/TasksService.js"
import { ProxyState } from "../AppState.js"
import { loadState, saveState } from "../Utils/LocalStorage.js";

export class TasksController {
    constructor() {
        ProxyState.on('tasks', saveState)
    }

    createTask(listId) {
        window.event.preventDefault()
        const form = window.event.target
        let taskData = {
            title: form.taskName.value,
            listId: listId
        }
        console.log('Task Name', form.taskName.value)
        console.log('Creating Task', taskData)
        tasksService.createTask(taskData)
    }

    removeTask(taskId) {
        if (confirm("Are you sure you want to delete this task?")) {
            tasksService.removeTask(taskId)
        }
    }

    checkStatus(taskId) {
        console.log("Box Checked")
        const task = ProxyState.tasks.find(t => t.taskId == taskId)
        task.completed = document.getElementById(taskId).checked //boolean (true or false)
        ProxyState.tasks = ProxyState.tasks
    }

}