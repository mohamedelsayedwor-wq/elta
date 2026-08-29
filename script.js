/* =========================================
   STUDY DESK
   PLATFORMS
========================================= */

const platforms = [

    {
        name: "منصة البرمجة",
        description: "تعلم البرمجة وتطوير المواقع",
        category: "programming",
        categoryName: "PROGRAMMING",
        icon: "💻",
        link: "https://kamalelmarakby.com/userprofile/home"
    },

    {
        name: "منصة الإنجليزي",
        description: "تعلم اللغة الإنجليزية",
        category: "languages",
        categoryName: "LANGUAGES",
        icon: "📚",
        link: "https://eduact.me/"
    },

    {
        name: "منصة الرياضيات",
        description: "شرح ومراجعة الرياضيات",
        category: "math",
        categoryName: "MATHEMATICS",
        icon: "📐",
        link: "https://example.com"
    },

    {
        name: "منصة الكورسات",
        description: "الكورسات والدروس التعليمية",
        category: "courses",
        categoryName: "COURSES",
        icon: "🎓",
        link: "https://example.com"
    }

];


/* =========================================
   ELEMENTS
========================================= */

const platformGrid =
    document.getElementById("platformGrid");

const searchInput =
    document.getElementById("searchInput");

const emptyState =
    document.getElementById("emptyState");

const platformCount =
    document.getElementById("platformCount");

const categories =
    document.querySelectorAll(".category");

const themeBtn =
    document.getElementById("themeBtn");

const toast =
    document.getElementById("toast");

const year =
    document.getElementById("year");


/* =========================================
   FILTER
========================================= */

let currentCategory = "all";


/* =========================================
   RENDER
========================================= */

function renderPlatforms() {

    const searchValue =
        searchInput.value
            .trim()
            .toLowerCase();


    const filtered =
        platforms.filter(platform => {

            const categoryMatch =
                currentCategory === "all" ||
                platform.category === currentCategory;


            const searchMatch =
                platform.name
                    .toLowerCase()
                    .includes(searchValue) ||

                platform.description
                    .toLowerCase()
                    .includes(searchValue);


            return (
                categoryMatch &&
                searchMatch
            );

        });


    platformGrid.innerHTML = "";


    if (filtered.length === 0) {

        emptyState.classList.add("show");

        return;
    }


    emptyState.classList.remove("show");


    filtered.forEach((platform, index) => {

        const card =
            document.createElement("a");


        card.className =
            "platform-card";


        card.href =
            platform.link;


        card.target =
            "_blank";


        card.rel =
            "noopener noreferrer";


        card.style.animationDelay =
            `${index * 0.07}s`;


        card.innerHTML = `

            <div class="platform-logo">
                ${platform.icon}
            </div>


            <div class="platform-content">

                <span class="platform-category">
                    ${platform.categoryName}
                </span>

                <h3>
                    ${platform.name}
                </h3>

                <p>
                    ${platform.description}
                </p>

            </div>


            <div class="platform-arrow">

                <i class="fa-solid fa-arrow-left"></i>

            </div>

        `;


        card.addEventListener("click", () => {

            showToast(
                `جاري فتح ${platform.name}...`
            );

        });


        platformGrid.appendChild(card);

    });

}


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    renderPlatforms
);


/* =========================================
   CATEGORIES
========================================= */

categories.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categories.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            button.classList.add("active");


            currentCategory =
                button.dataset.category;


            renderPlatforms();

        }
    );

});


/* =========================================
   TOAST
========================================= */

let toastTimer;

function showToast(message) {

    toast.querySelector("span")
        .textContent = message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 1800);

}


/* =========================================
   DARK MODE
========================================= */

const savedTheme =
    localStorage.getItem(
        "studyTheme"
    );


if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

}


themeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );


        const isDark =
            document.body.classList.contains(
                "dark"
            );


        localStorage.setItem(
            "studyTheme",
            isDark
                ? "dark"
                : "light"
        );


        themeBtn.innerHTML =
            isDark
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';

    }
);


/* =========================================
   CTRL + K
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            searchInput.focus();

        }


        if (event.key === "Escape") {

            searchInput.value = "";

            renderPlatforms();

            searchInput.blur();

        }

    }
);


/* =========================================
   COUNTER
========================================= */

platformCount.textContent =
    platforms.length;


/* =========================================
   YEAR
========================================= */

year.textContent =
    new Date().getFullYear();


/* =========================================
   PWA SERVICE WORKER
========================================= */

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker
                .register("./sw.js")
                .then(() => {

                    console.log(
                        "StudyDesk Service Worker Ready"
                    );

                })
                .catch(error => {

                    console.error(
                        "Service Worker Error:",
                        error
                    );

                });

        }
    );

}


/* =========================================
   INITIALIZE
========================================= */

renderPlatforms();