import { ProxyState } from "../AppState.js"
import { Task } from "../Models/Task.js"

class TasksService {
    createTask(taskData) {
        console.log('Task Data in Service', taskData)
        const task = new Task(taskData)
        ProxyState.tasks = [...ProxyState.tasks, task]
    }

    removeTask(taskID) {
        const values = ProxyState.tasks.filter(v => v.taskId !== taskID)
        ProxyState.tasks = values
    }
}

export const tasksService = new TasksService()