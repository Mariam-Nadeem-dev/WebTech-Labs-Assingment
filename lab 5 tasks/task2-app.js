const courses = [
    { id: 1, name: "HTML & CSS", category: "Web Development", duration: "4 Weeks", price: 2500 },
    { id: 2, name: "JavaScript", category: "Web Development", duration: "6 Weeks", price: 3500 },
    { id: 3, name: "Python Programming", category: "Programming", duration: "8 Weeks", price: 4000 },
    { id: 4, name: "C++ Programming", category: "Programming", duration: "6 Weeks", price: 3000 },
    { id: 5, name: "Database Management", category: "Database", duration: "5 Weeks", price: 3200 },
    { id: 6, name: "Cyber Security", category: "Security", duration: "7 Weeks", price: 4500 },
    { id: 7, name: "Graphic Design", category: "Design", duration: "5 Weeks", price: null },
    { id: 8, name: "Artificial Intelligence", category: "Technology", duration: "8 Weeks", price: 5000, soldOut: true }
];

// State variables store the current search and category.
let searchText = "";
let category = "All";
let sortAscending = false;

// Render function creates the course cards.
function render(courseList) {
    return courseList.map(function(course) {

        let coursePrice;

        if (course.soldOut) {
            coursePrice = "Sold Out";
        } else if (course.price === null) {
            coursePrice = "Free";
        } else {
            coursePrice = "PKR " + course.price;
        }

        return `
            <div class="course-card">
                <h2>${course.name}</h2>
                <span class="category">${course.category}</span>
                <p><strong>Duration:</strong> ${course.duration}</p>
                <p><strong>Price:</strong> ${coursePrice}</p>
            </div>
        `;
    }).join("");
}

// Update function applies search, category and sorting together.
function update() {

    let filteredCourses = courses.filter(function(course) {

        const matchesSearch =
            course.name.toLowerCase().includes(searchText.toLowerCase());

        const matchesCategory =
            category === "All" || course.category === category;

        return matchesSearch && matchesCategory;
    });

    // Sort a copy so the original courses array stays unchanged.
    if (sortAscending) {
        filteredCourses = [...filteredCourses].sort(function(a, b) {
            return (a.price ?? 0) - (b.price ?? 0);
        });
    }

    // Show how many courses match the filters.
    document.getElementById("resultCount").textContent =
        filteredCourses.length + " of " + courses.length + " courses";

    const container = document.getElementById("courseContainer");

    // Display a friendly message when no course matches.
    if (filteredCourses.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h2>No courses found!</h2>
                <p>Try another search or select a different category.</p>
            </div>
        `;
    } else {
        container.innerHTML = render(filteredCourses);
    }
}

// Search updates whenever the user types.
document.getElementById("searchInput").addEventListener("input", function(event) {
    searchText = event.target.value;
    update();
});

// Category filter works together with the search.
document.getElementById("categoryFilter").addEventListener("change", function(event) {
    category = event.target.value;
    update();
});

// Toggle price sorting.
document.getElementById("sortButton").addEventListener("click", function() {
    sortAscending = !sortAscending;
    this.textContent = sortAscending ? "Price: Low to High" : "Sort by Price";
    update();
});

// Display all courses when the page first loads.
update();