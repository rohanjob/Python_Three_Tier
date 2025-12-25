const form = document.getElementById("feedbackForm");
const list = document.getElementById("feedbackList");
const submitBtn = document.getElementById("submitBtn");
const refreshBtn = document.getElementById("refreshBtn");

// Local development or Docker environment
const API_URL = "http://localhost:5000/feedback";

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("msg").value.trim();

    if (!name || !message) return;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.classList.add("loading");

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, message })
        });

        if (response.ok) {
            form.reset();
            loadFeedback();
        } else {
            const err = await response.json();
            alert("Error: " + (err.error || "Failed to submit feedback"));
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Server is currently unreachable. Make sure Docker containers are running.");
    } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove("loading");
    }
});

refreshBtn.addEventListener("click", loadFeedback);

async function loadFeedback() {
    list.innerHTML = `
        <div class="loader-container">
            <div class="spinner"></div>
        </div>
    `;

    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch");

        const items = await res.json();

        list.innerHTML = "";

        if (items.length === 0) {
            list.innerHTML = `<p style="text-align: center; color: #94a3b8; padding: 2rem;">No feedback yet. Be the first to say something!</p>`;
            return;
        }

        // Reverse to show latest first
        items.reverse().forEach((f, index) => {
            const div = document.createElement("div");
            div.className = "feedback-item";
            div.style.animationDelay = `${index * 0.1}s`;

            div.innerHTML = `
                <div class="feedback-name">${f.name}</div>
                <div class="feedback-msg">${f.message}</div>
            `;
            list.appendChild(div);
        });
    } catch (error) {
        console.error("Load error:", error);
        list.innerHTML = `<p style="text-align: center; color: #ef4444; padding: 2rem;">Error connecting to API.</p>`;
    }
}

// Initial load
loadFeedback();
