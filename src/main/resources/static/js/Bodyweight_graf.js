// bodyweight.js
let weightChartInstance = null;

// This function will be called by menuLoader when the page loads
window.pageInit = function(file) {
    if (file === "bodyweight_graf.html") {
        initBodyweightPage();
    }
};

// Format date
function formatDate(date) {
    return `${date.getMonth() + 1}-${date.getDate()}`;
}

// Fetch bodyweights
async function fetchBodyweights(start = null, end = null) {
    try {
        const response = await fetch("http://localhost:8080/bodyweight/all");
        if (!response.ok) throw new Error("Failed to fetch bodyweights");

        let data = await response.json();
        data.sort((a, b) => new Date(a.date) - new Date(b.date));

        if (start) start = new Date(start);
        if (end) end = new Date(end);

        if (start && end) {
            data = data.filter(d => {
                const date = new Date(d.date);
                return date >= start && date <= end;
            });
        }

        const labels = data.map(d => formatDate(new Date(d.date)));
        const weights = data.map(d => d.weight);

        createChart(labels, weights);
    } catch (error) {
        console.error("Error fetching bodyweights:", error);
    }
}

// Create or update chart
function createChart(labels, weights) {
    const ctx = document.getElementById("weightChart").getContext("2d");

    if (weightChartInstance) {
        weightChartInstance.data.labels = labels;
        weightChartInstance.data.datasets[0].data = weights;
        weightChartInstance.update();
    } else {
        weightChartInstance = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    data: weights,
                    borderColor: "blue",
                    backgroundColor: "rgba(0,0,255,0.1)",
                    fill: true,
                    tension: 0.2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                scales: {
                    x: { title: { display: true, text: "Date" } },
                    y: { title: { display: true, text: "Kg" } }
                }
            }
        });
    }
}

// Initialize page
function initBodyweightPage() {
    bindChartFormEvents();
    loadDefaultRange();
}

// Bind events
function bindChartFormEvents() {
    const weightForm = document.getElementById("weightForm");
    const updateRangeBtn = document.getElementById("updateRange");

    if (weightForm) {
        weightForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            const date = document.getElementById("date").value;
            const weight = document.getElementById("weight").value;
            if (!date || !weight) return alert("Please fill out all fields.");

            try {
                const response = await fetch("http://localhost:8080/bodyweight", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ date, weight: parseFloat(weight) })
                });
                if (!response.ok) throw new Error("Failed to save bodyweight");

                document.getElementById("date").value = "";
                document.getElementById("weight").value = "";
                loadDefaultRange();
            } catch (err) {
                alert("Error: " + err.message);
            }
        });
    }

    if (updateRangeBtn) {
        updateRangeBtn.addEventListener("click", () => {
            const start = document.getElementById("startDate").value;
            const end = document.getElementById("endDate").value;
            if (!start || !end) return alert("Please select both start and end dates.");
            fetchBodyweights(start, end);
        });
    }
}

// Default date range
function loadDefaultRange() {
    const today = new Date();
    const start = new Date();
    start.setDate(today.getDate() - 5);
    const end = new Date();
    end.setDate(today.getDate() + 5);

    document.getElementById("startDate").value = start.toISOString().split("T")[0];
    document.getElementById("endDate").value = end.toISOString().split("T")[0];

    fetchBodyweights(start, end);
}
