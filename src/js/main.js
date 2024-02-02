// import productList from "./productList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// productList(".product-list", "tents");


// Function to open the modal and display product details
function openModal(product) {
    const modal = document.getElementById("productModal");
    const closeModal = document.getElementsByClassName("close")[0];
  
    // Populate modal with product details
    document.getElementById("modalProductName").textContent = product.name;
    document.getElementById("modalProductNameWithoutBrand").textContent = product.nameWithoutBrand;
    document.getElementById("modalProductImage").src = product.image;
    document.getElementById("modalProductFinalPrice").textContent = product.finalPrice;
    document.getElementById("modalProductColorName").textContent = product.colorName;
    document.getElementById("modalProductDescriptionHtmlSimple").textContent = product.descriptionHtmlSimple;
  
    // Show the modal
    modal.style.display = "block";
  
    // Close the modal when the 'x' button is clicked
    closeModal.onclick = function() {
      modal.style.display = "none";
    };
  
    // Close the modal when clicking outside the modal content
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
  }
  
  // Function to handle the click event of the quick view button
  function handleQuickViewClick(event) {
    const productId = event.target.getAttribute("data-id");
    // Fetch the product details using the productId
    fetch(`/api/products/${productId}`)
    .then(response => response.json())
    .catch(error => {
      console.error("Error fetching product details:", error);
    });
  
    openModal(product);
  }
  
  // Load the product listing and attach event listeners
  window.addEventListener("DOMContentLoaded", () => {
    const quickViewButtons = document.getElementsByClassName("quick-view-button");
  
    // Attach click event listener to each quick view button
    Array.from(quickViewButtons).forEach(button => {
      button.addEventListener("click", handleQuickViewClick);
    });
  
    // Load the product listing here...
  }); }