document.addEventListener('DOMContentLoaded', () => {

    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const indicator = document.getElementById('navIndicator');
    const nav = document.getElementById('nav');
    let isAnimating = false;

    function updateIndicator(el) {
        const navRect = nav.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        indicator.style.left = (elRect.left - navRect.left) + 'px';
        indicator.style.width = elRect.width + 'px';
    }

    function switchPage(pageName) {
        if (isAnimating) return;
        isAnimating = true;

        // Убираем active
        navItems.forEach(item => item.classList.remove('active'));
        pages.forEach(page => {
            page.classList.remove('visible');
        });

        const targetNav = document.querySelector(`[data-page="${pageName}"]`);
        const targetPage = document.getElementById(`page-${pageName}`);

        targetNav.classList.add('active');
        updateIndicator(targetNav);

        setTimeout(() => {
            pages.forEach(p => p.style.display = 'none');
            targetPage.style.display = 'block';

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    targetPage.classList.add('active');
                    targetPage.classList.add('visible');
                    isAnimating = false;
                });
            });
        }, 400);
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageName = item.getAttribute('data-page');
            switchPage(pageName);
        });
    });

    // Инициализация
    window.addEventListener('load', () => {
        const activeNav = document.querySelector('.nav-item.active');
        updateIndicator(activeNav);
    });

    window.addEventListener('resize', () => {
        const activeNav = document.querySelector('.nav-item.active');
        updateIndicator(activeNav);
    });
});
