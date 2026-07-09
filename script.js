// Ensure JavaScript waits for the HTML elements to load completely before attaching events
document.addEventListener("DOMContentLoaded", function() {

    const btnSearch = document.getElementById('btn-search');
    const btnClear = document.getElementById('btn-clear');

    if (btnSearch) {
        btnSearch.addEventListener('click', function() {
            const query = document.getElementById('search-input').value.toLowerCase().trim();
            const categories = document.querySelectorAll('.rec-category');

            categories.forEach(category => {
                const title = category.querySelector('h2').textContent.toLowerCase();
                // If query is found in the title, display it; otherwise, hide it
                if (title.includes(query) && query !== '') {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
        });
    }

    if (btnClear) {
        btnClear.addEventListener('click', function() {
            document.getElementById('search-input').value = '';
            const categories = document.querySelectorAll('.rec-category');
            categories.forEach(category => {
                category.style.display = 'block';
            });
        });
    }
});