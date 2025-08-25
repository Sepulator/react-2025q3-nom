import ghLogo from '@/assets/github-mark.svg';
import rsLogo from '@/assets/rss-logo.svg';

import s from './footer.module.css';

export function Footer() {
  return (
    <footer className={s.footer}>
      <nav className="container">
        <a href="https://github.com/Sepulator" rel="noreferrer" target="_blank">
          <img alt="RS School logo" className="logo" src={ghLogo} />
        </a>
        <span>{new Date().getFullYear() + '©️'}</span>
        <a href="https://rs.school/" rel="noreferrer" target="_blank">
          <img alt="RS School logo" className="logo" src={rsLogo} />
        </a>
      </nav>
    </footer>
  );
}
