import './modules/scroll.js';
import './modules/cards.js';
import { items } from './modules/cards.js';

// Loader

document.addEventListener('DOMContentLoaded', function () {
  const containerLoad = document.querySelector('#container_load');

  console.log(containerLoad);
});

window.addEventListener('load', function () {
  const contenLoad = document.querySelector('.content_load');

  setTimeout(() => {
    contenLoad.style.display = 'none';
  }, 3500);
});

// AggCart

let order = {};

document.addEventListener('DOMContentLoaded', function () {
  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('btn_product')) {
      const userID = event.target.parentElement.dataset.iduser;

      let userCurrent = null;

      for (let i = 0; i < items.length; i++) {
        if (items[i].id === parseInt(userID)) {
          userCurrent = items[i];

          // return;
        }
      }

      if (order[userCurrent.id]) {
        if (order[userCurrent.id].amount === order[userCurrent.id].quantity) {
          alert('ya se agotaron');
          return;
        }

        order[userCurrent.id].amount++;
      } else {
        order[userCurrent.id] = userCurrent;
        order[userCurrent.id].amount = 1;
      }

      // Amount

      const amount = document.querySelector('#amountt');
      amount.textContent = Object.entries(order).length;
    }
  });

  const sidebarShop = document.querySelector('.sidebar_shop');
  const btnShop = document.querySelector('.shop');
  const close = document.querySelector('.btnclose');
  const ContentCart = document.querySelector('.content_cart');

  btnShop.addEventListener('click', function () {
    sidebarShop.classList.add('show_sidebar_shop');
  });

  close.addEventListener('click', function () {
    sidebarShop.classList.remove('show_sidebar_shop');
  });

  // Print Sidebar

  window.addEventListener('click', function RenderCart() {
    if (Object.entries(order).length === 0) {
      ContentCart.innerHTML =
        ' <div class="img_nada"><img src="./img/empty-cart.png" alt=""></div> <h2>Your cart is empty</h2><p>You can add items to your cart by clicking on the "+" button on the product page. </p>';
    } else {
      let cosasCompradas = '';

      Object.values(order).forEach(
        ({ name, price, quantity, amount, image, id }) => {
          const multiplicar = price * amount;

          cosasCompradas += `<div class="list_cart"><div class="content_list_cart"><img src="${image}" alt=""><div class="descrip_cart_list"><h3>${name}</h3><p>Price: $${price}</p><p>Stock: ${quantity}</p><p><b>Subtotal: $${multiplicar}</p></b><div data-id=${id}  class="btn_list_cart"> 
        <button class="btn_list menos">-</button>
        <p class="amount">Amount: ${amount}</p>
        <button class="btn_list sumar">+</button><img  
 class="img_trash trash" src="./img/5358270771574330938.svg" alt=""></div><div></div></div></div><div></div></div>`;
          ContentCart.innerHTML = cosasCompradas;
        }
      );
    }
  });

  const resultCart = document.querySelector('.result_cart');

  window.addEventListener('click', function () {
    const itemsCantidad = Object.values(order).reduce(
      (acumular, { amount }) => acumular + amount,
      0
    );

    const precioTotal = Object.values(order).reduce(
      (acumular, { amount, price }) => acumular + amount * price,
      0
    );

    resultCart.innerHTML = `<div class="result_content"><div>Items: ${itemsCantidad}</div><div class="buy_btn"><p>buy</p><img  
 class="img_buy buy" src="./img/18562337021586788050.svg" alt=""></div><div>Total: ${precioTotal}</div></div>`;
  });

  // btn sumar restar eliminar

  function SumaryRestar() {
    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('sumar')) {
        const id = event.target.parentElement.dataset.id;
        if (order[id].quantity > order[id].amount) {
          order[id].amount++;
        } else {
          alert('no tenemos mas');
        }
      }
    });

    document.addEventListener('click', function (event) {
      if (event.target.classList.contains('menos')) {
        const id = event.target.parentElement.dataset.id;
        if (order[id].quantity > order[id].amount) {
          order[id].amount--;
        } else {
        }
      }
    });
  }
  SumaryRestar();

  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('trash')) {
      const id = event.target.parentElement.dataset.id;
      delete order[id];
    }
  });

  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('buy_btn')) {
      order = {};
    }
  });
});
