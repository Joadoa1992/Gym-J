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
            body: JSON.stringify(loginData),
            credentials: "same-origin" // <--- send session cookie
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
        fetch("/api/users/session", { credentials: "same-origin" }) // <--- include session cookie
            .then(res => res.json())
            .then(user => {
                if (!user || !user.username) {
                    window.location.href = "/login.html";
                } else {
                    userText.textContent = "Velkommen tilbage" + user.username;
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
            credentials: "same-origin" // <--- include session cookie
        })
            .then(() => {
                window.location.href = "/login.html";
            })
            .catch(err => console.error("Logout Error:", err));
    });
}
