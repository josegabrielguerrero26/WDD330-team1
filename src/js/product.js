import { loadHeaderFooter } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

// import { findProductById } from "./productData.mjs";

loadHeaderFooter();
const productId = getParam("product");
productDetails(productId);

// function addProductToCart(product) {
//   setLocalStorage("so-cart", product);
// }

// // add to cart butteon event handler
// async function addToCartHandler(e) {
//   const product = await findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click",
//     addToCartHandler
// );

// Add a comment to the product
// Get the product ID from the URL or any other means
const getProductId = "your_product_id";

// Function to display comments on the product detail page
function displayComments(comments) {
  const commentsList = document.getElementById("commentsList");
  commentsList.innerHTML = "";

  comments.forEach((comment) => {
    const li = document.createElement("li");
    li.textContent = comment;
    commentsList.appendChild(li);
  });
}

// Function to handle form submission
function handleCommentSubmission(event) {
  event.preventDefault();

  const commentInput = document.getElementById("commentInput");
  const comment = commentInput.value.trim();

  if (comment !== "") {
    // Save the comment to the database or any other storage
    // Here, we'll just add it to a local array as an example
    const comments = localStorage.getItem(getProductId)
      ? JSON.parse(localStorage.getItem(getProductId))
      : [];

    comments.push(comment);
    localStorage.setItem(getProductId, JSON.stringify(comments));

    // Clear the input field
    commentInput.value = "";

    // Display the updated comments
    displayComments(comments);
  }
}

// Load the product details and comments
window.addEventListener("DOMContentLoaded", () => {
  // Load the product details here...

  // Load the comments for the product
  const comments = localStorage.getItem(getProductId)
    ? JSON.parse(localStorage.getItem(getProductId))
    : [];

  displayComments(comments);

  // Add event listener for form submission
  const commentForm = document.getElementById("commentForm");
  commentForm.addEventListener("submit", handleCommentSubmission);
});
