// CLASS
class Task {
    constructor(id, title, description, dueDate, priority, isCompleted ) {
      this.id = id;                 // unique identifier for the task
      this.title = title;           // title of the task
      this.description = description; // Description of the task
      this.dueDate = dueDate;       // due date for the task
      this.priority = priority;     // priority level (e.g., high, medium, low)
      this.isCompleted = isCompleted; // task completion status
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

    deleteOneTask(index){
      // get data from local
      const data= JSON.parse(localStorage.getItem('local-data'))
      // remove data with splice
      data.splice(index,1)
      // change local data with updated data
      localStorage.setItem('local-data',JSON.stringify(data))
      alert('deleted')
      window.location.reload(false);
    }

    editCompletionToDone(index){
       // get data from local
       const data= JSON.parse(localStorage.getItem('local-data'))
       // edit completion data
       const filteredData=data.filter((item)=> item.isCompleted === 'false')
       console.log(filteredData)
        filteredData[index].isCompleted='true'
       // change local data with updated data
       localStorage.setItem('local-data',JSON.stringify(data))
       alert('marked as done')
       window.location.reload(false);

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
  const ticketInput= document.querySelector('#ticket-id');

  const submitBtn= document.querySelector('#submit-btn');

  submitBtn.addEventListener('click',()=>{
    const newTask= new Task(ticketInput.value, title.value, description.value,
                             dueDate.value, priority.value, completion.value)

    // TRY-CATCH-FINALLY
    try {
        //code that may throw an exception
        myToDoList.storeToLocal(newTask)
        alert('Ticket sucessfully added')
        myToDoList.clearTicketForm()
       } catch (error) {
        //handle the exception
        alert(error)
       } finally {
        //always executed
        alert('Ticket form is cleared')
        window.location.reload(false);
       } 
})

//refresh display task
const allTaskBtn= document.querySelector('#all-task');
allTaskBtn.addEventListener('click',()=>showTask())

//incompleted display task
const incompletedBtn= document.querySelector('#incompleted');
incompletedBtn.addEventListener('click',()=>showTask('incompleted'))

//completed display task
const completedBtn= document.querySelector('#completed');
completedBtn.addEventListener('click',()=>showTask('completed'))

//clear all task
const clearAllBtn= document.querySelector('#clear-all');
clearAllBtn.addEventListener('click',()=> {myToDoList.clearAllTasks(); showTask()})

//delete one task assign dom with timeout to wait on render on 1 seconds
setTimeout(()=>{
const deleteBtn=document.querySelectorAll('#delete-btn');
  for(let i=0; i<deleteBtn.length; i++){
    deleteBtn[i].addEventListener('click',()=>{
      myToDoList.deleteOneTask(i)
    })
  }
  const doneBtn=document.querySelectorAll('#done-btn');
  for(let j=0; j<doneBtn.length; j++){
    doneBtn[j].addEventListener('click',()=>{
      myToDoList.editCompletionToDone(j)
    })
  }
},500)


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
    contentArr.forEach((item,index) => {
    // Create a <div> element for each item
    const divElement = document.createElement('div');
    divElement.classList.add('single-task')

    // Set inner html of the <div> element
     divElement.innerHTML=
     `
     <div class='list-bottom'>   
      <div><b>Ticket Id</b> : ${item.id}</div>
     <div id='delete-btn'>
        <i class="fa fa-trash-o"  style='font-size:20px'></i>
      </div>
      ${item.isCompleted === 'false' ? `<div id='done-btn'>
      <span class="material-symbols-outlined">
        done_all
      </span>
     </div>`: ``}
    </div>
     </div>  
     <div><b>Title</b> : ${item.title}</div>   
     <div><b>Due-date</b> : ${item.dueDate}</div>   
     <div><b>Priority</b> : ${item.priority}</div>
     <div class='completion-option'>   
      <div><b>Completion</b> : ${item.isCompleted}</div>
     </div>
     </div>
     <div><b>Desc</b> : ${item.description}</div>   
     `
    // Append the <div> element to the container
    taskList.appendChild(divElement);
  });
}

//make due date default today
const today = new Date().toISOString().substr(0, 10);
dueDate.value=today;

// initialized on start
myToDoList.autogenerateTicketId()  
showTask()