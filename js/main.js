// "use strict"

// variables
let TaskHead = document.querySelector('.taskTitle');
let addingTaskSection = document.querySelector('main .addTask');
let closeAddingTaskSection = document.querySelector('.fa-xmark');
let TaskDesc = document.querySelector('textarea');
let addBtn = document.querySelector('button');
let clearAll = document.querySelector('.clearAll');
let addTask = document.querySelector('.fa-plus');
let darkMode = false;
let currentIndex;
let tasks;
let updateFlag = false;
let addingTaskSectionApperance = false;


// check if there are data in local storage or not
if(localStorage.getItem('tasks') == null){
    tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
else{
    tasks = JSON.parse(localStorage.getItem('tasks'))
    displayTasks();
}



// add task to array
let AddTaskFn = ()=>{
    let task = {
        taskHeader: TaskHead.value,
        taskDescription: TaskDesc.value,
        taskDate: new Date().toLocaleString(),
        taskDone: false
    }
    
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// toggle betwwen adding or updating
addBtn.addEventListener('click', ()=>{
    if(updateFlag){
        tasks[currentIndex].taskHeader = TaskHead.value;
        tasks[currentIndex].taskDescription = TaskDesc.value;
        localStorage.setItem('tasks', JSON.stringify(tasks))
        displayTasks()
        addBtn.innerHTML = 'Add Task'
        updateFlag = false;
    }
    else{
        AddTaskFn();
    }
    document.querySelector('.tasksContainer').style.display='block';
    addingTaskSection.style.display='none';
    addingTaskSectionApperance = false;
    TaskHead.value = "";
    TaskDesc.value = "";
    clearAllAppearance();
})


// task is done
let taskDone = (index)=>{  
    tasks[index].taskDone = !tasks[index].taskDone;
    

    localStorage.setItem('tasks', JSON.stringify(tasks));

    displayTasks();

}

// show adding task box
addTask.addEventListener('click', ()=>{
    addingTaskSection.style.display='block';
    addingTaskSectionApperance = true;
    document.querySelector('.tasksContainer').style.display='none';
    clearAllAppearance();
})


// modifying task
let modifyTask = (index)=>{
    let task = document.querySelectorAll('.task')
    TaskHead.value = task[index].querySelector('h3').innerHTML;
    TaskDesc.value = task[index].querySelector('p').innerHTML;
    currentIndex = index;
    addBtn.innerHTML = 'Modify Task'
    addingTaskSection.style.display='block';
    addingTaskSectionApperance = true; 
    document.querySelector('.tasksContainer').style.display='none';
    clearAll.style.visibility='visible';
    clearAllAppearance();
    updateFlag = true;
}

// remove task
let removeTask = (index)=>{
    tasks.splice(index, 1)
    localStorage.setItem('tasks', JSON.stringify(tasks))
    displayTasks();
}


// clear all tasks
clearAll.addEventListener('click', ()=>{
    tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
})


// display tasks
function displayTasks(){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    // there are tasks
    if (tasks.length > 0) {
        
        let cartona =``
        for (let i = 0; i < tasks.length; i++) {
            cartona +=  `
                            <div class="col-12 task">
                                <div class="row">
                                    <div class="col-9 task-detail">
                                        <div class="col-content">        
                                            <h3 class="w-100">${tasks[i].taskHeader}</h3>
                                            <p>${tasks[i].taskDescription}</p>
                                            <p class="taskDate">${tasks[i].taskDate}</p>  
                                        </div>
                                    </div>
                                    <div class="col-3 task-modification">
                                        <div class="col-content">
                                            <i class="fa-solid fa-check" onclick="taskDone(${i})"></i>
                                            <i class="fa-solid fa-pen" onclick="modifyTask(${i})"></i>
                                            <i class="fa-solid fa-xmark" onclick="removeTask(${i})"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
        }
        document.querySelector('.tasksContainer').innerHTML = cartona;

        // task done appearance
        let task = document.querySelectorAll('.task')
        for (let i = 0; i < tasks.length; i++) {                  
            if (tasks[i].taskDone) {
                task[i].querySelector('h3').style.textDecoration = 'line-through';
                task[i].querySelector('p').style.textDecoration = 'line-through';
                task[i].querySelector('h3').style.color = 'gray';
                task[i].querySelector('p').style.opacity = '.3';
            }
            else {
                task[i].querySelector('h3').style.textDecoration = 'none';
                task[i].querySelector('p').style.textDecoration = 'none';
                task[i].querySelector('p').style.opacity = '1';
            }
        }
    }
    //no tasks found
    else{
        clearAll.style.visibility='hidden'
        document.querySelector('.tasksContainer').innerHTML = `
                            <div class="no-tasks text-center text-muted fs-5 my-5 py-5">
            <i class="fa-regular fa-face-smile fa-2x d-block mb-2"></i>
            <h4>No tasks yet</h4>
            <p>Add a task and stay productive!</p>
        </div>
        `;
                        
    }
    clearAllAppearance();
}


// close add task box with click
closeAddingTaskSection.addEventListener('click', ()=>{
    addingTaskSection.style.display='none';
    document.querySelector('.tasksContainer').style.display='block';
    addingTaskSectionApperance = false;
    clearAllAppearance();
})


// close add task box with ESC
document.body.addEventListener('keydown', (e)=>{
    if(e.key == 'Escape'){
        addingTaskSection.style.display='none'
        document.querySelector('.tasksContainer').style.display='block';
        addingTaskSectionApperance = false;
        clearAllAppearance();
    }  
})


// disappearing clear all button
function clearAllAppearance(){
    tasks = JSON.parse(localStorage.getItem('tasks'));
    
    if(tasks.length === 0 || addingTaskSectionApperance === true){
        clearAll.style.visibility = 'hidden'
    }
    else{
        clearAll.style.visibility = 'visible'
    } 
}



// site theame
const root = document.documentElement;
const mainColorBTN = document.querySelector('.main-color');

let mainColor = JSON.parse(localStorage.getItem('mainColor')) || '#243d5d';

mainColorBTN.value = mainColor;

root.style.setProperty('--main-color', mainColor)
mainColorBTN.addEventListener('input', ()=>{
    mainColor = mainColorBTN.value;
    localStorage.setItem('mainColor', JSON.stringify(mainColor))
    root.style.setProperty('--main-color', `${mainColor}`)
})

let theameToggleBTN = document.querySelector('.theameToggle')
root.style.setProperty('--body-bg', 'white')
root.style.setProperty('--font-color', 'black')
root.style.setProperty('--border-color', 'gray')
root.style.setProperty('--iconF-color', 'white')

function toggleTheame(){
    if (darkMode == true) {
        theameToggleBTN.classList.replace('fa-moon', 'fa-sun')           
        theameToggleBTN.style.color = 'orange'
        root.style.setProperty('--body-bg', 'black')
        root.style.setProperty('--font-color', 'white')
        root.style.setProperty('--border-color', '#ffffff2a')
        root.style.setProperty('--iconF-color', 'white')
        darkMode = false;
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }
    else{

        theameToggleBTN.classList.replace('fa-sun', 'fa-moon')
        theameToggleBTN.style.color = 'darkblue'
        root.style.setProperty('--body-bg', 'white')     
        root.style.setProperty('--font-color', 'black')
        root.style.setProperty('--border-color', 'gray')
        root.style.setProperty('--iconF-color', 'white')
        darkMode = true;
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
    }
    console.log(darkMode);
    
}

theameToggleBTN.addEventListener('click', ()=>{
    toggleTheame();
})

darkMode = JSON.parse(localStorage.getItem('darkMode'))
console.log(darkMode);

if (darkMode == false) {
    theameToggleBTN.classList.replace('fa-moon', 'fa-sun')           
    theameToggleBTN.style.color = 'orange'
    root.style.setProperty('--body-bg', 'black')
    root.style.setProperty('--font-color', 'white')
    root.style.setProperty('--border-color', '#ffffff2a')
    root.style.setProperty('--iconF-color', 'white')
}
else{
    theameToggleBTN.classList.replace('fa-sun', 'fa-moon')
    theameToggleBTN.style.color = 'darkblue'
    root.style.setProperty('--body-bg', 'white')     
    root.style.setProperty('--font-color', 'black')
    root.style.setProperty('--border-color', 'gray')
    root.style.setProperty('--iconF-color', 'white')
}




