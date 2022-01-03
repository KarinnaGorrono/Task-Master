
import { ProxyState } from "../AppState.js";
import { listsService } from "../Services/ListsService.js";
import { loadState, saveState } from "../Utils/LocalStorage.js";

function _draw() {
    const lists = ProxyState.lists
    let template = ''
    lists.forEach(l => template += l.Template)
    document.getElementById('lists').innerHTML = template
}

export class ListsController {
    constructor() {

        ProxyState.on('lists', _draw);

        ProxyState.on('lists', saveState);

        ProxyState.on('tasks', _draw);

        ProxyState.on('tasks', saveState);

        console.log('List Controller Loaded')
        loadState()
        _draw()
    }


    createList() {
        window.event.preventDefault()
        const form = window.event.target

        const listData = {
            title: form.title.value,
            color: form.color.value
        }

        console.log('List Created!', listData)
        listsService.createList(listData)
        form.reset();

    }

    removeList(listId) {
        console.log(listId)

        if (confirm("Are you sure you want to delete this list?")) {
            listsService.removeList(listId)
        }
    }

}




