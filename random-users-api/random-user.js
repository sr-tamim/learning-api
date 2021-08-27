
const loadUser = () => {
    document.getElementById('loadingMessage').style.display = 'block';
    document.getElementById('userContainer').style.display = 'none';

    fetch('https://randomuser.me/api/1.3/')
        .then(Response => Response.json())
        .then(data => displayUser(data))
}

const displayUser = data => {
    const user = (data.results[0]);
    const imgContainer = document.getElementById('userImg');
    const nameContainer = document.getElementById('userName');
    const infoContainer = document.getElementById('userInfo');
    const mailContainer = document.getElementById('userMail');
    const contactContainer = document.getElementById('userContact');
    const addressContainer = document.getElementById('userAddress');

    imgContainer.setAttribute('src', user.picture.large);
    nameContainer.innerHTML = `
        <span class='font-monospace'>${user.name.title}.</span> ${user.name.first + ' ' + user.name.last}`;
    infoContainer.innerHTML = `
        Gender: ${user.gender} | Age: ${user.dob.age}`;
    mailContainer.innerHTML = `${user.email}`;
    contactContainer.innerHTML = `Contact: ${user.cell.toString()}`;
    addressContainer.innerHTML = `
        <span class='fs-6 text-decoration-underline'>Address</span><br>
        ${user.location.street.number} ${user.location.street.name}, ${user.location.city},<br>${user.location.state}, ${user.location.country}`;

    document.getElementById('loadingMessage').style.display = 'none';
    document.getElementById('userContainer').style.display = 'inline-block';
    console.log(user);
}

loadUser();