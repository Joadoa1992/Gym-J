let weightChartInstance = null;

// Helper function to format date as MM-DD
function formatDate(date) {
    return `${date.getMonth() + 1}-${date.getDate()}`;
}

// Fetch bodyweights and filter by optional start/end dates
async function fetchBodyweights(start = null, end = null) {
    try {
        const response = await fetch("http://localhost:8080/bodyweight/all");
        if (!response.ok) throw new Error("Failed to fetch bodyweights");

        let data = await response.json();

        // Sort by date ascending
        data.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Filter by date range if provided
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
                    label: "Vægt",
                    data: weights,
                    borderColor: "blue",
                    borderWidth: 3,
                    tension: 0.3,
                    pointRadius: 3,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        enabled: true,
                        titleColor: "white",
                        bodyColor: "white"
                    }
                },
                scales: {
                    x: {
                        ticks: { color: "#ffffff" },
                        title: { display: true, text: "Dato", color: "#ffffff" }
                    },
                    y: {
                        ticks: { color: "#ffffff" },
                        title: { display: true, text: "Kg", color: "#ffffff" }
                    }
                }
            }
        });
    }
}

// Submit new weight
document.getElementById("weightForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const date = document.getElementById("date").value;
    const weight = document.getElementById("weight").value;

    if (!date || !weight) {
        alert("Please fill out all fields.");
        return;
    }

    const data = { date, weight: parseFloat(weight) };

    try {
        const response = await fetch("http://localhost:8080/bodyweight", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error("Failed to save bodyweight");

        // Clear form
        document.getElementById("date").value = "";
        document.getElementById("weight").value = "";

        // Update chart with default range (5 days before and after today)
        loadDefaultRange();

    } catch (error) {
        alert("Error: " + error.message);
    }
});

// Load default range: 5 days before and after today
function loadDefaultRange() {
    const today = new Date();
    const start = new Date();
    start.setDate(today.getDate() - 5);
    const end = new Date();
    end.setDate(today.getDate() + 5);

    // Set date inputs
    document.getElementById("startDate").value = start.toISOString().split('T')[0];
    document.getElementById("endDate").value = end.toISOString().split('T')[0];

    fetchBodyweights(start, end);
}

// Update chart when user changes the range
document.getElementById("updateRange").addEventListener("click", function() {
    const start = document.getElementById("startDate").value;
    const end = document.getElementById("endDate").value;

    if (!start || !end) {
        alert("Please select both start and end dates.");
        return;
    }

    fetchBodyweights(start, end);
});

// Initial load
loadDefaultRange();