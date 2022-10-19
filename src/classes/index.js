//Agrupar TODAS las clases parapoder exportar y así el código sea menor en la clase 'todo.class.js'.

import { Todo } from './todo.class';
import { TodoList } from './todo-list.class';
import { crearTodoHtml } from '../js/componentes';

export{
    Todo,
    TodoList,
    crearTodoHtml
}