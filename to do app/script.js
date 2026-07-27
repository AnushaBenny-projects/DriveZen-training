// Get HTML elements

const form = document.getElementById("todoForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");


// Form submit event

form.addEventListener("submit", function(event) {

    // Stop page refresh
    event.preventDefault();

    // Get input value
    const task = taskInput.value.trim();

    // Check input is not empty
    if (task !== "") {

        // Create new li
        const li = document.createElement("li");

        // Add task text
        li.innerText = task;


        // Create Delete button
        const deleteButton = document.createElement("button");

        deleteButton.innerText = "Delete";


        // Delete button event
        deleteButton.addEventListener("click", function() {

            li.remove();

        });


        // Add delete button to li
        li.appendChild(deleteButton);


        // Add li to ul
        taskList.appendChild(li);


        // Clear input
        taskInput.value = "";
    }

});