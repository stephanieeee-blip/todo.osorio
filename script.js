let Input;
let errorInfo;
let addBtn; 
let ulList;
let newToDo;

let popup;
let popupInfo;
let todoToEdit; 
let popupInput; 
let popupAddBtn;
let popupCloseBtn; 

const main = () => {

    prepareDOMElements();
    prepareDOMEvents();
}

const prepareDOMElements = () => {
 
    Input = document.querySelector('.todo-input');
    errorInfo = document.querySelector('.error-info');
    addBtn = document.querySelector('.btn-add');
    ulList = document.querySelector('.todolist ul');

    popup = document.querySelector('.popup');
    popupInfo = document.querySelector('.popup-info');
    popupInput = document.querySelector('.popup-input');
    popupAddBtn = document.querySelector('.accept');
    popupCloseBtn = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {

    addBtn.addEventListener('click',addNewToDo);
    ulList.addEventListener('click', checkClick);
    popupCloseBtn.addEventListener('click', closePopup);
    popupAddBtn.addEventListener('click', changeTodoText);
    Input.addEventListener('keyup', enterKeyCheck);
}

const addNewToDo = () => {
    if (Input.value !== '') {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to add "${Input.value}" to your to-do list?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add it!'
        }).then((result) => {
            if (result.isConfirmed) {
                newToDo = document.createElement('li');
                newToDo.textContent = Input.value;
                
                createToolAreal();
                
                ulList.append(newToDo);
                
                Input.value = '';
                errorInfo.textContent = '';
                
                Swal.fire(
                    'Added!',
                    'Your task has been added.',
                    'success'
                );
            }
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Input task is required!',
        });
    }
}

const createToolAreal = () => {
    
    const div = document.createElement('div');
    div.classList.add('tools');
   
    newToDo.append(div);

    const buttonDone = document.createElement('button');
    buttonDone.classList.add('complete');
    buttonDone.innerHTML = '<i class="fas fa-check"></i>'

    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('edit');
    buttonEdit.textContent = 'EDIT';

    const buttonCancel = document.createElement('button');
    buttonCancel.classList.add('delete');
    buttonCancel.innerHTML = '<i class="fas fa-times"></i>'

    div.append(buttonDone, buttonEdit, buttonCancel);
}

const checkClick = (e) => {
    if(e.target.matches('.complete')){
        e.target.closest('li').classList.toggle('completed');
        e.target.classList.toggle('completed');

    } else if (e.target.matches('.edit')) {
        editToDo(e);

    } else if (e.target.matches('.delete')) { 
        deleteToDo(e);

    }
}


const editToDo = (e) => { 
    todoToEdit = e.target.closest('li');
    popupInput.value = todoToEdit.firstChild.textContent; 
    popup.style.display = 'flex';
}

const closePopup = () => {
    popup.style.display = 'none';
    popupInfo.textContent = '';
}

const changeTodoText = () => {
    if (popupInput.value !== '') {
        todoToEdit.firstChild.textContent = popupInput.value;
        popup.style.display = 'none';
        popupInfo.textContent = '';
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Input task is required!',
        });
    }
}

const deleteToDo = (e) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "This task will be deleted!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            e.target.closest('li').remove();

            const allToDos = ulList.querySelectorAll('li');
            if (allToDos.length === 0) {
                errorInfo.textContent = 'No tasks on the list.';
            }

            Swal.fire(
                'Deleted!',
                'Your task has been deleted.',
                'success'
            );
        }
    });
}


document.addEventListener('DOMContentLoaded', main);