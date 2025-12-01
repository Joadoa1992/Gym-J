document.getElementById("weightForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const date = document.getElementById("date").value;
    const weight = document.getElementById("weight").value;

    if (!date || !weight) {
        alert("Please fill out all fields.");
        return;
    }

    const data = {
        date: date,
        weight: parseFloat(weight)
    };

    try {
        const response = await fetch("http://localhost:8080/bodyweight", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error("Failed to save bodyweight");
        }

        const saved = await response.json();

        const li = document.createElement("li");
        li.textContent = `Saved — Date: ${saved.date}, Weight: ${saved.weight} kg`;
        document.getElementById("results").appendChild(li);

    } catch (error) {
        alert("Error: " + error.message);
    }

    document.getElementById("date").value = "";
    document.getElementById("weight").value = "";
});