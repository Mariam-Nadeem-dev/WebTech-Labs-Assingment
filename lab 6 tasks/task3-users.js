const search = document.querySelector("#search");
const status = document.querySelector("#status");
const list = document.querySelector("#list");

let allUsers = [];

async function loadUsers() {
    status.textContent = "Loading users...";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Could not load users");
        }

        allUsers = await response.json();
        showUsers(allUsers);

    } catch (error) {
        status.textContent = "Sorry, users could not be loaded.";
        console.log(error.message);
    }
}

function showUsers(users) {
    list.innerHTML = "";

    if (users.length === 0) {
        status.textContent = "No users found.";
        return;
    }

    status.textContent = `Showing ${users.length} of ${allUsers.length}`;

    list.innerHTML = users.map(user => `
        <div class="card">
            <h3>${user.name}</h3>
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>City: ${user.address.city}</p>
            <p>Company: ${user.company.name}</p>
        </div>
    `).join("");
}

search.addEventListener("input", function () {
    const value = search.value.toLowerCase();

    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(value)
    );

    showUsers(filteredUsers);
});

loadUsers();