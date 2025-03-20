let budget = 15;
const budgetDisplay = document.getElementById("budget");
const selectedPlayersContainer = document.getElementById("selectedPlayers");

document.querySelectorAll(".player-container").forEach(player => {
    player.addEventListener("click", function () {
        let cost = parseInt(this.getAttribute("data-cost"));
        let position = this.getAttribute("data-pos");
        let currentSelected = document.querySelector(`.selected-players .select-box.${position} .player-container`);

        // 기존 선택된 요소가 있다면 예산 복원 및 선택 해제
        if (currentSelected) {
            budget += parseInt(currentSelected.getAttribute("data-cost"));
            currentSelected.remove();
        }

        // 기존 선택된 요소에서 selected 클래스 제거
        let previousSelected = document.querySelector(`.player-container.selected[data-pos='${position}']`);
        if (previousSelected) {
            previousSelected.classList.remove("selected");
        }

        if (budget >= cost) {
            budget -= cost;
            budgetDisplay.textContent = budget;

            // 선택된 요소에 selected 클래스 추가
            this.classList.add("selected");

            // 클론하여 해당 포지션의 select-box 안에 추가
            let clonedPlayer = this.cloneNode(true);
            clonedPlayer.classList.remove("selected");

            let targetBox = document.querySelector(`.selected-players .select-box.${position}`);
            if (targetBox) {
                targetBox.innerHTML = ""; // 기존 내용 제거
                targetBox.appendChild(clonedPlayer);
            }
        }
    });
});