import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage, alertMessage, setKeyValue } from "./utils.mjs";
import { removeFromCart } from "./shoppingCart.mjs";

let product = {};

export default async function productDetails(productId) {
  // get the details for the current product. findProductById will return a promise! use await or .then() to process it
  product = await findProductById(productId);
  // once we have the product details we can render out the HTML
  renderProductDetails();
  // once the HTML is rendered we can add a listener to Add to Cart button
  document.getElementById("addToCart").addEventListener("click", addToCart);
}

function addToCart() {
  let cartContents = getLocalStorage("so-cart");
  // check to see if there was anything there
  if (!cartContents) {
    cartContents = [];
  }

  // get the index of current item using the productId
  let productIndex = cartContents.findIndex(prod => prod.Id === product.Id);

  // Check to see if item is not already in the cart
  if (productIndex !== -1) {
    let productQty = cartContents[0].Quantity;

    // Remove current item from cart to be replaced with updated item
    removeFromCart("so-cart", product.Id);
    productQty += 1;
    // If items are in the bag increment Quantity by one
    cartContents[productIndex].Quantity = productQty;
  } else {
    // If no items exist in the bag, add one to Quantitiy
    // Push the product to the cartContents
    cartContents.push(product);
  }

  // Add product to cart and reset quantity
  setLocalStorage("so-cart", product);
  setKeyValue("so-cart", product.Id, cartContents[productIndex].Quantity);
  alertMessage(`${product.NameWithoutBrand} added to cart!`);
}

function renderProductDetails() {
  document.querySelector("#productName").innerText = product.Brand.Name;
  document.querySelector("#productNameWithoutBrand").innerText =
    product.NameWithoutBrand;
  document.querySelector("#productImage").src = product.Images.PrimaryLarge;
  document.querySelector("#productImage").srcset = 
    `${product.Image160} 320w,
     ${product.Image240} 800w,
     ${product.Image} 1000w`;
  document.querySelector("#productImage").alt = product.Name;
  document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
  document.querySelector("#productColorName").innerText =
    product.Colors[0].ColorName;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML =
    product.DescriptionHtmlSimple;
  document.querySelector("#addToCart").dataset.id = product.Id;
}