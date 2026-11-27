let countdown;

function start() {
    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;

    if (name === "" || date === "") {
        alert("Enter event name and date!");
        return;
    }

    let eventDate = new Date(date + "T00:00:00");

    localStorage.setItem("name", name);
    localStorage.setItem("date", date);

    document.getElementById("event").innerText = name;

    clearInterval(countdown);

    function update() {
        let now = new Date();
        let diff = eventDate - now;

        if (diff < 0) {
            clearInterval(countdown);
            document.getElementById("timer").innerText = "00 : 00 : 00 : 00";
            document.getElementById("message").innerText =
                "🎉 Event has already happened!";
            return;
        }

        let days = Math.floor(diff / 86400000);
        let hours = Math.floor(diff / 3600000) % 24;
        let minutes = Math.floor(diff / 60000) % 60;
        let seconds = Math.floor(diff / 1000) % 60;

        document.getElementById("timer").innerText =
            String(days).padStart(2, "0") + " : " +
            String(hours).padStart(2, "0") + " : " +
            String(minutes).padStart(2, "0") + " : " +
            String(seconds).padStart(2, "0");

        document.getElementById("message").innerText = "";
    }

    update();
    countdown = setInterval(update, 1000);
}

// Restore saved event
window.onload = function() {
    let name = localStorage.getItem("name");
    let date = localStorage.getItem("date");

    if (name && date) {
        document.getElementById("name").value = name;
        document.getElementById("date").value = date;
        start();
    }
};