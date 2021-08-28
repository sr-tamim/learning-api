
const container = document.getElementById('countriesContainer');

const loadData = () => {
    // get searched text
    const searchedFor = document.getElementById('searchField').value;

    if (searchedFor == '') {
        container.innerHTML = `
        <h3 class="position-absolute w-100 fw-bold text-danger d-flex align-items-center justify-content-center" style='height:200px'>
            Empty Input..!
        </h3>`;
    } else {
        container.innerHTML = `
        <div id="loadingMessage" class="position-absolute w-100 d-flex align-items-center justify-content-center" style='height:250px'>
            <img src="loading.svg">
        </div>`;

        const url = `https://restcountries.eu/rest/v2/name/${searchedFor}`
        fetch(url)
            .then(Response => Response.json())
            .then(data => displayCountries(data));
    }
}

const displayCountries = data => {
    // clear the container field
    while (container.lastChild) {
        container.removeChild(container.lastChild)
    }

    if (data.status == 404) {
        container.innerHTML = `
        <h3 class="position-absolute w-100 fw-bold d-flex align-items-center justify-content-center" style='height:200px'>
            No Country Found..!
        </h3>`
    }
    else {
        for (const country of data) {
            // create a div
            const div = document.createElement('div');
            div.classList.add('col');

            div.addEventListener('click', () => { showDetails(country) })

            div.innerHTML = `
            <div class="country position-relative" style='background:url(${country.flag})' data-bs-toggle="modal" data-bs-target="#detailsContainer">
                <h4 class="text-center text-white fw-bold position-absolute bottom-0 w-100 m-0 px-3 pt-5 pb-2 lh-1"
                    style="
                        background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.4),rgba(0,0,0,0.5));">
                    ${country.name}<br>
                    <small style="font-size:10px">Click to see details</small>
                </h4>
            </div>`;

            container.appendChild(div);
        }
    }
}


const showDetails = country => {
    document.getElementById('modal-country-name').innerHTML = country.name;

    document.getElementById('modal-country-details').innerHTML = `
        <div>
            <img src="${country.flag}" class="img-fluid shadow-lg rounded-3">
        </div>
        <div class="row row-cols-1 my-3">
            <div class="col text-center my-2"><b>${country.nativeName}</b></div>
            <div class="col my-2"><b>Population:</b> ${country.population}</div>
            <div class="col my-2"><b>Region:</b> ${country.region}</div>
            <div class="col my-2"><b>Capital:</b> ${country.capital}</div>
            <div class="col my-2"><b>Demonym:</b> ${country.demonym}</div>
            <div class="col my-2"><b>Languages:</b> ${(country.languages.map(e => e.name)).join(', ')}</div>
            <div class="col my-2"><b>Currencies:</b> ${(country.currencies.map(e => e.code)).join(', ')}</div>
        </div>`;

    console.log(country);
}