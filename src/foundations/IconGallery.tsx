import { useEffect, useMemo, useState } from 'react';
import Icon, { ICON_SETS, iconManifest } from './Icon';
import type { IconManifestEntry, IconSet } from './Icon';
import styles from './IconGallery.module.css';

const COLORS = [
  { id: 'default', label: 'Varsayılan', value: '#2d353c', dark: false },
  { id: 'secondary', label: 'İkincil', value: '#535c68', dark: false },
  { id: 'inverse', label: 'Ters', value: '#ffffff', dark: true },
  { id: 'brand', label: 'Marka', value: '#ffd600', dark: true },
  { id: 'accent', label: 'Vurgu', value: '#3182ce', dark: false },
] as const;

const SIZES = [16, 24, 32, 48] as const;

const counts = iconManifest.reduce<Record<string, number>>((acc, entry) => {
  acc[entry.set] = (acc[entry.set] ?? 0) + 1;
  return acc;
}, {});

const iconKey = (entry: IconManifestEntry) => `${entry.set}/${entry.name}`;

export default function IconGallery() {
  const [query, setQuery] = useState('');
  const [activeSet, setActiveSet] = useState<IconSet | 'all'>('all');
  const [size, setSize] = useState<number>(24);
  const [colorId, setColorId] = useState<(typeof COLORS)[number]['id']>('default');
  const [copied, setCopied] = useState<string | null>(null);

  const color = COLORS.find((item) => item.id === colorId) ?? COLORS[0];

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(null), 1400);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const groups = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return ICON_SETS.filter((set) => activeSet === 'all' || set === activeSet)
      .map((set) => ({
        set,
        items: iconManifest.filter(
          (entry) =>
            entry.set === set &&
            (!needle ||
              entry.name.toLowerCase().includes(needle) ||
              entry.set.toLowerCase().includes(needle)),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [query, activeSet]);

  const total = groups.reduce((sum, group) => sum + group.items.length, 0);

  async function copyIcon(entry: IconManifestEntry) {
    const snippet = `<Icon set="${entry.set}" name="${entry.name}" />`;
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(iconKey(entry));
    } catch {
      console.warn('Icon: panoya kopyalama başarısız oldu.');
    }
  }

  return (
    <section className={styles.gallery} aria-label="İkon kütüphanesi">
      <div className={styles.toolbar}>
        <div className={styles.searchRow}>
          <label className={styles.searchLabel} htmlFor="icon-search">
            İkon ara
          </label>
          <input
            id="icon-search"
            className={styles.search}
            type="search"
            value={query}
            placeholder="İkon veya set ara…"
            onChange={(event) => setQuery(event.target.value)}
          />
          <span className={styles.resultCount}>{total} ikon</span>
        </div>

        <div className={styles.chips} role="group" aria-label="Set filtresi">
          <button
            type="button"
            className={styles.chip}
            aria-pressed={activeSet === 'all'}
            onClick={() => setActiveSet('all')}
          >
            Tümü <span className={styles.chipCount}>{iconManifest.length}</span>
          </button>
          {ICON_SETS.map((set) => (
            <button
              key={set}
              type="button"
              className={styles.chip}
              aria-pressed={activeSet === set}
              onClick={() => setActiveSet(set)}
            >
              {set} <span className={styles.chipCount}>{counts[set]}</span>
            </button>
          ))}
        </div>

        <div className={styles.controls}>
          <div className={styles.control} role="group" aria-label="İkon boyutu">
            <span className={styles.controlLabel}>Boyut</span>
            {SIZES.map((value) => (
              <button
                key={value}
                type="button"
                className={styles.sizeButton}
                aria-pressed={size === value}
                onClick={() => setSize(value)}
              >
                {value}
              </button>
            ))}
          </div>

          <div className={styles.control} role="group" aria-label="İkon rengi">
            <span className={styles.controlLabel}>Renk</span>
            {COLORS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={styles.colorButton}
                aria-pressed={colorId === option.id}
                onClick={() => setColorId(option.id)}
              >
                <span
                  className={styles.swatch}
                  style={{ background: option.value }}
                  aria-hidden="true"
                />
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {total === 0 ? (
        <p className={styles.empty} role="status">
          Sonuç yok
        </p>
      ) : (
        <div className={styles.groups}>
          {groups.map((group) => (
            <section key={group.set} className={styles.group}>
              <h2 className={styles.groupTitle}>
                {group.set}
                <span className={styles.groupCount}>{group.items.length}</span>
              </h2>
              <div className={color.dark ? `${styles.grid} ${styles.gridDark}` : styles.grid}>
                {group.items.map((entry) => {
                  const key = iconKey(entry);
                  return (
                    <button
                      key={key}
                      type="button"
                      className={styles.tile}
                      aria-label={`${entry.name} ikonunu kopyala`}
                      title={`<Icon set="${entry.set}" name="${entry.name}" />`}
                      onClick={() => void copyIcon(entry)}
                    >
                      <span className={styles.tileIcon} style={{ color: color.value }}>
                        <Icon set={entry.set} name={entry.name} size={size} />
                      </span>
                      <span className={styles.tileName}>{entry.name}</span>
                      {copied === key && (
                        <span className={styles.copied} role="status">
                          Kopyalandı
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  );
}

export type IconsUsageProps = {
  dos: string[];
  donts: string[];
};

const USAGE_CODE = `import { Icon } from './foundations';

<Icon set="Banking" name="TermDeposit" size={24} title="Vadeli hesap" />
<Icon set="Arrows / Simple" name="Up" />`;

export function IconsUsage({ dos, donts }: IconsUsageProps) {
  return (
    <section className={styles.usage} aria-labelledby="icons-usage-title">
      <h2 id="icons-usage-title" className={styles.usageTitle}>
        Kullanım
      </h2>
      <p className={styles.usageIntro}>
        İkonlar <code>currentColor</code> ile gelir; rengi bulundukları metnin{' '}
        <code>color</code> değerinden alır. Her ikon 24×24 grid üzerinde çizilmiştir.
      </p>
      {/* sb-unstyled opts out of Storybook's docs <pre> reset so the dark block survives. */}
      <pre className={`${styles.code} sb-unstyled`}>
        <code>{USAGE_CODE}</code>
      </pre>
      <div className={styles.doDont}>
        <div className={`${styles.doCard} ${styles.doCardYes}`}>
          <h3>Yapın</h3>
          <ul>
            {dos.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={`${styles.doCard} ${styles.doCardNo}`}>
          <h3>Yapmayın</h3>
          <ul>
            {donts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
