
async function fetchBodyweights() {
    try {
        const response = await fetch("http://localhost:8080/bodyweight/all");
        if (!response.ok) throw new Error("Failed to fetch bodyweights");

        const data = await response.json();

        // Sort by date ascending
        data.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Prepare chart data
        const labels = data.map(d => {
            const date = new Date(d.date);
            // Format as MM-DD
            return `${date.getMonth() + 1}-${date.getDate()}`;
        });
        const weights = data.map(d => d.weight);

        createChart(labels, weights);

    } catch (error) {
        console.error("Error fetching bodyweights:", error);
    }
}

function createChart(labels, weights) {
    const ctx = document.getElementById("weightChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                data: weights,
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.1)",
                fill: true,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false // removes the legend box
                },
                tooltip: {
                    enabled: false // removes the tooltip box
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Date"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Kg"
                    }
                }
            }
        }
    });
}

// Fetch and render chart on page load
fetchBodyweights();