

// need exercises and their categories to populate everything on screen

// Every Column has their own add button can we made them have the same ability
// need to keep track of which column we're in 

// Document Level Vars
// Reference to input and container
const daysInput = document.getElementById('days-input');
const columnDataContainer = document.getElementById('workout-column-container');
let categories = ["All"];
let exercises = [];
let fitleredExercises = [];

// GLOBAL EXERCISE COMPONENT COUNTER
let EXERCISE_COMPONENT_CNT = 0;

const trashIconClass = 'll-button fa-sharp-duotone fa-solid fa-trash-can fa-lg';
const trashIconStyle = '--fa-primary-opacity: 2; padding-left: 25px'

// Components
const innerHTMLExerciseButton = `            
                <div class=" add-exercise-layout">
                    <i class=" fa-solid fa-plus fa-lg" ></i>
                    <span><b>ADD A NEW EXERCISE</b></span>
                </div>
            `;

const innerHTMLColumnHeader = `
                <input type="text"  class="ll-button day-name-input" value="Rename Day...">
                <div style="align-content: center; margin-left: 10px;">
                </div>
`;

// TODO: Add to this
const innerHTMLColumnData = `
    <div class="column-data-top-row">
        <span class="exercise-category"></span>
    </div>
    <hr class="column-data-divider">
    <select class="exercise-value">
    </select>
`


function fetchJSON() {
    // create a container for the exercises
    const exerciseContainer = document.getElementById('exercise-container');

    // Fetch returns a Promise containing the response
    fetch("/test-data/all-exercises.json").then((res) => {
        if (!res.ok) { // status code 200-299 okay
            throw new Error
            (`http error! status ${res.status}`);
        }
        return res.json(); // parse as json and return another promise  this is what allows us to do the following line
    }).then(data => { 
      exercises = data;
      fitleredExercises = exercises;
      getCategories();
      console.log(exercises);
      console.log(categories);
    }).catch(error => console.error('Error fetching JSON:', error));
    
    // after parsing JSON

}

function getCategories() {
    exercises.forEach(e => {
        let category = e.category;
        if (!categories.includes(category)){
            categories.push(category);
        }
    });
}

function tester(){
    console.log("Value changed");
}

// Function to generate columns inside of the horizontal container
function generateColumns() {
    // Clear existing columns
    columnDataContainer.innerHTML = '';

    const numberOfDays = parseInt(daysInput.value);
    if (isNaN(numberOfDays) || numberOfDays <= 0) {
        alert('Please enter a valid number of training days.');
        return;
    }

    // Create columns dynamically
    for (let i = 1; i <= numberOfDays; i++) {
        const columnId = `column-${i}`; // Unique ID for each column

        // Create column container
        const column = document.createElement('div');
        column.className = 'workout-day-column';
        column.id = columnId;

        // Add header to the column
        const columnHeader = document.createElement('div');
        columnHeader.className = 'column-header';
        columnHeader.textContent = `Day ${i}`;
        columnHeader.innerHTML = innerHTMLColumnHeader;

        // Add content area
        const columnContent = document.createElement('div');
        columnContent.id = 'column-data-container';

        // Add "Add Exercise" button
        const addButton = document.createElement('div');
        addButton.className = 'column-data add-exercise-button-container';
        addButton.id = 'add-exercise btn'
        addButton.innerHTML = innerHTMLExerciseButton;
        addButton.addEventListener('click', () => addExercise(columnId));

        // Append elements to the column
        column.appendChild(columnHeader);
        column.appendChild(columnContent);
        column.appendChild(addButton);

        // Append column to the container
        columnDataContainer.appendChild(column);
    }
}

    function addExercise(columnId) {
        const column = document.getElementById(columnId);
        const columnContent = column.querySelector('#column-data-container');

        // Show the modal to select a category
        showModal(categories, (selectedCategory) => {
            // Create new exercise entry
            const exercise = document.createElement('div');
            exercise.className = 'column-data';
            exercise.id = `column-data-${EXERCISE_COMPONENT_CNT}`;
            exercise.innerHTML = innerHTMLColumnData;

            // create trash icon and give its event
            const topRow = exercise.querySelector('.column-data-top-row');

            const icon = document.createElement('i');
            icon.style = trashIconStyle;
            icon.className = trashIconClass;

            const columnRowId = `column-data-${EXERCISE_COMPONENT_CNT}`;
            icon.addEventListener('click', () =>{
                exercise.remove();
            });

            topRow.appendChild(icon);

            // Update the category in the new exercise
            const categorySpan = exercise.querySelector('.exercise-category');
            categorySpan.textContent = selectedCategory;

            // Populate exercise drop-down
            //const exerciseSelect = document.createElement('select');
            const exerciseSelect = exercise.querySelector('.exercise-value');
            //exerciseSelect.className = 'exercise-value';
            //exerciseSelect.id = `exercise-select-${EXERCISE_COMPONENT_CNT}`;
            exercises.forEach(e => {
                const exerciseOption = document.createElement('option');
                exerciseOption.className = 'exercise-value-option'
                exerciseOption.value = e.name;
                exerciseOption.text = e.name;
                
                // check exercises' categories and attach all that match
                if (selectedCategory === 'All'){
                    exerciseSelect.appendChild(exerciseOption);
                    console.log(e.name);
                }
                else if (e.category === selectedCategory) {
                    // create an option tag
                    exerciseSelect.appendChild(exerciseOption);
                    console.log("Added " + e.name);
                }
            });

            // Append to the column's content area
            columnContent.appendChild(exercise);

            // Increment the global exercise counter
            EXERCISE_COMPONENT_CNT += 1;
        });
    }


// Show the modal
function showModal(categories, onCategorySelected) {
    const modal = document.getElementById('category-modal');
    const modalOptions = document.getElementById('modal-category-options');

    // Clear previous options
    modalOptions.innerHTML = '';

    // Populate categories
    categories.forEach(category => {
        const categoryButton = document.createElement('button');
        categoryButton.textContent = category;

        categoryButton.addEventListener('click', () => {
            // When a category is selected, close the modal and pass the category to the callback
            hideModal();
            onCategorySelected(category);
        });
        modalOptions.appendChild(categoryButton);

    });

    // Show the modal
    modal.classList.add('active');
}

// Hide the modal
function hideModal() {
    const modal = document.getElementById('category-modal');
    modal.classList.remove('active');
}

// Add event listener to Cancel button


// Deletes the exercise for a specific column
function deleteColumnRow(columnId, rowId) {
    // Select the correct column
    const column = document.getElementById(columnId);
    // do i need that....
    console.log(column);
    const row = document.getElementById(rowId);
    console.log(row);
    row.remove();
}

const inputElement = document.getElementById('days-input')
inputElement.addEventListener('change', generateColumns); // When days changed
document.getElementById('modal-cancel-btn').addEventListener('click', hideModal); // Hide the modal if no value
// Get basic exercise data
fetchJSON();


