// need exercises and their categories to populate everything on screen

// Every Column has their own add button can we made them have the same ability
// need to keep track of which column we're in 

// Reference to input and container
const daysInput = document.getElementById('days-input');
const columnDataContainer = document.getElementById('workout-column-container');

const innerHTMLExerciseButton = `            
                <div class=" add-exercise-layout">
                    <i class=" fa-solid fa-plus fa-lg" ></i>
                    <span><b>ADD A NEW EXERCISE</b></span>
                </div>
            `;

const innerHTMLColumnHeader = `
                <input type="text"  class="ll-button day-name-input" value="Rename Day...">
                <div style="align-content: center; margin-left: 10px;">
                    <i class="ll-button fa-sharp-duotone fa-solid fa-trash-can fa-lg" style="--fa-primary-opacity: 2;"></i>
                </div>
`;

// TODO: Add to this
const innerHTMLColumnData = `
    <div class="column-data-top-row">
        <span class="Category"></span>
    </div>
`



function tester(){
    console.log("Value changed");
}

// Function to generate columns
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

// Function to add an exercise to the correct column
function addExercise(columnId) {
    const column = document.getElementById(columnId); // references a specific column were adding to
    const columnContent = column.querySelector('#column-data-container');

    // Create new exercise entry
    const exercise = document.createElement('div');
    exercise.className = 'column-data';
    exercise.textContent = `Exercise ${columnContent.children.length + 1}`;

    // Append to the column's content area
    columnContent.appendChild(exercise);
}

// Attach event listener to the generate columns button
const inputElement = document.getElementById('days-input')
inputElement.addEventListener('change', generateColumns);
