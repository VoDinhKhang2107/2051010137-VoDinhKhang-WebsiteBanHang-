// validation form login
const inputUsername = document.querySelector(".input-login-username");
const inputPassword = document.querySelector(".input-login-password");
const btnLogin = document.querySelector(".login__signInButton");

// validation form login

btnLogin.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputUsername.value === "" || inputPassword.value === "") {
  } else {
    const user = JSON.parse(localStorage.getItem(inputUsername.value));
    if (
      user.username === inputUsername.value &&
      user.password === inputPassword.value
    ) {
      alert("Đăng Nhập Thành Công");
      window.location.href = "user.html";
    } else {
      alert("Đăng Nhập Thất Bại");
    }
  }
});

function showNoLogin(className, content) {
  document.getElementById("noLogin").classList.add(className);
  document.getElementById("NdLoi").innerText = content;
  setTimeout(() => {
    document.getElementById("noLogin").classList.remove(className);
    document.getElementById("NdLoi").innerText = "";
  }, 3000);
}
function login() {
  const user = [
    { account: "admin", password: "admin" },
    { account: "admin123", password: "admin123" },
  ];
  const account = document.getElementById("account").value;
  const password = document.getElementById("password").value;
  if (account && password) {
    const checkLogin = user.some(
      (value) => value.account === account && value.password === password
    );

    if (checkLogin) {
      window.location.replace("Admin.html");
      localStorage.setItem("LuuTaiKhoan", account);
    } else {
      showNoLogin("alert-danger", "Tên tài khoản hoặc mật khẩu sai !");
    }
  } else {
    showNoLogin("alert-danger", "Vui lòng nhập tên tài khoản và mật khẩu !");
  }
}

function CheckLogin() {
  const isLogin =
    localStorage.getItem("LuuTaiKhoan") && localStorage.getItem("LuuTaiKhoan");
  if (!isLogin) {
    window.location.replace = "dangnhap.html";
  } else {
    window.location.replace = "Admin.html";
  }
}
function renderAccount() {
  const isLogin =
    localStorage.getItem("LuuTaiKhoan") && localStorage.getItem("LuuTaiKhoan");
  if (isLogin) {
    document.getElementById("Tentaikhoan").innerText = isLogin;
  } else {
    window.location.replace("dangnhap.html");
  }
}

function DangXuat() {
  localStorage.removeItem("LuuTaiKhoan");
  window.location.replace("dangnhap.html");
}
function showImage() {
  if (document.getElementById("image").value) {
    const image = document.getElementById("image").files.item(0).name;
    document.getElementById(
      "showImage"
    ).innerHTML = `<img src='Images/${image}' alt='' width='200'/>`;
  } else {
    document.getElementById("showImage").innerHTML = "";
  }
}
function hienthisanpham() {
  document.getElementById("Tensanpham").innerText =
    document.getElementById("name").value;
}

function clearForm() {
  document.getElementById("Tensanpham").value = "";
  document.getElementById("showImage").value = "";
  document.getElementById("danhmuc").value = "";
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
}
async function Themsanpham() {
  const image = document.getElementById("image").value
    ? document.getElementById("image").files.item(0).name
    : "";
  const danhmuc = document.getElementById("danhmuc").value;
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  if (image && danhmuc && name && price) {
    try {
      await axios.post("http://localhost:3000/products", {
        image: image,
        danhmuc: danhmuc,
        name: name,
        price: price,
      });
      bootstrap.Modal.getInstance(
        document.getElementById("staticBackdrop")
      ).hide();
      showNoLogin("alert-success", "Tạo sản phẩm mới.");
      clearForm();
    } catch (e) {
      showNoLogin("alert-danger", e.message);
    }
  } else {
    showNoLogin("alert-danger", "Vui lòng điền đầy đủ thông tin !");
  }
}

//tim kiếm
function renderProduct() {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      let product = "";
      data.map((value) => (product += `<div>${value.id}. ${value.name}</div>`));
      document.getElementById("products").innerHTML = product;
    })

    .catch((error) => console.log(error));
}

function searchProduct() {
  let valueSearch = document.getElementById("search-item").value;
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      let productSearch = data.filter((value) => {
        return value.title.toLowerCase().includes(valueSearch.toLowerCase());
      });
      document.getElementById("products").innerHTML = "";
      let product = "";
      productSearch.map(
        (value) => (product += `<div>${value.id}. ${value.name}</div>`)
      );
      document.getElementById("products").innerHTML = product;
    })
    .catch((error) => console.log(error));
}
