function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}


const dynamicText = document.querySelector("h2 span");
const words = [
    "builder",
    "ML enthusiast",
    "gym-goer chasing logic and PRs",
    "fan of One Piece"
];// Variables to track the position and deletion status of the word
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeEffect = () => {
    const currentWord = words[wordIndex];
    const currentChar = currentWord.substring(0, charIndex);
    dynamicText.textContent = currentChar;
    dynamicText.classList.add("stop-blinking");
    if (!isDeleting && charIndex < currentWord.length) {
        // If condition is true, type the next character
        charIndex++;
        setTimeout(typeEffect, 40);
    } else if (isDeleting && charIndex > 0) {
        // If condition is true, remove the previous character
        charIndex--;
        setTimeout(typeEffect, 25);
    } else {
        // If word is deleted then switch to the next word
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex;
        setTimeout(typeEffect, 1200);
    }
}
typeEffect();

/* --- EXPERIENCE MODAL LOGIC --- */
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('exp-modal');

    if (!modal) return; // Guard clause

    const modalTitle = document.getElementById('modal-title');
    const modalCompany = document.getElementById('modal-company');
    const modalDate = document.getElementById('modal-date');
    const modalBullets = document.getElementById('modal-bullets');
    const modalTechStack = document.getElementById('modal-tech-stack');
    const closeBtn = document.querySelector('.modal-close');

    // Open Modal
    const clickableItems = document.querySelectorAll('.exp-card, .role-item');
    clickableItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Prevent the parent card click if a child role-item was clicked
            e.stopPropagation();

            // If this is an exp-card but it has nested roles, do nothing (let the role-items handle it)
            if (item.classList.contains('exp-card') && item.querySelector('.nested-roles')) {
                return;
            }

            const title = item.getAttribute('data-modal-title');
            const company = item.getAttribute('data-modal-company');
            const dates = item.getAttribute('data-modal-dates');
            const bulletsStr = item.getAttribute('data-modal-bullets');
            const techStr = item.getAttribute('data-modal-tech');

            if (title && company && dates && bulletsStr) {
                // Populate data
                modalTitle.textContent = title;
                modalCompany.textContent = company;
                modalDate.textContent = dates;

                // Parse bullets
                modalBullets.innerHTML = '';
                const bullets = bulletsStr.split('||');
                bullets.forEach(b => {
                    if (b.trim()) {
                        const li = document.createElement('li');
                        li.textContent = b.trim();
                        modalBullets.appendChild(li);
                    }
                });

                // Add tech stack
                modalTechStack.innerHTML = '';
                if (techStr) {
                    const techList = techStr.split('||'); // Use || to separate tags like bullets
                    techList.forEach(t => {
                        if (t.trim()) {
                            const span = document.createElement('span');
                            span.className = 'tech-tag';
                            span.textContent = t.trim();
                            modalTechStack.appendChild(span);
                        }
                    });
                    modalTechStack.style.display = 'flex';
                } else {
                    const techStackEl = item.querySelector('.tech-stack');
                    if (techStackEl && techStackEl.innerHTML.trim() !== '') {
                        modalTechStack.innerHTML = techStackEl.innerHTML;
                        modalTechStack.style.display = 'flex'; // Reset display if it was hidden
                    } else {
                        modalTechStack.style.display = 'none'; // Hide if there's no tech stack
                    }
                }

                // Show modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });

    // Close Modal
    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on clicking outside container
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});