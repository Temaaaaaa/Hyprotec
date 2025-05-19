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
    const el = document.getElementById("tagline");
    if (!el) return;

    const lang = document.documentElement.lang;
    const phrase = lang === "en"
        ? "oilfield service company"
        : "нефтесервисная компания";

    let letter = 0;

    function type() {
        el.textContent = phrase.slice(0, letter);
        letter++;
        if (letter <= phrase.length) {
            setTimeout(type, 75); // скорость печати
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

// === Инициализация Splide ===
document.addEventListener('DOMContentLoaded', function () {
    new Splide('#values-carousel', {
        type: 'loop',
        perPage: 1,
        gap: '32px',
        arrows: true,
        pagination: true,
        padding: '20%',
        breakpoints: {
            1024: { perPage: 1, padding: '10%', arrows: false },
            768: { perPage: 1, padding: '0', arrows: false },
        },
    }).mount();
});

// === Счетчики чисел ===
function setupNumberCounters() {
    const counters = document.querySelectorAll('strong[data-target]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                let current = 0;
                const step = Math.max(1, Math.ceil(target / 100));

                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        el.textContent = target.toLocaleString('ru-RU');
                        clearInterval(timer);
                    } else {
                        el.textContent = current.toLocaleString('ru-RU');
                    }
                }, 20);

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(counter => observer.observe(counter));
}



// === График собственности ===
function renderOwnershipChart() {
    const canvas = document.getElementById('ownershipChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rootStyles = getComputedStyle(document.documentElement);
    const bodyStyles = getComputedStyle(document.body);
    const lang = document.documentElement.lang;

    const font = rootStyles.getPropertyValue('--font-inter').replace(/["']/g, '').trim() || 'Inter, sans-serif';
    const accent500 = rootStyles.getPropertyValue('--accent-500').trim() || '#ff0000';
    const textColor = bodyStyles.color || '#111';

    // Установка Retina-разрешения
    const ratio = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    ctx.scale(ratio, ratio);

    Chart.defaults.font.family = font;

    // === Локализация ===
    const labels = lang === 'en'
        ? ['1 HPHT (USA)', 'HPHT Greatest']
        : ['HPHT (США)', 'HPHT Greatest'];

    const datasetLabels = lang === 'en'
        ? ['Price', 'Spare Parts / Consumables', 'Service']
        : ['Цена', 'Запчасти / Материалы', 'Сервис'];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: datasetLabels[0],
                    data: [1000, 550],
                    backgroundColor: accent500,
                    borderRadius: { topLeft: 10, topRight: 10 },
                    barPercentage: 0.6,
                    categoryPercentage: 0.5,
                },
                {
                    label: datasetLabels[1],
                    data: [650, 200],
                    backgroundColor: 'rgba(0, 229, 255, 0.8)',
                    borderRadius: { topLeft: 10, topRight: 10 },
                    barPercentage: 0.6,
                    categoryPercentage: 0.5,
                },
                {
                    label: datasetLabels[2],
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
                        color: textColor,
                        usePointStyle: true,
                        pointStyle: 'rectRounded',
                        boxWidth: 16,
                        boxHeight: 16,
                        padding: 16,
                    },
                    onHover: (event) => {
                        event.native.target.style.cursor = 'pointer';
                    },
                    onLeave: (event) => {
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


// === Графики оборудования ===
function renderEquipmentCharts() {
    const rootStyles = getComputedStyle(document.documentElement);
    const lang = document.documentElement.lang;
    const textColor = getComputedStyle(document.body).color;
    const blue = '#03a9f4';
    const aqua = '#1de9b6';

    const font = rootStyles.getPropertyValue('--font-inter').replace(/["']/g, '').trim() || 'Inter, sans-serif';
    Chart.defaults.font.family = font;

    // === Localized values ===
    const labels = lang === 'en'
        ? ['American Equipment', 'Alternatives']
        : ['Американское оборудование', 'Аналоги'];

    const titles = {
        '2020': lang === 'en' ? 'HYPROTEC STC Equipment\n2020' : 'Оборудование НТЦ «ХАЙПРОТЕК»\n2020 г.',
        '2025': lang === 'en' ? 'HYPROTEC STC Equipment\n2025' : 'Оборудование НТЦ «ХАЙПРОТЕК»\n2025 г.'
    };

    const datasets = {
        '2020': [100, 0],
        '2025': [55, 45]
    };

    ['2020', '2025'].forEach((year) => {
        const canvasId = `equipmentChart${year}`;
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        new Chart(canvas, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [{
                    data: datasets[year],
                    backgroundColor: [blue, aqua],
                    borderWidth: 0
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: titles[year],
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
                    easing: year === '2020' ? 'easeOutBounce' : 'easeOutBack'
                },
                cutout: '60%',
                responsive: true,
                maintainAspectRatio: false
            }
        });
    });
}



// === Анимация таблицы ===
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



// === Инициализация всех функций ===
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