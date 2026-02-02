document.addEventListener('DOMContentLoaded', () => {
    const newsItems = [];
    const newsTextElement = document.querySelector('.news-text');
    let currentNewsIndex = 0;

    function fetchNews() {
        fetch('/news.txt')
            .then(response => response.text())
            .then(text => {
                newsItems.push(...text.split('\n').filter(line => line.trim() !== ''));
                if (newsItems.length > 0) {
                    showNews();
                    setInterval(showNews, 4000);
                }
            });
    }

    function showNews() {
        if (newsItems.length === 0) return;
        newsTextElement.textContent = newsItems[currentNewsIndex];
        currentNewsIndex = (currentNewsIndex + 1) % newsItems.length;
    }

    fetchNews();
});