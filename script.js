const compteur = document.getElementById("compteur");
const boutons = document.querySelectorAll(".ajouter");
const logoutBtn = document.getElementById("logoutBtn");

let panier = JSON.parse(localStorage.getItem("panier")) || [];

function updateCompteur() {
  if (compteur) compteur.textContent = panier.length;
}

// Gestion des ajouts au panier
if (boutons) {
  boutons.forEach(bouton => {
    bouton.addEventListener("click", () => {
      const estConnecte = localStorage.getItem("connecte") === "true";

      if (!estConnecte) {
        window.location.href = "login.html";
        return;
      }

      const nom = bouton.getAttribute("data-produit");
      const prix = parseFloat(bouton.getAttribute("data-prix"));

      if (!panier.some(p => p.nom === nom)) {
        panier.push({ nom, prix });
        localStorage.setItem("panier", JSON.stringify(panier));
        updateCompteur();
      } else {
        alert(nom + " est déjà dans le panier.");
      }
    });
  });
}

// Déconnexion
if (logoutBtn) {
  const estConnecte = localStorage.getItem("connecte") === "true";
  if (estConnecte) {
    logoutBtn.style.display = "inline-block";
  }

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("connecte");
    alert("Vous êtes déconnecté.");
    window.location.href = "index.html";
  });
}

updateCompteur();
