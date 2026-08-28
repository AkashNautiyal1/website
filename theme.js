const themeToggle = document.querySelector('.theme-toggle');

function getTheme() {
    return document.documentElement.dataset.theme || 'dark';
}

function updateToggle(theme) {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const label = `Switch to ${nextTheme} mode`;

    themeToggle.setAttribute('aria-label', label);
    themeToggle.setAttribute('title', label);
}

themeToggle.addEventListener('click', () => {
    const nextTheme = getTheme() === 'dark' ? 'light' : 'dark';

    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    updateToggle(nextTheme);
});

updateToggle(getTheme());
