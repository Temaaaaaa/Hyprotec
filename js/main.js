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
    let lastScrollY = window.scrollY;
    let isScrolling = false;
    let scrollTimeout;

    const observer = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio < 0.2) {
            header.classList.add('solid');
        } else {
            header.classList.remove('solid');
        }
    }, { threshold: [0, 0.2] });

    if (hero) observer.observe(hero);

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                const currentScrollY = window.scrollY;
                const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
                
                // Show header when scrolling up or at the top
                if (scrollDirection === 'up' || currentScrollY < 100) {
                    header.classList.remove('hidden');
                } 
                // Hide header when scrolling down and not at the top
                else if (scrollDirection === 'down' && currentScrollY > 100) {
                    header.classList.add('hidden');
                }

                lastScrollY = currentScrollY;
                isScrolling = false;
            });
        }
    });
}

// === Мобильное меню ===
function setupMobileMenu() {
    const burger = document.getElementById('menuToggle');
    const nav = document.querySelector('.main-nav');
    const dropToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown-menu');
    const body = document.body;

    // Toggle mobile menu
    burger?.addEventListener('click', () => {
        nav.classList.toggle('open');
        burger.setAttribute('aria-expanded', nav.classList.contains('open'));
        body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Toggle dropdown
    dropToggle?.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown?.classList.toggle('open');
        dropToggle.classList.toggle('active');
        dropToggle.setAttribute('aria-expanded', dropdown?.classList.contains('open'));
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.has-dropdown') && !e.target.closest('#menuToggle')) {
            dropdown?.classList.remove('open');
            dropToggle?.classList.remove('active');
            dropToggle?.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when clicking on a link
    nav?.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' && !e.target.classList.contains('dropdown-toggle')) {
            nav.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
        }
    });

    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            nav?.classList.remove('open');
            dropdown?.classList.remove('open');
            dropToggle?.classList.remove('active');
            burger?.setAttribute('aria-expanded', 'false');
            dropToggle?.setAttribute('aria-expanded', 'false');
            body.style.overflow = '';
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

// === Цвета для графиков в зависимости от темы ===
function getChartColors() {
    const isDark = document.documentElement.classList.contains('dark-mode');
    return {
        text: isDark ? '#ffffff' : '#111',
        grid: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.05)',
        tooltipBg: isDark ? '#2c2c2c' : '#111',
        tooltipText: '#fff',
        border: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
    };
}

// === График собственности ===
function renderOwnershipChart() {
    const canvas = document.getElementById('ownershipChart');
    if (!canvas) return;

    // Удаляем предыдущий график, если он есть
    if (canvas._chartInstance) {
        canvas._chartInstance.destroy();
    }

    const ctx = canvas.getContext('2d');
    const rootStyles = getComputedStyle(document.documentElement);
    const bodyStyles = getComputedStyle(document.body);
    const lang = document.documentElement.lang;
    const font = rootStyles.getPropertyValue('--font-inter').replace(/["']/g, '').trim() || 'Inter, sans-serif';
    const accent500 = rootStyles.getPropertyValue('--accent-500').trim() || '#ff0000';

    const colors = getChartColors();

    Chart.defaults.font.family = font;
    Chart.defaults.borderColor = colors.border;

    const labels = lang === 'en'
        ? ['1 HPHT (USA)', 'HPHT Greatest']
        : ['HPHT (США)', 'HPHT Greatest'];

    const datasetLabels = lang === 'en'
        ? ['Price', 'Spare Parts / Consumables', 'Service']
        : ['Цена', 'Запчасти / Материалы', 'Сервис'];

    const chartInstance = new Chart(ctx, {
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
                        font: { size: window.innerWidth < 600 ? 12 : 17 },
                        color: colors.text,
                        usePointStyle: true,
                        pointStyle: 'rectRounded',
                        boxWidth: window.innerWidth < 600 ? 10 : 16,
                        boxHeight: window.innerWidth < 600 ? 10 : 16,
                        padding: window.innerWidth < 600 ? 8 : 16,
                    }
                },
                tooltip: {
                    backgroundColor: colors.tooltipBg,
                    titleColor: colors.tooltipText,
                    bodyColor: colors.tooltipText,
                    bodyFont: { size: window.innerWidth < 600 ? 12 : 14 },
                    titleFont: { weight: '600', size: window.innerWidth < 600 ? 13 : 14 },
                    padding: window.innerWidth < 600 ? 8 : 10,
                    cornerRadius: 6,
                    borderColor: colors.border,
                    borderWidth: 1
                }
            },
            layout: {
                padding: {
                    bottom: window.innerWidth < 600 ? 16 : 0
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: { 
                        display: false,
                        color: colors.grid
                    },
                    ticks: { 
                        font: { size: window.innerWidth < 600 ? 12 : 14 }, 
                        color: colors.text 
                    },
                    border: {
                        color: colors.border
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: { 
                        stepSize: 500, 
                        font: { size: window.innerWidth < 600 ? 11 : 13 }, 
                        color: colors.text 
                    },
                    grid: { 
                        color: colors.grid, 
                        drawBorder: false 
                    },
                    border: {
                        color: colors.border
                    }
                }
            },
            animation: { duration: 1200, easing: 'easeOutQuart' }
        }
    });

    // Сохраняем инстанс для последующего destroy
    canvas._chartInstance = chartInstance;
}

// === Графики оборудования ===
function renderEquipmentCharts() {
    const rootStyles = getComputedStyle(document.documentElement);
    const lang = document.documentElement.lang;
    const font = rootStyles.getPropertyValue('--font-inter').replace(/["']/g, '').trim() || 'Arial, sans-serif';
    const blue = '#03a9f4';
    const aqua = '#1de9b6';

    const colors = getChartColors();

    Chart.defaults.font.family = font;
    Chart.defaults.borderColor = colors.border;

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

        // Явно задаем размеры canvas
        canvas.width = 600;
        canvas.height = 400;

        if (canvas._chartInstance) {
            canvas._chartInstance.destroy();
        }

        const chartInstance = new Chart(canvas, {
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
                        color: colors.text,
                        font: {
                            size: window.innerWidth < 900 ? 20 : 28,
                            weight: '700',
                            family: 'Arial, sans-serif',
                            lineHeight: 1.4
                        },
                        padding: { top: 20, bottom: 16 }
                    },
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: colors.text,
                            font: {
                                size: window.innerWidth < 900 ? 15 : 20,
                                weight: '600'
                            },
                            boxWidth: window.innerWidth < 900 ? 18 : 24,
                            padding: window.innerWidth < 900 ? 12 : 20
                        }
                    },
                    tooltip: {
                        backgroundColor: colors.tooltipBg,
                        titleColor: colors.tooltipText,
                        bodyColor: colors.tooltipText,
                        bodyFont: { size: window.innerWidth < 900 ? 14 : 18 },
                        titleFont: { weight: '700', size: window.innerWidth < 900 ? 15 : 20 },
                        padding: window.innerWidth < 900 ? 10 : 14,
                        cornerRadius: 6,
                        borderColor: colors.border,
                        borderWidth: 1
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

        canvas._chartInstance = chartInstance;
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

    // Перерисовываем графики при смене темы
    const themeToggle = document.getElementById('theme');
    if (themeToggle) {
        themeToggle.addEventListener('change', () => {
            renderOwnershipChart();
            renderEquipmentCharts();
        });
    }
});