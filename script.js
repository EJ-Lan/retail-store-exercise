document.addEventListener('DOMContentLoaded', () => {

    // Fetch response from navigation.json
    fetch('navigation.json')
        .then(response => response.json())
        .then(data => {

            // Select the nav element
            const nav = document.querySelector('nav');

            // For each city in the data create link element and append to nav
            data.cities.forEach(city => {
                const link = document.createElement('a');
                link.href = `#${city.section}`;
                link.textContent = city.label;
                nav.appendChild(link);
            });

            // Initialize the first link and animation
            const animation = document.querySelector('nav .animation');
            const firstLink = document.querySelector('nav a');

            // Calculate width of the link and relative position of the link
            animation.style.width = `${firstLink.getBoundingClientRect().width}px`;
            animation.style.left = `${firstLink.getBoundingClientRect().left - document.querySelector('nav').getBoundingClientRect().left}px`;
            firstLink.classList.add('active');

            // Map city names to their respective timezones
            const timezones = {
                "Cupertino": "America/Los_Angeles",
                "New York City": "America/New_York",
                "London": "Europe/London",
                "Amsterdam": "Europe/Amsterdam",
                "Tokyo": "Asia/Tokyo",
                "Hong Kong": "Asia/Hong_Kong",
                "Sydney": "Australia/Sydney"
            };

            // Initialize fist link timezone and put into html
            let now = new Date();
            let time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: timezones[firstLink.textContent] }).format(now);
            let currentTime = document.querySelector('.time');
            currentTime.textContent = time;
           
            // For each link in the nav element
            document.querySelectorAll('nav a').forEach((link) => {

                // Add an event listener removing active tags and adding an active tag to clicked link
                link.addEventListener('click', (e) => {
                    e.preventDefault();

                    // For each link currently active remove the active tag
                    document.querySelectorAll('nav a.active').forEach((activeLink) => {
                        activeLink.classList.remove('active');
                    });

                    link.classList.add('active');

                    // Calculate width and position of the link for the animation
                    animation.style.width = `${link.getBoundingClientRect().width}px`;
                    animation.style.left = `${link.getBoundingClientRect().left - document.querySelector('nav').getBoundingClientRect().left}px`;

                    // Get current time in the city's timezone and put into html
                    now = new Date();
                    time = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: timezones[link.textContent] }).format(now);
                    currentTime = document.querySelector('.time');
                    currentTime.textContent = time;
                });
            });
        })
        // Catch error if unable to fetch response from navigation.json
        .catch((error) => {
            console.log(error);
        });
});