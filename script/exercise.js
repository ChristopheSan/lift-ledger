function fetchJSON() {
    // create a container for the exercises
    const exerciseContainer = document.getElementById('exercise-container');

    var categoies = [];

    // Fetch returns a Promise containing the response
    fetch("/test-data/all-exercises.json").then((res) => {
        if (!res.ok) { // status code 200-299 okay
            throw new Error
            (`http error! status ${res.status}`);
        }
        return res.json(); // parse as json and return another promise  this is what allows us to do the following line
    }).then(data => { 
      data.forEach(element => {
            const itemDiv = document.createElement('div');
            itemDiv.className = ('exercise-item');

            const exerciseIDandNameElement = document.createElement('h3');
            const name = element.name;
            const id = element.exerciseId;
            exerciseIDandNameElement.textContent = `${id} | ${name}`;

            const hrElement = document.createElement('hr');
            
            const categoryElement = document.createElement('h4');
            const category = element.category;
            categoryElement.textContent = category;

            // add everything to its container in order
            itemDiv.appendChild(exerciseIDandNameElement);
            //itemDiv.appendChild(hrElement);
            itemDiv.appendChild(categoryElement);
            
            exerciseContainer.appendChild(itemDiv);
        });  
    }).catch(error => console.error('Error fetching JSON:', error));
    
}


fetchJSON();

// "exerciseId": 1,
// "name": "Cable Rope Crunch",
// "exampleVideoUrl": "https://youtu.be/6GMKPQVERzw",
// "createdByUserFlag": false,
// "user": null,
// "planWorkoutDetails": [],
// "category": "Abs"