
const loadUser = () => {
    document.getElementById('userContainer').innerHTML = `
        <h2 class='d-flex align-items-center justify-content-center' style='height:200px'>
            Loading...
        </h2>`;
    fetch('https://randomuser.me/api/1.3/')
        .then(Response => Response.json())
        .then(data => displayUser(data))
}

const displayUser = data => {
    const user = (data.results[0]);

    document.getElementById('userContainer').innerHTML = `
        <div class='bg-white p-5 shadow-lg d-inline-block' style='border-radius:10px'>
            <div class='position-relative d-flex justify-content-center mt-4'>
                <img src='${user.picture.large}' class='rounded-3 position-absolute bottom-0'>
            </div>
            <h2 class='mt-3'>
                <span class='font-monospace'>${user.name.title}.</span> ${user.name.first + ' ' + user.name.last}
            </h2>
            <h5 class='mb-3 text-capitalize'>
                Gender: ${user.gender} | Age: ${user.dob.age}
            </h5>
            <h6>${user.email}</h6>
            <h6>Contact: ${user.cell.toString()}</h6>
            <small class='d-inline-block mt-2'>
                <span class='fs-6 text-decoration-underline'>Address</span><br>
                ${user.location.street.number} ${user.location.street.name}, ${user.location.city},<br>${user.location.state}, ${user.location.country}
            </small>
        </div>`
    console.log(user);
}

loadUser();