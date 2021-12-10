export class Order {
  constructor(id, beers) {
    this.id = id;
    this.beers = beers;
  }

  set indexValue(value) {
    this.index = value;
    this.indexListener();
  }

  indexListener() {
    setTimeout(() => {
      console.log(this);
      // this.node.style.display = "none";
      this.node.animate([{ opacity: 1 }, { opacity: 0 }], {
        iterations: 1,
        duration: 200,
        delay: this.index * 200,
        fill: "forwards",
      });
      this.node.style.visibility = "hidden";
    }, 5000 - (500 + this.index * 200) * 2);
  }

  createNode(container) {
    const orderNode = document.createElement("article");
    orderNode.className = `bg-white flex-1 min-w-[120px] md:w-[25%] md:flex-none xl:flex-1 h-full shadow rounded-xl space-y-2 p-2 flex flex-col justify-between order`;

    const markup = `<h3 class="text-black text-center text-lg">${this.id}</h3>
                    <div class="flex space-x-3 items-center justify-center beers">
                        <img src="images/beer-icon.svg" class="h-20 md:h-24 w-auto" />
                        <p class="text-3xl sm:text-4xl">x${this.beers.length}</p>
                    </div>
                    <div></div>`;

    orderNode.insertAdjacentHTML("afterbegin", markup);
    orderNode.style.visibility = "hidden";
    container.append(orderNode);
    this.node = orderNode;
    return orderNode;
  }

  animateNodeIn(index) {
    this.indexValue = index;
    const firstPosition = document
      .querySelector("p.plus_num")
      .getBoundingClientRect();
    const actualPosition = this.node.getBoundingClientRect();
    const deltaX = (firstPosition.left - actualPosition.left).toFixed(0);

    this.node.animate(
      [{ transform: `translateX(${deltaX}px)` }, { transform: "none" }],
      {
        iterations: 1,
        duration: 500,
        delay: this.index * 200,
        easing: "cubic-bezier(.52,-0.13,.6,1.36)",
      }
    );

    this.node.style.visibility = "visible";
  }
}

// @keyframes animate-feature_kf {
//   0% {
//     transform: translate(var(--deltaX), var(--deltaY));
//     transform-origin: 0 0;
//     -webkit-transform-origin: 0 0;
//   }
//   100% {
//     transform: none;
//     transform-origin: 0 0;
//     -webkit-transform-origin: 0 0;
//   }
// }

// setTimeout(() => {
//   this.node.animate([{ opacity: 1 }, { opacity: 0 }], {
//     iterations: 1,
//     duration: 500,
//     delay: index * 200,
//     easing: "cubic-bezier(.52,-0.13,.6,1.36)",
//   });
//   this.node.style.opacity = 0;
// }, 5000 - (500 + index * 200) * 2);
