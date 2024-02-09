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
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
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
  const product = urlParams.get(param);
  return product;
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

