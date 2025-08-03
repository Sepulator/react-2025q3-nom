import Image from 'next/image';

export function About() {
  return (
    <section className="about">
      <h1 style={{ textAlign: 'center' }}>About</h1>
      <article className="about-article">
        <Image src="/photo.webp" alt="Photo" className="about-img" width={300} height={300} />
        <div>
          <p>
            This web application was created as part of <strong>RS&nbsp;School</strong> study program. More information
            about
            <strong> React</strong> course can be viewed on the school site{' '}
            <a href="https://rs.school/courses/reactjs" target="_blank" rel="noreferrer">
              rs.school
            </a>
            .
          </p>
          <p>
            Author Yuri Skrypal
            <br></br>
            <a href="https://www.linkedin.com/in/yuriy-skrypal-580a84ab/" target="_blank" rel="noreferrer">
              linkedin
            </a>{' '}
            and{' '}
            <a href="https://github.com/Sepulator" target="_blank" rel="noreferrer">
              github
            </a>
            .
          </p>
        </div>
      </article>
    </section>
  );
}
