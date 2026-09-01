/* ==========================================================================
   Aura Detector — Enhanced JavaScript (Chili Spice Edition)
   NexaSoul Web Development Foundation Bootcamp
   ========================================================================== */

// ─── PARTICLE CANVAS ─────────────────────────────────────────────────────────
(function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function createParticle() {
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.8 + 0.4,
            dx: (Math.random() - 0.5) * 0.35,
            dy: -(Math.random() * 0.5 + 0.15),
            alpha: Math.random() * 0.5 + 0.15,
            color: Math.random() > 0.5 ? '205,28,24' : '255,168,150'
        };
    }

    for (let i = 0; i < 80; i++) particles.push(createParticle());

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
            ctx.fill();
            p.x += p.dx;
            p.y += p.dy;
            if (p.y < -10 || p.x < -10 || p.x > W + 10) {
                Object.assign(p, createParticle(), { y: H + 5 });
            }
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
const animEls = document.querySelectorAll('[data-anim]');
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); } });
}, { threshold: 0.15 });
animEls.forEach(el => revealObs.observe(el));

// Hero fade-ups on load
window.addEventListener('load', () => {
    document.querySelectorAll('.fade-up').forEach(el => {
        setTimeout(() => el.classList.add('visible'), 100);
    });
});

// ─── RIPPLE EFFECT ────────────────────────────────────────────────────────────
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const r = document.createElement('span');
        r.className = 'ripple';
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
        this.appendChild(r);
        setTimeout(() => r.remove(), 600);
    });
});

// ─── QUIZ DATA ────────────────────────────────────────────────────────────────
const questions = [
    {
        question: "Q1. Your friend says 'Bro, let's go out.' You:",
        options: [
            { text: "A. Already ready 🚀", score: 10 },
            { text: "B. 'Where?' 👀", score: 7 },
            { text: "C. 'I'm broke bro 💀'", score: 5 },
            { text: "D. Leaves the message on seen 🤐", score: 2 }
        ]
    },
    {
        question: "Q2. Your assignment is due tomorrow at 11:59 PM. You:",
        options: [
            { text: "A. Finished it last week 🤓", score: 10 },
            { text: "B. Start today after lunch 💻", score: 7 },
            { text: "C. Start at 11:45 PM with adrenaline ⚡", score: 5 },
            { text: "D. 'Bro, can you send yours?' 💀", score: 2 }
        ]
    },
    {
        question: "Q3. Someone replies to your message with just 'K.' Your reaction:",
        options: [
            { text: "A. Normal, it's just a letter 👍", score: 10 },
            { text: "B. 'Are they angry?' 👀", score: 7 },
            { text: "C. Overthink everything for 3 hours 😭", score: 5 },
            { text: "D. Start a full FBI investigation 🕵️", score: 2 }
        ]
    },
    {
        question: "Q4. An 8:00 AM class/lecture is scheduled. You:",
        options: [
            { text: "A. Sit in the front row fully awake ☕", score: 10 },
            { text: "B. Reach 10 minutes late with iced coffee 🥤", score: 7 },
            { text: "C. Sleep in class with eyes open 😴", score: 5 },
            { text: "D. Turn off the alarm and continue dreaming 🛌", score: 2 }
        ]
    },
    {
        question: "Q5. You walk past a group of people laughing on campus. You think:",
        options: [
            { text: "A. They must have heard a funny joke 😂", score: 10 },
            { text: "B. Probably laughing at a meme 📲", score: 7 },
            { text: "C. 'Are they laughing at my outfit?' 😳", score: 5 },
            { text: "D. Adjust your walk style immediately 🚶‍♂️", score: 2 }
        ]
    },
    {
        question: "Q6. Your phone battery drops to 5%. You:",
        options: [
            { text: "A. Quietly pull out your power bank 🔋", score: 10 },
            { text: "B. Go hunt for a charger around campus 🔌", score: 7 },
            { text: "C. Enter extreme battery saver mode & panic ⚠️", score: 5 },
            { text: "D. Let it die, peace at last ✌️", score: 2 }
        ]
    },
    {
        question: "Q7. Someone asks you to explain a study/code concept. You:",
        options: [
            { text: "A. Explain it clearly like a professor 👨‍🏫", score: 10 },
            { text: "B. 'Bro it's easy, look at this example' 💡", score: 7 },
            { text: "C. 'Honestly, I guessed and it worked' 😅", score: 5 },
            { text: "D. 'Wait, we had a concept for that?' 😵", score: 2 }
        ]
    },
    {
        question: "Q8. How do you handle group project work?",
        options: [
            { text: "A. Carry the whole team single-handedly 🎒", score: 10 },
            { text: "B. Do your assigned part perfectly 🤝", score: 7 },
            { text: "C. Moral support and emotional backing 📢", score: 5 },
            { text: "D. Send thumbs up emojis in the group chat 👍", score: 2 }
        ]
    },
    {
        question: "Q9. You see a photo of yourself taken by a friend. You say:",
        options: [
            { text: "A. 'Damn, I look great!' 😎", score: 10 },
            { text: "B. 'Post it, it's good' 📸", score: 7 },
            { text: "C. 'Delete that right now 🔫'", score: 5 },
            { text: "D. 'Who is that creature?' 👹", score: 2 }
        ]
    },
    {
        question: "Q10. The teacher says 'I'm picking a random student to answer.' You:",
        options: [
            { text: "A. Make eye contact to show dominance 🗿", score: 10 },
            { text: "B. Smile and stay calm 😁", score: 7 },
            { text: "C. Suddenly look very deeply into your notebook 📖", score: 5 },
            { text: "D. Drop your pen on purpose to hide under the desk 🖊️", score: 2 }
        ]
    }
];

// ─── STATE ────────────────────────────────────────────────────────────────────
let currentQuestionIndex = 0;
let totalScore = 0;
let selectedOptionScore = null;

// ─── DOM REFS ─────────────────────────────────────────────────────────────────
const startBtn            = document.getElementById('start-btn');
const nextBtn             = document.getElementById('next-btn');
const retryBtn            = document.getElementById('retry-btn');
const heroSection         = document.getElementById('hero');
const aboutSection        = document.getElementById('about');
const quizContainer       = document.getElementById('quiz-container');
const resultContainer     = document.getElementById('result-container');
const questionProgressText= document.getElementById('question-progress');
const progressBarFill     = document.getElementById('progress-bar-fill');
const questionText        = document.getElementById('question-text');
const optionsContainer    = document.getElementById('options-container');
const warningMsg          = document.getElementById('warning-msg');
const finalScoreElement   = document.getElementById('final-score');
const auraLevelTitle      = document.getElementById('aura-level-title');
const auraLevelDesc       = document.getElementById('aura-level-desc');

// ─── EVENTS ───────────────────────────────────────────────────────────────────
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', handleNextQuestion);
retryBtn.addEventListener('click', resetQuiz);

// ─── FUNCTIONS ────────────────────────────────────────────────────────────────
function startQuiz() {
    heroSection.style.display  = 'none';
    aboutSection.style.display = 'none';
    quizContainer.style.display = 'block';
    currentQuestionIndex = 0;
    totalScore = 0;
    loadQuestion();
    quizContainer.scrollIntoView({ behavior: 'smooth' });
}

function loadQuestion() {
    selectedOptionScore = null;
    warningMsg.style.display = 'none';

    const q = questions[currentQuestionIndex];
    questionProgressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    progressBarFill.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
    questionText.textContent = q.question;
    optionsContainer.innerHTML = '';
    // Reset sibling-dim state for the new question
    optionsContainer.classList.remove('has-selection');

    q.options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option.text;
        btn.addEventListener('click', () => selectOption(btn, option.score));
        // Ripple on option click
        btn.addEventListener('click', function(e) {
            const r = document.createElement('span');
            r.className = 'ripple';
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            r.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-rect.left-size/2}px;top:${e.clientY-rect.top-size/2}px`;
            this.appendChild(r);
            setTimeout(() => r.remove(), 600);
        });
        optionsContainer.appendChild(btn);
    });

    nextBtn.textContent = currentQuestionIndex === questions.length - 1
        ? 'Submit & Reveal Aura 🔮'
        : 'Next Question →';
}

function selectOption(selectedBtn, score) {
    selectedOptionScore = score;
    warningMsg.style.display = 'none';
    // Remove selected class from all, then mark the chosen one
    optionsContainer.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
    selectedBtn.classList.add('selected');
    // Add .has-selection so CSS dims the non-chosen siblings
    optionsContainer.classList.add('has-selection');
}

function handleNextQuestion() {
    if (selectedOptionScore === null) {
        warningMsg.style.display = 'block';
        warningMsg.style.animation = 'none';
        void warningMsg.offsetHeight;
        warningMsg.style.animation = '';
        return;
    }
    totalScore += selectedOptionScore;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function animateScore(target) {
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        finalScoreElement.textContent = current;
        if (current >= target) clearInterval(timer);
    }, 30);
}

function showResults() {
    quizContainer.style.display  = 'none';
    resultContainer.style.display = 'block';
    resultContainer.scrollIntoView({ behavior: 'smooth' });

    // Animate score counter
    animateScore(totalScore);

    let levelTitle, levelDesc;
    if      (totalScore <= 39) { levelTitle = '😶 NPC ENERGY';    levelDesc = "You're living on default settings bro! Time to make some main character choices and get your aura up."; }
    else if (totalScore <= 59) { levelTitle = '😐 AVERAGE AURA';  levelDesc = "Not bad, not crazy. You're holding down the fort, but there's a main character waiting to break free."; }
    else if (totalScore <= 69) { levelTitle = '😎 COOL AURA';     levelDesc = "Chilled out, relaxed, and smooth. You don't try too hard, yet you keep your cool under pressure."; }
    else if (totalScore <= 79) { levelTitle = '🔥 PRO AURA';      levelDesc = "You know what you're doing. You walk into situations with confidence and somehow make it work. Serious aura!"; }
    else if (totalScore <= 89) { levelTitle = '🗿 SAVAGE AURA';   levelDesc = "Unshakable mindset. You handle campus chaos like a walk in the park. Respect maxed out!"; }
    else                       { levelTitle = '👑 UNLIMITED AURA'; levelDesc = "Absolute Main Character energy! The room shifts when you walk in. You possess unmatched aura!"; }

    auraLevelTitle.textContent = levelTitle;
    auraLevelDesc.textContent  = levelDesc;
}

function resetQuiz() {
    resultContainer.style.display = 'none';
    heroSection.style.display     = 'block';
    aboutSection.style.display    = 'block';
    currentQuestionIndex = 0;
    totalScore = 0;
    selectedOptionScore = null;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
