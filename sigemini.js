import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyDluRUQZOW45anRJ1i1BDd88IeP2HLtbqc" // ⚠️ Replace with your real API key
const genAI = new GoogleGenerativeAI(API_KEY);

let productCount = 1;

// Add new product form
window.addProduct = function () {
  productCount++;
  const container = document.getElementById("products-container");

  const productDiv = document.createElement("div");
  productDiv.classList.add("product-form");
  productDiv.setAttribute("data-product-index", productCount);

  productDiv.innerHTML = `
    <h2>Product ${productCount}</h2>
    <label for="product-name-${productCount}">Product Name:</label>
    <input type="text" id="product-name-${productCount}" name="product-name-${productCount}">

    <label for="product-price-${productCount}">Price (in ₹):</label>
    <input type="number" id="product-price-${productCount}" name="product-price-${productCount}" min="1">

    <label for="product-images-${productCount}">Product Images:</label>
    <input type="file" id="product-images-${productCount}" name="product-images-${productCount}" multiple accept="image/*"
      onchange="handleFileSelect(event, ${productCount})">
    <div id="preview-container-${productCount}" class="image-preview"></div>

    <button type="button" onclick="removeProduct(${productCount})">Remove This Product</button>
  `;

  container.appendChild(productDiv);
};

// Remove product form
window.removeProduct = function (index) {
  const productDiv = document.querySelector(`.product-form[data-product-index="${index}"]`);
  if (productDiv) productDiv.remove();
};

// Preview uploaded images
window.handleFileSelect = function (event, index) {
  const files = event.target.files;
  const previewContainer = document.getElementById(`preview-container-${index}`);
  previewContainer.innerHTML = "";

  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.classList.add("preview-img");
      previewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  });
};

// Handle form submit
document.getElementById("shopForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Collect shop details
  const shopDetails = {
    shopName: document.getElementById("shopName").value,
    address: document.getElementById("address").value,
    pincode: document.getElementById("pincode").value,
    city: document.getElementById("city").value,
    country: document.getElementById("country").value,
    primaryCraft: document.getElementById("primaryCraft").value,
    experience: document.getElementById("experience").value,
    story: document.getElementById("yourStory").value,
  };

  // Collect product details
  const products = [];
  document.querySelectorAll(".product-form").forEach((productDiv, idx) => {
    const index = productDiv.getAttribute("data-product-index");
    const name = document.getElementById(`product-name-${index}`).value;
    const price = document.getElementById(`product-price-${index}`).value;
    products.push({ name, price });
  });

  // Create AI prompt
  const prompt = `
  Create an aesthetic HTML layout for an artisan's online shop.

  Shop Name: ${shopDetails.shopName}
  Address: ${shopDetails.address}, ${shopDetails.city}, ${shopDetails.country}, Pincode ${shopDetails.pincode}
  Primary Craft: ${shopDetails.primaryCraft}
  Experience: ${shopDetails.experience} years
  Story: ${shopDetails.story}

  Products:
  ${products.map(p => `- ${p.name} (₹${p.price})`).join("\n")}

  Return only styled HTML (no <html> or <body> tags). 
  Include a shop intro, artisan story, and product cards.
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiHTML = response.text();

    document.getElementById("ai-output").innerHTML = `
      <h2>✨ Your AI-Powered Shopfront ✨</h2>
      <div class="shop-preview">${aiHTML}</div>
    `;
  } catch (err) {
    console.error("Gemini API Error:", err);
    alert("Something went wrong while generating your shopfront.");
  }
});
