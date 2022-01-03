import { ProxyState } from "../AppState.js";
import { generateId } from "../Utils/generateId.js";

export class List {
  constructor(listData) {
    this.listId = listData.listId || generateId()
    this.title = listData.title
    this.color = listData.color
  }


  get Template() {
    return `
    
        <div class="py-5 px-3 d-flex justify-content-around align-items-center">
          <div class="card shadow">
            
             <div style="background-color: ${this.color}" class="card-body rounded">
                <div class="text-uppercase fs-2 bold text-center bg-light p-2 rounded">${this.title}</div>
                
                <div class="text-center fs-5">
                <b><u>Tasks</u></b>
                </div>
                
                <div class="listBody mt-3">
                ${this.placeTemplates()} 
               </div>

                <div class="text-center fs-5">
                
                <b><u>Tasks Remaining</u>:</b>
                (${this.TasksTotal() - this.TasksCompleted()} of ${this.TasksTotal()})
               
                
                
                <form class="mt-3 d-flex align-items-end justify-content-around" onsubmit="app.tasksController.createTask('${this.listId}')">
               
                <input type="text" class="form-control" name="taskName" id="" placeholder="Enter Task" required minlength="3" maxlength="50" size="10">
                <button class="btn btn-dark">Add</button>
            
                </form>

                </div>

                <div class="d-grid gap-2  mt-5">
                
                <button class="btn btn-outline-danger rounded" type="button" onclick="app.listsController.removeList('${this.listId}')">Remove List</button>
              
                </div>
              </div>
           
           </div>
          </div>
      
    
    `
  }




  placeTemplates() {
    const tasks = ProxyState.tasks.filter(t => this.listId == t.listId)
    let template = ''
    tasks.forEach(t => template += t.Template)
    return template
  }

  TasksCompleted() {
    const tasks = ProxyState.tasks.filter(t => this.listId == t.listId)
    const tasksChecked = tasks.filter(t => t.completed == true)
    let countChecked = tasksChecked.length
    return countChecked
  }

  TasksTotal() {
    const tasks = ProxyState.tasks.filter(t => this.listId == t.listId)
    let taskTotal = tasks.length
    return taskTotal
  }

}
