"use strict";

let hasRun = false;

const RED = "#FF8860";
const GREEN = "#87C13C";

export function displayTaps(tapsData) {
  //console.log(tapsData);
  // if the loop is running the first time, populate the taps section
  if (!hasRun) {
    renderTaps(tapsData);
  }
  // for every tap in the DOM, change tap level
  tapsData.forEach(changeTapLevel);
}

function changeTapLevel(tap) {
  // get the stroke to change (animate)
  const stroke = document.querySelector(
    `#taps article[data-id="${tap.id}"] circle.line_level`
  );

  // calculate "from" and "to" states for keyframes
  const state = calculateStrokeStates(stroke, tap.level);

  // if tap level is below 700, give the stroke red color and call animate function
  const strokeColor = tap.level < 700 ? RED : GREEN;
  animateStroke(stroke, state.initial, state.final, strokeColor);
  stroke.style.color = strokeColor;

  // change textContent in the tap level paragraph
  stroke.setAttribute("stroke-dashoffset", state.final);
  document.querySelector(
    `#taps article[data-id="${tap.id}"] p.level`
  ).textContent = tap.level;
}

function calculateStrokeStates(stroke, tapLevel) {
  const percentage = calculatePercentage(tapLevel);
  const dashArray = (50 * 2 * 3.14).toFixed(0);

  return {
    initial: stroke.getAttribute("stroke-dashoffset"),
    final: (dashArray - (percentage / 100) * dashArray).toFixed(0),
  };
}

function calculatePercentage(level) {
  return ((level / 2500) * 100).toFixed(0);
}

function animateStroke(element, initState, finalState, strokeColor) {
  const keyframes = [
    { strokeDashoffset: initState },
    { strokeDashoffset: finalState },
    { color: strokeColor },
  ];
  element.animate(keyframes, {
    duration: 500,
    iterations: 1,
  });
}

function renderTaps(taps) {
  console.log("renderTaps");
  taps.forEach(renderTap);
  hasRun = true;
}

function renderTap(tap, index) {
  let container;
  if (index <= 3) {
    container = document.querySelector("#tap_row_one");
  } else {
    container = document.querySelector("#tap_row_two");
  }

  const markup = `<article class="pr-4 md:pr-0" data-beer="${
    tap.beer
  }" data-id="${tap.id}">
                    <div class="">
                      <div
                        class="
                          transform
                          -rotate-90
                          relative
                          w-32
                          h-32
                          flex
                          justify-center
                          items-center
                        "
                      >
                        <img
                          src="${buildImageSource(tap.beer)}"
                          class="w-16 h-16 transform rotate-90"
                        />
                        <svg class="absolute top-0 left-0">
                          <circle
                            class="text-gray-200"
                            stroke-width="12"
                            stroke="currentColor"
                            fill="transparent"
                            r="50"
                            cx="64"
                            cy="64"
                          />
                          <circle
                            class="text-brand-green line_level"
                            stroke-width="12"
                            stroke-dasharray="314"
                            stroke-dashoffset="151"
                            stroke-linecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="50"
                            cx="64"
                            cy="64"
                          />
                        </svg>
                      </div>
                    </div>
                    <div class="flex flex-col items-center">
                      <p class="text-sm md:text-base name">${tap.beer}</p>
                      <div class="flex items-center gap-2">
                        <p class="text-sm md:text-base number">#${index + 1}</p>
                        <p class="text-sm md:text-2xl">·</p>
                        <p class="text-sm md:text-base level">${tap.level}</p>
                      </div>
                    </div>
                  </article>`;

  container.insertAdjacentHTML("beforeend", markup);
}

function buildImageSource(beer) {
  const string = beer.trim().toLowerCase().split(" ").join("_");
  return `images/taps/round-${string}.png`;
}
