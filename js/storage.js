"use strict";

export function displayStorage(storageData) {
  console.log("storage data");
  storageData.sort(sortStorage);
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
