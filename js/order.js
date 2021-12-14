export class Order {
  constructor(id, beers) {
    this.id = id;
    this.beers = beers;
  }
  createNode() {
    const orderNode = document.createElement("article");
    orderNode.className = `bg-white flex-1 min-w-[120px] md:w-[25%] md:flex-none xl:flex-1 h-full shadow rounded-xl space-y-2 p-2 flex flex-col justify-between max-w-[200px] order swiper-slide`;

    const markup = `<h3 class="text-black text-center text-lg">${this.id}</h3>
                    <div class="flex space-x-3 items-center justify-center beers">
                        <img src="images/beer-icon.svg" class="h-20 md:h-24 w-auto" />
                        <p class="text-3xl sm:text-4xl">x${this.beers.length}</p>
                    </div>
                    <div></div>`;

    orderNode.insertAdjacentHTML("afterbegin", markup);
    return orderNode;
  }
}
