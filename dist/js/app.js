(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    window.showNextBlock = function(nextBlockId) {
        const currentBlock = document.querySelector(".page__body.active");
        if (currentBlock) currentBlock.classList.remove("active");
        const nextBlock = document.getElementById(nextBlockId);
        if (nextBlock) {
            nextBlock.classList.add("active");
            if (nextBlockId !== "questions") {
                const questionsBlock = document.getElementById("questions");
                if (questionsBlock) questionsBlock.style.display = "none";
            }
        }
    };
    function updateTimer(timerId, minutes, seconds) {
        const timerElement = document.querySelector(`#${timerId}`);
        if (timerElement) {
            const now = new Date;
            const endTime = new Date(now.getTime() + minutes * 60 * 1e3 + seconds * 1e3);
            const formattedEndTime = endTime.toLocaleString("en", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });
            timerElement.dataset.end = formattedEndTime;
            const timerInterval = setInterval((() => {
                const currentTime = new Date;
                const timeRemaining = endTime - currentTime;
                if (timeRemaining > 0) {
                    const minutes = Math.floor(timeRemaining % (1e3 * 60 * 60) / (1e3 * 60));
                    const seconds = Math.floor(timeRemaining % (1e3 * 60) / 1e3);
                    timerElement.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
                } else {
                    clearInterval(timerInterval);
                    timerElement.textContent = "Таймер завершено!";
                }
            }), 1e3);
        }
    }
    updateTimer("timer1", 4, 45);
    updateTimer("timer2", 3, 35);
    window["FLS"] = true;
    isWebp();
})();