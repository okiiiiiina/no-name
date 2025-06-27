import Link from 'next/link';
import styles from './Header.module.css';

export type NavItem = {
  label: string;
  href: string;
};

type Props = {
  navItems: NavItem[];
};

export const Header = ({ navItems }: Props) => {
  return (
    <header>
      <div className={styles.container}>
        <Link href="/">
          <h1>Logo</h1>
        </Link>
        <div className={styles.nav}>
          {navItems.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
