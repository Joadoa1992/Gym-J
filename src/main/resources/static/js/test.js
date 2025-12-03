// -----------------------------
// UTILITY: Fetch JSON
// -----------------------------
async function fetchJSON(url, options = {}) {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

// -----------------------------
// CREATE PLAN PAGE
// -----------------------------
if (document.getElementById("createPlanForm")) {

    const exerciseListDiv = document.getElementById("exercise_list");
    const muscleGroupSelect = document.getElementById("muscleGroupSelect");
    let selectedExercises = []; // Track selected exercises

    // Load exercises
    async function loadExercises(group = "ALL") {
        let url = (group.toUpperCase() === "ALL")
            ? "http://localhost:8080/api/workouts"
            : `http://localhost:8080/api/workouts/group/${group}`;

        const exercises = await fetchJSON(url);
        exerciseListDiv.innerHTML = "";

        exercises.forEach(ex => {
            const div = document.createElement("div");
            div.classList.add("exerciseItem");

            if (selectedExercises.includes(ex.id)) {
                div.classList.add("selected");
            }

            div.innerHTML = `
                <div class="info">
                    <img src="${ex.imageUrl || 'placeholder.png'}" alt="${ex.exerciseName}">
                    <strong>${ex.exerciseName}</strong>
                    <small>${ex.muscleGroup}</small>
                </div>
            `;

            // Click to select/deselect
            div.addEventListener("click", function() {
                div.classList.toggle("selected");

                if (selectedExercises.includes(ex.id)) {
                    selectedExercises = selectedExercises.filter(id => id !== ex.id);
                } else {
                    selectedExercises.push(ex.id);
                }
            });

            exerciseListDiv.appendChild(div);
        });
    }

    loadExercises();

    if (muscleGroupSelect) {
        muscleGroupSelect.addEventListener("change", () => {
            loadExercises(muscleGroupSelect.value);
        });
    }

    document.getElementById("createPlanForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const planName = document.getElementById("planName").value.trim();
        if (!planName) return alert("Please enter a plan name.");
        if (selectedExercises.length === 0) return alert("Please select at least one exercise.");

        const plan = { planName, exercises: selectedExercises.map(id => ({ id })) };

        try {
            await fetch("http://localhost:8080/api/plans", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(plan)
            });
            alert("Workout plan created!");
            window.location.href = "view_plans.html";
        } catch (error) {
            console.error(error);
            alert("Error creating plan.");
        }
    });
}

// -----------------------------
// VIEW PLANS PAGE
// -----------------------------
if (document.getElementById("plansList")) {
    fetchJSON("http://localhost:8080/api/plans")
        .then(plans => {
            let html = "";
            plans.forEach(p => {
                html += `
                    <div class="planCard">
                        <h3>${p.planName}</h3>
                        <button onclick="openPlan(${p.id})">Open</button>
                    </div>
                `;
            });
            document.getElementById("plansList").innerHTML = html;
        })
        .catch(console.error);
}

function openPlan(id) {
    window.location.href = `plan_details.html?id=${id}`;
}

// -----------------------------
// PLAN DETAILS PAGE
// -----------------------------
if (document.getElementById("planTitle")) {
    const urlParams = new URLSearchParams(window.location.search);
    const planId = urlParams.get("id");
    const exerciseListDiv = document.getElementById("exerciseList");

    async function loadPlanDetails() {
        const plan = await fetchJSON(`http://localhost:8080/api/plans/${planId}`);
        document.getElementById("planTitle").innerText = plan.planName;
        exerciseListDiv.innerHTML = "";

        for (const ex of plan.exercises) {
            const exerciseRow = document.createElement("div");
            exerciseRow.className = "exerciseRow";

            // Exercise card
            const exCard = document.createElement("div");
            exCard.className = "exerciseCard";
            exCard.innerHTML = `
                <img src="${ex.imageUrl || 'placeholder.png'}" alt="${ex.exerciseName}">
                <h3>${ex.exerciseName}</h3>
                <p>${ex.description || ''}</p>
            `;

            // Logs container (hidden initially)
            const logContainer = document.createElement("div");
            logContainer.className = "logCardContainer";
            logContainer.style.display = "none";

            // Show/Hide logs button
            const toggleButton = document.createElement("button");
            toggleButton.type = "button";
            toggleButton.textContent = "Show Logs";
            toggleButton.className = "toggleLogsBtn";
            toggleButton.style.marginBottom = "10px";

            toggleButton.addEventListener("click", () => {
                if (logContainer.style.display === "none") {
                    logContainer.style.display = "flex";
                    toggleButton.textContent = "Hide Logs";
                } else {
                    logContainer.style.display = "none";
                    toggleButton.textContent = "Show Logs";
                }
            });

            // Log form
            if (document.getElementById("logForm")) {
                const logForm = document.getElementById("logForm");
                const setRowsContainer = document.getElementById("setRowsContainer");
                const exerciseSelect = document.getElementById("exerciseSelectLog");

                // Fetch exercises for the dropdown
                async function loadExerciseOptions() {
                    const planId = new URLSearchParams(window.location.search).get("id");
                    const plan = await fetchJSON(`http://localhost:8080/api/plans/${planId}`);
                    exerciseSelect.innerHTML = '<option value="">-- Choose Exercise --</option>';
                    plan.exercises.forEach(ex => {
                        const option = document.createElement("option");
                        option.value = ex.id;
                        option.textContent = ex.exerciseName;
                        exerciseSelect.appendChild(option);
                    });
                }

                loadExerciseOptions();

                // Add initial set row
                addSetRow();

                document.getElementById("addSet").addEventListener("click", addSetRow);

                function addSetRow() {
                    const row = document.createElement("div");
                    row.classList.add("setRow");
                    row.innerHTML = `
            <input type="number" name="weight[]" placeholder="Weight (kg)" required>
            <input type="number" name="reps[]" placeholder="Reps" required>
            <button type="button" class="removeRow">✖</button>
        `;
                    setRowsContainer.appendChild(row);
                }

                // Remove row
                setRowsContainer.addEventListener("click", e => {
                    if (e.target.classList.contains("removeRow")) {
                        e.target.parentElement.remove();
                    }
                });

                // Handle form submission
                logForm.addEventListener("submit", async e => {
                    e.preventDefault();
                    const exerciseId = exerciseSelect.value;
                    if (!exerciseId) return alert("Select an exercise.");

                    const weights = [...document.querySelectorAll('input[name="weight[]"]')].map(i => parseFloat(i.value));
                    const reps = [...document.querySelectorAll('input[name="reps[]"]')].map(i => parseInt(i.value));

                    const logEntries = weights.map((weight, i) => ({
                        weight,
                        repsCompleted: reps[i],
                        setsCompleted: 1,          // each row = 1 set
                        totalVolume: weight * reps[i]
                    }));

                    try {
                        await fetch(`http://localhost:8080/api/logs/${exerciseId}/batch`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(logEntries)
                        });
                        alert("Workout logged!");
                        loadLogs(exerciseId);
                        setRowsContainer.innerHTML = "";
                        addSetRow();
                    } catch (error) {
                        console.error(error);
                        alert("Error logging workout.");
                    }
                });

                async function loadLogs(exerciseId) {
                    const logs = await fetchJSON(`http://localhost:8080/api/logs/${exerciseId}`);
                    let html = "";
                    logs.forEach(log => {
                        html += `
                <div class="logCard">
                    <p><b>Date:</b> ${log.date}</p>
                    <p>Weight: ${log.weight} kg</p>
                    <p>Reps: ${log.repsCompleted}</p>
                    <p>Volume: ${log.totalVolume}</p>
                </div>
            `;
                    });
                    document.getElementById("logList").innerHTML = html;
                }

                // Load logs on exercise change
                exerciseSelect.addEventListener("change", () => {
                    if (exerciseSelect.value) loadLogs(exerciseSelect.value);
                });
            }
        }
        loadPlanDetails();
    }
}