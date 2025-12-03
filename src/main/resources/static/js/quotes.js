const QUOTES = [
    {
        text: "I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'",
        author: "Muhammad Ali"
    },
    {
        text: "Success is the sum of small efforts, repeated day in and day out.",
        author: "Robert Collier"
    },
    {
        text: "The only bad workout is the one that didn’t happen.",
        author: "Michael Jordan"
    },
    {
        text: "Strength does not come from physical capacity. It comes from an indomitable will.",
        author: "Mahatma Gandhi"
    },
    {
        text: "You don’t have to be extreme, just consistent.",
        author: "Serena Williams"
    },
    {
        text: "Motivation gets you started. Habit keeps you going.",
        author: "Jim Ryun"
    },
    {
        text: "The body achieves what the mind believes.",
        author: "Usain Bolt"
    },
    {
        text: "It never gets easier. You just get stronger.",
        author: "Cristiano Ronaldo"
    },
    {
        text: "Discipline is the bridge between goals and accomplishment.",
        author: "Jim Rohn"
    },
    {
        text: "If it doesn’t challenge you, it won’t change you.",
        author: "Fred DeVito"
    },
    {
        text: "Push yourself, because no one else is going to do it for you.",
        author: "Lionel Messi"
    },
    {
        text: "You miss 100% of the shots you don’t take.",
        author: "Wayne Gretzky"
    },
    {
        text: "Champions keep playing until they get it right.",
        author: "Billie Jean King"
    },
    {
        text: "Hard work beats talent when talent doesn’t work hard.",
        author: "Tim Notke"
    },
    {
        text: "Fall in love with the process and the results will come.",
        author: "Eric Thomas"
    },
    {
        text: "Don’t limit your challenges. Challenge your limits.",
        author: "Jerry Dunn"
    },
    {
        text: "The pain you feel today will be the strength you feel tomorrow.",
        author: "LeBron James"
    },
    {
        text: "All progress takes place outside the comfort zone.",
        author: "Michael John Bobak"
    },
    {
        text: "What seems impossible today will one day be your warm-up.",
        author: "Kobe Bryant"
    },
    {
        text: "Success is not for the lazy.",
        author: "Simone Biles"
    },
    {
        text: "The difference between ordinary and extraordinary is that little extra.",
        author: "Jimmy Johnson"
    },
    {
        text: "The only way to define your limits is by going beyond them.",
        author: "Arthur C. Clarke"
    },
    {
        text: "Your body can stand almost anything. It’s your mind you have to convince.",
        author: "Tom Brady"
    },
    {
        text: "Don’t watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        text: "Once you see results, it becomes an addiction.",
        author: "Novak Djokovic"
    },
    {
        text: "The difference between a goal and a dream is a deadline.",
        author: "Steve Smith"
    },
    {
        text: "You are stronger than you think.",
        author: "Roger Federer"
    },
    {
        text: "Success usually comes to those who are too busy to be looking for it.",
        author: "Henry David Thoreau"
    },
    {
        text: "Don’t stop when you’re tired. Stop when you’re done.",
        author: "Steve Harvey"
    },
    {
        text: "The future depends on what you do today.",
        author: "Mahatma Gandhi"
    }
];


function showNewQuote() {
    const textEl = document.getElementById("quoteText");
    const authorEl = document.getElementById("quoteAuthor");
    if (!textEl || !authorEl) return;

    const index = Math.floor(Math.random() * QUOTES.length);
    const quote = QUOTES[index];

    textEl.textContent = `“${quote.text}”`;
    authorEl.textContent = `– ${quote.author}`;
}

document.addEventListener("DOMContentLoaded", () => {
    showNewQuote();

    // Make the quote clickable
    const textEl = document.getElementById("quoteText");
    if (textEl) {
        textEl.style.cursor = "pointer"; // show pointer on hover
        textEl.addEventListener("click", () => {
            showNewQuote();
        });
    }

    setInterval(() => {
        if (quoteContainer.style.display !== "none") {
            showNewQuote();
        }
    }, 60000);
});