// Homepage elephant: waddles in on load; click/tap to hop.
// Visitors with "reduce motion" turned on skip the walk; the hop still works.
(function () {
    const walk = document.querySelector('.elephant-walk');
    const settle = document.querySelector('.elephant-settle');
    const hop = document.querySelector('.elephant-hop');
    if (!walk || !settle || !hop || !walk.animate) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const WALK_MS = 2400;

    // Waddle in from the right, a bounce on each step, then a settling wobble.
    function waddleIn() {
        const steps = 6;
        const frames = [];
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = (1 - t) * 130; // % of its own width, starting off-screen right
            const last = i === steps;
            const side = i % 2 ? 1 : -1;
            frames.push({
                offset: t,
                transform: `translateX(${x}%) rotate(${last ? 0 : side * 4}deg) translateY(0)`,
                easing: 'ease-in'
            });
            if (!last) {
                frames.push({
                    offset: t + 0.5 / steps,
                    transform: `translateX(${x - 65 / steps}%) rotate(0deg) translateY(-6%)`,
                    easing: 'ease-out'
                });
            }
        }
        walk.animate(frames, { duration: WALK_MS, fill: 'backwards' });

        settle.animate([
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(-3deg)' },
            { transform: 'rotate(2deg)' },
            { transform: 'rotate(-1deg)' },
            { transform: 'rotate(0deg)' }
        ], { duration: 700, delay: WALK_MS, easing: 'ease-out' });
    }

    // Squash, hop, land with a wobble and a puff of dust.
    let hopping = false;
    function hopOnce() {
        if (hopping) return;
        hopping = true;
        hop.animate([
            { transform: 'scale(1, 1) translateY(0)', easing: 'ease-out' },
            { transform: 'scale(1.1, 0.86) translateY(0)', offset: 0.14, easing: 'cubic-bezier(.2,.8,.3,1)' },
            { transform: 'scale(0.94, 1.08) translateY(-14%)', offset: 0.45, easing: 'cubic-bezier(.6,0,.9,.4)' },
            { transform: 'scale(1.12, 0.84) translateY(0)', offset: 0.68, easing: 'ease-out' },
            { transform: 'scale(0.97, 1.04) translateY(0)', offset: 0.82 },
            { transform: 'scale(1, 1) translateY(0)' }
        ], { duration: 900 }).finished.then(() => { hopping = false; });
        setTimeout(puffs, 610);
    }

    function puffs() {
        const host = document.querySelector('.hero-image');
        [[-1, 0.3], [-1, 0.2], [1, 0.3], [1, 0.2]].forEach(([dir, spread], i) => {
            const p = document.createElement('span');
            p.className = 'elephant-puff';
            p.style.left = `${50 + dir * spread * 100 - 1.1}%`;
            host.appendChild(p);
            p.animate([
                { transform: 'translate(0, 0) scale(0.4)', opacity: 1 },
                { transform: `translate(${dir * (24 + i * 6)}px, -${14 + i * 4}px) scale(1.2)`, opacity: 0 }
            ], { duration: 550, easing: 'ease-out' }).finished.then(() => p.remove());
        });
    }

    hop.addEventListener('click', hopOnce);
    hop.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            hopOnce();
        }
    });

    if (reduceMotion) return;
    waddleIn();
})();
