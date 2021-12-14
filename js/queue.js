"use strict";

import { Order } from "./order.js";
import Swiper from "swiper";
import "swiper/css";

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

export function displayQueue(queueData) {
  console.log("queue data");
  console.log(queueData);

  // sort orders from earliest to latest and clear container element
  const sorted = queueData.sort((a, b) => a.startTime - b.startTime);
  const ordersWrapper = document.querySelector("#queue .orders");
  ordersWrapper.innerHTML = "";

  if (sorted.length > 0) {
    // if there are orders in the queue
    let mql = window.matchMedia("(max-width: 768px)");
    if (mql.matches) {
      // if the viewport is 768 pixels wide or less, display all orders
      displayOrders(sorted, ordersWrapper);
    } else {
      // if the viewport is more than than 768 pixels wide, display only three earliest orders
      const queueToDisplay = sorted.slice(0, 3);
      displayOrders(queueToDisplay, ordersWrapper);
      // display  how many orders there are that are not shown
      const hiddenOrders = sorted.length - queueToDisplay.length;
      if (hiddenOrders > 0) {
        displayNumberOfHiddenOrders(hiddenOrders);
      } else {
        hideNumberOfHiddenOrders();
      }
    }
  } else {
    // if there are no orders in queue
    displayNoQueueMessage(ordersWrapper);
  }
}

function displayOrders(orders, container) {
  orders.forEach((item) => {
    const order = new Order(item.id, item.order);
    const orderNode = order.createNode();
    container.append(orderNode);
  });
}

function displayNumberOfHiddenOrders(number) {
  document.querySelector("#queue .plus_num").style.display = "block";
  document.querySelector("#queue .plus_num").textContent = `+${number}`;
}

function hideNumberOfHiddenOrders() {
  document.querySelector("#queue .plus_num").style.display = "none";
}

function displayNoQueueMessage(container) {
  const noQueueElement = document.createElement("p");
  noQueueElement.textContent = "No orders in the queue";
  noQueueElement.className = "flex flex-col justify-center mt-2 xl:mt-0";
  container.append(noQueueElement);
}
