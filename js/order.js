export class Order {
  constructor(id, beers, container) {
    this.id = id;
    this.beers = beers;
    this.container = container;
  }

  createNode() {
    const orderNode = document.createElement("article");
    orderNode.className = `bg-white flex-1 min-w-[120px] md:w-[25%] md:flex-none xl:flex-1 h-full shadow rounded-xl space-y-2 p-2 flex flex-col justify-between max-w-[200px] order`;

    const markup = `<h3 class="text-black text-center text-lg">${this.id}</h3>
                    <div class="flex space-x-3 items-center justify-center beers">
                        <img src="images/beer-icon.svg" class="h-20 md:h-24 w-auto" />
                        <p class="text-3xl sm:text-4xl">x${this.beers.length}</p>
                    </div>
                    <div></div>`;

    orderNode.insertAdjacentHTML("afterbegin", markup);
    this.container.append(orderNode);
    this.node = orderNode;
    return orderNode;
  }
}

export class DesktopOrder extends Order {
  constructor(id, beers, container) {
    super(id, beers, container), (this.index = 0);
  }

  set indexValue(value) {
    this.index = value;
    this.indexListener();
  }

  indexListener() {
    setTimeout(() => {
      this.node.animate(
        [
          { transform: "none", opacity: 1 },
          { transform: `translateX(-700px)`, opacity: 0 },
        ],
        {
          iterations: 1,
          duration: 500,
          delay: this.index * 100,
          easing: "cubic-bezier(.73,-0.34,.44,1.15)",
          fill: "forwards",
        }
      );
    }, 5000 - (600 - this.index * 100) * 2);
  }

  animateNodeIn(index) {
    this.node.setAttribute(
      "style",
      "transform: translateX(500px); z-index: -5; opacity: 0;"
    );
    this.indexValue = index;
    this.node.animate(
      [
        { transform: `translateX(500px)`, opacity: 0 },
        { transform: "none", opacity: 1 },
      ],

      {
        iterations: 1,
        duration: 500,
        delay: this.index * 200,
        easing: "cubic-bezier(.52,-0.13,.6,1.36)",
        fill: "forwards",
      }
    );
  }
}
