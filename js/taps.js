"use strict";

let hasRun = false;

export function displayTaps(tapsData) {
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
    `#taps article[data-beer="${tap.beer}"] circle.line_level`
  );

  // calculate "from" and "to" states for keyframes
  const percentage = calculatePercentage(tap.level);
  const dashArray = (60 * 2 * 3.14).toFixed(0);
  const initState = stroke.getAttribute("stroke-dashoffset");
  const finalState = (dashArray - (percentage / 100) * dashArray).toFixed(0);

  // if tap level is below 700, give the stroke red color and call animate function
  if (tap.level < 700) {
    const keyframes = [
      { strokeDashoffset: initState },
      { strokeDashoffset: finalState },
      { color: "#FF8860" },
    ];
    animateStroke(stroke, keyframes);
    stroke.style.color = "#FF8860";
  } else {
    // if the tap level is above 700, give the stroke green color and call animate function
    const keyframes = [
      { strokeDashoffset: initState },
      { strokeDashoffset: finalState },
      { color: "#87C13C" },
    ];
    animateStroke(stroke, keyframes);
    stroke.style.color = "#87C13C";
  }

  // change textContent in the tap level paragraph
  stroke.setAttribute("stroke-dashoffset", finalState);
  document.querySelector(
    `#taps article[data-beer="${tap.beer}"] p.level`
  ).textContent = tap.level;
}

function calculatePercentage(level) {
  return ((level / 2500) * 100).toFixed(0);
}

function animateStroke(element, keyframes) {
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

  const markup = `<article class="pr-4 md:pr-0" data-beer="${tap.beer}">
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
                            stroke-dasharray="377"
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
