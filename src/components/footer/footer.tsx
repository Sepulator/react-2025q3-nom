import rsLogo from '@/assets/rss-logo.svg';
import ghLogo from '@/assets/github-mark.svg';

export function Footer() {
  return (
    <footer>
      <nav className="container">
        <a href="https://github.com/Sepulator" target="_blank" rel="noreferrer">
          <img className={'logo'} src={ghLogo} alt="RS School logo" />
        </a>
        <span>{new Date().getFullYear() + '©️'}</span>
        <a href="https://rs.school/" target="_blank" rel="noreferrer">
          <img className={'logo'} src={rsLogo} alt="RS School logo" />
        </a>
      </nav>
    </footer>
  );
}
