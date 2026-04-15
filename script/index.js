const library = "https://striveschool-api.herokuapp.com/books";

const getLibrary = function () {
  fetch(library)
    .then((response) => {
      console.log("RESPONSE", response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Libro non trovato nel server");
      }
    })
    .then((data) => {
      console.log("Dati Libro", data);
      const rack = document.getElementById("bookShelf");

      rack.innerHTML = "";

      data.forEach((book) => {
        rack.innerHTML += `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card h-100 shadow-sm pokemon">
                    <img src="${book.img}" class="card-img-top img-fluid card-radius h-75" alt="pic" ; object-fit: cover;">
                    <div class="card-body d-flex flex-column h-25">
                        <h5 class="card-title text-truncate">${book.title}</h5>
                        <p class="card-text">
                            ${book.category}<br>
                            <strong>${book.price}€</strong>
                        </p>
                        <div class= "container d-flex justify-content-between">
                        <button 
                        type="button" 
                        class="btn btn-success bi bi-cart3 mt-3" 
                        onclick="setBookForModal('${book.asin}', '${book.title}', '${book.price}')" 
                        data-bs-toggle="modal" 
                        data-bs-target="#staticBackdrop">
                        </button>
                        <button class="btn btn-danger bi bi-trash w-25 mt-auto" onclick="this.closest('.col-12').remove()">
                        </button>
                        </div>
                    </div>
                </div>
            </div>`;
      });
    })
    .catch((err) => {
      console.log("Errore nella lettura della libreria", err);
    });
};

getLibrary();

let shoppingCart = JSON.parse(localStorage.getItem("myCart")) || [];
let currentBook = null;

const setBookForModal = (asin, title, price) => {
  currentBook = { asin, title, price };
  console.log("Libro selezionato per il modale:", currentBook);
};
const addToCart = () => {
  if (currentBook) {
    shoppingCart.push(currentBook);
    localStorage.setItem("myCart", JSON.stringify(shoppingCart));
    alert(`${currentBook.title} aggiunto al carrello!`);
    console.log("Carrello aggiornato:", shoppingCart);
  }
};
const removeFromCart = () => {
  if (currentBook) {
    // Rimuove tutti i libri con lo stesso ASIN dal carrello
    shoppingCart = shoppingCart.filter(
      (item) => item.asin !== currentBook.asin,
    );
    localStorage.setItem("myCart", JSON.stringify(shoppingCart));
    alert(`Rimosso dal carrello.`);
    console.log("Carrello aggiornato:", shoppingCart);
  }
};
