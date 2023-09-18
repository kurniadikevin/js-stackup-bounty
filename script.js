const ticketInput= document.querySelector('#ticket-id');


class Task {
    constructor(id, title, description, dueDate, priority, isCompleted = false) {
      this.id = id;                 // Unique identifier for the task
      this.title = title;           // Title of the task
      this.description = description; // Description of the task
      this.dueDate = dueDate;       // Due date for the task
      this.priority = priority;     // Priority level (e.g., high, medium, low)
      this.isCompleted = isCompleted; // Task completion status
    }
  
    markAsCompleted() {
      this.isCompleted = true;
    }
  
    markAsIncomplete() {
      this.isCompleted = false;
    }
  }
  
  class ToDoList {
    constructor() {
      this.tasks = []; // An array to store the list of tasks
    }

    autogenerateTicketId(){
        ticketInput.value= '#' + Math.floor(Math.random() * 100000);
    }
  
    addTask(task) {
      this.tasks.push(task);
    }

    clearTicketForm(){
        [ticketInput.value, title.value, description.value,
        priority.value, completion.value]=''
        this.autogenerateTicketId();

    }
  
    removeTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    }
  
    getTaskById(id) {
      return this.tasks.find(task => task.id === id);
    }
  
    getAllTasks() {
      return this.tasks;
    }
  
    getCompletedTasks() {
      return this.tasks.filter(task => task.isCompleted);
    }
  
    getIncompleteTasks() {
      return this.tasks.filter(task => !task.isCompleted);
    }
  }
  
  // Example usage:
  
   const myToDoList = new ToDoList();
  
//   const task1 = new Task(1, "Finish coding project", "Complete the coding project and submit it on time.", "2023-09-30", "high");
//   const task2 = new Task(2, "Buy groceries", "Purchase essential groceries for the week.", "2023-09-20", "medium");
  
//   myToDoList.addTask(task1);
//   myToDoList.addTask(task2);
  
 // console.log(myToDoList.getAllTasks()); // Returns an array with both tasks
 // console.log(myToDoList.getIncompleteTasks()); // Returns an array with incomplete tasks
  //console.log(myToDoList.getCompletedTasks()); // Returns an empty array because none are completed yet
  
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
    try {
        // Code that may throw an exception
        myToDoList.addTask(newTask)
        alert('Ticket sucessfully added')
       } catch (error) {
        // Code to handle the exception
        alert(error)
       } finally {
        // Code that is always executed
        alert('Ticket form is cleared')
        myToDoList.clearTicketForm()
       } 
})

const refreshBtn= document.querySelector('#refresh');
refreshBtn.addEventListener('click',()=>{
    
    const taskList=document.querySelector('.task-list');
    const contentArr =myToDoList.getAllTasks()
    console.log(contentArr)

        // Remove all child elements
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
  
    
    // Loop through the transformed data and create HTML elements
    contentArr.forEach((item) => {
    // Create a <div> element for each item
    const divElement = document.createElement('div');
  
    // Set the text content of the <div> element
    divElement.textContent = `Id: ${item.id}, Title: ${item.title}`;
  
    // Append the <div> element to the container
    taskList.appendChild(divElement);
  });

})

myToDoList.autogenerateTicketId()  
