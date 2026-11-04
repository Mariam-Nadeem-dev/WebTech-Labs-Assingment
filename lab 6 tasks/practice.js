// part 1: total courses 6
async function main() {
    const res = await fetch("https://api.gutech.example/courses");
    const courses = await res.json();

    console.log("Total Courses:", courses.length);
}

main();
// part 2: Load course 4
async function getCourse() {
    const res = await fetch("https://api.gutech.example/courses/4");
    const course = await res.json();

    console.log("Title:", course.title);
    console.log("Price:", course.price);
}
getCourse();


// part 3: Load Web courses
async function getWebCourses() {
    const res = await fetch("https://api.gutech.example/courses?category=Web");
    const courses = await res.json();

    console.log(courses.map(c => c.title));
}
getWebCourses();


// part 4: Load events
async function getEvents() {
    const res = await fetch("https://api.gutech.example/events");
    const data = await res.json();

    console.log("Event Count:", data.count);

    data.results.forEach(e => {
        console.log(e.title);
    });
}
getEvents();


// part 5: Check course 99
async function checkCourse() {
    const res = await fetch("https://api.gutech.example/courses/99");
    const data = await res.json();

    console.log("Response OK:", res.ok);
    console.log("Status:", res.status);
    console.log("Error:", data.error);
}
checkCourse();


// part 6: Safe load with try and catch
async function safeLoad(url) {
    try {
        const res = await fetch(url);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error);
        }

        console.log("Data loaded successfully:", data);

    } catch (error) {
        console.log("Could not load data:", error.message);
    }
}

safeLoad("https://api.gutech.example/courses");
safeLoad("https://api.gutech.example/courses/99");
safeLoad("https://api.gutech.example/broken");
safeLoad("https://offline.gutech.example/x");


// part 7: Most expensive and free courses
async function courseDetails() {
    const res = await fetch("https://api.gutech.example/courses");
    const courses = await res.json();

    const expensive = courses.reduce((max, c) =>
        c.price > max.price ? c : max
    );

    const free = courses.filter(c => c.price === 0);

    console.log("Most Expensive Course:", expensive.title);
    console.log("Price:", expensive.price);
    console.log("Free Courses:", free.length);
}
courseDetails();