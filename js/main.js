"use strict";

import "./../style.css";
import { displayQueue } from "./queue.js";
import { displayTaps } from "./taps.js";
import { displayBartenders } from "./bartenders.js";
import { displayStorage } from "./storage.js";

window.addEventListener("DOMContentLoaded", start);

function start() {
  //  loop();
  fetchData();
}

async function loop() {
  await fetchData();
  setTimeout(loop, 5000);
}

async function fetchData() {
  // console.log("fetchData");
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

function renderUI(data) {
  displayQueue(data.queue);
  displayTaps(data.taps);
  displayBartenders(data.bartenders, data.serving);
  displayStorage(data.storage);
}
