// localStorage.clear();
function updateStorage(storageArray, array) {
  localStorage.setItem(storageArray, JSON.stringify(array));
}

export { updateStorage };
