const ticketInput= document.querySelector('#ticket-id');
const localData= localStorage.getItem('local-data');

// CLASS
class Task {
    constructor(id, title, description, dueDate, priority, isCompleted ) {
      this.id = id;                 // Unique identifier for the task
      this.title = title;           // Title of the task
      this.description = description; // Description of the task
      this.dueDate = dueDate;       // Due date for the task
      this.priority = priority;     // Priority level (e.g., high, medium, low)
      this.isCompleted = isCompleted; // Task completion status
    }
  
  }
  
  // CLASS
  class ToDoList {
    constructor() {
        const local= JSON.parse(localStorage.getItem('local-data'))
        if(local){
            this.tasks =local
        } else{
            this.tasks =[]
        }
    }

    autogenerateTicketId(){
        ticketInput.value= '#' + Math.floor(Math.random() * 100000);
    }

    clearTicketForm(){
      ticketInput.value = '';
      title.value = '';
      description.value = '';
      priority.value = 'medium';
      completion.value = 'false';
      dueDate.value=today
        this.autogenerateTicketId();
    }

    storeToLocal(task){
        const local= myToDoList.getAllTasks()
        if(local!== null){
            local.push(task)
            localStorage.setItem('local-data',JSON.stringify(local))
        } else{
        localStorage.setItem('local-data',JSON.stringify([task]))
        }
    }

    clearAllTasks(){
     return localStorage.clear()
    }
  
    getAllTasks() {
      return JSON.parse(localStorage.getItem('local-data'))
    }
  
    getCompletedTasks() {
        return JSON.parse(localStorage.getItem('local-data')).filter(task => task.isCompleted === 'true');
    }
  
    getIncompleteTasks() {
      return JSON.parse(localStorage.getItem('local-data')).filter(task => task.isCompleted === 'false');
    }
  }
  
   const myToDoList = new ToDoList();

  //form dom
  const title= document.querySelector('#title');
  const description= document.querySelector('#description');
  const dueDate= document.querySelector('#due-date');
  const priority= document.querySelector('#priority-select');
  const completion = document.querySelector('#completion-select');

  const submitBtn= document.querySelector('#submit-btn');

  submitBtn.addEventListener('click',()=>{
    const newTask= new Task(ticketInput.value, title.value, description.value,
                             dueDate.value, priority.value, completion.value)

    // TRY-CATCH-FINALLY
    try {
        // Code that may throw an exception
        myToDoList.storeToLocal(newTask)
        alert('Ticket sucessfully added')
        myToDoList.clearTicketForm()
       } catch (error) {
        // Code to handle the exception
        alert(error)
       } finally {
        // Code that is always executed
        alert('Ticket form is cleared')
        showTask()
       } 
})

//refresh display task
const refreshBtn= document.querySelector('#refresh');
refreshBtn.addEventListener('click',()=>showTask())

//incompleted display task
const incompletedBtn= document.querySelector('#incompleted');
incompletedBtn.addEventListener('click',()=>showTask('incompleted'))

//completed display task
const completedBtn= document.querySelector('#completed');
completedBtn.addEventListener('click',()=>showTask('completed'))

//clear all task
const clearAllBtn= document.querySelector('#clear-all');
clearAllBtn.addEventListener('click',()=> {myToDoList.clearAllTasks(); showTask()})


// show task based on completion status or show all
// SWITCH CASE STATEMENT
const showTask=(status)=>{
    const taskList=document.querySelector('.task-list');
    let contentArr;
    switch(status){
        case 'incompleted':
            contentArr = myToDoList.getIncompleteTasks()
            break;
        case 'completed':
            contentArr = myToDoList.getCompletedTasks()
            break;
        default:
            contentArr = myToDoList.getAllTasks()
    }


    // Remove all child elements
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
  
    // Loop through the transformed data and create HTML elements
    contentArr.forEach((item) => {
    // Create a <div> element for each item
    const divElement = document.createElement('div');
    divElement.classList.add('single-task')

    // Set inner html of the <div> element
     divElement.innerHTML=
     `
     <div><b>Id</b> : ${item.id}</div>
     <div><b>Title</b> : ${item.title}</div>   
     <div><b>Due-date</b> : ${item.dueDate}</div>   
     <div><b>Priority</b> : ${item.priority}</div>   
     <div><b>Completion</b> : ${item.isCompleted}</div>   
     <div><b>Desc</b> : ${item.description}</div>      
     `
    // Append the <div> element to the container
    taskList.appendChild(divElement);
  });
}

//make due date default today
const today = new Date().toISOString().substr(0, 10);
dueDate.value=today;




myToDoList.autogenerateTicketId()  
showTask()