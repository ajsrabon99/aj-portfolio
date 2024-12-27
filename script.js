document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.getElementById("menu-icon");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll("#nav-menu a"); 

    // Function to open the navigation menu
    const openMenu = () => {
        navMenu.classList.add("open");
        menuIcon.classList.add("hidden");  
        document.addEventListener("click", handleClickOutside); 
    };

    // Function to close the navigation menu
    const closeMenu = () => {
        navMenu.classList.remove("open");
        menuIcon.classList.remove("hidden"); 
        document.removeEventListener("click", handleClickOutside); 
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


function showOptions() {
    document.getElementById('resumeBtn').style.display = 'none';  
    document.getElementById('resumeOptions').style.display = 'block';  
  }
  
  function hideOptions() {
    document.getElementById('resumeBtn').style.display = 'block';  
    document.getElementById('resumeOptions').style.display = 'none'; 
  }
  