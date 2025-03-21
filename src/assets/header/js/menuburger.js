document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");  // Toggle la classe 'active' pour afficher/masquer le menu
    });
  } else {
    console.error("Les éléments sont introuvables dans le DOM !");
  }
});
