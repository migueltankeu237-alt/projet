const listePanier = document.getElementById("liste-panier");
let panier = JSON.parse(localStorage.getItem("panier")) || [];

function afficherPanier() {
  listePanier.innerHTML = "";
  if (panier.length === 0) {
    listePanier.innerHTML = "<p>Votre panier est vide.</p>";
    return;
  }

  let total = 0;
  panier.forEach((produit, index) => {
    total += produit.prix;
    const div = document.createElement("div");
    div.classList.add("produit");
    div.innerHTML = `
      <h3>${produit.nom} - ${produit.prix.toFixed(2)} €</h3>
      <button class="retirer" data-index="${index}">Retirer</button>
    `;
    listePanier.appendChild(div);
  });

  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<h3>Total : ${total.toFixed(2)} €</h3>`;
  totalDiv.style.marginTop = "20px";
  listePanier.appendChild(totalDiv);

  document.querySelectorAll(".retirer").forEach(b => {
    b.addEventListener("click", () => {
      const i = b.getAttribute("data-index");
      panier.splice(i, 1);
      localStorage.setItem("panier", JSON.stringify(panier));
      afficherPanier();
    });
  });
}

document.getElementById("valider").addEventListener("click", () => {
  alert("Commande passée avec succès !");
  panier = [];
  localStorage.setItem("panier", JSON.stringify(panier));
  afficherPanier();
});

afficherPanier();
