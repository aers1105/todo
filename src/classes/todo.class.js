export class Todo{
    
    static fromJSon({ id, tarea, completado, creado }){
        const tempTodo = new Todo( tarea );

        tempTodo.id         = id;
        tempTodo.completado = completado;
        tempTodo.creado     = creado;

        return tempTodo;
    }



    //Constructor por defecto que recibe la tarea.
    constructor(tarea){
        this.tarea = tarea;

        this.id = new Date().getTime(); //Gnera un id único.
        this.completado = false;
        this. creado = new Date();


        
    }


}