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

    // Setting color for bartender's status
    if (bartender.statusDetail === "waiting") {
      clone.querySelector(".bartender-status p").className = "text-sm text-brand-darkgreen";
    } else {
      clone.querySelector(".bartender-status p").className = "text-sm text-brand-darkred";
    }

    clone.querySelector(".bartender-status p").textContent = bartender.statusDetail;

    const orderId = bartender.servingCustomer;
    clone.querySelector(".bartender-order-id").textContent = orderId;

    // Displaying beers from the order each bartender is working on
    serving.forEach((serve) => {
      if (serve.id === orderId) {
        let array = [];
        console.log("array:", array);
        let counts = [];
        console.log("counts:", counts);
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
          showBeers();
        }

        // Showing all beers from the array
        function showBeers() {
          array.forEach((elem) => {
            const beer = document.createElement("p");
            beer.className = "ml-3 text-sm m-1 hidden xl:block";
            let text = document.createTextNode(elem);
            // If there are more than one beer of the same type in the order, adding amount in front of the beer name
            if (counts[elem] > 1) {
              text = document.createTextNode(`${counts[elem]}x ${elem}`);
            }
            beer.appendChild(text);
            clone.querySelector(".bartender-order").append(beer);
          });
        }
      }
    });

    document.querySelector("#bartender-parent").appendChild(clone);
  });
}
