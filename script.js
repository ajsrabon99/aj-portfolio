document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll("#nav-menu a"); // Select all links in the nav menu

    // Function to open the navigation menu
    const openMenu = () => {
        navMenu.classList.add("open");
        menuIcon.classList.add("hidden"); // Hide the menu icon
        document.addEventListener("click", handleClickOutside); // Add listener for outside clicks
    };

    // Function to close the navigation menu
    const closeMenu = () => {
        navMenu.classList.remove("open");
        menuIcon.classList.remove("hidden"); // Show the menu icon
        document.removeEventListener("click", handleClickOutside); // Remove listener for outside clicks
    };

    // Close the navigation menu when clicking outside of it
    const handleClickOutside = (event) => {
        if (!navMenu.contains(event.target) && !menuIcon.contains(event.target)) {
            closeMenu();
        }
    };

    // Open the navigation menu when menu icon is clicked
    menuIcon.addEventListener("click", openMenu);

    // Close the navigation menu when any link in the nav menu is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });
});


const scriptURL = 'https://script.google.com/macros/s/AKfycbwL0fuYqIgN9tXdMusGpox3NjIrjNOk8QltDhV7FGDYMp3r7poV9h6oEKIQdnjXZ1wM/exec'


const form = document.forms['contact-form']


form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})
