const exerciseView = (workout) => `
<div class="col-12">
    <div class="card">
        <h5 class="card-header"> ${workout.Exercise}</h5>
        <div class="card-body">
          <ul class="list-group">
               <li class="list-group-item">Exercise: ${workout.Exercise}</li>
                <li class="list-group-item">MuscleGroup: ${workout.MuscleGroup}</li>
                <li class="list-group-item">Sets: ${workout.Sets}</li>
                <li class="list-group-item">Reps: ${workout.Reps}</li>
                <li class="list-group-item">Year made: ${workout.Weight}</li>
                <li class="list-group-item">CaloriesBurned: ${workout.CaloriesBurned}</li>
          </ul>
        </div>
      </div>
 </div>
`;


const handleClick = async () => {
    const searchExerciseVal = document.querySelector("#searchInput").value;
    const exerciseDomRef = document.querySelector('#exerciseItems')

    try {

        const ref = await fetch(`/api/searching-exercises/?search=${searchExerciseVal}`);
        const searchResults = await ref.json();
        let exerciseHtml = [];
        searchResults.forEach(workout => {
            exerciseHtml.push(exerciseView(workout));
        });
        exerciseDomRef.innerHTML = exerciseHtml.join("");
    } catch (e) {
        console.log(e);
        console.log('could not search api');
    }

}