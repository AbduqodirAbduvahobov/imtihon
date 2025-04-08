document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.querySelector(".top-nav");
  const productContainer = document.querySelector(".prodact");

  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  const API_URL = "https://67f3d839cbef97f40d2c555a.mockapi.io/todo/todo";

  function addToCartFunctionality() {
    const addToCartButtons = document.querySelectorAll(".red");

    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const card = button.closest(".card");
        const cardId = card ? card.dataset.id : null;

        if (card) {
          const cardData = {
            id: cardId,
            img: card.querySelector("img").src,
            title: card.querySelector("h2").textContent,
            price: card.querySelector(".kokos").textContent,
          };

          const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

          const existingItem = cartItems.find((item) => item.id === cardId);
          if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + 1;
          } else {
            cartItems.push({ ...cardData, quantity: 1 });
          }

          localStorage.setItem("cartItems", JSON.stringify(cartItems));

          console.log("Savatga qo'shildi:", cardData);
          alert(`${cardData.title} savatga qo'shildi!`);
        }
      });
    });
  }

  async function getData() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log("API dan kelgan data:", data);
      renderui(data);
      addLikeFunctionality();
      addToCartFunctionality();
    } catch (error) {
      console.error("Ma'lumot yuklashda xatolik:", error);
    }
  }

  function renderui(prodact) {
    if (prodact && prodact.length > 0) {
      productContainer.innerHTML = "";
      prodact.forEach((value) => {
        productContainer.innerHTML += `
          <div class="card" data-id="${value.id}">
            <div class="flex justify-between">
              <span class="foltr absolute top-2 left-2 bg-pink-100 text-pink-600 text-[10px] px-2 py-0.5 rounded-full font-semibold">
                ${value.text}
              </span>
              <button class="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-[15px] like-btn">
                <i class="fa-regular fa-heart"></i>
              </button>
            </div>
            <img src="${value.img}" alt="${
          value.text
        }" class="w-full h-[140px] object-contain mb-4" />
            <div class="polotrn text-[11px] text-gray-400 mb-1">${
              value.category
            }</div>
            <h2 class="font-semibold text-[13px] text-gray-800 mb-1 leading-tight break-words">
              ${value.title}
            </h2>
            <div class="doymnd flex items-center text-xs text-gray-400 mb-1">
              <span class="golder text-yellow-400 mr-1">★</span>
              <p class="pereto"> ${value.rating}</p>
            </div>
            <div class="text-[11px] text-rose-500 mb-3">By NestFood</div>
            <div class="flex items-center justify-between">
              <div class="hello">
                <div class="kokos text-green-600 font-bold text-sm">${
                  value.price
                }</div>
                <s class="krooss">${(value.price + 4).toFixed(2)}</s>
              </div>
              <button class="red bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded flex items-center gap-1">
                <i class="fa-solid fa-cart-shopping text-sm"></i>
                Add
              </button>
            </div>
          </div>
        `;
      });
    } else {
      productContainer.innerHTML = `<img src="./img/basket_no_page.png" alt="Mahsulot yo'q">`;
    }
  }

  function addLikeFunctionality() {
    const likeButtons = document.querySelectorAll(".like-btn");

    likeButtons.forEach((button) => {
      const heartIcon = button.querySelector("i");
      button.addEventListener("click", () => {
        heartIcon.classList.toggle("fa-regular");
        heartIcon.classList.toggle("fa-solid");
        heartIcon.classList.toggle("text-red-500");
      });
    });
  }
  function addLikeFunctionality() {
    const likeButtons = document.querySelectorAll(".like-btn");

    likeButtons.forEach((button) => {
      const heartIcon = button.querySelector("i");
      button.addEventListener("click", () => {
        heartIcon.classList.toggle("fa-regular");
        heartIcon.classList.toggle("fa-solid");
        heartIcon.classList.toggle("text-red-500");

        const card = button.closest(".card");
        if (card) {
          const cardId = card.dataset.id;
          const likedItems =
            JSON.parse(localStorage.getItem("likedItems")) || [];
          const existingLike = likedItems.find((item) => item.id === cardId);

          const cardData = {
            id: cardId,
            img: card.querySelector("img").src,
            title: card.querySelector("h2").textContent,
            price: card.querySelector(".kokos").textContent,
          };

          if (existingLike) {
            const updatedLikedItems = likedItems.filter(
              (item) => item.id !== cardId
            );
            localStorage.setItem(
              "likedItems",
              JSON.stringify(updatedLikedItems)
            );
            console.log("Like dan olib tashlandi:", cardId);
          } else {
            likedItems.push(cardData);
            localStorage.setItem("likedItems", JSON.stringify(likedItems));
            console.log("Like ga qo'shildi:", cardData);
          }
        }
      });
    });
  }
  async function getData() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log("API dan kelgan data:", data);
      renderui(data);
      addLikeFunctionality(); 
      addToCartFunctionality();
    } catch (error) {
      console.error("Ma'lumot yuklashda xatolik:", error);
    }
  }
  getData();
});

const buttons = document.querySelectorAll(`button`);
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const content = button.nextElementSibling;
    const icon = button.querySelector(`svg`);
    content.classList.toggle(`hidden`);
    icon.classList.toggle("rotate-180");
  });
});
