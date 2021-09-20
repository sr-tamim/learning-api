
const container = document.getElementById('mealsContainer');

document.getElementById('searchField').addEventListener('keypress', event => {
    if (event.key === "Enter") { loadData() }
})

const loadData = () => {
    // get searched text
    const searchedFor = document.getElementById('searchField').value;

    if (searchedFor == '') {
        container.innerHTML = `
            <div class='position-absolute w-100 d-flex flex-column justify-content-center align-items-center pt-5' style="height:300px">
                <img src="img/text-field.svg" class='img-fluid h-100'>
                <h2 class="my-4 text-center">You've to type any food name first</h2>
            </div>`
        return;
    }

    // loading spinner
    container.innerHTML = `
        <div class='position-absolute w-100 d-flex justify-content-center align-items-center' style="height:300px">
            <img src="img/loading.svg" width="100" height="100">
        </div>`

    // fetching url
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedFor}`
    fetch(url)
        .then(Response => Response.json())
        .then(data => showMeals(data));
}

const showMeals = data => {
    // clear the container
    while (container.lastChild) {
        container.removeChild(container.lastChild)
    }

    if (data.meals == null) {
        container.innerHTML = `
            <div class='position-absolute w-100 d-flex flex-column justify-content-center align-items-center pt-5' style="height:300px">
                <img src="img/empty.svg" class='img-fluid h-100'>
                <h2 class="my-4 text-center">No Food Found</h2>
            </div>`
        return;
    }
    // fill container with meals
    for (const meal of data.meals) {
        console.log(meal);

        const div = document.createElement('div');
        div.classList.add('col', 'meal');
        div.style.cursor = 'pointer';
        div.addEventListener('click', () => { showDetails(meal) })
        div.innerHTML = `
            <div class='position-relative overflow-hidden' data-bs-toggle="modal" data-bs-target="#detailsContainer">
                <img src="${meal.strMealThumb}" class='d-block w-100'>
                <h3 class='w-100 text-center fw-bold position-absolute bottom-0 m-0 pt-5 pb-2 lh-1' style="background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.5),rgba(0,0,0,.6))">
                    ${meal.strMeal}<br>
                    <small style="font-size:10px">click to see details</small>
                </h3>
            </div>`;

        container.appendChild(div);
    }
}


const showDetails = meal => {
    document.getElementById('modal-food-name').innerHTML = meal.strMeal;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = eval('meal.strIngredient' + i);
        if (ingredient == '') { break }
        ingredients.push(ingredient);
    }

    document.getElementById('modal-food-details').innerHTML = `
        <img src="${meal.strMealThumb}" class="img-fluid">
        <div class="my-3 lh-lg p-1">
            <h5><b>Category:</b> ${meal.strCategory}</h5>
            <h5><b>Area:</b> ${meal.strArea}</h5>
            <h5><b>Tags:</b> ${meal.strTags}</h5>
            <h5><b>Ingredients:</b> ${ingredients.join(', ')}</h5>
            <a href="${meal.strYoutube}" class="text-decoration-none text-dark text-center d-block fw-bold bg-warning py-1 mt-3 rounded-3" target="_blank">Video</a>
        </div>`
}