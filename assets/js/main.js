const themeToggle = document.getElementById('themeToggle');
const keyboardButton = document.querySelector('.keyboard-button');
const virtualKeyboard = document.getElementById('virtualKeyboard');
const searchInput = document.querySelector('.search-input');
const capsButton = document.querySelector('.virtual-keyboard .caps');

// Only initialize caps lock functionality if the button exists
if (capsButton) {
    let isCapsLockOn = false;
    capsButton.addEventListener('click', () => {
        isCapsLockOn = !isCapsLockOn;
        capsButton.classList.toggle('active');
        
        const letterButtons = document.querySelectorAll('.virtual-keyboard button:not(.caps):not(.backspace):not(.space)');
        letterButtons.forEach(button => {
            button.textContent = isCapsLockOn ? button.textContent.toUpperCase() : button.textContent.toLowerCase();
        });
    });
}

themeToggle.addEventListener('click', () => {
    themeToggle.classList.remove('active');
    void themeToggle.offsetWidth;
    themeToggle.classList.add('active');
    
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// Keyboard show/hide logic
if (keyboardButton && virtualKeyboard && searchInput) {
    keyboardButton.addEventListener('click', () => {
        if (virtualKeyboard.style.display === 'none' || !virtualKeyboard.style.display) {
            virtualKeyboard.style.display = 'block';
        } else {
            virtualKeyboard.style.display = 'none';
        }
        searchInput.focus();
    });

    // Keyboard input handling
    virtualKeyboard.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            if (e.target.classList.contains('backspace')) {
                searchInput.value = searchInput.value.slice(0, -1);
            } else if (e.target.classList.contains('space')) {
                searchInput.value += ' ';
            } else {
                searchInput.value += e.target.textContent;
            }
            searchInput.focus();
        }
    });

    // Make keyboard draggable
    virtualKeyboard.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
}

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

function dragStart(e) {
    if (e.target.closest('.keyboard-header')) {
        const rect = virtualKeyboard.getBoundingClientRect();
        initialX = e.clientX - rect.left;
        initialY = e.clientY - rect.top;
        isDragging = true;
    }
}

function dragEnd() {
    isDragging = false;
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        
        const keyboardRect = virtualKeyboard.getBoundingClientRect();
        const headerHeight = 120; // Height of the fixed header
        
        // Calculate new position
        let newX = e.clientX - initialX;
        let newY = e.clientY - initialY;
        
        // Set boundaries
        const maxX = window.innerWidth - keyboardRect.width;
        const maxY = window.innerHeight - keyboardRect.height;
        const minY = headerHeight;
        
        // Constrain movement
        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(minY, Math.min(newY, maxY));
        
        virtualKeyboard.style.position = 'fixed';
        virtualKeyboard.style.left = `${newX}px`;
        virtualKeyboard.style.top = `${newY}px`;
        virtualKeyboard.style.transform = 'none';
    }
}

// Initialize elements
const menuHamburger = document.querySelector('.menu-hamburger');
const sideMenu = document.querySelector('.side-menu');
const closeMenu = document.querySelector('.close-menu');

// Only add event listeners if elements exist
if (menuHamburger && sideMenu && closeMenu) {
    menuHamburger.addEventListener('click', () => {
        sideMenu.classList.toggle('active');
        menuHamburger.classList.toggle('active');
    });

    closeMenu.addEventListener('click', () => {
        sideMenu.classList.remove('active');
        menuHamburger.classList.remove('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!sideMenu.contains(e.target) && !menuHamburger.contains(e.target)) {
            sideMenu.classList.remove('active');
            menuHamburger.classList.remove('active');
        }
    });
}

// Password visibility toggle
// Password toggle functionality for registration page
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});

// Add virtual keyboard element to cadastro.html
const keyboardHTML = `
<div class="virtual-keyboard" id="virtualKeyboard">
    <div class="keyboard-header">
        <div class="drag-handle"></div>
    </div>
    <!-- ... rest of your keyboard HTML ... -->
</div>`;

// Only append keyboard if it doesn't exist
if (!virtualKeyboard) {
    document.body.insertAdjacentHTML('beforeend', keyboardHTML);
}

// Add form toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const loginLink = document.querySelector('.form-footer a[href="/"]');
    if (loginLink) {
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'entrar.html';
        });
    }
});