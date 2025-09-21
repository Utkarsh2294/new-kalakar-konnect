let productCount = 1;
let productFiles = { 1: [] };

function addProduct() {
  productCount++;
  const container = document.getElementById('products-container');

  const productDiv = document.createElement('div');
  productDiv.className = 'product-form';
  productDiv.setAttribute('data-product-index', productCount);

  productDiv.innerHTML = `
    <h2>Product ${productCount}</h2>
    <label for="product-name-${productCount}">Product Name:</label>
    <input type="text" id="product-name-${productCount}" name="product-name-${productCount}">
    <label for="product-price-${productCount}">Price (in ₹):</label>
    <input type="number" id="product-price-${productCount}" name="product-price-${productCount}" min="1">
    <label for="product-images-${productCount}">Product Images:</label>
    <input type="file" id="product-images-${productCount}" name="product-images-${productCount}" multiple accept="image/*"
      onchange="handleFileSelect(event, ${productCount})">
    <div id="preview-container-${productCount}"></div>
    <button type="button" onclick="removeProduct(${productCount})">Remove This Product</button>
  `;

  container.appendChild(productDiv);
  productFiles[productCount] = [];
}

function removeProduct(index) {
  const productForm = document.querySelector(`[data-product-index="${index}"]`);
  if (productForm && productCount > 1) {
    productForm.remove();
    delete productFiles[index];
  } else if (productCount === 1) {
    alert('You must have at least one product.');
  }
}

function handleFileSelect(event, productIndex) {
  const files = Array.from(event.target.files);

  if (files.length > 4) {
    alert('You can upload maximum 4 images per product');
    event.target.value = '';
    return;
  }

  productFiles[productIndex] = files;
  displayPreviews(files, productIndex);
}

function displayPreviews(files, productIndex) {
  const previewContainer = document.getElementById(`preview-container-${productIndex}`);
  previewContainer.innerHTML = '';

  files.forEach((file, index) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageDiv = document.createElement('div');
        imageDiv.innerHTML = `
          <p>Image ${index + 1}: ${file.name}</p>
          <img src="${e.target.result}" alt="Preview ${index + 1}" width="150" height="150">
          <button type="button" onclick="removeImage(${productIndex}, ${index})">Remove Image</button>
          <br><br>
        `;
        previewContainer.appendChild(imageDiv);
      };
      reader.readAsDataURL(file);
    }
  });
}

function removeImage(productIndex, imageIndex) {
  if (productFiles[productIndex]) {
    productFiles[productIndex].splice(imageIndex, 1);
    displayPreviews(productFiles[productIndex], productIndex);

    const fileInput = document.getElementById(`product-images-${productIndex}`);
    const dt = new DataTransfer();
    productFiles[productIndex].forEach(file => dt.items.add(file));
    fileInput.files = dt.files;
  }
}
