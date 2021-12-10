"use strict";

import "./../style.css";
import { displayQueue } from "./queue.js";
import { displayTaps } from "./taps.js";
import { displayBartenders } from "./bartenders.js";
import { displayStorage } from "./storage.js";

window.addEventListener("DOMContentLoaded", start);

function start() {
  loop();
}

async function loop() {
  await fetchData();
  setTimeout(loop, 5000);
}

async function fetchData() {
  console.log("fetchData");
  try {
    loadJSON();
  } catch (err) {
    console.log("Caught error " + err);
  }
}

async function loadJSON() {
  const endpoint = "https://winter-foobar.herokuapp.com/";
  const request = await fetch(endpoint);
  const data = await request.json();
  renderUI(data);
}

// test data
const queueData = [
  {
    id: 300,
    order: ["Sleighride"],
    startTime: 1638971062410,
  },
  // {
  //   id: 301,
  //   order: ["Sleighride", "Sleighride", "Sleighride"],
  //   startTime: 1638971062410,
  // },
  // {
  //   id: 302,
  //   order: ["Sleighride"],
  //   startTime: 1638971062410,
  // },
  // {
  //   id: 303,
  //   order: ["Sleighride", "Sleighride", "Sleighride"],
  //   startTime: 1638971062410,
  // },
  // {
  //   id: 304,
  //   order: ["Sleighride"],
  //   startTime: 1638971062410,
  // },
  // {
  //   id: 305,
  //   order: ["Sleighride", "Sleighride", "Sleighride"],
  //   startTime: 1638971062410,
  // },
  // {
  //   id: 306,
  //   order: ["Sleighride"],
  //   startTime: 1638971062410,
  // },
  // {
  //   id: 307,
  //   order: ["Sleighride", "Sleighride", "Sleighride"],
  //   startTime: 1638971062410,
  // },
  // {
  //   id: 308,
  //   order: ["Sleighride"],
  //   startTime: 1638971062410,
  // },
  // {
  //   id: 309,
  //   order: ["Sleighride", "Sleighride", "Sleighride"],
  //   startTime: 1638971062410,
  // },
];

function renderUI(data) {
  // displayQueue(data.queue);
  displayQueue(queueData);
  displayTaps(data.taps);
  displayBartenders(data.bartenders, data.serving);
  displayStorage(data.storage);
}
