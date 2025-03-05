// Toggle mobile menu with sliding sidebar (Inspired by BibleProject)
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebar = document.getElementById('close-sidebar');

    // Check if all necessary elements exist before initializing the hamburger menu
    if (menuToggle && sidebar && closeSidebar) {
        // Toggle sidebar on hamburger menu click
        menuToggle.addEventListener('click', () => {
            sidebar.style.width = '250px'; // Open sidebar
        });

        // Close sidebar on close button click
        closeSidebar.addEventListener('click', () => {
            sidebar.style.width = '0'; // Close sidebar
        });

        // Close sidebar when clicking outside
        window.addEventListener('click', (event) => {
            if (!sidebar.contains(event.target) && event.target !== menuToggle) {
                sidebar.style.width = '0'; // Close sidebar if clicking outside
            }
        });
    }

    // Handle newsletter form submission (only if present on the page)
    const newsletterForm = document.querySelector('.newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input')?.value;
            if (email) {
                alert(`Thank you for subscribing with ${email}!`);
                e.target.reset();
            }
        });
    }

    // Popup Functions for Latest Resources, Mission, About, Values, and Volunteer (Books, Triggered by Clicking Image or Title)
    function openPopup(id) {
        const popup = document.getElementById(`${id}-popup`);
        if (popup) {
            popup.style.display = 'flex';
        }
    }

    function closePopup(id) {
        const popup = document.getElementById(`${id}-popup`);
        if (popup) {
            popup.style.display = 'none';
        }
    }

    // Close popup when clicking outside
    window.onclick = function(event) {
        const popups = document.getElementsByClassName('popup');
        for (let popup of popups) {
            if (event.target === popup) {
                popup.style.display = 'none';
            }
        }
    };

    // Dynamically populate latest resources (three specific books) with image and title only, clickable to open popup
    const latestResources = document.getElementById('latest-resources');
    if (latestResources) {
        const books = [
            {
                title: "The Genesis Project",
                image: "https://i.ibb.co/Z6PrNpBC/The-Genesis-Project.jpg",
                id: "genesis-project"
            },
            {
                title: "The Son of Favor",
                image: "https://i.ibb.co/tTg2TzbZ/The-Son-of-Favor.jpg",
                id: "son-of-favor"
            },
            {
                title: "The Friend of Abraham",
                image: "https://i.ibb.co/7dSxZS9y/The-Friend-of-Abraham.jpg",
                id: "friend-of-abraham"
            }
        ];

        // Add the three books to the latest resources section (image and title only, clickable)
        books.forEach(book => {
            const resourceCard = document.createElement('div');
            resourceCard.className = 'latest-card';
            resourceCard.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <h3>${book.title}</h3>
            `;
            // Make the entire card clickable to open the popup
            resourceCard.addEventListener('click', () => openPopup(book.id));
            latestResources.appendChild(resourceCard);
        });
    }

    // Page-specific search data
    const pageSpecificSearchData = {
        'index.html': [
            { title: "Chazak Africa Mission", description: "Learn about our mission to empower children through Bible resources", url: "index.html#mission" },
            { title: "New Bible Activity Workbook Released", description: "Check out our latest workbook with new puzzles and stories for kids", url: "index.html#latest-resources" }
        ],
        'resources.html': [
            { title: "The Genesis Project", description: "A Bible Activity Workbook with engaging Bible stories, puzzles, and activities for kids’ discipleship. Price: $10", url: "resources.html#workbook" },
            { title: "The Son of Favor", description: "A Searchlight Bible Activity Workbook with stories of Joseph for junior kids (ages 7-10). Price: $12", url: "resources.html#custom-workbook" },
            { title: "The Friend of Abraham", description: "A Custom Bible Curriculum for intentional Sunday lessons, tailored for churches and schools. Price: $15", url: "resources.html#curriculum" },
            { title: "The Genesis Project Coloring Book", description: "Vibrant Bible story illustrations for kids, perfect for follow-up activities. Price: $8", url: "resources.html#coloring" },
            { title: "The Heart of Courage", description: "Special themed Bible stories of David, Mary, Joshua, and Esther for kids. Price: $12", url: "resources.html#stories" },
            { title: "The First Family", description: "A Christian Religious Education Textbook for personal Bible interaction in context. Price: $14", url: "resources.html#cre-textbook" },
            { title: "My God, My Country, and Myself", description: "A special themed Bible storybook exploring faith, identity, and community. Price: $13", url: "resources.html#special-book" }
        ],
        'bible-verses.html': [
            { title: "Bible Verses", description: "Explore inspiring Scripture for children and families", url: "bible-verses.html" },
            { title: "Genesis 1", description: "In the beginning, God created the heavens and the earth", url: "bible-verses.html#genesis1" },
            { title: "Genesis 2", description: "By the seventh day God had finished the work he had been doing", url: "bible-verses.html#genesis2" },
            { title: "Genesis 3", description: "The serpent was more crafty than any of the wild animals", url: "bible-verses.html#genesis3" }
            // Add more verses as needed
        ],
        'support.html': [
            { title: "Support Chazak Africa", description: "Learn how to purchase our materials or donate to our mission", url: "support.html" },
            { title: "Purchase Resources", description: "Buy our Bible workbooks, curriculum, and stories to support our mission", url: "support.html#support-options" },
            { title: "Make a Donation", description: "Your donation helps create more resources and expand our reach", url: "support.html#support-options" },
            { title: "Volunteer", description: "Join our team to help distribute resources and spread the Word", url: "support.html#support-options" }
        ],
        'about.html': [
            { title: "About Chazak Africa", description: "Discover our vision, team, and history", url: "about.html" }
            // Add more specific about content as needed (e.g., vision, mission, values, testimonials)
        ]
    };

    // Website-wide search data (for optional full-site search)
    const websiteSearchData = [
        ...pageSpecificSearchData['index.html'],
        ...pageSpecificSearchData['resources.html'],
        ...pageSpecificSearchData['bible-verses.html'],
        ...pageSpecificSearchData['support.html'],
        ...pageSpecificSearchData['about.html']
    ];

    // Function to highlight searched text
    function highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    // Get current page URL to determine page-specific search data
    function getCurrentPage() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        return currentPath === '' ? 'index.html' : currentPath;
    }

    // Website Search Functionality (Works on All Pages with Page-Specific and Website-Wide Options)
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchButton = document.getElementById('search-button');
    const searchContainer = document.querySelector('.search-container');

    // Check if search elements exist before initializing
    if (searchInput && searchResults && searchButton && searchContainer) {
        const currentPage = getCurrentPage();
        let useWebsiteWideSearch = false; // Flag to toggle between page-specific and website-wide search

        // Real-time search suggestions
        searchInput.addEventListener('input', function(event) {
            const query = this.value.toLowerCase().trim();
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';

            if (query.length > 0) {
                const searchData = useWebsiteWideSearch ? websiteSearchData : pageSpecificSearchData[currentPage] || websiteSearchData;

                const filteredResults = searchData.filter(item => 
                    item.title.toLowerCase().includes(query) || 
                    item.description.toLowerCase().includes(query)
                );

                if (filteredResults.length > 0) {
                    filteredResults.forEach(result => {
                        const resultItem = document.createElement('div');
                        resultItem.className = 'search-result-item';
                        const highlightedTitle = highlightText(result.title, query);
                        const highlightedDescription = highlightText(result.description, query);
                        resultItem.innerHTML = `<a href="${result.url}" style="color: #333; text-decoration: none;">${highlightedTitle} - ${highlightedDescription}</a>`;
                        resultItem.addEventListener('click', (e) => {
                            e.preventDefault(); // Prevent default anchor behavior
                            window.location.href = result.url;
                            searchResults.style.display = 'none';
                            searchInput.value = '';
                        });
                        searchResults.appendChild(resultItem);
                    });
                    searchResults.style.display = 'block';
                } else {
                    const noResult = document.createElement('div');
                    noResult.className = 'search-result-item';
                    noResult.textContent = 'No results found';
                    searchResults.appendChild(noResult);
                    searchResults.style.display = 'block';
                }
            }
        });

        // Handle search button click (toggle between page-specific and website-wide search)
        searchButton.addEventListener('click', (event) => {
            useWebsiteWideSearch = !useWebsiteWideSearch; // Toggle search scope
            const query = searchInput.value.toLowerCase().trim();
            if (query.length > 0) {
                performWebsiteSearch(query, useWebsiteWideSearch);
            }
            // Update button text or style to indicate search scope (optional, could be styled in CSS)
            searchButton.textContent = useWebsiteWideSearch ? 'Search All (Click for Page)' : 'Search Page (Click for All)';
        });

        // Handle Enter key press (uses page-specific search by default, Shift + Enter for website-wide)
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent form submission or default behavior
                const query = this.value.toLowerCase().trim();
                if (query.length > 0) {
                    useWebsiteWideSearch = event.shiftKey; // Use website-wide search if Shift is held
                    performWebsiteSearch(query, useWebsiteWideSearch);
                }
            }
        });

        // Perform search function
        function performWebsiteSearch(query, wideSearch = false) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';

            const searchData = wideSearch ? websiteSearchData : pageSpecificSearchData[currentPage] || websiteSearchData;

            const filteredResults = searchData.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.description.toLowerCase().includes(query)
            );

            if (filteredResults.length > 0) {
                filteredResults.forEach(result => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'search-result-item';
                    const highlightedTitle = highlightText(result.title, query);
                    const highlightedDescription = highlightText(result.description, query);
                    resultItem.innerHTML = `<a href="${result.url}" style="color: #333; text-decoration: none;">${highlightedTitle} - ${highlightedDescription}</a>`;
                    resultItem.addEventListener('click', (e) => {
                        e.preventDefault(); // Prevent default anchor behavior
                        window.location.href = result.url;
                        searchResults.style.display = 'none';
                        searchInput.value = '';
                    });
                    searchResults.appendChild(resultItem);
                });
                searchResults.style.display = 'block';
            } else {
                const noResult = document.createElement('div');
                noResult.className = 'search-result-item';
                noResult.textContent = 'No results found';
                searchResults.appendChild(noResult);
                searchResults.style.display = 'block';
            }
        }

        // Close search results when clicking outside
        document.addEventListener('click', (event) => {
            if (!searchContainer.contains(event.target)) {
                searchResults.style.display = 'none';
            }
        });
    }

    // Verse Search Functionality (Works on Bible Verses Page)
    const verseSearchInput = document.getElementById('verse-search-input');
    const verseSearchResults = document.getElementById('verse-search-results');
    const verseSearchButton = document.getElementById('verse-search-button');

    if (verseSearchInput && verseSearchResults && verseSearchButton) {
        const verseData = [
            { title: "Genesis 1:1", text: "In the beginning, God created the heavens and the earth" },
            { title: "Genesis 1:2", text: "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters" },
            { title: "Genesis 2:1", text: "Thus the heavens and the earth were completed in all their vast array" },
            { title: "Genesis 2:2", text: "By the seventh day God had finished the work he had been doing; so on the seventh day he rested from all his work" },
            { title: "Genesis 3:1", text: "Now the serpent was more crafty than any of the wild animals the Lord God had made. He said to the woman, 'Did God really say, ‘You must not eat from any tree in the garden’?'" },
            { title: "Genesis 3:2", text: "The woman said to the serpent, 'We may eat fruit from the trees in the garden.'" }
            // Add more verses as needed
        ];

        // Real-time verse search suggestions
        verseSearchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            verseSearchResults.innerHTML = '';
            verseSearchResults.style.display = 'none';

            if (query.length > 0) {
                const filteredVerses = verseData.filter(verse => 
                    verse.title.toLowerCase().includes(query) || 
                    verse.text.toLowerCase().includes(query)
                );

                if (filteredVerses.length > 0) {
                    filteredVerses.forEach(verse => {
                        const resultItem = document.createElement('div');
                        resultItem.className = 'search-result-item';
                        const highlightedTitle = highlightText(verse.title, query);
                        const highlightedText = highlightText(verse.text, query);
                        resultItem.innerHTML = `<a href="bible-verses.html#${verse.title.split(' ')[1].toLowerCase()}" style="color: #333; text-decoration: none;">${highlightedTitle} - ${highlightedText}</a>`;
                        resultItem.addEventListener('click', (e) => {
                            e.preventDefault(); // Prevent default anchor behavior
                            window.location.href = `bible-verses.html#${verse.title.split(' ')[1].toLowerCase()}`;
                            verseSearchResults.style.display = 'none';
                            verseSearchInput.value = '';
                        });
                        verseSearchResults.appendChild(resultItem);
                    });
                    verseSearchResults.style.display = 'block';
                } else {
                    const noResult = document.createElement('div');
                    noResult.className = 'search-result-item';
                    noResult.textContent = 'No verses found';
                    verseSearchResults.appendChild(noResult);
                    verseSearchResults.style.display = 'block';
                }
            }
        });

        // Handle verse search button click
        verseSearchButton.addEventListener('click', () => {
            const query = verseSearchInput.value.toLowerCase().trim();
            verseSearchResults.innerHTML = '';
            verseSearchResults.style.display = 'none';

            if (query.length > 0) {
                const filteredVerses = verseData.filter(verse => 
                    verse.title.toLowerCase().includes(query) || 
                    verse.text.toLowerCase().includes(query)
                );

                if (filteredVerses.length > 0) {
                    filteredVerses.forEach(verse => {
                        const resultItem = document.createElement('div');
                        resultItem.className = 'search-result-item';
                        const highlightedTitle = highlightText(verse.title, query);
                        const highlightedText = highlightText(verse.text, query);
                        resultItem.innerHTML = `<a href="bible-verses.html#${verse.title.split(' ')[1].toLowerCase()}" style="color: #333; text-decoration: none;">${highlightedTitle} - ${highlightedText}</a>`;
                        resultItem.addEventListener('click', (e) => {
                            e.preventDefault(); // Prevent default anchor behavior
                            window.location.href = `bible-verses.html#${verse.title.split(' ')[1].toLowerCase()}`;
                            verseSearchResults.style.display = 'none';
                            verseSearchInput.value = '';
                        });
                        verseSearchResults.appendChild(resultItem);
                    });
                    verseSearchResults.style.display = 'block';
                } else {
                    const noResult = document.createElement('div');
                    noResult.className = 'search-result-item';
                    noResult.textContent = 'No verses found';
                    verseSearchResults.appendChild(noResult);
                    verseSearchResults.style.display = 'block';
                }
            } else {
                const noQuery = document.createElement('div');
                noQuery.className = 'search-result-item';
                noQuery.textContent = 'Please enter a search term';
                verseSearchResults.appendChild(noQuery);
                verseSearchResults.style.display = 'block';
            }
        });
    }

    // Handle donation button clicks
    const donationButtons = document.querySelectorAll('.donation-button');
    donationButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const amount = e.target.dataset.amount || prompt('Enter your custom donation amount in USD:');
            if (amount) {
                alert(`Thank you for your donation of $${amount}! You will be redirected to our payment page.`);
                // Redirect to a payment gateway or donation form (e.g., window.location.href = `https://payment.example.com?amount=${amount}`);
            }
        });
    });
});