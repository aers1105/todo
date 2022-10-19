
import { Todo } from "../classes";
import { todoList } from '../index';


//Referencias en HTML.
const divTodoList              = document.querySelector('.todo-list');
const txtInput                 = document.querySelector('.new-todo');
const btnBorrarCompletados     = document.querySelector('.clear-completed');
const ulFiltros                = document.querySelector('.filters');
const anchorFiltros            = document.querySelectorAll('.filtro');


//Crear un ToDo.
export const crearTodoHtml = ( todo ) => {
    const htmlTodo = 
    `
        <li class="${  (todo.completado) ? 'completed':''  }" data-id="${ todo.id }">
			<div class="view">
				<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
				<label>${ todo.tarea }</label>
				<button class="destroy"></button>
			</div>
			<input class="edit" value="Create a TodoMVC template">
        </li>
    `

    const div = document.createElement('div');

    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
    //divTodoList




}





//---------------------------------------Eventos----------------------------------------

// Escuchar el boton de ENTER para agregar un To Do al Arreglo todoList.
txtInput.addEventListener('keyup', (event) => {
    
    if( event.keyCode === 13 && txtInput.value.length > 0){

        // .value es para obtener el valor del texto.
        const nuevoTodo = new Todo( txtInput.value );

        todoList.agregarTodo( nuevoTodo );

        crearTodoHtml( nuevoTodo );

        txtInput.value = '';
    }


});


//Escucha si fue seleccionado para cambiar el estado del Todo a Realizado o no.
divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName; //input, label, button.
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute('data-id');

    if ( nombreElemento.includes('input') ){
        todoList.marcarCompletado( todoId );

        todoElemento.classList.toggle('completed');
    }
    //Si no selecciona y se selecciona el boton para eliminar, lo elimina cuando se toque la x.
    else if(nombreElemento.includes('button')){
        //Borra el todo.
        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );

    }
});


//Escucha si fue seleccionado para eliminar los Todo's completados.
btnBorrarCompletados.addEventListener('click', () => {

    todoList.eliminarCompletados();


    for(let i = divTodoList.children.length-1; i >= 0; i--){

        const elemento = divTodoList.children[i];

        if(elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento);
        }


    }


});


ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text;

    if(!filtro) return;

    anchorFiltros.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');

    for ( const elemento of divTodoList.children ) {
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        
        switch ( filtro ) {
            case 'Pendientes':
                if( completado ) elemento.classList.add('hidden')
                break;
        
            case 'Completados':
                if ( !completado ) elemento.classList.add('hidden')
                break;
        }


    }


});