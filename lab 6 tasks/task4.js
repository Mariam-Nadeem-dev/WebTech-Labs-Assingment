const list = document.querySelector("#list");
const status = document.querySelector("#status");
const retryBtn = document.querySelector("#retryBtn");

// FIX 1: Removed the API key because secret keys should not be exposed in frontend code.

async function loadEvents() {

    try {
        // FIX 2: Added await because fetch returns a Promise.
        const res = await fetch("https://api.gutech.example/events");

        // Check if the server response is successful.
        if (!res.ok) {
            throw new Error("Server error: " + res.status);
        }
        

        const data = await res.json();

        // FIX 3: Used === instead of = for comparison.
        const free = data.results.filter(e => e.place === "Hall A");

        // FIX 4: Used data.results because the events are inside results.
        const titles = free.map(e => e.title);

        // FIX 5: Used textContent instead of innerHTML.
        list.textContent = titles.join(", ");

        status.textContent = "Loaded: " + free.length + " events";
        retryBtn.hidden = true;

    } catch (error) {

        // FIX 6: Added try/catch to handle loading errors.
        status.textContent = "Sorry, events could not be loaded.";
        console.log(error.message);
        retryBtn.hidden = false;
    }
}
retryBtn.addEventListener("click", loadEvents);
loadEvents();

