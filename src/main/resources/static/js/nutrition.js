const form = document.getElementById("nutritionForm");
const tableBody = document.getElementById("nutritionTableBody");
const chartCanvas = document.getElementById("nutritionChart");

let chart = null;

document.addEventListener("DOMContentLoaded", () => {
    loadData();
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const data = {
        date: document.getElementById("date").value,
        calories: document.getElementById("calories").value,
        fat: document.getElementById("fat").value,
        protein: document.getElementById("protein").value
    };

    fetch("/api/nutrition", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(() => {
            form.reset();
            loadData();
        });
});

function loadData() {
    fetch("/api/nutrition")
        .then(response => response.json())
        .then(data => {
            updateTable(data);
            updateChart(data);
        });
}

// tabel med delete-knap
function updateTable(data) {
    tableBody.innerHTML = "";

    data.forEach(entry => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.calories}</td>
            <td>${entry.fat}</td>
            <td>${entry.protein}</td>
            <td><button class="delete-btn" data-id="${entry.id}">Slet</button></td>
        `;

        tableBody.appendChild(row);
    });
}

// delegér klik på delete-knapper
tableBody.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const id = event.target.dataset.id;
        fetch(`/api/nutrition/${id}`, {
            method: "DELETE"
        }).then(() => loadData());
    }
});

// flottere graf
function updateChart(data) {
    const labels = data.map(entry => entry.date);
    const caloriesData = data.map(entry => entry.calories);
    const fatData = data.map(entry => entry.fat);
    const proteinData = data.map(entry => entry.protein);

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(chartCanvas, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Kalorier",
                    data: caloriesData,
                    borderWidth: 3,
                    tension: 0.3,
                    pointRadius: 3
                },
                {
                    label: "Fedt",
                    data: fatData,
                    borderWidth: 3,
                    tension: 0.3,
                    pointRadius: 3
                },
                {
                    label: "Protein",
                    data: proteinData,
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
