import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Navbar.module.css';

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.brand}>
          AI Chatbots Hub
        </Link>
        <ul className={styles.navLinks}>
          <li className={router.pathname === '/' ? styles.active : ''}>
            <Link href="/">Home</Link>
          </li>
          <li className={router.pathname === '/kgb-file' ? styles.active : ''}>
            <Link href="/kgb-file">KGB File</Link>
          </li>
          <li className={router.pathname === '/nvidia-tictactoe' ? styles.active : ''}>
            <Link href="/nvidia-tictactoe">NVIDIA Tic-Tac-Toe</Link>
          </li>
          <li className={router.pathname === '/8bit-generation' ? styles.active : ''}>
            <Link href="/8bit-generation">8-Bit Generation</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
