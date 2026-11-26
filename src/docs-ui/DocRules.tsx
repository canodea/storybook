import styles from './DocRules.module.css';

export type DocRulesProps = {
  /** Yapılması gerekenler. */
  dos: string[];
  /** Yapılmaması gerekenler. */
  donts?: string[];
};

/** "Yap / Yapma" kullanım kuralları, iki sütun. */
export function DocRules({ dos, donts = [] }: DocRulesProps) {
  return (
    <div className={styles.grid}>
      <section className={`${styles.col} ${styles.do}`}>
        <h4 className={styles.head}>Yap</h4>
        <ul>
          {dos.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>
      {donts.length > 0 && (
        <section className={`${styles.col} ${styles.dont}`}>
          <h4 className={styles.head}>Yapma</h4>
          <ul>
            {donts.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
