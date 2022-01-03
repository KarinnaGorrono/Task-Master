import { ProxyState } from "../AppState.js";
import { List } from "../Models/List.js";

class ListsService {


  createList(listData) {
    const list = new List(listData)
    ProxyState.lists = [list, ...ProxyState.lists]
  }

  removeList(id) {

    const values = ProxyState.lists.filter(l => l.listId !== id)
    ProxyState.lists = values

    ProxyState.tasks = ProxyState.tasks.filter(t => t.listId != id)
  }
}

export const listsService = new ListsService();

