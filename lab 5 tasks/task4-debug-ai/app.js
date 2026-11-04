// Sample course data is used instead of getCourses() for this exercise.
const courses = [
    { id: 1, title: "HTML & CSS", price: 1500 },
    { id: 2, title: "JavaScript", price: 2500 },
    { id: 3, title: "Python Programming", price: 0 },
    { id: 4, title: "C++ Programming", price: 1800 },
    { id: 5, title: "Database Management", price: 0 },
    { id: 6, title: "Cyber Security", price: 3000 }
];

// FIX 1: forEach does not return a filtered array, so filter() is used.
const cheap = courses.filter(c => c.price < 2000);

// FIX 2: A comparison needs ===, not =, because = assigns a value.
const free = courses.filter(c => c.price === 0);

// FIX 3: find() returns one object, not an array, so access its title directly.
const one = courses.find(c => c.id === 3);

// FIX 4: sort() changes the original array, so sort a copy instead.
const sorted = [...courses].sort((a, b) => a.price - b.price);

// FIX 5: toLowerCase is a method and must be called with parentheses.
const names = courses.map(c => c.title.toLowerCase());

// FIX 6: innerHTML with user input can be unsafe; use textContent instead.
const commentOutput = document.querySelector("#commentOutput");
const userComment = "I am exploring these courses.";
commentOutput.textContent = userComment;

// State variables remember the current search and free-only selection.
let searchText = "";
let freeOnly = false;

const searchInput = document.querySelector("#searchInput");
const freeButton = document.querySelector("#freeButton");
const courseList = document.querySelector("#courseList");
const resultCount = document.querySelector("#resultCount");

// Display courses using safe textContent.
function displayCourses(courseArray) {
    courseList.replaceChildren();

    courseArray.forEach(course => {
        const card = document.createElement("div");
        card.className = "course-card";

        const title = document.createElement("h2");
        title.textContent = course.title;

        const price = document.createElement("p");
        price.textContent = course.price === 0
            ? "Price: Free"
            : "Price: PKR " + course.price;

        card.append(title, price);
        courseList.appendChild(card);
    });
}

// Apply search and free-only filter together.
function updateCourses() {
    const filteredCourses = courses.filter(course => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchText.toLowerCase());

        const matchesFree =
            !freeOnly || course.price === 0;

        return matchesSearch && matchesFree;
    });

    resultCount.textContent =
        filteredCourses.length + " of " + courses.length + " courses";

    displayCourses(filteredCourses);
}

// Search works whenever the user types.
searchInput.addEventListener("input", function () {
    searchText = searchInput.value;
    updateCourses();
});

// Free button changes state without removing the search.
freeButton.addEventListener("click", function () {
    freeOnly = !freeOnly;

    freeButton.textContent = freeOnly
        ? "Show Free Courses: ON"
        : "Show Free Courses: OFF";

    updateCourses();
});

// Add a comment safely using textContent.
document.querySelector("#commentButton").addEventListener("click", function () {
    const comment = document.querySelector("#commentInput").value.trim();

    commentOutput.textContent = comment || "Please enter a comment.";
});

// Initial display.
updateCourses();

// These variables are available for checking the six corrected operations.
console.log("Cheap courses:", cheap);
console.log("Free courses:", free);
console.log("Course with ID 3:", one);
console.log("Sorted courses:", sorted);
console.log("Course names:", names);