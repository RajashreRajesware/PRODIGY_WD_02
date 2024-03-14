let timer;
let isRunning = false;
let laps = [];
let lapCounter = 1;

function startStop() {
  if (!isRunning) {
    timer = setInterval(updateTime, 10);
    document.getElementById("startStop").textContent = "Stop";
    isRunning = true;
  } else {
    clearInterval(timer);
    document.getElementById("startStop").textContent = "Start";
    isRunning = false;
  }
}

function lapReset() {
  if (isRunning) {
    let time = document.getElementById("display").textContent;
    laps.push({ lap: lapCounter++, time });
    updateLaps();
  } else {
    document.getElementById("display").textContent = "00:00:00";
    laps = [];
    lapCounter = 1;
    updateLaps();
  }
}

function updateTime() {
  let display = document.getElementById("display");
  let time = display.textContent.split(":");
  let milliseconds = parseInt(time[2], 10);
  let seconds = parseInt(time[1], 10);
  let minutes = parseInt(time[0], 10);

  milliseconds++;

  if (milliseconds === 100) {
    milliseconds = 0;
    seconds++;
  }

  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }

  display.textContent =
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds + ":" +
    (milliseconds < 10 ? "0" : "") + milliseconds;
}

function updateLaps() {
  let lapsContainer = document.getElementById("laps");
  lapsContainer.innerHTML = "";
  laps.forEach(lap => {
    let li = document.createElement("li");
    li.textContent = `Lap ${lap.lap}: ${lap.time}`;
    lapsContainer.appendChild(li);
  });
}
