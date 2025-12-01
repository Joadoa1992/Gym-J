
async function fetchJSON(url, options = {}) {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
}


if (document.getElementById("createPlanForm")) {
    const exerciseListDiv = document.getElementById("exercise_list");
    const muscleGroupSelect = document.getElementById("muscleGroupSelect");

    // Load exercises (all or by muscle group)
    async function loadExercises(group = "ALL") {
        let url = (group.toUpperCase() === "ALL")
            ? "http://localhost:8080/api/workouts" // all exercises
            : `http://localhost:8080/api/workouts/group/${group}`;

        const exercises = await fetchJSON(url);
        exerciseListDiv.innerHTML = "";

        exercises.forEach(ex => {
            const div = document.createElement("div");
            div.classList.add("exerciseItem");
            div.innerHTML = `
                <label>
                    <input type="checkbox" value="${ex.id}">
                    <img src="${ex.imageUrl || 'placeholder.png'}" alt="${ex.exerciseName}" width="50" height="50">
                    <strong>${ex.exerciseName}</strong> (${ex.muscleGroup})
                    <br>
                    <small>${ex.description || ''}</small>
                </label>
            `;
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

        const selectedExercises = [...document.querySelectorAll("#exercise_list input:checked")]
            .map(box => ({ id: parseInt(box.value) }));
        if (selectedExercises.length === 0) return alert("Please select at least one exercise.");

        const plan = { planName, exercises: selectedExercises };

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


if (document.getElementById("planTitle")) {
    const urlParams = new URLSearchParams(window.location.search);
    const planId = urlParams.get("id");

    const exerciseForm = document.getElementById("exerciseForm");
    const logForm = document.getElementById("logForm");
    const exerciseListDiv = document.getElementById("exercise_list");
    const muscleGroupSelect = document.getElementById("muscleGroupSelect");


    async function loadPlanDetails() {
        const plan = await fetchJSON(`http://localhost:8080/api/plans/${planId}`);
        document.getElementById("planTitle").innerText = plan.planName;


        let html = "";
        plan.exercises.forEach(e => {
            html += `
                <div class="exerciseCard">
                    <img src="${e.imageUrl || 'placeholder.png'}" alt="${e.exerciseName}" width="100" height="100">
                    <h3>${e.exerciseName}</h3>
                    <p>${e.description || ''}</p>
                    <p>Weight: ${e.weight} kg</p>
                    <p>Sets: ${e.setAmount}</p>
                    <p>Reps: ${e.repAmount}</p>
                    <p>Volume: ${e.volume}</p>
                </div>
            `;
        });
        document.getElementById("exerciseList").innerHTML = html;


        const logSelect = document.getElementById("exerciseSelectLog");
        if (logSelect) {
            logSelect.innerHTML = "";
            plan.exercises.forEach(ex => {
                const option = document.createElement("option");
                option.value = ex.id;
                option.textContent = ex.exerciseName;
                logSelect.appendChild(option);
            });
        }
    }

    loadPlanDetails();


    if (exerciseForm) {
        exerciseForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const exercise = {
                exerciseName: document.getElementById("exerciseName").value,
                description: document.getElementById("description").value,
                weight: parseFloat(document.getElementById("weight").value),
                setAmount: parseInt(document.getElementById("sets").value),
                repAmount: parseInt(document.getElementById("reps").value),
                imageUrl: document.getElementById("imageUrl").value
            };

            try {
                await fetch(`http://localhost:8080/api/workouts/plans/${planId}/exercises`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(exercise)
                });
                alert("Exercise added!");
                loadPlanDetails();
            } catch (error) {
                console.error(error);
                alert("Error adding exercise.");
            }
        });
    }


    if (logForm) {
        logForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const exerciseId = document.getElementById("exerciseSelectLog").value;
            const logEntry = {
                weight: parseInt(document.getElementById("logWeight").value),
                setsCompleted: parseInt(document.getElementById("logSets").value),
                repsCompleted: parseInt(document.getElementById("logReps").value)
            };

            try {
                await fetch(`http://localhost:8080/api/logs/${exerciseId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(logEntry)
                });
                alert("Workout logged!");
                loadLogs(exerciseId);
            } catch (error) {
                console.error(error);
                alert("Error logging workout.");
            }
        });

        document.getElementById("exerciseSelectLog").addEventListener("change", function () {
            loadLogs(this.value);
        });
    }

    async function loadLogs(exerciseId) {
        const logs = await fetchJSON(`http://localhost:8080/api/logs/${exerciseId}`);
        let html = "";
        logs.forEach(log => {
            html += `
                <div class="logCard">
                    <p><b>Date:</b> ${log.date}</p>
                    <p>Weight: ${log.weight} kg</p>
                    <p>Sets: ${log.setsCompleted}</p>
                    <p>Reps: ${log.repsCompleted}</p>
                    <p>Volume: ${log.totalVolume}</p>
                </div>
            `;
        });
        document.getElementById("logList").innerHTML = html;
    }


    if (exerciseListDiv) {
        async function loadExercises(group = "ALL") {
            let url = (group.toUpperCase() === "ALL")
                ? "http://localhost:8080/api/workouts"
                : `http://localhost:8080/api/workouts/group/${group}`;

            const exercises = await fetchJSON(url);
            exerciseListDiv.innerHTML = "";

            exercises.forEach(ex => {
                const div = document.createElement("div");
                div.classList.add("exerciseItem");
                div.innerHTML = `
                    <label>
                        <input type="checkbox" value="${ex.id}">
                        <img src="${ex.imageUrl || 'placeholder.png'}" alt="${ex.exerciseName}" width="50" height="50">
                        <strong>${ex.exerciseName}</strong> (${ex.muscleGroup})
                        <br>
                        <small>${ex.description || ''}</small>
                    </label>
                `;
                exerciseListDiv.appendChild(div);
            });
        }


        loadExercises();


        if (muscleGroupSelect) {
            muscleGroupSelect.addEventListener("change", () => {
                loadExercises(muscleGroupSelect.value);
            });
        }
    }
}
