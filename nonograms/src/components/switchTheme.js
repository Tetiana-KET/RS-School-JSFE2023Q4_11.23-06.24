export default function switchTheme () {
  const html = document.documentElement;

  if (html.classList.contains('theme-dark')) {
    html.classList.remove('theme-dark');
    localStorage.setItem('currentTheme', 'theme-light');
	} else {
    html.classList.add('theme-dark');
    localStorage.setItem('currentTheme', 'theme-dark');
  }
}