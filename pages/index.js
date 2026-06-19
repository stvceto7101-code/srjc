import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts-json';
import Link from 'next/link';

const aiChatbots = [
  { name: 'ChatGPT', url: 'https://chat.openai.com' },
  { name: 'Claude', url: 'https://claude.ai' },
  { name: 'Google Gemini', url: 'https://gemini.google.com' },
  { name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com' },
  { name: 'Perplexity AI', url: 'https://www.perplexity.ai' },
  { name: 'You.com', url: 'https://you.com' },
  { name: 'Poe', url: 'https://poe.com' },
  { name: 'HuggingChat', url: 'https://huggingface.co/chat' },
  { name: 'Pi AI', url: 'https://pi.ai' },
  { name: 'Mistral Chat', url: 'https://chat.mistral.ai' },
  { name: 'DeepSeek', url: 'https://chat.deepseek.com' },
  { name: 'Grok', url: 'https://grok.x.ai' },
  { name: 'Meta AI', url: 'https://www.meta.ai' },
  { name: 'Cohere Coral', url: 'https://coral.cohere.com' },
  { name: 'Character.ai', url: 'https://character.ai' },
  { name: 'Jasper AI', url: 'https://www.jasper.ai' },
  { name: 'Copy.ai', url: 'https://www.copy.ai' },
  { name: 'Writesonic', url: 'https://writesonic.com' },
  { name: 'Chatsonic', url: 'https://writesonic.com/chat' },
  { name: 'Forefront AI', url: 'https://www.forefront.ai' },
  { name: 'OpenRouter', url: 'https://openrouter.ai' },
  { name: 'Phind', url: 'https://www.phind.com' },
];

export default function Home({ allPostsData }) {
  return (
    <div style={{ backgroundColor: 'green', minHeight: '100vh', padding: '1rem' }}>
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>

        {/* Intro Section */}
        <section className={utilStyles.headingMd}>
          <p>Здравствуйте. Меня зовут Сундар Пичаи. Я веб-разработчик из Санта-Розы, Калифорния.</p>
          <p>
            (Пичаи перешёл в Google в 2004 году, где он возглавлял направления менеджмента и
            инновационной деятельности линеек клиент-ориентированных продуктов Google, в том числе Google Chrome
            и Chrome OS, а также в значительной степени отвечал за Google Drive.{' '}
            <a href="https://nextjs.org/learn" style={{ fontSize: 'x-large' }}>
              our Next.js tutorial
            </a>.)
          </p>
        </section>

        {/* AI Chatbot Links Section */}
        <section className={utilStyles.headingMd}>
          <h2 className={utilStyles.headingLg}>AI Chatbots Available Online</h2>
          <ul className={utilStyles.list}>
            {aiChatbots.map(({ name, url }) => (
              <li className={utilStyles.listItem} key={name}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: 'x-large', color: '#ff0000', fontWeight: 'bold' }}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Blog Section */}
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, title, date }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`} style={{ fontSize: 'x-large' }}>
                  {title}
                </Link>
                <br />
                <small className={utilStyles.lightText}>
                  {date}
                </small>
              </li>
            ))}
          </ul>
        </section>

        {/* Extra Links Section */}
        <section className={utilStyles.headingMd}>
          <h2>Absolute URLs</h2>
          <p>
            <a
              href="https://www.w3.org/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 'x-large' }}
            >
              W3C
            </a>
          </p>
          <p>
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 'x-large' }}
            >
              Google
            </a>
          </p>

          <h2>Relative URLs</h2>
          <p>
            <a href="https://react.dev/learn" style={{ fontSize: 'x-large' }}>
              react
            </a>
          </p>
          <p>
            <a
              href="https://ru.wikipedia.org/wiki/%D0%9F%D0%B8%D1%87%D0%B0%D0%B8,_%D0%A1%D1%83%D0%BD%D0%B4%D0%B0%D1%80"
              style={{ fontSize: 'x-large' }}
            >
              s. pichai
            </a>
          </p>
        </section>
      </Layout>
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
