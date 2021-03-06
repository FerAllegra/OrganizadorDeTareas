document.getElementById('formTask').addEventListener('submit',guardarTarea);

function guardarTarea(e){
    let title = document.getElementById('title').value;    
    let description = document.getElementById('description').value;    

    const task = { //creo un objeto llamado tarea, para almacenar los valores del titulo y descripcion   
        title: title,
        description: description
    };
    
    if(localStorage.getItem('tasks') === null){ //si localStorage esta vacio (nulo)
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }else{
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }


    getTasks();
    document.getElementById('formTask').reset();
    e.preventDefault();//con este metodo evito que se envie el formulario :D
}

function getTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML ='';

    for(let i = 0; i < tasks.length; i++){

        let title = tasks[i].title;
        let description = tasks[i].description;

        tasksView.innerHTML += 
        `<div class="card mb-3">
            <div class="card-body">
                <p>${title} - ${description}</p>
                <a class="btn btn-danger" onclick="deleteTask('${title}')">Borrar</a>
            </div>
        </div>`
    }
}

function deleteTask(title){
     let tasks = JSON.parse(localStorage.getItem('tasks'));
     for(let i = 0; i < tasks.length; i++){
         if(tasks[i].title == title){
             tasks.splice(i,1);
         }
     }
     localStorage.setItem('tasks',JSON.stringify(tasks));
     getTasks();
}

getTasks();