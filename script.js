document.addEventListener('DOMContentLoaded', () => {
    fetch('navigation.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const nav = document.querySelector('nav');
            data.cities.forEach(city => {
                const link = document.createElement('a');
                link.href = `#${city.section}`;
                link.textContent = city.label;
                nav.appendChild(link);
            });

            const animation = document.querySelector('nav .animation');
            const firstLink = document.querySelector('nav a');
            animation.style.width = `${firstLink.getBoundingClientRect().width}px`;
            animation.style.left = `${firstLink.getBoundingClientRect().left - document.querySelector('nav').getBoundingClientRect().left}px`;
            document.querySelectorAll('nav a').forEach((link) => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.querySelectorAll('nav a.active').forEach((activeLink) => {
                        activeLink.classList.remove('active');
                    });
                    link.classList.add('active');
                    animation.style.width = `${link.getBoundingClientRect().width}px`;
                    animation.style.left = `${link.getBoundingClientRect().left - document.querySelector('nav').getBoundingClientRect().left}px`;
                });
            });
        })
});