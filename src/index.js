let productName = document.getElementById("product");
let price = document.getElementById("price");
let taxes = document.getElementById("texes");
let discount = document.getElementById("discount");
let amount = document.getElementById("amount");
let category = document.getElementById("category");
let total = document.getElementById("total");
let mood = "create";
let index;
let search = "title";

function totalPrice() {
  if (price.value != "") {
    total.innerHTML = `Total: ${+price.value + +taxes.value - +discount.value}`;
    total.style.backgroundColor = "#6A5ACD";
  } else {
    total.innerHTML = "Total: ";
    total.style.backgroundColor = "#fe0000";
  }
  if (+discount.value > +price.value) {
    alert("Discount cannot be more than price");
    discount.value = 0;
    total.innerHTML = `Total: ${+price.value + +taxes.value}`;
  }
}

let products = localStorage.product ? JSON.parse(localStorage.product) : [];

function addProduct() {
  let newProduct = {
    productName: productName.value,
    price: price.value,
    taxes: taxes.value,
    discount: discount.value,
    total: `${+price.value + +taxes.value - +discount.value}`,
    category: category.value,
    amount: amount.value,
  };
  
    if (mood === "create") {
      for (let i = 0; i < newProduct.amount; i++) {
        products.push(newProduct);
      }
    } else {
      products[index] = newProduct;
      mood = "create";
      document.getElementById("add-btn").innerHTML = "Add";
      document.getElementById("count").style.display = "inline";
    }
  
  

  localStorage.setItem("product", JSON.stringify(products));
  clearData();
  showData();
}

function clearData() {
  productName.value = "";
  price.value = "";
  taxes.value = "";
  discount.value = "";
  total.innerHTML = "Total:";
  category.value = "";
  amount.value = "";
}

function showData() {
  let table = "";
  products.forEach((product, i) => {
    table += `
      <tr>
        <td class="sub-content">${i}</td>
        <td class="sub-content">${product.productName}</td>
        <td class="sub-content">${product.price}</td>
        <td class="sub-content">${product.taxes}</td>
        <td class="sub-content">${product.discount}</td>
        <td class="sub-content">${product.total}</td>
        <td class="sub-content">${product.category}</td>
        <td class="sub-content">
          <button onclick="updateData(${i})" class="bg-gray-800 px-8 py-2 rounded-full">Update</button>
        </td>
        <td class="sub-content">
          <button onclick="deleteData(${i})" class="bg-gray-800 px-8 py-2 rounded-full">Delete</button>
        </td>
      </tr>`;
  });

  document.getElementById("tbody").innerHTML = table;
  let deleteAll = document.getElementById("delete-all");
  deleteAll.innerHTML =
    products.length > 0
      ? `<button class="delete-all">Delete All(${products.length})</button>`
      : "";
}

showData();

function deleteData(i) {
  products.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(products));
  showData();
}

function updateData(i) {
  productName.value = products[i].productName;
  price.value = products[i].price;
  taxes.value = products[i].taxes;
  discount.value = products[i].discount;
  total.innerHTML = `Total: ${products[i].total}`;
  category.value = products[i].category;
  document.getElementById("count").style.display = "none";
  document.getElementById("add-btn").innerHTML = "Edit";
  mood = "edit";
  index = i;
}

function deleteAllData() {
  products = [];
  localStorage.clear();
  document.getElementById("delete-all").innerHTML = "";
  showData();
}

function searchProduct(id) {
  search = id === "searchByTitle" ? "title" : "category";
  let searchInput = document.getElementById("search");
  searchInput.placeholder =
    search === "title" ? "Search by product name" : "Search by category";
  searchInput.focus();
  searchInput.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  products.forEach((product, i) => {
    if (
      search === "title" &&
      product.productName.toLowerCase().includes(value.toLowerCase())
    ) {
      table += generateTableRow(i, product);
    } else if (
      search === "category" &&
      product.category.toLowerCase().includes(value.toLowerCase())
    ) {
      table += generateTableRow(i, product);
    }
  });
  document.getElementById("tbody").innerHTML = table;
}

function generateTableRow(i, product) {
  return `
    <tr>
      <td class="sub-content">${i}</td>
      <td class="sub-content">${product.productName}</td>
      <td class="sub-content">${product.price}</td>
      <td class="sub-content">${product.taxes}</td>
      <td class="sub-content">${product.discount}</td>
      <td class="sub-content">${product.total}</td>
      <td class="sub-content">${product.category}</td>
      <td class="sub-content">
        <button onclick="updateData(${i})" class="bg-gray-800 px-8 py-2 rounded-full">Update</button>
      </td>
      <td class="sub-content">
        <button onclick="deleteData(${i})" class="bg-gray-800 px-8 py-2 rounded-full">Delete</button>
      </td>
    </tr>`;
}
