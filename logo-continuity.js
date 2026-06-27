// Keep the logo rotation continuous across full page navigations.
// CSS animations restart on every page load, so we anchor the animation to a
// fixed timestamp stored in sessionStorage and apply a negative animation-delay
// to resume it at the correct phase.
(function () {
    const DURATION = 10000; // ms — must match the `rotate` animation duration in styles.css
    const KEY = 'logoAnimStart';

    let start = parseFloat(sessionStorage.getItem(KEY));
    if (!start || isNaN(start)) {
        start = Date.now();
        sessionStorage.setItem(KEY, start);
    }

    function apply() {
        const circle = document.querySelector('.logo .circle');
        if (!circle) return;
        const elapsed = (Date.now() - start) % DURATION;
        circle.style.animationDelay = `-${elapsed}ms`;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', apply);
    } else {
        apply();
    }
})();
