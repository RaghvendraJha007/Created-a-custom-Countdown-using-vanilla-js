const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countDownTitle = '';
let countDownDate = '';
let countDownValue = new Date();
let countodownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date input min with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate countdown and Complete UI
function updateDOM() {
  countodownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    //   hide input
    inputContainer.hidden = true;
    // if the countdown has ended show complete
    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countodownActive);
      completeElInfo.textContent = `${countDownTitle} finished on ${countDownDate}`;
      completeEl.hidden = false;
    } else {
      // Else show the countdown in progress
      countdownElTitle.textContent = `${countDownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      //   show countdown
      countdownEl.hidden = false;
    }
  }, second);
}

// Take values from input
function updateCountdown(e) {
  e.preventDefault();
  countDownTitle = e.srcElement[0].value;
  countDownDate = e.srcElement[1].value;
  savedCountdown = {
    title: countDownTitle,
    date: countDownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));
  if (countDownDate === '') {
    alert('Please enter the date');
  } else {
    //   Get number version of current date and update DOM
    countDownValue = new Date(countDownDate).getTime();
    updateDOM();
  }
}

// Reset the countdown value
function reset() {
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;
  clearInterval(countodownActive);
  countDownTitle = '';
  countDownDate = '';
  localStorage.removeItem('countdown');
}

function restorePreviousCountdown() {
  // get countdown from localstorage if available
  if (localStorage.getItem('countdown')) {
    inputContainer.hidden = true;
    savedCountdown = JSON.parse(localStorage.getItem('countdown'));
    countDownTitle = savedCountdown.title;
    countDownDate = savedCountdown.date;
    countDownValue = new Date(countDownDate).getTime();
    updateDOM();
  }
}

// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

// onload check localstorage
restorePreviousCountdown();
