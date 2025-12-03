// ===================================================================
// CREATE ACCOUNT FORM
// ===================================================================
const createAccountForm = document.getElementById("createAccountForm");
if (createAccountForm) {
    createAccountForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const user = {
            firstName: document.getElementById("name").value,
            lastName: document.getElementById("lastname").value,
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };

        fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                alert("Account created!");
                window.location.href = "/login.html";
            })
            .catch(err => console.error("Create Error:", err));
    });
}

// ===================================================================
// LINK TO CREATE ACCOUNT PAGE
// ===================================================================
const createAccountLink = document.getElementById("createAccountLink");
if (createAccountLink) {
    createAccountLink.addEventListener("click", function() {
        window.location.href = "/create_account.html";
    });
}

// ===================================================================
// LOGIN FORM
// ===================================================================
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const loginData = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        };

        fetch("/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin"
        })
            .then(res => res.json())
            .then(user => {
                if (user && user.id) {
                    window.location.href = "/frontpage.html";
                } else {
                    alert("Wrong username or password.");
                }
            })
            .catch(err => console.error("Login Error:", err));
    });
}

// ===================================================================
// FRONT PAGE SESSION CHECK + USER DISPLAY
// ===================================================================
window.addEventListener("DOMContentLoaded", () => {
    const userText = document.getElementById("logged-in-user");

    if (userText) {
        fetch("/api/users/session", { credentials: "same-origin" })
            .then(res => res.json())
            .then(user => {
                if (!user || !user.username) {
                    window.location.href = "/login.html";
                } else {
                    userText.textContent = "Welcome back " + user.username;
                }
            })
            .catch(err => console.error("Session Error:", err));
    }
});

// ===================================================================
// MENU CONTENT LOADER
// ===================================================================
const contentArea = document.getElementById("content-area");
const menuLinks = document.querySelectorAll(".sidebar-menu a");

if (menuLinks) {
    menuLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();

            const file = link.getAttribute("data-file");
            if (!file) return;

            fetch(file)
                .then(res => res.text())
                .then(html => {
                    contentArea.innerHTML = html;
                    contentArea.style.display = "block";

                    // Initialize page-specific JS
                    if (file === "nutrition.html") {
                        initNutritionPage();
                    }
                    if (file === "pr.html") {
                        initPrPage();
                    }

                    if (file === "bodyweight_graf.html") {
                        initbodyweightPage();
                    }
                })
                .catch(err => console.error("Load Error:", err));
        });
    });
}

// ===================================================================
// HOME BUTTON — hides loaded content
// ===================================================================
const homeButton = document.getElementById("home-button");
if (homeButton) {
    homeButton.addEventListener("click", () => {
        if (contentArea) {
            contentArea.style.display = "none";
        }
    });
}

// ===================================================================
// LOGOUT BUTTON (BACKEND SESSION LOGOUT)
// ===================================================================
const logoutBtn = document.getElementById("logout-button");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        fetch("/api/users/logout", {
            method: "POST",
            credentials: "same-origin"
        })
            .then(() => {
                window.location.href = "/login.html";
            })
            .catch(err => console.error("Logout Error:", err));
    });
}

// ===================================================================
// NUTRITION PAGE INITIALIZATION
// ===================================================================
function initNutritionPage() {
    const form = document.getElementById("nutritionForm");
    const tableBody = document.getElementById("nutritionTableBody");
    const chartCanvas = document.getElementById("nutritionChart");
    let chart = null;

    if (!form || !tableBody || !chartCanvas) return;

    function loadData() {
        fetch("/api/nutrition")
            .then(res => res.json())
            .then(data => {
                updateTable(data);
                updateChart(data);
            });
    }

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

    tableBody.addEventListener("click", e => {
        if (e.target.classList.contains("delete-btn")) {
            const id = e.target.dataset.id;
            fetch(`/api/nutrition/${id}`, { method: "DELETE" })
                .then(() => loadData());
        }
    });

    function updateChart(data) {
        const labels = data.map(d => d.date);
        const caloriesData = data.map(d => d.calories);
        const fatData = data.map(d => d.fat);
        const proteinData = data.map(d => d.protein);

        if (chart) chart.destroy();

        chart = new Chart(chartCanvas, {
            type: "line",
            data: {
                labels,
                datasets: [
                    { label: "Kalorier", data: caloriesData, borderWidth: 3, tension: 0.3, pointRadius: 3 },
                    { label: "Fedt", data: fatData, borderWidth: 3, tension: 0.3, pointRadius: 3 },
                    { label: "Protein", data: proteinData, borderWidth: 3, tension: 0.3, pointRadius: 3 }
                ]
            },
            options: { responsive: true }
        });
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        const data = {
            date: document.getElementById("date").value,
            calories: document.getElementById("calories").value,
            fat: document.getElementById("fat").value,
            protein: document.getElementById("protein").value
        };

        fetch("/api/nutrition", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(() => {
                form.reset();
                loadData();
            });
    });

    loadData();
}

// ===================================================================
// PR PAGE INITIALIZATION
// ===================================================================
function initPrPage() {
    const prTableBody = document.getElementById("prTableBody");
    const prForm = document.getElementById("prForm");
    const prChartCanvas = document.getElementById("prChart");
    let prChart = null;

    if (!prTableBody || !prForm || !prChartCanvas) return;

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
}
function initbodyweightPage() {
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
}
