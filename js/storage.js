"use strict";

export function displayStorage(storageData) {
  console.log("storage data");
  storageData.sort(sortStorage);
  const storageParent = document.querySelector(".storage-parent");
  while (storageParent.firstChild) {
    storageParent.removeChild(storageParent.firstChild);
  }
  storageData.slice(0, 7).forEach(showColumn);
  console.log(storageData);
}

function sortStorage(a, b) {
  if (a.amount < b.amount) {
    return -1;
  }

  if (b.amount > a.amount) {
    return 1;
  }
  return 0;
}

function showColumn(column) {
  console.log(column);
  const template = document.querySelector("#storage-template").content;
  const copy = template.cloneNode(true);

  const storageName = copy.querySelector(".storage-name");
  const storageAmount = copy.querySelector(".storage-amount");
  const storageColumn = copy.querySelector(".storage-column");

  storageName.textContent = column.name;
  storageAmount.textContent = column.amount;

  storageColumn.style.height = `${column.amount * 20}px`;

  if (column.amount < 3) {
    storageColumn.classList.add("bg-brand-red");
    storageName.classList.add("text-brand-darkred");
    storageAmount.classList.add("text-brand-darkred");
  } else {
    storageColumn.classList.add("bg-brand-green");
    storageName.classList.add("text-black");
    storageAmount.classList.add("text-black");
  }

  document.querySelector(".storage-parent").appendChild(copy);
}
