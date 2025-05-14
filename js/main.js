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

function renderOwnershipChart() {
    const ctx = document.getElementById('ownershipChart').getContext('2d');
    const rootStyles = getComputedStyle(document.documentElement);
    const bodyStyles = getComputedStyle(document.body);

    const font = rootStyles.getPropertyValue('--font-inter').replace(/["']/g, '').trim() || 'Inter, sans-serif';
    const accent500 = rootStyles.getPropertyValue('--accent-500').trim() || '#ff0000';
    const textColor = bodyStyles.color || '#111';
    // Увеличим resolution в 2x или 3x, если экран HiDPI
    const canvas = document.getElementById('ownershipChart');

// Увеличим resolution в 2x или 3x, если экран HiDPI
    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    ctx.scale(ratio, ratio);

    Chart.defaults.font.family = font;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HPHT (США)', 'HPHT Greatest'],
            datasets: [
                {
                    label: 'Цена',
                    data: [1000, 550],
                    backgroundColor: accent500,
                    borderRadius: { topLeft: 10, topRight: 10 },
                    barPercentage: 0.6,
                    categoryPercentage: 0.5,
                },
                {
                    label: 'Запчасти / Материалы',
                    data: [650, 200],
                    backgroundColor: 'rgba(0, 229, 255, 0.8)',
                    borderRadius: { topLeft: 10, topRight: 10 },
                    barPercentage: 0.6,
                    categoryPercentage: 0.5,
                },
                {
                    label: 'Сервис',
                    data: [300, 300],
                    backgroundColor: 'rgba(105, 240, 174, 0.85)',
                    borderRadius: { topLeft: 10, topRight: 10 },
                    barPercentage: 0.6,
                    categoryPercentage: 0.5,
                }
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { size: 17 },
                        color: getComputedStyle(document.body).color,
                        usePointStyle: true,
                        pointStyle: 'rectRounded',

                        boxWidth: 16,
                        boxHeight: 16,
                        padding: 16,
                    },
                    onHover: (event, legendItem, legend) => {
                        event.native.target.style.cursor = 'pointer';
                    },
                    onLeave: (event, legendItem, legend) => {
                        event.native.target.style.cursor = 'default';
                    }
                },
                tooltip: {
                    backgroundColor: '#111',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    bodyFont: { size: 14 },
                    titleFont: { weight: '600' },
                    padding: 10,
                    cornerRadius: 6,
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: { size: 14 },
                        color: textColor,
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 500,
                        font: { size: 13 },
                        color: textColor,
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.05)',
                        drawBorder: false
                    }
                }
            },
            animation: {
                duration: 1200,
                easing: 'easeOutQuart',
            }
        }
    });
}

function renderEquipmentCharts() {
    const rootStyles = getComputedStyle(document.documentElement);
    const blue = '#03a9f4';
    const aqua = '#1de9b6';
    const textColor = getComputedStyle(document.body).color;

    const font = rootStyles.getPropertyValue('--font-inter').replace(/["']/g, '').trim() || 'Inter, sans-serif';
    Chart.defaults.font.family = font;

    // 2020
    new Chart(document.getElementById('equipmentChart2020'), {
        type: 'doughnut',
        data: {
            labels: ['Американское оборудование', 'Аналоги'],
            datasets: [{
                data: [100, 0],
                backgroundColor: [blue, aqua],
                borderWidth: 0
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Оборудование НТЦ «ХАЙПРОТЕК»\n2020 г.',
                    color: textColor,
                    font: { size: 18, weight: '600' },
                    padding: { top: 20, bottom: 10 }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        font: { size: 14 },
                        boxWidth: 16
                    }
                }
            },
            animation: {
                animateScale: true,
                duration: 1400,
                easing: 'easeOutBounce'
            },
            cutout: '60%',
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // 2025
    new Chart(document.getElementById('equipmentChart2025'), {
        type: 'doughnut',
        data: {
            labels: ['Американское оборудование', 'Аналоги'],
            datasets: [{
                data: [55, 45],
                backgroundColor: [blue, aqua],
                borderWidth: 0
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Оборудование НТЦ «ХАЙПРОТЕК»\n2025 г.',
                    color: textColor,
                    font: { size: 18, weight: '600' },
                    padding: { top: 20, bottom: 10 }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        font: { size: 14 },
                        boxWidth: 16
                    }
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 1400,
                easing: 'easeOutBack'
            },
            cutout: '60%',
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function animateTableOnScroll() {
    const table = document.querySelector('.ownership-table');
    if (!table) return;

    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            table.classList.add('visible');
            observer.disconnect();
        }
    }, { threshold: 0.3 });

    observer.observe(table);
}






// === Запуск всего ===
document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    setupHeaderScroll();
    setupMobileMenu();
    animateOnScroll();
    startTypingEffect();
    setupScrollProgress();
    setupNumberCounters();
    renderOwnershipChart();
    renderEquipmentCharts();
    animateTableOnScroll();
});