// ======================================
// ARIANA GRANDE — THE UNIVERSE
// ======================================


// 1. DARK MODE

const themeButton = document.getElementById("themeButton");

themeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    themeButton.textContent =
        document.body.classList.contains("dark") ? "☀" : "☾";
});


// 2. SPARKLE EFFECT

const sparkleLayer = document.getElementById("sparkles");

document.addEventListener("click", (event) => {

    const sparkle = document.createElement("span");

    sparkle.className = "sparkle";
    sparkle.textContent = ["✦", "✧", "♡", "⋆"][Math.floor(Math.random() * 4)];

    sparkle.style.left = event.clientX + "px";
    sparkle.style.top = event.clientY + "px";

    sparkleLayer.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);

});


// 3. ALBUM FILTER

const filters = document.querySelectorAll(".filter");
const albumCards = document.querySelectorAll(".album-card");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(f => f.classList.remove("active"));
        filter.classList.add("active");

        const selected = filter.dataset.filter;

        albumCards.forEach(card => {

            if (selected === "all" || card.dataset.era === selected) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});


// 4. ALBUM DETAILS

const albumDetail = document.getElementById("albumDetail");

const albumTitle = document.getElementById("albumTitle");
const albumYear = document.getElementById("albumYear");
const albumInfo = document.getElementById("albumInfo");
const albumSongs = document.getElementById("albumSongs");

document.querySelectorAll(".album-open").forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".album-card");

        albumTitle.textContent = card.dataset.title;
        albumYear.textContent = "RELEASE YEAR: " + card.dataset.year;
        albumInfo.textContent = card.dataset.info;

        albumSongs.innerHTML = "";

        card.dataset.songs.split("|").forEach(song => {

            const li = document.createElement("li");
            li.textContent = song;

            albumSongs.appendChild(li);

        });

        albumDetail.classList.add("show");

        albumDetail.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

});

document.getElementById("closeAlbum").addEventListener("click", () => {
    albumDetail.classList.remove("show");
});


// 5. RANDOM FACTS

const facts = [

    "Ariana wurde am 26. Juni 1993 in Boca Raton, Florida, geboren.",

    "Ihre vollständige Geburtsname lautet Ariana Grande-Butera.",

    "Bevor sie als Sängerin bekannt wurde, spielte sie Charlotte im Broadway-Musical 13.",

    "Ihre Rolle als Cat Valentine machte sie durch Victorious bekannt.",

    "Ihr erstes Studioalbum hiess Yours Truly und erschien 2013.",

    "Ariana spielte in Wicked die Figur Glinda.",

    "Sweetener gewann einen Grammy als Best Pop Vocal Album.",

    "Ariana spielte 2021 in Don't Look Up mit.",

    "Ariana veröffentlichte 2024 das Album Eternal Sunshine.",

    "2026 erschien ihr achtes Studioalbum Petal."

];

function showRandomFact() {

    const random = Math.floor(Math.random() * facts.length);

    document.getElementById("factText").textContent = facts[random];

}

document.getElementById("nextFact").addEventListener("click", showRandomFact);


// 6. SURPRISE BUTTON

const modal = document.getElementById("factModal");

document.getElementById("randomFact").addEventListener("click", () => {

    const random = facts[Math.floor(Math.random() * facts.length)];

    document.getElementById("modalText").textContent = random;

    modal.classList.add("show");

});

document.getElementById("closeModal").addEventListener("click", () => {
    modal.classList.remove("show");
});

modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        modal.classList.remove("show");
    }

});


// 7. PERSONAL FAN DIARY

const noteTitle = document.getElementById("noteTitle");
const noteText = document.getElementById("noteText");
const savedNotes = document.getElementById("savedNotes");
const noteMessage = document.getElementById("noteMessage");

let notes = [];

try {
    notes = JSON.parse(localStorage.getItem("arianaNotes")) || [];
} catch {
    notes = [];
}

function saveNotes() {
    localStorage.setItem("arianaNotes", JSON.stringify(notes));
}

function displayNotes() {

    savedNotes.innerHTML = "";

    if (notes.length === 0) {
        savedNotes.textContent = "No notes yet. Write your first one! ♡";
        return;
    }

    notes.forEach((note, index) => {

        const box = document.createElement("div");
        box.className = "saved-note";

        const title = document.createElement("strong");
        title.textContent = "♡ " + note.title;

        const text = document.createElement("p");
        text.textContent = note.text;

        const remove = document.createElement("button");
        remove.textContent = "DELETE NOTE ✕";

        remove.addEventListener("click", () => {

            notes.splice(index, 1);

            saveNotes();
            displayNotes();

        });

        box.append(title, text, remove);
        savedNotes.appendChild(box);

    });

}

document.getElementById("saveNote").addEventListener("click", () => {

    const title = noteTitle.value.trim();
    const text = noteText.value.trim();

    if (!title || !text) {

        noteMessage.textContent = "Please fill in both fields first! ♡";
        return;

    }

    notes.unshift({
        title: title,
        text: text
    });

    saveNotes();
    displayNotes();

    noteTitle.value = "";
    noteText.value = "";

    noteMessage.textContent = "Your note has been saved! ✨";

});

displayNotes();


// 8. ARIANA QUIZ

const questions = [

    {
        question: "In welcher Stadt wurde Ariana geboren?",
        answers: ["New York", "Boca Raton", "Los Angeles", "Miami"],
        correct: 1
    },

    {
        question: "Wie heisst Arianas erste Studio-LP?",
        answers: ["Positions", "Sweetener", "Yours Truly", "Petal"],
        correct: 2
    },

    {
        question: "Welche Figur spielt Ariana in Wicked?",
        answers: ["Elphaba", "Dorothy", "Glinda", "Nessarose"],
        correct: 2
    },

    {
        question: "Wie heisst die Figur aus Victorious?",
        answers: ["Cat Valentine", "Sam Puckett", "Penny Pingleton", "Glinda"],
        correct: 0
    },

    {
        question: "Wie heisst ihr Album aus dem Jahr 2024?",
        answers: ["My Everything", "Eternal Sunshine", "Positions", "Sweetener"],
        correct: 1
    }

];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const feedback = document.getElementById("quizFeedback");
const nextButton = document.getElementById("nextQuestion");

function loadQuestion() {

    answered = false;

    const q = questions[currentQuestion];

    questionElement.textContent = q.question;

    document.getElementById("questionCount").textContent =
        `QUESTION ${currentQuestion + 1} / ${questions.length}`;

    document.getElementById("score").textContent =
        "SCORE: " + score;

    answersElement.innerHTML = "";

    feedback.textContent = "";
    nextButton.disabled = true;

    nextButton.textContent =
        currentQuestion === questions.length - 1
        ? "SEE MY RESULT ✦"
        : "NEXT QUESTION →";

    q.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer";
        button.textContent = answer;

        button.addEventListener("click", () => {

            if (answered) return;

            answered = true;

            const correct = index === q.correct;

            if (correct) {

                score++;

                button.classList.add("correct");

                feedback.textContent = "✨ Correct! You know your Ariana facts!";

            } else {

                button.classList.add("wrong");

                answersElement.children[q.correct]
                    .classList.add("correct");

                feedback.textContent =
                    "Not quite! The correct answer is " + q.answers[q.correct] + ".";

            }

            document.getElementById("score").textContent =
                "SCORE: " + score;

            nextButton.disabled = false;

            document.querySelectorAll(".answer").forEach(answer => {
                answer.disabled = true;
            });

        });

        answersElement.appendChild(button);

    });

}

nextButton.addEventListener("click", () => {

    if (!answered) return;

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;
        loadQuestion();

    } else {

        showQuizResult();

    }

});

function showQuizResult() {

    questionElement.textContent =
        score + " / " + questions.length + " correct!";

    answersElement.innerHTML = "";

    let message = "";

    if (score === 5) {
        message = "SUPERSTAR! You know Ariana's universe perfectly! ✨";
    } else if (score >= 3) {
        message = "Amazing! You know quite a lot about Ariana! ♡";
    } else {
        message = "Time to explore the Ariana universe a little more!";
    }

    feedback.textContent = message;

    document.getElementById("questionCount").textContent =
        "QUIZ COMPLETED";

    nextButton.disabled = false;
    nextButton.textContent = "PLAY AGAIN ↻";

    nextButton.onclick = () => {

        currentQuestion = 0;
        score = 0;

        nextButton.onclick = null;

        loadQuestion();

    };

}

loadQuestion();


// 9. SECRET EASTER EGG

let secretClicks = 0;

document.querySelector(".logo").addEventListener("click", (event) => {

    event.preventDefault();

    secretClicks++;

    if (secretClicks === 5) {

        document.getElementById("modalText").textContent =
            "You discovered the secret Ariana portal! ♡ ✨";

        modal.classList.add("show");

        secretClicks = 0;

    }

});


// 10. CONSOLE MESSAGE

console.log("✦ Welcome to the Ariana Grande Universe ✦");
console.log("You found the digital backstage!");