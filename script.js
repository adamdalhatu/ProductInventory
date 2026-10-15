// Master list of products with sample thumbnails
const initialInventory = [
  { id: 1, name: "Wireless Mouse", category: "Electronics", price: 25, img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&auto=format&fit=crop&q=60" },
  { id: 2, name: "Notebook", category: "Stationery", price: 5, img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&auto=format&fit=crop&q=60" },
  { id: 3, name: "Mechanical Keyboard", category: "Electronics", price: 75, img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&auto=format&fit=crop&q=60" },
  { id: 4, name: "Coffee Mug", category: "Kitchen", price: 12, img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=100&auto=format&fit=crop&q=60" },
  { id: 5, name: "USB-C Hub", category: "Electronics", price: 35, img: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=100&auto=format&fit=crop&q=60" },
  { id: 6, name: "Desk Lamp", category: "Home", price: 28, img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&auto=format&fit=crop&q=60" }
];

let currentProducts = [...initialInventory];

const listElement = document.getElementById("productList");
const summaryElement = document.getElementById("summary");
const addForm = document.getElementById("addForm");

// Render array to DOM with image and delete button
const renderList = (items) => {
  if (items.length === 0) {
    listElement.innerHTML = `<li class="product-card"><p>No items found.</p></li>`;
    return;
  }

  const html = items.map((product) => `
    <li class="product-card">
      <div class="product-meta">
        <img class="product-img" src="${product.img}" alt="${product.name}" />
        <div class="product-info">
          <h3>${product.name}</h3>
          <p>${product.category} &bull; $${product.price}</p>
        </div>
      </div>
      <button class="btn btn-danger" onclick="removeItem(${product.id})">Delete</button>
    </li>
  `).join("");

  listElement.innerHTML = html;
};

// Remove item using .splice()
const removeItem = (id) => {
  const index = currentProducts.findIndex((item) => item.id === id);
  if (index !== -1) {
    currentProducts.splice(index, 1);
    summaryElement.textContent = "";
    renderList(currentProducts);
  }
};

// Add item form submission
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("itemName").value.trim();
  const price = Number(document.getElementById("itemPrice").value);
  const category = document.getElementById("itemCategory").value;

  const newItem = {
    id: Date.now(),
    name,
    price,
    category,
    img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=100&auto=format&fit=crop&q=60"
  };

  currentProducts.push(newItem);
  addForm.reset();
  summaryElement.textContent = "";
  renderList(currentProducts);
});

// Controls
document.getElementById("showAllBtn").addEventListener("click", () => {
  summaryElement.textContent = "";
  renderList(currentProducts);
});

document.getElementById("filterTechBtn").addEventListener("click", () => {
  summaryElement.textContent = "";
  const techItems = currentProducts.filter((item) => item.category === "Electronics");
  renderList(techItems);
});

document.getElementById("calcTotalBtn").addEventListener("click", () => {
  const total = currentProducts.reduce((acc, item) => acc + item.price, 0);
  summaryElement.textContent = `Grand Total: $${total}`;
});

// Initial load
renderList(currentProducts);