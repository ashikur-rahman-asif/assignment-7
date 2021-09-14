const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url).then((response) => response.json()).then((data) => showProducts(data));
  // .then((data) => console.log(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  // return console.log(products);
  const div = document.createElement("div");
  div
    .classList
    .add("product");

  let html = ``;
  products.map((pd) => {

    html += `<div class="single-product">
    <div>
  <img class="product-image" src=${pd.image}></img>
    </div>
    <h3>${pd.title}</h3>
    <p>Category: ${pd.category}</p>
    <h2>Price: $ ${pd.price}</h2>
    <h4 class="d-flex justify-content-between"><span>Ratings: ${pd.rating.rate}</span> &nbsp;&nbsp;&nbsp; <span>Count: ${pd.rating.count}</span></h4>
    <button onclick="addToCart(${pd.id},${pd.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
    <button id="details-btn" class="btn btn-danger" >Details</button></div>`
  });

  div.innterHTML = html;
  document
    .getElementById("all-products")
    .innerHTML = html

  
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document
    .getElementById("total-Products")
    .innerText = count;
  updateTotal()
};

const getInputValue = (id) => {
  const element = document
    .getElementById(id)
    .innerText;
  const converted = parseInt(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document
    .getElementById(id)
    .innerText = Math.round(total);
};

// set innerText function
const setInnerText = (id, value) => {
  document
    .getElementById(id)
    .innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  document
    .getElementById("total")
    .innerText = grandTotal;
};
