
const learnGitHubAPI = () => {
    const url = `https://api.github.com/`;
    fetch(url).then(r => r.json()).then(d => console.log(d))
}

const loadUserByName = () => {
    const searched = document.getElementById('nameInput').value;
    if (searched === '') { return }
    const url = `https://api.github.com/search/users?q=${searched}`;
    fetch(url).then(res => res.json()).then(data => showUser(data));
}

const showUser = data => {
    console.log(data.items);
    const users = data.items;
    const usersContainer = document.getElementById('user-container');
    while (usersContainer.lastChild) {
        usersContainer.removeChild(usersContainer.lastChild);
    }
    usersContainer.innerHTML = `
        <h1 id="result-count">${data.total_count} users found</h1>
        <div id="show-user"></div>`;

    users.forEach(async user => {
        let followers = await fetch(user.followers_url);
        followers = await followers.json();

        const container = document.createElement('div');
        container.classList.add('user-container');

        container.innerHTML = `
        <div class="img-container">
            <img src="${user.avatar_url}" class="avatar">
        </div>
        <h3 class="user-name"><a href="${user.html_url}" target="_blank">${user.login}</a></h3>
        <h5 class="followers-info">
            ${followers.length ? followers.length : '😑'} followers
        </h5>`;

        document.getElementById('show-user').appendChild(container);

    })
}