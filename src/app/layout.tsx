import '../index.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="icon" type="image/svg+xml" href="/movie.svg" />
        <title>The Movie Database API</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
