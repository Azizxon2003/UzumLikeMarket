const items = Array.from({ length: 27 }, (_, index) => ({
  id: `item${index + 1}`,
  name: `Maxsulot ${index + 1}`,
  price: 50000,
  image: `Pencils_hb.jpg`,
}));

let cart = [];
let currentPage = 1;
const itemsPerPage = 9;

// Render items on page
function renderItems() {
  const itemGrid = document.getElementById("itemGrid");
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  itemGrid.innerHTML = "";

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchInput)
  );
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const itemsToDisplay = filteredItems.slice(start, end);

  const columns = [[], [], []];
  itemsToDisplay.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.id = item.id;
    itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <h2>${item.name}</h2>
          <p>50.000 so'm</p>
          <button class="cart-button" onclick="addToCartFromCartIcon('${item.id}')">🛒</button>
        `;
    itemElement.querySelector("img").onclick = () => openModal(item.id);
    columns[index % 3].push(itemElement);
  });

  columns.forEach((column, index) => {
    const columnElement = document.createElement("div");
    columnElement.classList.add("column");
    column.forEach((item) => columnElement.appendChild(item));
    itemGrid.appendChild(columnElement);
  });

  updatePagination(filteredItems.length);
}

// Open modal for a selected item
function openModal(itemId) {
  const item = items.find((i) => i.id === itemId);
  document.getElementById("modalTitle").textContent = item.name;
  document.getElementById("modalPrice").textContent = item.price;
  document.getElementById("modalContent").setAttribute("data-item-id", itemId);
  document.getElementById("modal").style.display = "flex";
}

// Close the modal
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// Add item to cart
function addToCart(itemId) {
  const item = items.find((i) => i.id === itemId);
  const existingItemIndex = cart.findIndex((i) => i.id === item.id);
  if (existingItemIndex === -1) {
    cart.push({ ...item, quantity: 1 });
    document.querySelector(`#${itemId}`).classList.add("added"); // Change border color
  } else {
    cart[existingItemIndex].quantity++;
  }
  showAddedToCartMessage();
  updateCartIcon();
}

// Show "Added to Cart" message
function showAddedToCartMessage() {
  const message = document.getElementById("addedToCartMessage");
  message.style.display = "block";
  setTimeout(() => {
    message.style.opacity = 1;
  }, 10);
  setTimeout(() => {
    message.style.opacity = 0;
  }, 1500);
}

// Add item to cart from modal
function addToCartFromModal() {
  const itemId = document
    .getElementById("modalContent")
    .getAttribute("data-item-id");
  addToCart(itemId);
  closeModal();
}

// Add item to cart from cart icon
function addToCartFromCartIcon(itemId) {
  addToCart(itemId);
}

// Update cart icon with item count
function updateCartIcon() {
  const cartIcon = document.getElementById("cartIcon");
  const cartItemCount = document.getElementById("cartItemCount");
  cartItemCount.textContent = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
}

// Update pagination buttons
function updatePagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");

  prevButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
}

// Pagination controls
function nextPage() {
  currentPage++;
  renderItems();
}

function prevPage() {
  currentPage--;
  renderItems();
}

// Go to cart screen
function goToCart() {
  document.getElementById("cartScreen").style.display = "block";
  document.getElementById("itemListContainer").style.display = "none";
  renderCart();
}

// Render cart items
function renderCart() {
  const Items = document.querySelector(".cart-item-count").textContent;
  const TotalPrice = Number(Items) * 50000;
  const cartItemsList = document.getElementById("cartItemsList");
  cartItemsList.innerHTML = `Umumiy Narx: ${TotalPrice} so'm`;
  cart.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.classList.add("cart-item");
    cartItemElement.innerHTML = `
          <h2>${item.name} (x${item.quantity})</h2>
          <p>${item.price * item.quantity} so'm</p>
          <button onclick="removeFromCart('${item.id}')">Olib tashlash</button>
        `;
    cartItemsList.appendChild(cartItemElement);
  });
}

//Masulotni savatchadan oluvchi func
function removeFromCart(itemId) {
  const itemIndex = cart.findIndex((i) => i.id === itemId);
  if (itemIndex > -1) {
    cart.splice(itemIndex, 1); // remove the item from the cart
    renderCart(); // render the cart to reflect changes
    updateCartIcon(); // update the cart icon border
    document.querySelector(`#${itemId}`).classList.remove("added"); // border color remover
  }
}

// Main menu navigation
function goToMainMenu() {
  document.getElementById("cartScreen").style.display = "none";
  document.getElementById("itemListContainer").style.display = "block";
}

renderItems();
