const prTableBody = document.getElementById("prTableBody");
const prForm = document.getElementById("prForm");
const prChartCanvas = document.getElementById("prChart");

let prChart = null;

document.addEventListener("DOMContentLoaded", () => {
    loadLatestPrs();
    loadPrHistory();
});

prForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = {
        exercise: document.getElementById("exercise").value,
        weight: parseInt(document.getElementById("weight").value, 10),
        date: document.getElementById("prDate").value
    };

    fetch("/api/pr", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(() => {
            prForm.reset();
            loadLatestPrs();
            loadPrHistory();
        });
});

function loadLatestPrs() {
    fetch("/api/pr/latest")
        .then(response => response.json())
        .then(data => {
            prTableBody.innerHTML = "";

            data.forEach(pr => {
                const row = document.createElement("tr");
                const dateText = pr.date ? pr.date : "-";

                row.innerHTML = `
                    <td>${mapExercise(pr.exercise)}</td>
                    <td>${pr.weight}</td>
                    <td>${dateText}</td>
                    <td><button class="delete-btn" data-id="${pr.id}">Slet</button></td>
                `;

                prTableBody.appendChild(row);
            });

            updatePrCards(data);
        });
}

// delete-knapper i PR-tabel
prTableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const id = event.target.dataset.id;
        fetch(`/api/pr/${id}`, {
            method: "DELETE"
        }).then(() => {
            loadLatestPrs();
            loadPrHistory();
        });
    }
});

function loadPrHistory() {
    fetch("/api/pr")
        .then(response => response.json())
        .then(data => {
            updatePrChart(data);
        });
}

// flottere graf
function updatePrChart(data) {
    const labels = data.map(pr => pr.date);

    const benchData = data
        .filter(pr => pr.exercise === "BENCH")
        .map(pr => pr.weight);

    const squatData = data
        .filter(pr => pr.exercise === "SQUAT")
        .map(pr => pr.weight);

    const deadliftData = data
        .filter(pr => pr.exercise === "DEADLIFT")
        .map(pr => pr.weight);

    if (prChart) {
        prChart.destroy();
    }

    prChart = new Chart(prChartCanvas, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Bænkpres",
                    data: benchData,
                    borderWidth: 3,
                    tension: 0.3,
                    pointRadius: 3
                },
                {
                    label: "Squat",
                    data: squatData,
                    borderWidth: 3,
                    tension: 0.3,
                    pointRadius: 3
                },
                {
                    label: "Dødløft",
                    data: deadliftData,
                    borderWidth: 3,
                    tension: 0.3,
                    pointRadius: 3
                }
            ]
        },
        options: {
            responsive: true
        }
    });
}

function updatePrCards(latestList) {
    const bench = latestList.find(pr => pr.exercise === "BENCH");
    const squat = latestList.find(pr => pr.exercise === "SQUAT");
    const deadlift = latestList.find(pr => pr.exercise === "DEADLIFT");

    if (bench) {
        document.getElementById("benchValue").textContent = bench.weight + " kg";
        document.getElementById("benchDate").textContent = bench.date
            ? "Rekorden er sat " + bench.date
            : "Ingen PR endnu";
    }

    if (squat) {
        document.getElementById("squatValue").textContent = squat.weight + " kg";
        document.getElementById("squatDate").textContent = squat.date
            ? "Rekorden er sat " + squat.date
            : "Ingen PR endnu";
    }

    if (deadlift) {
        document.getElementById("deadliftValue").textContent = deadlift.weight + " kg";
        document.getElementById("deadliftDate").textContent = deadlift.date
            ? "Rekorden er sat " + deadlift.date
            : "Ingen PR endnu";
    }
}

function mapExercise(code) {
    switch (code) {
        case "BENCH":
            return "Bænkpres";
        case "SQUAT":
            return "Squat";
        case "DEADLIFT":
            return "Dødløft";
        default:
            return code;
    }
}
