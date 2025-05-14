// === Темная тема ===
function setupThemeToggle() {
    const toggle = document.getElementById('theme');
    const html = document.documentElement;

    if (localStorage.getItem('darkMode') === 'true') {
        html.classList.add('dark-mode');
        toggle.checked = true;
    }

    toggle?.addEventListener('change', () => {
        html.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', html.classList.contains('dark-mode') ? 'true' : 'false');

    });
}

// === Скролл-шапка ===
function setupHeaderScroll() {
    const header = document.querySelector('.site-header');
    const hero = document.querySelector('.hero');

    const observer = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio < 0.2) {
            header.classList.add('solid');
        } else {
            header.classList.remove('solid');
        }
    }, { threshold: [0, 0.2] });

    if (hero) observer.observe(hero);

    let lastY = 0;
    window.addEventListener('scroll', () => {
        const currentY = window.scrollY;
        if (currentY > lastY && currentY > 150) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastY = currentY;
    });
}

// === Мобильное меню ===
function setupMobileMenu() {
    const burger = document.getElementById('menuToggle');
    const nav = document.querySelector('.main-nav');
    const dropToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown-menu');

    burger?.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    dropToggle?.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown?.classList.toggle('open');
        dropToggle.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.has-dropdown')) {
            dropdown?.classList.remove('open');
            dropToggle?.classList.remove('active');
        }
    });
}

// === Эффект появления карточек ===
function animateOnScroll() {
    const items = document.querySelectorAll('.why-card, .service-card, section');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    });

    items.forEach(item => {
        item.classList.add('animate-on-scroll');
        observer.observe(item);
    });
}

// === Печатающий текст ===
function startTypingEffect() {
    const phrases = [
        "Нефтесервисная компания",
        "Лабораторные технологии",
        "Анализ буровых растворов"
    ];
    const el = document.getElementById("tagline");
    if (!el) return;

    let phrase = 0;
    let letter = 0;
    let deleting = false;

    function type() {
        el.textContent = phrases[phrase].slice(0, letter);

        if (!deleting && letter === phrases[phrase].length) {
            deleting = true;
            setTimeout(type, 1500);
        } else if (deleting && letter === 0) {
            deleting = false;
            phrase = (phrase + 1) % phrases.length;
            setTimeout(type, 300);
        } else {
            letter += deleting ? -1 : 1;
            setTimeout(type, deleting ? 30 : 100);
        }
    }

    type();
}

// === Прогресс сверху ===
function setupScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / total) * 100;
        bar.style.width = scrolled + '%';
    });
}
document.addEventListener('DOMContentLoaded', function () {
    new Splide('#values-carousel', {
        type: 'loop',
        perPage: 1,
        gap: '32px',
        arrows: true,
        pagination: false,
        padding: '20%',
        breakpoints: {
            1024: { perPage: 1, padding: '10%' },
            768: { perPage: 1, padding: '0' },
        },
    }).mount();
});

function setupNumberCounters() {
    const items = document.querySelectorAll('.number-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const counter = el.querySelector('.number-value');
                const target = +el.dataset.target;
                let current = 0;
                const step = Math.ceil(target / 80);

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target.toLocaleString('ru-RU');
                        clearInterval(timer);
                    } else {
                        counter.textContent = current.toLocaleString('ru-RU');
                    }
                }, 20);

                el.classList.add('visible');
                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.4
    });

    items.forEach(item => observer.observe(item));
}







// === Запуск всего ===
document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    setupHeaderScroll();
    setupMobileMenu();
    animateOnScroll();
    startTypingEffect();
    setupScrollProgress();
    setupNumberCounters()
});