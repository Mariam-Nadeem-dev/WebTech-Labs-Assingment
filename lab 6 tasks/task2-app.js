const status = document.querySelector("#status");
const list = document.querySelector("#list");

async function loadCourses() {
    status.textContent = "Loading courses...";

    try {
        const response = await fetch("https://api.gutech.example/courses");

        if (!response.ok) {
            throw new Error("Server said " + response.status);
        }

        const courses = await response.json();

        if (courses.length === 0) {
            status.textContent = "No courses found.";
            return;
        }

        status.textContent = "";

        list.innerHTML = courses.map(c => `
            <div class="card">
                <h3>${c.title}</h3>
                <p>Category: ${c.category}</p>
                <p>${c.price === 0 ? "Free" : "Rs " + c.price}</p>
                <p>Hours: ${c.hours}</p>
            </div>
        `).join("");

    } catch (error) {
        status.textContent = "Sorry, we could not load the courses.";
        console.log(error.message);
    }
}

loadCourses();