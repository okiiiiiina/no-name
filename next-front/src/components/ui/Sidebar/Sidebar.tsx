import styles from './Sidebar.module.css';

type SidebarPosition = 'left' | 'right';

type SidebarVariant = 'permanent' | 'temporary';

type SidebarItem = {
  title: string;
  href: string;
  icon?: React.ReactNode;
};

type SidebarContent = React.ReactNode | SidebarItem[];

type Props = {
  title: string;
  children: SidebarContent;
  isOpen: boolean;
  position?: SidebarPosition;
  variant?: SidebarVariant;
  width?: string;
  disableAnimation?: boolean;
  className?: string;
  onClose?: () => void;
};

export const Sidebar: React.FC<Props> = ({
  title,
  children,
  isOpen,
  onClose,
  position = 'left',
  variant = 'permanent',
  width = '280px',
  disableAnimation = false,
  className = '',
}) => {
  // オーバーレイクリック時にSidebarを閉じる処理
  const handleOverlayClick = () => {
    if (variant === 'temporary' && onClose) {
      onClose();
    }
  };

  // キーボードイベントでSidebarを閉じる処理（Storybookのアクセシビリティテスト確認用）
  const handleOverlayKeyDown = (event: React.KeyboardEvent) => {
    if (
      (event.key === 'Enter' || event.key === ' ') &&
      variant === 'temporary' &&
      onClose
    ) {
      event.preventDefault();
      onClose();
    }
  };

  // Sidebarのクラス名
  const sidebarClasses = [
    styles.sidebar,
    styles[position],
    styles[variant],
    isOpen ? styles.open : styles.closed,
    disableAnimation ? styles.noAnimation : '',
    className,
  ].join(' ');

  return (
    <>
      {/* temporaryかつ開いている場合にオーバーレイを表示 */}
      {variant === 'temporary' && isOpen && (
        <div
          className={styles.overlay}
          onClick={handleOverlayClick}
          onKeyDown={handleOverlayKeyDown}
          tabIndex={0}
          role="button"
          aria-label="Sidebarを閉じる"
        />
      )}

      {/* Sidebar本体 */}
      <aside
        className={sidebarClasses}
        style={
          {
            '--sidebar-width': width,
          } as React.CSSProperties
        }
        aria-hidden={!isOpen}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </div>
        <div className={styles.content}>
          {Array.isArray(children) ? (
            <nav className={styles.navigation}>
              <ul className={styles.navigationList}>
                {children.map((item, index) => (
                  <li
                    key={`${item.href}-${index}`}
                    className={styles.navigationItem}
                  >
                    <a href={item.href} className={styles.navigationLink}>
                      {item.icon && (
                        <span className={styles.navigationIcon}>
                          {item.icon}
                        </span>
                      )}
                      <span className={styles.navigationText}>
                        {item.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            children
          )}
        </div>
      </aside>
    </>
  );
};
