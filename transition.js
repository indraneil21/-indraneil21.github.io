document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a');
    
    links.forEach(link => {
        link.addEventListener('click', e => {
            if (link.href) {
                e.preventDefault();
                
                // Start the background transition
                document.body.style.backgroundColor = link.href.includes('about') 
                    ? 'var(--about-background-color)' 
                    : 'var(--background-color)';
                
                // Wait for transition to complete before navigating
                setTimeout(() => {
                    window.location = link.href;
                }, 1500); // Match this with CSS transition duration
            }
        });
    });
}); 