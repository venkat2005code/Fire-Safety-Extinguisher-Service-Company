document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // 2. Dropdown Toggle for Mobile / Tablet
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        link.addEventListener('click', (e) => {
            const isMobileNav = window.innerWidth <= 1100 || (mobileMenuToggle && window.getComputedStyle(mobileMenuToggle).display !== 'none');
            if (isMobileNav) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // 3. Theme Toggle (Dark/Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            htmlElement.setAttribute('data-theme', 'dark');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 4. Direction Toggle (LTR/RTL)
    // The requirement states: "Display only the active mode in the RTL/LTR toggle — show 'LTR' when in LTR mode and 'RTL' when in RTL mode"
    const dirToggleBtn = document.getElementById('dir-toggle');
    const dirText = dirToggleBtn.querySelector('.dir-text');
    
    // Initialize text based on default HTML dir attribute
    const currentDir = htmlElement.getAttribute('dir') || 'ltr';
    dirText.textContent = currentDir.toUpperCase();

    dirToggleBtn.addEventListener('click', () => {
        const dir = htmlElement.getAttribute('dir') || 'ltr';
        const newDir = dir === 'ltr' ? 'rtl' : 'ltr';
        
        htmlElement.setAttribute('dir', newDir);
        // Display the ACTIVE mode on the button as requested
        dirText.textContent = newDir.toUpperCase();
    });

    // Smooth Scrolling removed as site is now multi-page

    // 6. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            header.style.boxShadow = 'var(--shadow-sm)';
        }
    });

    // 7. Active Navigation Link
    const currentPath = window.location.pathname;
    let currentPage = currentPath.split('/').pop() || 'index.html';
    if (currentPage === '') currentPage = 'index.html';
    
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
            
            if (link.classList.contains('dropdown-link')) {
                const parentDropdown = link.closest('.dropdown');
                if (parentDropdown) {
                    const parentNavLink = parentDropdown.querySelector('.nav-link');
                    if (parentNavLink) parentNavLink.classList.add('active');
                }
            }
        }
    });

    // 8. Flip Card Touch/Click Toggle
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
});
