let plays = 0
let playsWon = 0
let playsLost = 0
let playsTied = 0
let userPlays = []
let machinePlays = []
const posiblePlays = ["paper", "rock", "scissors"]

window.onload = () => {
  gameInit()
}

function gameInit() {
  setScore()
  playListener()
  rulesListener()
}

function playListener() {
  document.querySelectorAll(".item-container").forEach((element) => {
    element.addEventListener("click", (e) => {
      selectItemToPlay(e.target)
      machinePlay()
      showPlay(userPlays[plays], machinePlays[plays])

      addRound()
    })
  })
}

function selectItemToPlay(context) {
  let itemSelected
  if (context.src) {
    itemSelected = context.parentElement
  } else {
    itemSelected = context
  }

  if (itemSelected.getAttribute("name").includes("paper")) {
    userPlays.push(posiblePlays[0])
  } else if (itemSelected.getAttribute("name").includes("rock")) {
    userPlays.push(posiblePlays[1])
  } else if (itemSelected.getAttribute("name").includes("scissors")) {
    userPlays.push(posiblePlays[2])
  }
}

function machinePlay() {
  let selectedPlay
  for (let i = posiblePlays.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * posiblePlays.length)
    selectedPlay = posiblePlays[j]
  }
  machinePlays.push(selectedPlay)
}

function detectWinner() {
  let status
  if (userPlays[plays] === machinePlays[plays]) {
    playsTied++
    status = "tie"
  } else {
    if (userPlays[plays] === "paper" && machinePlays[plays] === "rock") {
      playsWon++
      status = "win"
    } else if (
      userPlays[plays] === "paper" &&
      machinePlays[plays] === "scissors"
    ) {
      playsLost++
      status = "lose"
    } else if (userPlays[plays] === "rock" && machinePlays[plays] === "paper") {
      playsLost++
      status = "lose"
    } else if (
      userPlays[plays] === "rock" &&
      machinePlays[plays] === "scissors"
    ) {
      playsWon++
      status = "win"
    } else if (
      userPlays[plays] === "scissors" &&
      machinePlays[plays] === "paper"
    ) {
      playsWon++
      status = "win"
    } else if (
      userPlays[plays] === "scissors" &&
      machinePlays[plays] === "rock"
    ) {
      playsLost++
      status = "lose"
    }
  }

  switch (status) {
    case "win":
      showStatus(status)
      break

    case "tie":
      showStatus(status)
      break

    case "lose":
      showStatus(status)
      break

    default:
      break
  }
  playAgain_listener()
}

function showStatus(status) {
  const statusDiv = document.querySelector(".page-footer")
  statusDiv.insertAdjacentHTML("afterbegin", layoutStatus(status))
}

function addRound() {
  plays++
}

function showPlay(userPlay, machinePlay) {
  const contentGame = document.querySelector(".content-game")
  contentGame.classList.add("playing")

  contentGame.innerHTML = null
  contentGame.innerHTML += userLayout_onPLay(userPlay)
  contentGame.innerHTML += machineLayout_onPLay(machinePlay)
  detectWinner()

  setTimeout(() => {
    document.querySelectorAll(".item-container")[1].style = "display: flex"
    document.querySelectorAll(".item-container")[1].style.animation =
      "show 2s linear"
  }, 800)

  setTimeout(() => {
    document.querySelector(".user-status").style = "display: flex"
    document.querySelector(".user-status").style.animation = "show 2s linear"
    setScore()
  }, 1500)
}

function playAgain_listener() {
  document
    .querySelector("button[name=playAgain]")
    .addEventListener("click", () => {
      showHome()
    })
}

function setScore() {
  const scoreText = document.querySelector("strong[name=score]")
  scoreText.textContent = `${playsWon} / ${plays}`
}

function showHome() {
  const home = document.querySelector(".content-game")
  home.classList.remove("playing")
  home.innerHTML = homeLayout()

  const pageFooter = document.querySelector(".page-footer")
  const userStatus = document.querySelector(".user-status")
  if (userStatus) {
    pageFooter.removeChild(userStatus)
  }
  playListener()
}

function popupListener() {
  const popup = document.querySelector("img[name=closePopup]")
  popup.addEventListener("click", (e) => {
    closePopup()
  })
}

function showPopUp() {
  const overlay = document.createElement("div")
  overlay.classList.add("overlay")
  overlay.innerHTML = popUp()
  document.body.append(overlay)
  popupListener()
}

function closePopup() {
  const overlay = document.querySelector(".overlay")
  overlay.remove()
}

function rulesListener() {
  const rulesButton = document.querySelector("button[name=rules]")
  rulesButton.addEventListener("click", showPopUp)
}

const userLayout_onPLay = (itemPlayed) => {
  return `
  <div class="item-container ${itemPlayed}-container" name="${itemPlayed}-container">
        <img src="images/icon-${itemPlayed}.svg" alt="">
        <div class="who-item"><span>You picked</span></div>
      </div>
  `
}

const machineLayout_onPLay = (itemPlayed) => {
  return `
  <div class="item-container ${itemPlayed}-container" name="${itemPlayed}-container" style="display:none">
        <img src="images/icon-${itemPlayed}.svg" alt="">
        <div class="who-item"><span>House picked</span></div>
      </div>
  `
}

const layoutStatus = (status) => {
  return `
  <div class="user-status" style="display:none">
        <span>You <strong class="${status}">${status}</strong> </span>
        <button class="button" name="playAgain">Play again</button>
      </div>
  `
}

const homeLayout = () => {
  return `
  <img src="images/bg-triangle.svg" class="base" alt="">

      <div class="item-container paper-container" name="paper-container">
        <img src="images/icon-paper.svg" alt="">
      </div>

      <div class="item-container rock-container" name="rock-container">
        <img src="images/icon-rock.svg" alt="">
      </div>

      <div class="item-container scissors-container" name="scissors-container">
      <img src="images/icon-scissors.svg" alt="">
      </div>
  `
}

const popUp = () => {
  return `
    <div class="pop-up" name="pop-up">
      <div class="pop-up-header">
        <span>Rules</span>
        <img name="closePopup" src="images/icon-close.svg" alt="">
      </div>
      <div class="pop-up-body">
        <img src="images/image-rules.svg" alt="">
      </div>
    </div>
  `
}
