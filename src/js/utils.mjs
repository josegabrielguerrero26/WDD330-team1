// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
// export function setLocalStorage(key, data) {
//   localStorage.setItem(key, JSON.stringify(data));
// }
export function setLocalStorage(key, data) {
  // Save data currently in local storage
  let currentData = localStorage.getItem(key);
  console.log(currentData);

  // If there is no data, current data is an empty array
  if (!currentData) {
    currentData = [];
  } else {
    // If there is data, it is parsed into a JavaScript array
    currentData = JSON.parse(currentData);

    // Check if parsed data is an array. If not, current data is an empty array
    if (!Array.isArray(currentData)) {
      currentData = [];
    }
  }

  // New data is appended to the current data
  currentData.push(data);

  // Store the updated array back in local storage
  localStorage.setItem(key, JSON.stringify(currentData));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position = "afterbegin", clear = true) {
  // get template using function...no need to loop this time.
  if (clear) {
      parentElement.innerHTML = "";
  }
  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);
  if(callback) {
      callback(data);
  }
}

function loadTemplate(path) {
  
  return async function () {
    const response = await fetch(path);

    if (response.ok) { // if HTTP-status is 200-299
      // get the response body (the method explained below)
      const html = await response.text();
      return html;
    }    
  };
}

export async function loadHeaderFooter() {
  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");

  const mainHeader = document.querySelector("#main-header");
  const mainFooter = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplateFn, mainHeader);
  renderWithTemplate(footerTemplateFn, mainFooter);
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  alert.addEventListener("click", function (e) {
    if (e.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });
  const main = document.querySelector("main");
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);

  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

export function setKeyValue(key, id, newQuantity) {
  // Get data currently in local storage
  let currentData = localStorage.getItem(key);

  // If there is no data, current data is an empty array
  if (!currentData) {
    console.log("No data found in local storage for key: ", key);
    return;
  }

  // If there is data, it is parsed into a JavaScript array
  currentData = JSON.parse(currentData);

  // Check if parsed data is an array. If not, return error
  if (!Array.isArray(currentData)) {
    console.log("Data in local storage for key ", key, " is not an array");
    return;
  }

  // Find the item with the given id
  let itemToUpdate = currentData.find(item => item.Id === id);

  // If item wasn't found, return an error
  if (!itemToUpdate) {
    console.log("No item found with id: ", id);
    return;
  }

  // Update the item's quantity
  itemToUpdate.Quantity = newQuantity;

  // Store the updated array back in local storage
  localStorage.setItem(key, JSON.stringify(currentData));
}