//Recuerda que 'todo' realmente es To Do y 'todos' es el plural.
//Aquí se hace el CRUD para la lista de To Do.

import { todoList } from "..";
import { Todo } from "./todo.class";

export class TodoList{
    
    constructor(){
        //Crea el arreglo todos en el cual se agregarán los todos tomandolos del localStorage.
        this.cargarDelLocalStorage();
        


    }

    //Agrega una tarea ToDo al arreglo.
    agregarTodo(todo){
        this.todos.push(todo);
        this.guardarEnLocalStorage();
    }

    //Elimina una tarea ToDo al arreglo recibiendo un id.
    eliminarTodo(id){
        //Regresa y setea 'todos' a un arreglo exluyendo el que sea igual al id recibido por el parámetro.
        this.todos = this.todos.filter( todo => todo.id!=id )
        this.guardarEnLocalStorage();        
    }

    //Cambia de estado si ya fue realizada una tarea del arreglo 'todos' recibiendo un id.
    marcarCompletado(id){
        for( const todo of this.todos ){
            if( todo.id == id ){
                todo.completado = !todo.completado;
                this.guardarEnLocalStorage();
                break;
            }
        }
    }

    //Elimina las las tareas completadas del arreglo.
    eliminarCompletados(){

        //Filtra y regresa los ToDo's que NO estén completados. Esto elimina del arreglos los que ya estén completados.
        this.todos = this.todos.filter( todo => !todo.completado )
        this.guardarEnLocalStorage();


    }


    //Guarda un Todo en el Local Storage.
    guardarEnLocalStorage(){

        //Crea un item del localStorage con una llave: todo y un dato: this.todos.
        //Convierte el arreglo de ToDos en JSON para poder ser guardado en el localStorage.
        localStorage.setItem('todo', JSON.stringify(this.todos));

    }

    // Muestra los todos en pantalla principal.
    cargarDelLocalStorage(){

        //Verificar si existe el todo en el localStorage para poder mostrarlos.
        //Setea el arreglo a los datos del localStorage y lo parsea a un objeto.
        this.todos = ( localStorage.getItem('todo') ) ? this.todos = JSON.parse( localStorage.getItem('todo') ) : [];
        this.todos = this.todos.map( Todo.fromJSon );
    }
} 