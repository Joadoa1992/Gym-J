// -----------------------------
// UTILITY: Fetch JSON
// -----------------------------
async function fetchJSON(url, options = {}) {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

// ======================================================================
//  CREATE PLAN PAGE
// ======================================================================
if (document.getElementById("createPlanForm")) {

    const exerciseListDiv = document.getElementById("exercise_list");
    const muscleGroupSelect = document.getElementById("muscleGroupSelect");
    let selectedExercises = [];

    async function loadExercises(group = "ALL") {
        let url = (group === "ALL")
            ? "http://localhost:8080/api/workouts"
            : `http://localhost:8080/api/workouts/group/${group}`;

        const exercises = await fetchJSON(url);
        exerciseListDiv.innerHTML = "";

        exercises.forEach(ex => {
            const div = document.createElement("div");
            div.classList.add("exerciseItem");

            if (selectedExercises.includes(ex.id)) div.classList.add("selected");

            div.innerHTML = `
                <div class="info">
                    <img src="${ex.imageUrl || 'placeholder.png'}" alt="${ex.exerciseName}">
                    <strong>${ex.exerciseName}</strong>
                    <small>${ex.muscleGroup}</small>
                </div>
            `;

            div.addEventListener("click", () => {
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

    muscleGroupSelect?.addEventListener("change", () => {
        loadExercises(muscleGroupSelect.value);
    });

    document.getElementById("createPlanForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const planName = document.getElementById("planName").value.trim();
        if (!planName) return alert("Please enter a plan name.");
        if (selectedExercises.length === 0) return alert("Please select exercises.");

        const plan = {
            planName,
            exercises: selectedExercises.map(id => ({ id }))
        };

        try {
            await fetch("http://localhost:8080/api/plans", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(plan)
            });

            alert("Workout plan created!");
            window.location.href = "view_plans.html";

        } catch (err) {
            console.error(err);
            alert("Error creating plan.");
        }
    });
}

// ======================================================================
//  VIEW PLANS PAGE
// ======================================================================
if (document.getElementById("plansList")) {
    fetchJSON("http://localhost:8080/api/plans")
        .then(plans => {
            document.getElementById("plansList").innerHTML = plans.map(p => `
                <div class="planCard">
                    <h3>${p.planName}</h3>
                    <button onclick="openPlan(${p.id})">Open</button>
                </div>
            `).join("");
        })
        .catch(console.error);
}

function openPlan(id) {
    window.location.href = `plan_details.html?id=${id}`;
}

// ======================================================================
//  PLAN DETAILS PAGE (Exercise list + Logs)
// ======================================================================
async function fetchJSON(url, options = {}) {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}

if (document.getElementById("planTitle")) {
    const urlParams = new URLSearchParams(window.location.search);
    const planId = urlParams.get("id");
    const exerciseListDiv = document.getElementById("exerciseList");

    async function loadPlanDetails() {
        const plan = await fetchJSON(`http://localhost:8080/api/plans/${planId}`);
        document.getElementById("planTitle").innerText = plan.planName;
        exerciseListDiv.innerHTML = "";

        plan.exercises.forEach(ex => {
            const row = document.createElement("div");
            row.className = "exerciseRow";

            row.innerHTML = `
                <div class="exerciseCard">
                    <img src="${ex.imageUrl || 'placeholder.png'}" alt="${ex.exerciseName}">
                    <h3>${ex.exerciseName}</h3>
                    <p>${ex.description || ''}</p>
        
        <div class="logCardContainer"></div> <!-- table will go here -->

        <div class="setRows"></div>
        <button class="addSetBtn">Add Set</button>
        <button class="submitLogBtn">Log Workout</button>
        
                </div>
            `;

            const setRows = row.querySelector(".setRows");
            const addSetBtn = row.querySelector(".addSetBtn");
            const submitBtn = row.querySelector(".submitLogBtn");
            const logContainer = row.querySelector(".logCardContainer");

            function addSet() {
                const r = document.createElement("div");
                r.className = "setRow";
                r.innerHTML = `
                    <input type="number" class="weight" placeholder="Weight (kg)" required>
                    <input type="number" class="reps" placeholder="Reps" required>
                    <button type="button" class="removeSet">✖</button>
                `;
                setRows.appendChild(r);
                r.querySelector(".removeSet").onclick = () => r.remove();
            }

            addSet();
            addSetBtn.onclick = addSet;

            submitBtn.onclick = async () => {
                const weightInputs = [...setRows.querySelectorAll(".weight")];
                const repInputs = [...setRows.querySelectorAll(".reps")];

                const logEntries = [];

                for (let i = 0; i < weightInputs.length; i++) {
                    const weight = Number(weightInputs[i].value);
                    const reps = Number(repInputs[i].value);

                    if (!Number.isFinite(weight) || weight <= 0 ||
                        !Number.isFinite(reps) || reps <= 0) {
                        alert("Please enter valid weight and reps for all sets");
                        return;
                    }

                    logEntries.push({
                        weight: weight,
                        repsCompleted: reps,
                        setsCompleted: 1,
                        totalVolume: weight * reps
                    });
                }

                // Send to backend and get created logs
                const createdLogs = await fetch(`http://localhost:8080/api/logs/${ex.id}/batch`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(logEntries)
                }).then(res => res.json());

                // Clear input fields
                setRows.innerHTML = "";
                addSet();


                // Refresh full logs table if desired
                loadLogs();
            };


            async function loadLogs() {
                const logs = await fetchJSON(`http://localhost:8080/api/logs/${ex.id}`);
                const tableContainer = row.querySelector(".logCardContainer");


                if (!logs || logs.length === 0) {
                    logContainer.innerHTML = "<p>No logs yet.</p>";
                    return;
                }

                logContainer.innerHTML = `
        <table class="logTable">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Weight (kg)</th>
                    <th>Sets</th>
                    <th>Reps</th>
                    <th>Volume</th>
                </tr>
            </thead>
            <tbody>
                ${logs.map(l => `
                    <tr>
                        <td>${l.date}</td>
                        <td>${l.weight}</td>
                        <td>${l.setsCompleted}</td>
                        <td>${l.repsCompleted}</td>
                        <td>${l.totalVolume}</td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `;}
            loadLogs();
            exerciseListDiv.appendChild(row);
        });
    }

    loadPlanDetails();
}