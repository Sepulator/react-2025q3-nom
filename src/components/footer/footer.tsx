import Image from 'next/image';

export function Footer() {
  return (
    <footer>
      <nav className="container">
        <a href="https://github.com/Sepulator" target="_blank" rel="noreferrer">
          <Image src="/rss-logo.svg" alt="RS School logo" width={40} height={40} />
        </a>
        <span>{new Date().getFullYear() + '©️'}</span>
        <a href="https://rs.school/" target="_blank" rel="noreferrer">
          <Image src="/github-mark.svg" alt="RS School logo" width={40} height={40} />
        </a>
      </nav>
    </footer>
  );
}
