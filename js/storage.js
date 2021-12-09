"use strict";

export function displayStorage(storageData) {
  console.log("storage data");
  storageData.sort(sortStorage);
  const storageParent = document.querySelector(".storage-parent");
  while (storageParent.firstChild) {
    storageParent.removeChild(storageParent.firstChild);
  }
  storageData.forEach(showColumn);
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

  copy.querySelector(".storage-name").textContent = column.name;
  copy.querySelector(".storage-amount").textContent = column.amount;
  document.querySelector(".storage-parent").appendChild(copy);
}
