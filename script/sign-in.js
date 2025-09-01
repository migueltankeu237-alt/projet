document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('signupForm');
    const nomInput = document.getElementById('nom');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password'); // Nouvel ID
    const termsCheckbox = document.getElementById('terms'); // Checkbox des termes
    
    // Nouveaux éléments pour les messages d'erreur spécifiques à chaque champ
    const errorNom = document.getElementById('error-nom');
    const errorEmail = document.getElementById('error-email');
    const errorPassword = document.getElementById('error-password');
    const errorConfirmPassword = document.getElementById('error-confirm-password');
    const errorTerms = document.getElementById('error-terms');

    // Message de statut global (succès/erreur)
    const globalStatusMessage = document.getElementById('global-status-message');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Réinitialise tous les messages d'erreur et de succès
        resetMessages();

        let isValid = true; // Variable pour suivre la validité du formulaire

        const nom = nomInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (nom === '') {
            displayErrorMessage(errorNom, 'Le nom est obligatoire.');
            isValid = false;
        }

        if (email === '') {
            displayErrorMessage(errorEmail, "L'email est obligatoire.");
            isValid = false;
        } else if (!validateEmail(email)) {
            displayErrorMessage(errorEmail, "Veuillez entrer une adresse email valide.");
            isValid = false;
        }

        if (password === '') {
            displayErrorMessage(errorPassword, 'Le mot de passe est obligatoire.');
            isValid = false;
        } else if (password.length < 6) {
            displayErrorMessage(errorPassword, 'Le mot de passe doit contenir au moins 6 caractères.');
            isValid = false;
        }

        if (confirmPassword === '') {
            displayErrorMessage(errorConfirmPassword, 'Veuillez confirmer votre mot de passe.');
            isValid = false;
        } else if (password !== confirmPassword) {
            displayErrorMessage(errorConfirmPassword, 'Les mots de passe ne correspondent pas.');
            isValid = false;
        }

        if (!termsCheckbox.checked) {
            displayErrorMessage(errorTerms, "Vous devez accepter les conditions d'utilisation.");
            isValid = false;
        }

        if (isValid) {
            // Si toutes les validations sont passées
            displayGlobalStatus('Inscription réussie ! Vous pouvez maintenant vous connecter.', 'success');
            form.reset(); // Réinitialise le formulaire
            // Vous pouvez rediriger l'utilisateur ou envoyer les données au serveur ici
            // window.location.href = 'login.html'; 
        } else {
            displayGlobalStatus('Veuillez corriger les erreurs dans le formulaire.', 'error');
        }
    });

    // Fonction pour afficher les messages d'erreur spécifiques à chaque champ
    function displayErrorMessage(element, message) {
        element.textContent = message;
        element.classList.add('show');
    }

    // Fonction pour afficher le message de statut global (succès ou erreur)
    function displayGlobalStatus(message, type) {
        globalStatusMessage.textContent = message;
        globalStatusMessage.className = 'status-message show ' + type; // Ajoute les classes show et type
        
        // Cacher le message de statut après quelques secondes
        setTimeout(() => {
            globalStatusMessage.classList.remove('show');
            globalStatusMessage.textContent = '';
        }, 5000); // Message visible pendant 5 secondes
    }

    // Fonction pour réinitialiser tous les messages
    function resetMessages() {
        const allErrorMessages = document.querySelectorAll('.error-message');
        allErrorMessages.forEach(msg => {
            msg.textContent = '';
            msg.classList.remove('show');
        });
        globalStatusMessage.classList.remove('show', 'success', 'error');
        globalStatusMessage.textContent = '';
    }

    // Fonction de validation du format de l'email
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }
});