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
        })
});