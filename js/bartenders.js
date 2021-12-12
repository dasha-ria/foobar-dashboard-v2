"use strict";

export function displayBartenders(bartenders, serving) {
  console.log("bartenders:");
  console.log(bartenders);
  console.log("serving:");
  console.log(serving);

  // Displaying data for each bartender using template element
  bartenders.forEach((bartender) => {
    const clone = document.querySelector("#bartender-template").content.cloneNode(true);

    clone.querySelector(".bartender>img").src = `images/${bartender.name}.png`;
    clone.querySelector(".bartender>img").alt = `Picture of ${bartender.name}`;

    clone.querySelector(".bartender p:nth-of-type(1)").textContent = bartender.name;

    clone.querySelector(".bartender-status img").src = `images/${bartender.statusDetail}.svg`;

    clone.querySelector(".bartender-status p").textContent = bartender.statusDetail;

    const orderId = bartender.servingCustomer;
    clone.querySelector(".bartender-order-id").textContent = orderId;

    document.querySelector("#bartender-parent").appendChild(clone);
  });
}
