const loadingMessage = document.getElementById('loadingMessage');
const container = document.getElementById('sportsContainer');

async function loadData() {
    container.innerHTML = '';
    const searchField = document.getElementById('search-input').value;

    loadingMessage.classList.add('d-block');
    loadingMessage.classList.remove('d-none');
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchField}`;
    const fetchLink = await fetch(url);
    const data = await fetchLink.json();

    displayData(data.teams)
}

const displayData = data => {
    loadingMessage.classList.remove('d-block');
    loadingMessage.classList.add('d-none');

    for (const team of data) {
        const div = document.createElement('div');
        div.classList.add('col');
        div.addEventListener('click', () => { showDetails(team) });
        div.innerHTML = `
            <div class="position-relative" data-bs-toggle="modal" data-bs-target="#detailsContainer">
                <img src="${team.strTeamBadge}" class="img-fluid">
                <h4 class="position-absolute bottom-0 w-100 text-center text-white fw-bold pt-5 pb-2 m-0 lh-1" style="background:linear-gradient(rgba(0,0,0,0),rgba(0,0,0,.4),rgba(0,0,0,.7))">
                    ${team.strTeam}<br>
                    <small style="font-size:10px">click to see details</small>
                </h4>
            </div>`;


        // <img src="${team.strTeamLogo}" class="img-fluid">
        container.appendChild(div);
        console.log(team);
    }
}

const showDetails = team => {
    console.log(team);
    document.getElementById('modal-data-name').innerHTML = team.strCountry;

    document.getElementById('modal-data-details').innerHTML = `
        <div class='row mb-3'>
            <div class='col-8 d-flex flex-column justify-content-around'>
                <h5><b>ESTD:</b> ${team.intFormedYear}</h5>
                <h5><b>Sport:</b> ${team.strSport}</h5>
                <h5><b>Gender:</b> ${team.strGender}</h5>
            </div>
            <div class='col-4'>
                <img src='${team.strTeamBadge}' class='img-fluid'>
            </div>
        </div>
        <h5><b>Stadium:</b> ${team.strStadium}</h5>
        <h5><b>Stadium Location:</b> ${team.strStadiumLocation}</h5>
        <div class='my-4' style='text-align:justify'>
            <h5 class='text-center'><b>Description</b></h5><hr>
            ${team.strDescriptionEN}
        </div>`
}