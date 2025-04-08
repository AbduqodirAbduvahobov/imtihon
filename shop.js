document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.querySelector(".prodactss");
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  function renderui() {
    productContainer.innerHTML = "";
    let totalSum = 0;

    if (cartItems.length > 0) {
      cartItems.forEach((value) => {
        const count = value.quantity || 1;
        totalSum += value.price * count;

        productContainer.innerHTML += `
          <div class="joko flex gap-5 justify-between max-[1900px]:flex-col" data-id="${
            value.id
          }">
            <div class="shop rounded-xl p-3 bg-white flex items-center w-[100%]">
              <img class="w-[200px] h-[200px]" src="${value.img}" alt="${
          value.title
        }" />
              <div class="w-full flex flex-col items-end">
                <div class="flex items-center justify-between w-full">
                  <div class="flex flex-col gap-3">
                    <h2 class="fifty text-[14px] font-medium max-w-[300px]">${
                      value.title
                    }</h2>
                  </div>
                  <div class="pppp flex items-center gap-5">
                    <button class="minus-btn w-6 h-6 border border-vivid-blue rounded-full" data-id="${
                      value.id
                    }">-</button>
                    <span>${count}</span>
                    <button class="plus-btn w-6 h-6 border border-vivid-blue rounded-full" data-id="${
                      value.id
                    }">+</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="totalSum p-5 w-[30%]">
              <div class="kokomn flex items-center justify-between">
                <h3 class="text-xl">В корзине ${cartItems.length} товара</h3>
              </div>
              <div class="flex items-center justify-between pt-3 border-b pb-8">
                <h3 class="text-xl font-medium">Общая сумма:</h3>
                <h1 class="text-black text-lg font-bold">${totalSum.toLocaleString(
                  "ru-RU"
                )} сум</h1>
                <div class="awasomed">
                  <i id="${
                    value.id
                  }" class="fa-trash-can angular fa-regular text-soft-steel delete-btn"></i>
                </div>
              </div>
            </div>
          </div>
        `;
      });
    } else {
      productContainer.innerHTML = `
          <p class="font-bold text-center mt-[20px]">Savatda hech narsa yo'q</p>
        </div>
      `;
    }

    addQuantityEventListeners();
    addDeleteEventListeners();
    subtotol();
  }

  function addQuantityEventListeners() {
    const plusButtons = document.querySelectorAll(".plus-btn");
    const minusButtons = document.querySelectorAll(".minus-btn");

    plusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.id;
        updateQuantity(productId, 1);
      });
    });

    minusButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.dataset.id;
        updateQuantity(productId, -1);
      });
    });
  }

  function updateQuantity(productId, change) {
    cartItems = cartItems.map((item) => {
      if (item.id === productId) {
        const newQuantity = (item.quantity || 1) + change;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderui();
    subtotol(); 
  }

  function addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.id;
        deleteItem(productId);
      });
    });
  }

  function deleteItem(productId) {
    cartItems = cartItems.filter((item) => item.id !== productId);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderui();
    subtotol(); 
  }

  renderui();
});

function subtotol() {
  const totalElement = document.getElementById("total");
  const fullTotalElement = document.getElementById("fulltotol");

  let totalprice = 0;
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems.length > 0) {
    totalprice = cartItems.reduce(
      (acc, value) => acc + value.price * (value.quantity || 1),
      0
    );

    if (totalElement) {
      totalElement.textContent = `${totalprice.toLocaleString("ru-RU")} so'm`;
    }

    if (fullTotalElement) {
      const shipping = 50000;
      const fulltotalprice = totalprice + shipping;
      fullTotalElement.textContent = `${fulltotalprice.toLocaleString("ru-RU")} so'm`;
    }
  } else {
    if (totalElement) {
      totalElement.textContent = `0 so'm`;
    }
    if (fullTotalElement) {
      fullTotalElement.textContent = `50,000 so'm`; 
    }
  }
}