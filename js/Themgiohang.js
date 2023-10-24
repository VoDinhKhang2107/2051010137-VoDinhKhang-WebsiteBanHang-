const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    image:
      "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-15-pro-max-white-thumbtz-650x650.png",
    price: "34,400,000",
  },
  {
    id: 2,
    name: "iPhone 15 Pro 128GB",
    image:
      "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/299033/s16/iphone-15-pro-thumbtz-650x650.png",
    price: "28,500,000",
  },
  {
    id: 3,
    name: "Loa Bluetooth JBL Go 3",
    image: "http://127.0.0.1:3000/Images/bluetooth-jbl-go-3-xanh-hong.webp",
    price: "890,000",
  },
  {
    id: 4,
    name: "MacBook Air 13 inch M1 ",
    image:
      "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/44/231244/s16/mac-air-13-m1-xam-650x650.png",
    price: "29,470,000",
  },
  {
    id: 5,
    name: "Apple Watch SE 44mm",
    image:
      "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/7077/289798/s16/apple-watch-se-2022-44mm-vien-nhom-trang-thumbtz-1-650x650.png",
    price: "6,470,000",
  },
  {
    id: 6,
    name: "AirPods 3 sạc Lightning",
    image:
      "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/54/290053/s16/airpods-3-23-650x650.png",
    price: "4,470,000",
  },
  {
    id: 7,
    name: "iPad 9 WiFi 64GB",
    image:
      "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/522/247517/s16/ipad-gen-9-silver-label-650x650.png",
    price: "7,470,000",
  },
  {
    id: 8,
    name: "iPhone 15 128GB Green",
    image:
      "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100,s_300x300/https://cdn.tgdd.vn/Products/Images/42/281570/s16/iphone-15-green-thumbtz_0-650x650.png",
    price: "22,470,000",
  },
];
let productInCart = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];

function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(productInCart));
}

//Index page
function renderProducts() {
  let data = ``;

  products.map((value) => {
    data += `
 
      <div class='col-md-3 py-3 text-center'>
        <div class='card'>
          <img src='${value.image}' class='card-img-top' alt=''>
          <div class='card-body  '>
            <h2 class='card-title'>${value.name}</h2>
            <p class="text-center">Giá siêu rẻ</p>
            <div class="star text-center pb-4 ">
                <i class="fa-solid fa-star checked"></i>
                <i class="fa-solid fa-star checked"></i>
                <i class="fa-solid fa-star checked"></i>
                <i class="fa-solid fa-star checked"></i>
                <i class="fa-solid fa-star checked"></i>
              </div>
            <h3 class='card-text d-inline float-start'>${value.price}</h3>
            <a href="ChitietSanpham.html" class='btn btn-outline-secondary float-end'><li class="fa-solid fa-eye"></li></a>
            <button onclick='addToCart(${value.id})' class='btn btn-outline-secondary float-end'><li class="fa-solid fa-cart-shopping"></li></button>
          </div>
        </div>
      </div>
    
    `;
  });
  document.getElementById("products").innerHTML = data;
}

function addToCart(id) {
  let checkProduct = productInCart.some((value) => value.id === id);

  if (!checkProduct) {
    let product = products.find((value) => value.id === id);
    productInCart.unshift({
      ...product,
      quantity: 1,
    });
    saveToLocalStorage();
    calculatorTotal();
  } else {
    let product = productInCart.find((value) => value.id === id);
    let getIndex = productInCart.findIndex((value) => value.id === id);
    productInCart[getIndex] = {
      ...product,
      quantity: ++product.quantity,
    };
    saveToLocalStorage();
  }
}

function calculatorTotal() {
  document.getElementById("total").innerHTML = productInCart.length;
}

function indexLoadPage() {
  renderProducts();
  calculatorTotal();
}

//Cart page
function renderProductsToTable() {
  let data = ``;
  productInCart.map((value, index) => {
    data += `
   
      <tr>
        <td>${value.name}</td>
        <td><img width='100' src='${value.image}' alt=''></td>
        <td>${value.price}</td>
        <td>
          <button onclick='plusQuantity(${index})' class='btn btn-secondary'>+</button>
          <span class='mx-2'>${value.quantity}</span>
          <button onclick='minusQuantity(${index}, ${
      value.quantity
    })' class='btn btn-secondary'>-</button>
        </td>
        <td>${(
          value.quantity * value.price.replace(/,/g, "")
        ).toLocaleString()}</td>
        <td><button onclick='deleteProductInCart(${index})' class='btn btn-danger'>X</button></td>
      </tr>
      
    `;
  });
  document.getElementById("products-cart").innerHTML = data;
}

function plusQuantity(index) {
  productInCart[index] = {
    ...productInCart[index],
    quantity: ++productInCart[index].quantity,
  };
  saveToLocalStorage();
  renderProductsToTable();
  totalMoney();
}

function minusQuantity(index, quantity) {
  if (quantity > 1) {
    productInCart[index] = {
      ...productInCart[index],
      quantity: --productInCart[index].quantity,
    };
    saveToLocalStorage();
    renderProductsToTable();
    totalMoney();
  } else {
    alert("Số lượng sàn phẩm phải > 1");
  }
}

function deleteProductInCart(index) {
  productInCart.splice(index, 1);
  saveToLocalStorage();
  renderProductsToTable();
  totalMoney();
}

function totalMoney() {
  if (productInCart != []) {
    let total = 0;
    for (let i = 0; i < productInCart.length; i++) {
      total +=
        productInCart[i].quantity * productInCart[i].price.replace(/,/g, "");
    }
    document.getElementById("total-money").innerHTML = total.toLocaleString();
  }
}

function cartLoadPage() {
  renderProductsToTable();
  totalMoney();
}
