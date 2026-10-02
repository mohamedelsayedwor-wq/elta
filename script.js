/* =========================================================
   STUDYDESK
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   PLATFORMS
========================================================= */

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
    },

    {
        name: "منصه التاريخ",
        description: "شرح ماده التاريخ مع مستر نادر جورج",
        category: "histroy",
        categoryName: "HISTORY",
        icon: "📚",
        link: "https://massar-academy.net/"
    },
{
        name: "Youtube",
        description: "دلع نفسك",
        icon: "🤠",
        link: "https://www.youtube.com/"
    },
    
    {
        name: "Whats app",
        description: "تواصل",
        icon: "📬",
        link: "https://www.whatsapp.com/"
    
    },
    
    {
        name: "Tiktok",
        description: "فرفش",
        icon: "🤡",
        link: "https://www.tiktok.com/"
    }
];


/* =========================================================
   ELEMENTS
========================================================= */

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


/* =========================================================
   CATEGORY FILTER
========================================================= */

let currentCategory = "all";


/* =========================================================
   RENDER PLATFORMS
========================================================= */

function renderPlatforms() {

    if (!platformGrid || !searchInput) {
        return;
    }

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

        if (emptyState) {
            emptyState.classList.add("show");
        }

        return;
    }

    if (emptyState) {
        emptyState.classList.remove("show");
    }

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

        card.addEventListener(
            "click",
            () => {

                showToast(
                    `جاري فتح ${platform.name}...`
                );

            }
        );

        platformGrid.appendChild(card);

    });

}


/* =========================================================
   SEARCH
========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        renderPlatforms
    );

}


/* =========================================================
   CATEGORIES
========================================================= */

categories.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categories.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });

            button.classList.add(
                "active"
            );

            currentCategory =
                button.dataset.category;

            renderPlatforms();

        }
    );

});


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message) {

    if (!toast) {
        return;
    }

    const toastText =
        toast.querySelector("span");

    if (toastText) {

        toastText.textContent =
            message;

    }

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 1800);

}


/* =========================================================
   DARK MODE
========================================================= */

const savedTheme =
    localStorage.getItem(
        "studyTheme"
    );

if (
    savedTheme === "dark" &&
    document.body
) {

    document.body.classList.add(
        "dark"
    );

    if (themeBtn) {

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    }

}

if (themeBtn) {

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

}


/* =========================================================
   CTRL + K
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            if (searchInput) {
                searchInput.focus();
            }

        }

        if (
            event.key === "Escape" &&
            searchInput &&
            document.activeElement === searchInput
        ) {

            searchInput.value = "";

            renderPlatforms();

            searchInput.blur();

        }

    }
);


/* =========================================================
   COUNTER
========================================================= */

if (platformCount) {

    platformCount.textContent =
        platforms.length;

}


/* =========================================================
   YEAR
========================================================= */

if (year) {

    year.textContent =
        new Date().getFullYear();

}


/* =========================================================
   WEEKLY PLANNER
========================================================= */

const plannerBody =
    document.getElementById(
        "plannerBody"
    );

const clearPlannerButton =
    document.getElementById(
        "clearPlanner"
    );

const saveStatus =
    document.getElementById(
        "saveStatus"
    );

const PLANNER_STORAGE_KEY =
    "studydeskWeeklyPlanner";


/* =========================================================
   PLANNER INPUTS
========================================================= */

const plannerInputs =
    document.querySelectorAll(
        "#plannerBody textarea"
    );


/* =========================================================
   LOAD PLANNER
========================================================= */

function loadPlanner() {

    const savedData =
        localStorage.getItem(
            PLANNER_STORAGE_KEY
        );

    if (!savedData) {
        return;
    }

    try {

        const plannerData =
            JSON.parse(savedData);

        plannerInputs.forEach(input => {

            const row =
                input.closest("tr");

            if (!row) {
                return;
            }

            const day =
                row.dataset.day;

            const field =
                input.dataset.field;

            if (
                plannerData[day] &&
                Object.prototype.hasOwnProperty.call(
                    plannerData[day],
                    field
                )
            ) {

                input.value =
                    plannerData[day][field];

            }

        });

    }

    catch (error) {

        console.error(
            "StudyDesk Planner Load Error:",
            error
        );

    }

}


/* =========================================================
   SAVE PLANNER
========================================================= */

function savePlanner() {

    const plannerData = {};

    plannerInputs.forEach(input => {

        const row =
            input.closest("tr");

        if (!row) {
            return;
        }

        const day =
            row.dataset.day;

        const field =
            input.dataset.field;

        if (!day || !field) {
            return;
        }

        if (!plannerData[day]) {

            plannerData[day] = {};

        }

        plannerData[day][field] =
            input.value;

    });

    try {

        localStorage.setItem(
            PLANNER_STORAGE_KEY,
            JSON.stringify(plannerData)
        );

        showPlannerSaved();

    }

    catch (error) {

        console.error(
            "StudyDesk Planner Save Error:",
            error
        );

    }

}


/* =========================================================
   SAVE STATUS
========================================================= */

let plannerSaveTimer;

function showPlannerSaved() {

    if (!saveStatus) {
        return;
    }

    saveStatus.innerHTML = `

        <span class="save-dot"></span>

        جاري الحفظ...

    `;

    clearTimeout(
        plannerSaveTimer
    );

    plannerSaveTimer =
        setTimeout(() => {

            saveStatus.innerHTML = `

                <span class="save-dot"></span>

                محفوظ تلقائياً

            `;

        }, 500);

}


/* =========================================================
   AUTO SAVE
========================================================= */

plannerInputs.forEach(input => {

    input.addEventListener(
        "input",
        savePlanner
    );

});


/* =========================================================
   CUSTOM CLEAR MODAL
========================================================= */

const clearModal =
    document.getElementById(
        "clearModal"
    );

const closeClearModal =
    document.getElementById(
        "closeClearModal"
    );

const cancelClear =
    document.getElementById(
        "cancelClear"
    );

const confirmClear =
    document.getElementById(
        "confirmClear"
    );


/* =========================================================
   OPEN CLEAR MODAL
========================================================= */

if (
    clearPlannerButton &&
    clearModal
) {

    clearPlannerButton.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            clearModal.classList.add(
                "active"
            );

        }
    );

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closePlannerModal() {

    if (!clearModal) {
        return;
    }

    clearModal.classList.remove(
        "active"
    );

}


/* =========================================================
   X BUTTON
========================================================= */

if (closeClearModal) {

    closeClearModal.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            closePlannerModal();

        }
    );

}


/* =========================================================
   "NO, KEEP IT"
========================================================= */

if (cancelClear) {

    cancelClear.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            closePlannerModal();

        }
    );

}


/* =========================================================
   CONFIRM DELETE
========================================================= */

if (confirmClear) {

    confirmClear.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            plannerInputs.forEach(
                input => {

                    input.value = "";

                }
            );

            localStorage.removeItem(
                PLANNER_STORAGE_KEY
            );

            if (saveStatus) {

                saveStatus.innerHTML = `

                    <span class="save-dot"></span>

                    تم مسح الجدول

                `;

            }

            closePlannerModal();

        }
    );

}


/* =========================================================
   CLICK OUTSIDE MODAL
========================================================= */

if (clearModal) {

    clearModal.addEventListener(
        "click",
        event => {

            if (
                event.target === clearModal
            ) {

                closePlannerModal();

            }

        }
    );

}


/* =========================================================
   ESC CLOSE MODAL
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            clearModal &&
            clearModal.classList.contains(
                "active"
            )
        ) {

            closePlannerModal();

        }

    }
);


/* =========================================================
   DREAM GARAGE
========================================================= */

const dreamCars = [

    {
        brand: "Mercedes-AMG",
        model: "Dream Bigger.",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=90"
    },

    {
        brand: "Porsche 911",
        model: "Work. Build. Achieve.",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=90"
    },

    {
        brand: "BMW M",
        model: "Your Future Garage.",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=90"
    }

];


const carGallery =
    document.getElementById(
        "carGallery"
    );


if (carGallery) {

    carGallery.innerHTML = "";

    dreamCars.forEach(car => {

        const card =
            document.createElement(
                "div"
            );

        card.className =
            "car-card";

        card.innerHTML = `

            <img
                src="${car.image}"
                alt="${car.brand}"
                loading="lazy"
            >

            <div class="car-overlay">

                <span>
                    DREAM GARAGE
                </span>

                <h4>
                    ${car.brand}
                </h4>

                <p>
                    ${car.model}
                </p>

            </div>

        `;

        carGallery.appendChild(
            card
        );

    });

}


/* =========================================================
   DREAM COMPANIES
========================================================= */

const dreamCompanies = [

    {
        name: "Microsoft",
        letter: "M",
        field: "Software Engineering"
    },

    {
        name: "Google",
        letter: "G",
        field: "Technology & AI"
    },

    {
        name: "IBM",
        letter: "I",
        field: "Engineering & Cloud"
    },

    {
        name: "GitHub",
        letter: "GH",
        field: "Developer Platform"
    }

];


const companyGrid =
    document.getElementById(
        "companyGrid"
    );


if (companyGrid) {

    companyGrid.innerHTML = "";

    dreamCompanies.forEach(
        company => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "company-card";

            card.innerHTML = `

                <div class="company-logo">

                    ${company.letter}

                </div>

                <span>
                    DREAM COMPANY
                </span>

                <h4>
                    ${company.name}
                </h4>

                <p>
                    ${company.field}
                </p>

            `;

            companyGrid.appendChild(
                card
            );

        }
    );

}



/* =========================================================
   QUICK NAVIGATION
========================================================= */

const platformsBtn = document.getElementById("platformsBtn");
const platformsSection = document.querySelector(".platform-section");

if (platformsBtn && platformsSection) {
    platformsBtn.addEventListener("click", () => {
        currentCategory = "all";

        if (searchInput) {
            searchInput.value = "";
        }

        categories.forEach(item => {
            item.classList.toggle(
                "active",
                item.dataset.category === "all"
            );
        });

        renderPlatforms();

        platformsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}


/* =========================================================
   PREMIUM APP CONFIRMATION
========================================================= */
const appConfirmModal = document.getElementById("appConfirmModal");
const appConfirmTitle = document.getElementById("appConfirmTitle");
const appConfirmMessage = document.getElementById("appConfirmMessage");
const appConfirmOk = document.getElementById("appConfirmOk");
const appConfirmCancel = document.getElementById("appConfirmCancel");
const appConfirmClose = document.getElementById("appConfirmClose");
let appConfirmResolver = null;

function askAppConfirm(title, message) {
    return new Promise(resolve => {
        if (!appConfirmModal) {
            resolve(window.confirm(title));
            return;
        }
        appConfirmTitle.textContent = title || "هل تريد الحذف؟";
        appConfirmMessage.textContent = message || "سيتم حذف العنصر من داخل التطبيق.";
        appConfirmModal.classList.add("open");
        appConfirmModal.setAttribute("aria-hidden", "false");
        appConfirmResolver = resolve;
    });
}

function closeAppConfirm(result = false) {
    if (!appConfirmModal) return;
    appConfirmModal.classList.remove("open");
    appConfirmModal.setAttribute("aria-hidden", "true");
    const resolver = appConfirmResolver;
    appConfirmResolver = null;
    if (resolver) resolver(result);
}

if (appConfirmOk) appConfirmOk.addEventListener("click", () => closeAppConfirm(true));
if (appConfirmCancel) appConfirmCancel.addEventListener("click", () => closeAppConfirm(false));
if (appConfirmClose) appConfirmClose.addEventListener("click", () => closeAppConfirm(false));
if (appConfirmModal) {
    appConfirmModal.querySelector(".app-confirm-backdrop")?.addEventListener("click", () => closeAppConfirm(false));
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && appConfirmModal?.classList.contains("open")) {
        closeAppConfirm(false);
    }
});

/* =========================================================
   PERSONAL MEDIA HUB
   Files selected from the phone are stored in IndexedDB.
========================================================= */

const MEDIA_DB_NAME = "StudyDeskMediaDB";
const MEDIA_DB_VERSION = 1;
const MEDIA_STORE = "media";

let mediaDB = null;
let galleryItems = [];
let musicItems = [];
let currentSongIndex = -1;
let currentAudioUrl = null;

const imagePicker = document.getElementById("imagePicker");
const audioPicker = document.getElementById("audioPicker");
const photoGrid = document.getElementById("photoGrid");
const musicList = document.getElementById("musicList");
const galleryEmpty = document.getElementById("galleryEmpty");
const musicEmpty = document.getElementById("musicEmpty");
const galleryCount = document.getElementById("galleryCount");
const musicCount = document.getElementById("musicCount");
const clearGallery = document.getElementById("clearGallery");
const clearMusic = document.getElementById("clearMusic");

const audioElement = document.getElementById("audioElement");
const currentSong = document.getElementById("currentSong");
const currentArtist = document.getElementById("currentArtist");
const currentTime = document.getElementById("currentTime");
const durationTime = document.getElementById("durationTime");
const musicProgress = document.getElementById("musicProgress");
const musicVolume = document.getElementById("musicVolume");
const playMusic = document.getElementById("playMusic");
const previousSong = document.getElementById("previousSong");
const nextSong = document.getElementById("nextSong");

function openMediaDB() {
    return new Promise((resolve, reject) => {
        if (!("indexedDB" in window)) {
            reject(new Error("IndexedDB is not supported."));
            return;
        }

        const request = indexedDB.open(
            MEDIA_DB_NAME,
            MEDIA_DB_VERSION
        );

        request.onupgradeneeded = event => {
            const db = event.target.result;

            if (!db.objectStoreNames.contains(MEDIA_STORE)) {
                const store = db.createObjectStore(
                    MEDIA_STORE,
                    { keyPath: "id", autoIncrement: true }
                );

                store.createIndex("type", "type", { unique: false });
                store.createIndex("createdAt", "createdAt", { unique: false });
            }
        };

        request.onsuccess = event => {
            mediaDB = event.target.result;
            resolve(mediaDB);
        };

        request.onerror = () => reject(request.error);
    });
}

function mediaStore(mode = "readonly") {
    return mediaDB
        .transaction(MEDIA_STORE, mode)
        .objectStore(MEDIA_STORE);
}

function addMediaRecord(record) {
    return new Promise((resolve, reject) => {
        const request = mediaStore("readwrite").add(record);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

function getMediaRecords(type) {
    return new Promise((resolve, reject) => {
        const request = mediaStore("readonly")
            .index("type")
            .getAll(type);

        request.onsuccess = () => {
            const records = request.result || [];
            records.sort((a, b) => a.createdAt - b.createdAt);
            resolve(records);
        };

        request.onerror = () => reject(request.error);
    });
}

function deleteMediaRecord(id) {
    return new Promise((resolve, reject) => {
        const request = mediaStore("readwrite").delete(id);
        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
    });
}

function clearMediaRecords(type) {
    return new Promise((resolve, reject) => {
        const store = mediaStore("readwrite");
        const request = store.index("type").openCursor(IDBKeyRange.only(type));

        request.onsuccess = event => {
            const cursor = event.target.result;

            if (!cursor) {
                resolve();
                return;
            }

            cursor.delete();
            cursor.continue();
        };

        request.onerror = () => reject(request.error);
    });
}

function formatMediaTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, "0");

    return `${minutes}:${secs}`;
}

function escapeMediaText(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


/* GALLERY */

function renderGallery() {
    if (!photoGrid) return;

    photoGrid.innerHTML = "";

    if (galleryCount) {
        galleryCount.textContent = `${galleryItems.length} صورة`;
    }

    if (galleryEmpty) {
        galleryEmpty.classList.toggle("show", galleryItems.length === 0);
    }

    galleryItems.forEach((item, index) => {
        const card = document.createElement("article");
        card.className = "photo-card";
        card.style.animationDelay = `${index * 0.05}s`;

        const url = URL.createObjectURL(item.blob);

        card.innerHTML = `
            <img src="${url}" alt="${escapeMediaText(item.name)}" loading="lazy">

            <div class="photo-card-overlay">
                <span>${escapeMediaText(item.name)}</span>

                <button
                    class="media-delete-button"
                    type="button"
                    title="حذف الصورة"
                    data-photo-id="${item.id}"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        photoGrid.appendChild(card);

        const img = card.querySelector("img");
        img.addEventListener("click", () => openImageViewer(item));

        const deleteButton = card.querySelector("[data-photo-id]");
        deleteButton.addEventListener("click", async event => {
            event.preventDefault();
            event.stopPropagation();

            await deleteMediaRecord(item.id);
            await loadGallery();
            showToast("تم حذف الصورة");
        });
    });
}

function openImageViewer(item) {
    const existing = document.getElementById("imageViewer");
    if (existing) existing.remove();

    const viewer = document.createElement("div");
    viewer.id = "imageViewer";
    viewer.className = "image-viewer";

    const url = URL.createObjectURL(item.blob);

    viewer.innerHTML = `
        <button class="image-viewer-close" type="button" aria-label="إغلاق">
            <i class="fa-solid fa-xmark"></i>
        </button>
        <img src="${url}" alt="${escapeMediaText(item.name)}">
    `;

    document.body.appendChild(viewer);

    const close = () => {
        URL.revokeObjectURL(url);
        viewer.remove();
    };

    viewer.querySelector(".image-viewer-close").addEventListener("click", close);

    viewer.addEventListener("click", event => {
        if (event.target === viewer) close();
    });
}

async function loadGallery() {
    galleryItems = await getMediaRecords("image");
    renderGallery();
}

if (imagePicker) {
    imagePicker.addEventListener("change", async event => {
        const files = Array.from(event.target.files || []);

        for (const file of files) {
            if (!file.type.startsWith("image/")) continue;

            await addMediaRecord({
                type: "image",
                name: file.name,
                mime: file.type,
                blob: file,
                createdAt: Date.now()
            });
        }

        event.target.value = "";
        await loadGallery();

        if (files.length) {
            showToast(`تمت إضافة ${files.length} صورة للمعرض`);
        }
    });
}

if (clearGallery) {
    clearGallery.addEventListener("click", async () => {
        if (!galleryItems.length) {
            showToast("المعرض فاضي بالفعل");
            return;
        }

        const confirmed = await askAppConfirm(
            "هل تريد مسح كل الصور؟",
            "سيتم حذف جميع الصور المحفوظة في معرض StudyDesk ولا يمكن التراجع عن هذه العملية."
        );
        if (!confirmed) return;

        await clearMediaRecords("image");
        await loadGallery();
        showToast("تم مسح المعرض");
    });
}


/* MUSIC */

function updateMusicCount() {
    if (musicCount) {
        musicCount.textContent = `${musicItems.length} مقطع`;
    }

    if (musicEmpty) {
        musicEmpty.classList.toggle("show", musicItems.length === 0);
    }
}

function renderMusicList() {
    if (!musicList) return;

    musicList.innerHTML = "";
    updateMusicCount();

    musicItems.forEach((item, index) => {
        const row = document.createElement("button");
        row.type = "button";
        row.className = "music-list-item";

        if (index === currentSongIndex) {
            row.classList.add("active");
        }

        row.innerHTML = `
            <span class="music-list-number">${String(index + 1).padStart(2, "0")}</span>

            <span class="music-list-icon">
                <i class="fa-solid fa-music"></i>
            </span>

            <span class="music-list-info">
                <strong>${escapeMediaText(item.name)}</strong>
                <small>${escapeMediaText(item.mime || "Audio")}</small>
            </span>

            <span class="music-list-delete" data-music-id="${item.id}" title="حذف">
                <i class="fa-solid fa-trash"></i>
            </span>
        `;

        row.addEventListener("click", event => {
            if (event.target.closest(".music-list-delete")) return;
            loadSong(index, true);
        });

        row.querySelector("[data-music-id]").addEventListener("click", async event => {
            event.preventDefault();
            event.stopPropagation();

            const confirmed = await askAppConfirm(
                "هل تريد حذف المقطع؟",
                `سيتم حذف «${item.name}» من مكتبة الموسيقى داخل StudyDesk.`
            );
            if (!confirmed) return;

            const deletingCurrent = currentSongIndex === index;

            await deleteMediaRecord(item.id);

            if (deletingCurrent) {
                stopMusic();

                if (currentAudioUrl) {
                    URL.revokeObjectURL(currentAudioUrl);
                    currentAudioUrl = null;
                }

                currentSongIndex = -1;
            } else if (currentSongIndex > index) {
                currentSongIndex--;
            }

            await loadMusic();
            showToast("تم حذف المقطع");
        });

        musicList.appendChild(row);
    });
}

function setPlayIcon(isPlaying) {
    if (!playMusic) return;

    playMusic.innerHTML = isPlaying
        ? '<i class="fa-solid fa-pause"></i>'
        : '<i class="fa-solid fa-play"></i>';
}

function stopMusic() {
    if (!audioElement) return;

    audioElement.pause();
    audioElement.currentTime = 0;
    setPlayIcon(false);

    if (currentTime) currentTime.textContent = "0:00";
    if (musicProgress) musicProgress.value = 0;
}

function loadSong(index, autoplay = false) {
    if (!audioElement || index < 0 || index >= musicItems.length) return;

    const item = musicItems[index];

    if (currentAudioUrl) {
        URL.revokeObjectURL(currentAudioUrl);
    }

    currentSongIndex = index;
    currentAudioUrl = URL.createObjectURL(item.blob);

    audioElement.src = currentAudioUrl;
    audioElement.load();

    if (currentSong) currentSong.textContent = item.name;
    if (currentArtist) currentArtist.textContent = "ملف من هاتفك";
    if (musicProgress) musicProgress.value = 0;
    if (currentTime) currentTime.textContent = "0:00";
    if (durationTime) durationTime.textContent = "0:00";

    renderMusicList();

    if (autoplay) {
        audioElement.play()
            .then(() => setPlayIcon(true))
            .catch(() => setPlayIcon(false));
    }
}

async function loadMusic() {
    musicItems = await getMediaRecords("audio");
    updateMusicCount();
    renderMusicList();

    if (currentSongIndex >= musicItems.length) {
        currentSongIndex = -1;
        stopMusic();

        if (currentSong) {
            currentSong.textContent = "اختر أغنية من القائمة";
        }
    }
}

if (audioPicker) {
    audioPicker.addEventListener("change", async event => {
        const files = Array.from(event.target.files || []);

        for (const file of files) {
            if (!file.type.startsWith("audio/")) continue;

            await addMediaRecord({
                type: "audio",
                name: file.name,
                mime: file.type,
                blob: file,
                createdAt: Date.now()
            });
        }

        event.target.value = "";
        await loadMusic();

        if (files.length) {
            showToast(`تمت إضافة ${files.length} مقطع موسيقي`);
        }
    });
}

if (playMusic) {
    playMusic.addEventListener("click", () => {
        if (!musicItems.length) {
            showToast("أضف موسيقى من الهاتف أولاً");
            return;
        }

        if (currentSongIndex === -1) {
            loadSong(0, true);
            return;
        }

        if (audioElement.paused) {
            audioElement.play()
                .then(() => setPlayIcon(true))
                .catch(() => showToast("تعذر تشغيل الملف"));
        } else {
            audioElement.pause();
            setPlayIcon(false);
        }
    });
}

if (previousSong) {
    previousSong.addEventListener("click", () => {
        if (!musicItems.length) return;

        let index = currentSongIndex - 1;
        if (index < 0) index = musicItems.length - 1;

        loadSong(index, true);
    });
}

if (nextSong) {
    nextSong.addEventListener("click", () => {
        if (!musicItems.length) return;

        let index = currentSongIndex + 1;
        if (index >= musicItems.length) index = 0;

        loadSong(index, true);
    });
}

if (audioElement) {
    audioElement.addEventListener("loadedmetadata", () => {
        if (durationTime) {
            durationTime.textContent = formatMediaTime(audioElement.duration);
        }
    });

    audioElement.addEventListener("timeupdate", () => {
        if (currentTime) {
            currentTime.textContent = formatMediaTime(audioElement.currentTime);
        }

        if (
            musicProgress &&
            Number.isFinite(audioElement.duration) &&
            audioElement.duration > 0
        ) {
            musicProgress.value =
                (audioElement.currentTime / audioElement.duration) * 100;
        }
    });

    audioElement.addEventListener("play", () => setPlayIcon(true));
    audioElement.addEventListener("pause", () => setPlayIcon(false));

    audioElement.addEventListener("ended", () => {
        if (!musicItems.length) return;

        let nextIndex = currentSongIndex + 1;
        if (nextIndex >= musicItems.length) nextIndex = 0;

        loadSong(nextIndex, true);
    });
}

if (musicProgress) {
    musicProgress.addEventListener("input", () => {
        if (
            audioElement &&
            Number.isFinite(audioElement.duration) &&
            audioElement.duration > 0
        ) {
            audioElement.currentTime =
                (musicProgress.value / 100) * audioElement.duration;
        }
    });
}

if (musicVolume && audioElement) {
    audioElement.volume = Number(musicVolume.value);

    musicVolume.addEventListener("input", () => {
        audioElement.volume = Number(musicVolume.value);
    });
}

if (clearMusic) {
    clearMusic.addEventListener("click", async () => {
        if (!musicItems.length) {
            showToast("قائمة الموسيقى فاضية بالفعل");
            return;
        }

        const confirmed = await askAppConfirm(
            "هل تريد مسح كل الموسيقى؟",
            "سيتم حذف جميع المقاطع الموسيقية المحفوظة داخل StudyDesk ولا يمكن التراجع عن هذه العملية."
        );
        if (!confirmed) return;

        stopMusic();

        if (currentAudioUrl) {
            URL.revokeObjectURL(currentAudioUrl);
            currentAudioUrl = null;
        }

        await clearMediaRecords("audio");

        musicItems = [];
        currentSongIndex = -1;

        if (currentSong) currentSong.textContent = "اختر أغنية من القائمة";
        if (currentArtist) currentArtist.textContent = "ملفاتك الموسيقية من الهاتف";

        await loadMusic();
        showToast("تم مسح الموسيقى");
    });
}

async function initMediaHub() {
    try {
        await openMediaDB();
        await loadGallery();
        await loadMusic();
    } catch (error) {
        console.error("StudyDesk Media Hub Error:", error);
        showToast("تعذر تشغيل معرض الوسائط في هذا المتصفح");
    }
}

initMediaHub();


/* =========================================================
   SERVICE WORKER
========================================================= */

if (
    "serviceWorker" in navigator
) {

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
                        "StudyDesk Service Worker Error:",
                        error
                    );

                });

        }
    );

}


/* =========================================================
   INITIALIZE OLD PLANNER
========================================================= */

loadPlanner();

renderPlatforms();


/* =========================================================
   STUDYDESK ORGANIZER
   DATE RANGE:
   01 SEPTEMBER 2026
   →
   01 JULY 2027

   WEEK 1:
   01/09/2026 → 07/09/2026

   WEEK 2:
   08/09/2026 → 14/09/2026

   ...

   FINAL DISPLAYED WEEK:
   30/06/2027 → 01/07/2027
========================================================= */

(() => {

    "use strict";


    /* =====================================================
       STUDY PERIOD
    ===================================================== */

    const STUDY_START =
        new Date(
            2026,
            8,
            1
        );


    const STUDY_END =
        new Date(
            2027,
            6,
            1
        );


    /*
     * حساب عدد الأسابيع الحقيقي.
     *
     * من 1 سبتمبر 2026
     * إلى 1 يوليو 2027
     *
     * = 44 أسبوعًا تقريبًا.
     */

    const TOTAL_WEEKS =
        Math.ceil(
            (
                STUDY_END -
                STUDY_START
            ) /
            (
                1000 *
                60 *
                60 *
                24 *
                7
            )
        );


    /* =====================================================
       STORAGE
    ===================================================== */

    const KEY =
        "studydeskYearOrganizer_v4";


    const OLD_KEY =
        "studydeskYearOrganizer_v3";


    /* =====================================================
       ELEMENT HELPER
    ===================================================== */

    const $ =
        id =>
            document.getElementById(id);


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const el = {

        weekSelector:
            $("weekSelector"),

        currentWeekTitle:
            $("currentWeekTitle"),

        currentWeekDates:
            $("currentWeekDates"),

        previousWeek:
            $("previousWeek"),

        nextWeek:
            $("nextWeek"),

        taskInput:
            $("taskInput"),

        taskPriority:
            $("taskPriority"),

        addTask:
            $("addTask"),

        tasksList:
            $("tasksList"),

        noTasks:
            $("noTasks"),

        weeklyPercentage:
            $("weeklyPercentage"),

        weeklyProgress:
            $("weeklyProgress"),

        completedTasks:
            $("completedTasks"),

        totalTasks:
            $("totalTasks"),

        tasksCounter:
            $("tasksCounter"),

        weeksArchive:
            $("weeksArchive"),

        bestWeek:
            $("bestWeek"),

        plannerSaveStatus:
            $("plannerSaveStatus"),

        clearCurrentWeek:
            $("clearCurrentWeek"),

        weekClearModal:
            $("weekClearModal"),

        closeWeekModal:
            $("closeWeekModal"),

        cancelWeekClear:
            $("cancelWeekClear"),

        confirmWeekClear:
            $("confirmWeekClear"),

        scheduleBody:
            $("weeklyScheduleBody"),

       scheduleSaveStatus:
    $("scheduleSaveStatus"),

scheduleEditButton:
    $("scheduleEditButton"),

scheduleExcludeButton:
    $("scheduleExcludeButton"),

scheduleRestoreButton:
    $("scheduleRestoreButton")

    };


    /* =====================================================
       DATA
    ===================================================== */

   let data = {

    currentWeek: 1,

    // الجدول الأساسي المشترك بين كل الأسابيع
    globalSchedule: {},

    // الأسابيع والمهام والاستثناءات
    weeks: {}

};


    /* =====================================================
       EMPTY WEEK
    ===================================================== */
const emptyWeek =
    () => ({

        tasks: [],

        // لو true يبقى الجدول الأساسي مخفي في الأسبوع ده
        scheduleExcluded: false

    });
  


    /* =====================================================
       BUILD REAL STUDY WEEKS
    ===================================================== */

    function getStudyWeeks() {

        const weeks = [];

        for (
            let i = 0;
            i < TOTAL_WEEKS;
            i++
        ) {

            const start =
                new Date(
                    STUDY_START
                );


            start.setDate(
                STUDY_START.getDate() +
                (
                    i * 7
                )
            );


            const end =
                new Date(
                    start
                );


            end.setDate(
                start.getDate() +
                6
            );


            /*
             * لا نسمح للتاريخ أن يتعدى
             * 1 يوليو 2027.
             */

            if (
                end >
                STUDY_END
            ) {

                end.setTime(
                    STUDY_END.getTime()
                );

            }


            weeks.push({

                number:
                    i + 1,

                start,

                end

            });

        }


        return weeks;

    }


    const STUDY_WEEKS =
        getStudyWeeks();


    /* =====================================================
       GET WEEK INFO
    ===================================================== */

    function getWeekInfo(number) {

        return (
            STUDY_WEEKS[
                Number(number) - 1
            ] ||
            STUDY_WEEKS[0]
        );

    }


    /* =====================================================
       FORMAT DATE
    ===================================================== */

    function formatArabicDate(date) {

        return new Intl.DateTimeFormat(
            "ar-EG",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        ).format(date);

    }


    /* =====================================================
       WEEK DATES
    ===================================================== */

    function weekDates(number) {

        const info =
            getWeekInfo(
                number
            );


        if (!info) {
            return "";
        }


        return (
            `${formatArabicDate(info.start)} — ` +
            `${formatArabicDate(info.end)}`
        );

    }


    /* =====================================================
       ENSURE WEEKS
    ===================================================== */

    function ensureWeeks() {

        for (
            let i = 1;
            i <= TOTAL_WEEKS;
            i++
        ) {

            if (
                !data.weeks[i]
            ) {

                data.weeks[i] =
                    emptyWeek();

            }


            if (
                !Array.isArray(
                    data.weeks[i].tasks
                )
            ) {

                data.weeks[i].tasks =
                    [];

            }


           if (
    typeof data.weeks[i].scheduleExcluded !== "boolean"
) {

    data.weeks[i].scheduleExcluded = false;

}

        }

    }


    /* =====================================================
       SAVE
    ===================================================== */

    function save(
        showStatus = true
    ) {

        try {

            localStorage.setItem(
                KEY,
                JSON.stringify(
                    data
                )
            );


            if (
                showStatus &&
                el.plannerSaveStatus
            ) {

                el.plannerSaveStatus.innerHTML =
                    '<span class="save-dot"></span> جاري الحفظ...';


                clearTimeout(
                    save.timer
                );


                save.timer =
                    setTimeout(
                        () => {

                            el.plannerSaveStatus.innerHTML =
                                '<span class="save-dot"></span> محفوظ تلقائيًا';

                        },
                        450
                    );

            }

        }

        catch (err) {

            console.error(
                "StudyDesk save error:",
                err
            );

        }

    }


    /* =====================================================
       LOAD
    ===================================================== */

    function load() {

        let loaded = false;


        try {

            /*
             * أولاً نحاول تحميل النسخة الجديدة.
             */

            let raw =
                localStorage.getItem(
                    KEY
                );


            /*
             * لو مفيش نسخة v4
             * نحاول نقرأ النسخة القديمة v3.
             */

            if (!raw) {

                raw =
                    localStorage.getItem(
                        OLD_KEY
                    );

            }


            if (raw) {

                const parsed =
                    JSON.parse(
                        raw
                    );


                if (
                    parsed &&
                    typeof parsed ===
                    "object"
                ) {

                    data.currentWeek =
                        Number(
                            parsed.currentWeek
                        ) || 1;


                    data.weeks =
                        parsed.weeks &&
                        typeof parsed.weeks ===
                        "object"

                            ? parsed.weeks

                            : {};
data.globalSchedule =
    parsed.globalSchedule &&
    typeof parsed.globalSchedule === "object"

        ? parsed.globalSchedule

        : {};

                    loaded = true;

                }

            }

        }

        catch (err) {

            console.error(
                "StudyDesk load error:",
                err
            );

        }


        /*
         * حماية الأسبوع الحالي.
         */

        if (
            data.currentWeek <
            1 ||
            data.currentWeek >
            TOTAL_WEEKS
        ) {

            data.currentWeek =
                1;

        }


        ensureWeeks();

if (
    !data.globalSchedule ||
    typeof data.globalSchedule !== "object"
) {

    data.globalSchedule = {};

}
        /*
         * حفظ بالنظام الجديد.
         */

        save(false);


        /*
         * لا نحذف v3 مباشرة،
         * حتى تظل البيانات القديمة
         * موجودة كنسخة احتياطية.
         */

        if (loaded) {

            console.log(
                "StudyDesk Organizer: data loaded"
            );

        }

    }


    /* =====================================================
       CURRENT WEEK
    ===================================================== */

    function currentWeek() {

        ensureWeeks();

        return data.weeks[
            data.currentWeek
        ];

    }


    /* =====================================================
       PROGRESS
    ===================================================== */

    function progressFor(number) {

        const week =
            data.weeks[number];


        if (
            !week ||
            !Array.isArray(
                week.tasks
            ) ||
            week.tasks.length === 0
        ) {

            return {

                total: 0,

                completed: 0,

                percentage: 0

            };

        }


        const total =
            week.tasks.length;


        const completed =
            week.tasks.filter(
                task =>
                    task.completed
            ).length;


        return {

            total,

            completed,

            percentage:
                Math.round(
                    (
                        completed /
                        total
                    ) * 100
                )

        };

    }


    /* =====================================================
       BUILD WEEK SELECTOR
    ===================================================== */

    function buildSelector() {

        if (
            !el.weekSelector
        ) {

            return;

        }


        el.weekSelector.innerHTML =
            "";


        for (
            let i = 1;
            i <= TOTAL_WEEKS;
            i++
        ) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                i;


            option.textContent =
                `الأسبوع ${i} — ${weekDates(i)}`;


            el.weekSelector.appendChild(
                option
            );

        }


        el.weekSelector.value =
            data.currentWeek;

    }


    /* =====================================================
       SET WEEK
    ===================================================== */

    function setWeek(value) {

        const number =
            Number(value);


        if (
            !Number.isInteger(
                number
            ) ||
            number < 1 ||
            number > TOTAL_WEEKS
        ) {

            return;

        }


        data.currentWeek =
            number;


        save(false);

        render();

    }


    /* =====================================================
       UPDATE PROGRESS
    ===================================================== */

    function updateProgress() {

        const progress =
            progressFor(
                data.currentWeek
            );


        if (
            el.weeklyPercentage
        ) {

            el.weeklyPercentage.textContent =
                `${progress.percentage}%`;

        }


        if (
            el.weeklyProgress
        ) {

            el.weeklyProgress.style.width =
                `${progress.percentage}%`;

        }


        if (
            el.completedTasks
        ) {

            el.completedTasks.textContent =
                `${progress.completed} مكتملة`;

        }


        if (
            el.totalTasks
        ) {

            el.totalTasks.textContent =
                `${progress.total} مهمة`;

        }


        if (
            el.tasksCounter
        ) {

            el.tasksCounter.textContent =
                `${progress.completed} / ${progress.total}`;

        }

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHtml(
        value
    ) {

        const div =
            document.createElement(
                "div"
            );


        div.textContent =
            String(value);


        return div.innerHTML;

    }


    /* =====================================================
       RENDER TASKS
    ===================================================== */

    function renderTasks() {

        if (
            !el.tasksList
        ) {

            return;

        }


        const tasks =
            currentWeek().tasks;


        el.tasksList.innerHTML =
            "";


        if (
            !tasks.length
        ) {

            if (
                el.noTasks
            ) {

                el.noTasks.style.display =
                    "block";

            }

            return;

        }


        if (
            el.noTasks
        ) {

            el.noTasks.style.display =
                "none";

        }


        tasks.forEach(
            task => {

                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    `task-item${
                        task.completed
                            ? " completed"
                            : ""
                    }`;


                const priorityText =
                    task.priority ===
                    "urgent"

                        ? "مهمة جدًا"

                        : task.priority ===
                          "important"

                            ? "مهمة"

                            : "عادية";


                item.innerHTML = `

                    <button
                        class="task-check"
                        type="button"
                        data-task-action="toggle"
                        data-task-id="${escapeHtml(task.id)}"
                        aria-label="تحديد المهمة كمكتملة">
                    </button>


                    <div class="task-content">

                        <strong>
                            ${escapeHtml(task.title)}
                        </strong>

                        <small>
                            الأسبوع ${data.currentWeek}
                        </small>

                    </div>


                    <div class="task-meta">

                        <span
                            class="task-priority ${escapeHtml(task.priority)}"
                        >
                            ${priorityText}
                        </span>


                        <button
                            class="delete-task"
                            type="button"
                            data-task-action="delete"
                            data-task-id="${escapeHtml(task.id)}"
                            aria-label="حذف المهمة"
                        >

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                `;


                el.tasksList.appendChild(
                    item
                );

            }
        );

    }


    /* =====================================================
       ADD TASK
    ===================================================== */

    function addTask() {

        if (
            !el.taskInput
        ) {

            return;

        }


        const title =
            el.taskInput.value.trim();


        if (!title) {

            el.taskInput.focus();

            return;

        }


        currentWeek().tasks.push({

            id:
                `${Date.now()}_${
                    Math.random()
                        .toString(36)
                        .slice(2, 9)
                }`,

            title,

            priority:
                el.taskPriority
                    ? el.taskPriority.value
                    : "normal",

            completed:
                false

        });


        el.taskInput.value =
            "";


        save();

        render();


        el.taskInput.focus();

    }


    /* =====================================================
       TOGGLE TASK
    ===================================================== */

    function toggleTask(
        id
    ) {

        const task =
            currentWeek()
                .tasks
                .find(
                    item =>
                        String(
                            item.id
                        ) ===
                        String(id)
                );


        if (!task) {
            return;
        }


        task.completed =
            !task.completed;


        save();

        render();

    }


    /* =====================================================
       DELETE TASK
    ===================================================== */

    function deleteTask(
        id
    ) {

        const week =
            currentWeek();


        const index =
            week.tasks.findIndex(
                task =>
                    String(
                        task.id
                    ) ===
                    String(id)
            );


        if (
            index === -1
        ) {

            return;

        }


        week.tasks.splice(
            index,
            1
        );


        save();

        render();

    }


    /* =====================================================
       RENDER ARCHIVE
    ===================================================== */

    function renderArchive() {

        if (
            !el.weeksArchive
        ) {

            return;

        }


        el.weeksArchive.innerHTML =
            "";


        for (
            let i = 1;
            i <= TOTAL_WEEKS;
            i++
        ) {

            const progress =
                progressFor(i);


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                `archive-week${
                    i === data.currentWeek
                        ? " active"
                        : ""
                }`;


            button.innerHTML = `

                <span
                    class="archive-week-number"
                >
                    أسبوع ${i}
                </span>


                <span
                    class="archive-week-progress"
                >
                    ${progress.percentage}%
                </span>


                <small
                    class="archive-week-dates"
                >
                    ${weekDates(i)}
                </small>


                <div
                    class="archive-week-bar"
                >

                    <div
                        class="archive-week-bar-fill"
                        style="width:${progress.percentage}%"
                    ></div>

                </div>

            `;


            button.addEventListener(
                "click",
                () =>
                    setWeek(i)
            );


            el.weeksArchive.appendChild(
                button
            );

        }

    }


    /* =====================================================
       BEST WEEK
    ===================================================== */

    function renderBestWeek() {

        if (
            !el.bestWeek
        ) {

            return;

        }


        let best =
            null;


        let bestValue =
            -1;


        for (
            let i = 1;
            i <= TOTAL_WEEKS;
            i++
        ) {

            const progress =
                progressFor(i);


            if (
                progress.total > 0 &&
                progress.percentage >
                bestValue
            ) {

                best =
                    i;


                bestValue =
                    progress.percentage;

            }

        }


        if (best) {

            el.bestWeek.textContent =
                `أسبوع ${best}`;

        }

        else {

            el.bestWeek.textContent =
                "--";

        }

    }


    /* =====================================================
       RENDER SCHEDULE
    ===================================================== */

   function renderSchedule() {

    if (!el.scheduleBody) {
        return;
    }

    const week =
        currentWeek();

    const excluded =
        week.scheduleExcluded === true;

    const schedule =
        data.globalSchedule || {};

    el.scheduleBody
        .querySelectorAll("tr[data-day]")
        .forEach(row => {

            const day =
                row.dataset.day;

            row.querySelectorAll(
                "textarea[data-schedule-field]"
            )
            .forEach(input => {

                const field =
                    input.dataset.scheduleField;

                input.value =
                    !excluded &&
                    schedule[day] &&
                    typeof schedule[day][field] === "string"

                        ? schedule[day][field]

                        : "";

                input.disabled =
                    excluded;

            });

        });

    updateScheduleControls();

}


    /* =====================================================
       SAVE SCHEDULE
    ===================================================== */

   function saveSchedule() {

    if (!el.scheduleBody) {
        return;
    }

    const week =
        currentWeek();

    // لو الأسبوع مستثنى، ممنوع نعدل الجدول العام منه
    if (week.scheduleExcluded) {
        return;
    }

    if (!data.globalSchedule) {
        data.globalSchedule = {};
    }

    el.scheduleBody
        .querySelectorAll("tr[data-day]")
        .forEach(row => {

            const day =
                row.dataset.day;

            if (!data.globalSchedule[day]) {
                data.globalSchedule[day] = {};
            }

            row.querySelectorAll(
                "textarea[data-schedule-field]"
            )
            .forEach(input => {

                const field =
                    input.dataset.scheduleField;

                data.globalSchedule[day][field] =
                    input.value;

            });

        });

    save();

    if (el.scheduleSaveStatus) {

        el.scheduleSaveStatus.innerHTML =
            '<span class="save-dot"></span> تم حفظ الجدول الأساسي';

        clearTimeout(
            saveSchedule.timer
        );

        saveSchedule.timer =
            setTimeout(() => {

                updateScheduleControls();

            }, 900);

    }

}

function updateScheduleControls() {

    const week =
        currentWeek();

    const excluded =
        week.scheduleExcluded === true;

    const inputs =
        el.scheduleBody
            ? el.scheduleBody.querySelectorAll(
                "textarea[data-schedule-field]"
            )
            : [];

    inputs.forEach(input => {

        input.disabled =
            excluded;

    });

    if (el.scheduleEditButton) {

        el.scheduleEditButton.style.display =
            excluded ? "none" : "inline-flex";

    }

    if (el.scheduleExcludeButton) {

        el.scheduleExcludeButton.style.display =
            excluded ? "none" : "inline-flex";

    }

    if (el.scheduleRestoreButton) {

        el.scheduleRestoreButton.style.display =
            excluded ? "inline-flex" : "none";

    }

    if (el.scheduleSaveStatus) {

        el.scheduleSaveStatus.innerHTML =
            excluded

                ? '<span class="save-dot"></span> الجدول مخفي في هذا الأسبوع'

                : '<span class="save-dot"></span> الجدول الأساسي مشترك بين الأسابيع';

    }

}
    /* =====================================================
       RENDER EVERYTHING
    ===================================================== */

    function render() {

        const week =
            data.currentWeek;


        if (
            el.currentWeekTitle
        ) {

            el.currentWeekTitle.textContent =
                `الأسبوع ${week}`;

        }


        if (
            el.currentWeekDates
        ) {

            el.currentWeekDates.textContent =
                weekDates(
                    week
                );

        }


        if (
            el.weekSelector
        ) {

            el.weekSelector.value =
                week;

        }


        renderTasks();

        updateProgress();

        renderArchive();

        renderBestWeek();

        renderSchedule();

    }


    /* =====================================================
       MODAL
    ===================================================== */

    function openModal() {

        if (
            !el.weekClearModal
        ) {

            return;

        }


        el.weekClearModal.classList.add(
            "active"
        );


        el.weekClearModal.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function closeModal() {

        if (
            !el.weekClearModal
        ) {

            return;

        }


        el.weekClearModal.classList.remove(
            "active"
        );


        el.weekClearModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =====================================================
       CLEAR CURRENT WEEK
    ===================================================== */

    function clearWeek() {

        data.weeks[
            data.currentWeek
        ] =
            emptyWeek();


        save();

        render();

        closeModal();

    }


    /* =====================================================
       ADD TASK BUTTON
    ===================================================== */

    if (
        el.addTask
    ) {

        el.addTask.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                addTask();

            }
        );

    }


    /* =====================================================
       ENTER TO ADD TASK
    ===================================================== */

    if (
        el.taskInput
    ) {

        el.taskInput.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Enter"
                ) {

                    event.preventDefault();

                    addTask();

                }

            }
        );

    }


    /* =====================================================
       TASK ACTIONS
    ===================================================== */

    if (
        el.tasksList
    ) {

        el.tasksList.addEventListener(
            "click",
            event => {

                const button =
                    event.target.closest(
                        "[data-task-action]"
                    );


                if (!button) {
                    return;
                }


                if (
                    button.dataset
                        .taskAction ===
                    "toggle"
                ) {

                    toggleTask(
                        button.dataset.taskId
                    );

                }


                else if (
                    button.dataset
                        .taskAction ===
                    "delete"
                ) {

                    deleteTask(
                        button.dataset.taskId
                    );

                }

            }
        );

    }


    /* =====================================================
       PREVIOUS WEEK
    ===================================================== */

    if (
        el.previousWeek
    ) {

        el.previousWeek.addEventListener(
            "click",
            () => {

                if (
                    data.currentWeek >
                    1
                ) {

                    setWeek(
                        data.currentWeek - 1
                    );

                }

            }
        );

    }


    /* =====================================================
       NEXT WEEK
    ===================================================== */

    if (
        el.nextWeek
    ) {

        el.nextWeek.addEventListener(
            "click",
            () => {

                if (
                    data.currentWeek <
                    TOTAL_WEEKS
                ) {

                    setWeek(
                        data.currentWeek + 1
                    );

                }

            }
        );

    }


    /* =====================================================
       WEEK SELECTOR
    ===================================================== */

    if (
        el.weekSelector
    ) {

        el.weekSelector.addEventListener(
            "change",
            event => {

                setWeek(
                    event.target.value
                );

            }
        );

    }


    /* =====================================================
       CLEAR CURRENT WEEK
    ===================================================== */

    if (
        el.clearCurrentWeek
    ) {

        el.clearCurrentWeek.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                openModal();

            }
        );

    }


    /* =====================================================
       CLOSE WEEK MODAL
    ===================================================== */

    if (
        el.closeWeekModal
    ) {

        el.closeWeekModal.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                closeModal();

            }
        );

    }


    /* =====================================================
       CANCEL CLEAR
    ===================================================== */

    if (
        el.cancelWeekClear
    ) {

        el.cancelWeekClear.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                closeModal();

            }
        );

    }


    /* =====================================================
       CONFIRM CLEAR
    ===================================================== */

    if (
        el.confirmWeekClear
    ) {

        el.confirmWeekClear.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                clearWeek();

            }
        );

    }


    /* =====================================================
       CLICK OUTSIDE MODAL
    ===================================================== */

    if (
        el.weekClearModal
    ) {

        el.weekClearModal.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    el.weekClearModal
                ) {

                    closeModal();

                }

            }
        );

    }


    /* =====================================================
       SCHEDULE AUTO SAVE
    ===================================================== */

    if (
        el.scheduleBody
    ) {

        el.scheduleBody.addEventListener(
            "input",
            saveSchedule
        );

    }


    /* =====================================================
       ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape" &&
                el.weekClearModal &&
                el.weekClearModal.classList.contains(
                    "active"
                )
            ) {

                closeModal();

            }

        }
    );


    /* =====================================================
       START ORGANIZER
    ===================================================== */

    load();

    buildSelector();

    render();


    /* =====================================================
       DEBUG
    ===================================================== */

    console.log(
        "StudyDesk Organizer: READY"
    );


    console.log(
        "Study period:",
        formatArabicDate(
            STUDY_START
        ),
        "→",
        formatArabicDate(
            STUDY_END
        )
    );


    console.log(
        "Total weeks:",
        TOTAL_WEEKS
    );

})();
function updateScheduleControls() {

    const week =
        currentWeek();

    const excluded =
        week.scheduleExcluded === true;

    const inputs =
        el.scheduleBody
            ? el.scheduleBody.querySelectorAll(
                "textarea[data-schedule-field]"
            )
            : [];

    inputs.forEach(input => {

        input.disabled =
            excluded;

    });

    if (el.scheduleEditButton) {

        el.scheduleEditButton.style.display =
            excluded ? "none" : "inline-flex";

    }

    if (el.scheduleExcludeButton) {

        el.scheduleExcludeButton.style.display =
            excluded ? "none" : "inline-flex";

    }

    if (el.scheduleRestoreButton) {

        el.scheduleRestoreButton.style.display =
            excluded ? "inline-flex" : "none";

    }

    if (el.scheduleSaveStatus) {

        el.scheduleSaveStatus.innerHTML =
            excluded

                ? '<span class="save-dot"></span> الجدول مخفي في هذا الأسبوع'

                : '<span class="save-dot"></span> الجدول الأساسي مشترك بين الأسابيع';

    }

}
function restoreCurrentWeekSchedule() {

    const week =
        currentWeek();

    week.scheduleExcluded =
        false;

    save();

    renderSchedule();

}
if (el.scheduleExcludeButton) {

    el.scheduleExcludeButton.addEventListener(
        "click",
        () => {

            excludeCurrentWeekSchedule();

        }
    );

}


if (el.scheduleRestoreButton) {

    el.scheduleRestoreButton.addEventListener(
        "click",
        () => {

            restoreCurrentWeekSchedule();

        }
    );

}