// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Services Dropdown Toggle for Desktop
const servicesDropdownButton = document.getElementById('services-dropdown-button');
const servicesDropdownMenu = document.getElementById('services-dropdown-menu');
const servicesDropdownIcon = document.getElementById('services-dropdown-icon');

// Check if the button exists before adding listener
if (servicesDropdownButton) {
    servicesDropdownButton.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the link from navigating anywhere
        servicesDropdownMenu.classList.toggle('hidden');
        servicesDropdownIcon.classList.toggle('rotate-180');
    });

    // Hide dropdown if clicking outside of it
    document.addEventListener('click', (event) => {
        if (!servicesDropdownButton.contains(event.target) && !servicesDropdownMenu.contains(event.target)) {
            servicesDropdownMenu.classList.add('hidden');
            servicesDropdownIcon.classList.remove('rotate-180');
        }
    });
}