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

    // Displaying beers from the order each bartender is working on
    serving.forEach((serve) => {
      if (serve.id === orderId) {
        let array = [];
        console.log("array", array);
        let counts = [];
        countBeers();

        // Counting how many beers of each type bartender has in the order
        function countBeers() {
          serve.order.forEach((beer) => {
            counts[beer] = (counts[beer] || 0) + 1;
            // Adding unique beers to the array
            if (counts[beer] === 1) {
              array.push(beer);
            }
          });
        }
      }
    });

    document.querySelector("#bartender-parent").appendChild(clone);
  });
}
