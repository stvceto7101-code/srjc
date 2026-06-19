import Head from 'next/head';
import { useEffect } from 'react';

const people = {
  "Jack Tramiel": "https://en.wikipedia.org/wiki/Jack_Tramiel",
  "Leonard Tramiel": "https://en.wikipedia.org/wiki/Leonard_Tramiel",
  "Chuck Peddle": "https://en.wikipedia.org/wiki/Chuck_Peddle",
  "Al Charpentier": "https://en.wikipedia.org/wiki/Al_Charpentier",
  "Bil Herd": "https://en.wikipedia.org/wiki/Bil_Herd",
  "Michael Tomczyk": "https://en.wikipedia.org/wiki/Michael_Tomczyk",
  "Dave Rolfe": "https://en.wikipedia.org/wiki/Dave_Rolfe",
  "Richard Garriott": "https://en.wikipedia.org/wiki/Richard_Garriott",
  "Jeff Minter": "https://en.wikipedia.org/wiki/Jeff_Minter",
  "Andy Finkel": "https://en.wikipedia.org/wiki/Andy_Finkel",
  "Steve Wozniak": "https://en.wikipedia.org/wiki/Steve_Wozniak",
  "Nigel Searle": "https://en.wikipedia.org/wiki/Nigel_Searle",
  "John Grant": "https://en.wikipedia.org/wiki/John_Grant_(computer_scientist)",
  "Nolan Bushnell": "https://en.wikipedia.org/wiki/Nolan_Bushnell",
  "Al Alcorn": "https://en.wikipedia.org/wiki/Al_Alcorn",
  "Joe Decuir": "https://en.wikipedia.org/wiki/Joe_Decuir",
};

export default function EightBitGeneration() {
  return (
    <>
      <Head>
        <title>Growing the 8-Bit Generation – Interviewees</title>
      </Head>
      <style jsx global>{`
        .eightbit-page {
          font-family: Arial, sans-serif;
          background: #0d1117;
          color: #e6edf3;
          margin: 0;
          padding: 20px;
          min-height: 100vh;
        }
        .eightbit-page h1 {
          text-align: center;
          margin-bottom: 10px;
        }
        .eightbit-page .subtitle {
          text-align: center;
          max-width: 900px;
          margin: 0 auto 30px auto;
          color: #9da7b3;
        }
        .eightbit-page .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 15px;
          max-width: 1000px;
          margin: auto;
        }
        .eightbit-page .card {
          background: #161b22;
          border: 1px solid #30363d;
          border-radius: 12px;
          padding: 15px;
          text-align: center;
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .eightbit-page .card:hover {
          background: #21262d;
          transform: translateY(-4px);
        }
        .eightbit-page .card span {
          font-weight: bold;
          color: #58a6ff;
        }
        .eightbit-page footer {
          text-align: center;
          margin-top: 40px;
          font-size: 14px;
        }
        .eightbit-page footer a {
          color: #58a6ff;
          text-decoration: none;
          font-weight: bold;
        }
        .eightbit-page footer a:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="eightbit-page">
        <h1>Growing the 8-Bit Generation – Featured Interviews</h1>
        <p className="subtitle">Click a name to open their Wikipedia article.</p>

        <div className="grid">
          {Object.entries(people).map(([name, url]) => (
            <div
              key={name}
              className="card"
              onClick={() => window.open(url, '_blank')}
            >
              <span>{name}</span>
            </div>
          ))}
        </div>

        <footer>
          <a href="/">Back to Home</a>
        </footer>
      </div>
    </>
  );
}
