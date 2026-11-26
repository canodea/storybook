import type { CSSProperties, ReactNode } from 'react';
import {
  BORDER_TOKENS,
  BUTTON_TOKENS,
  SHADOW_COLORS,
  GRID_TOKENS,
  OPACITY_TOKENS,
  RADIUS_TOKENS,
  SHADOW_TOKENS,
  SIZE_TOKENS,
  SPACE_TOKENS,
  TEXT_GROUPS,
  TEXT_STYLES,
  type TokenRow,
} from './foundation.data';
import styles from './TokenDocs.module.css';

const SAMPLES: Record<string, string> = {
  Heading: 'Birikimin büyüsün',
  Text: 'Odea ile birikim yap, faizini her gün al.',
  'UI Display': 'HESAP ÖZETİ',
  'UI Text': 'Text goes here',
  'UI Numbers': '1.250.000,00 TL',
};

const px = (value: string) => (value === '0' ? '0' : `${value}px`);

/** Tablo değeri: sayıysa px (opaklıkta %), metinse olduğu gibi. */
function formatValue(row: TokenRow, unit: 'px' | '%') {
  if (Number.isNaN(Number(row.value))) return row.value;
  if (unit === '%' || row.name.includes('opacity') || row.alias?.startsWith('--opacity')) return `%${row.value}`;
  return px(row.value);
}

/** Token tablosu: değişken, değer ve varsa bağlı olduğu temel token. */
function TokenTable({ rows, unit = 'px', preview }: { rows: TokenRow[]; unit?: 'px' | '%'; preview?: (row: TokenRow) => ReactNode }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Değişken</th>
            <th scope="col">Değer</th>
            <th scope="col">Bağlı olduğu</th>
            {preview && <th scope="col">Örnek</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <th scope="row" className={styles.styleCell}>
                <code className={styles.styleName}>{row.name}</code>
              </th>
              <td className={styles.metric}>{formatValue(row, unit)}</td>
              <td className={styles.metric}>{row.alias ? <code className={styles.varCode}>{row.alias}</code> : '—'}</td>
              {preview && <td>{preview(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Bar({ token, use }: { token: TokenRow; use?: string }) {
  return (
    <div className={styles.barRow}>
      <code className={styles.barName}>{token.name}</code>
      <span className={styles.barTrack}>
        <span className={styles.barFill} style={{ width: `var(${token.name})` }} />
      </span>
      <span className={styles.barValue}>{px(token.value)}</span>
      <span className={styles.barUse}>{use ?? (token.alias ? `= ${token.alias}` : '')}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ Tipografi */

export function TypographyDocs() {
  return (
    <>
      <h2 id="yazi-tipleri">Yazı tipleri</h2>
      <p>
        İki aile kullanılır: başlık ve etiketlerde <strong>Red Hat Display</strong>, gövde ve rakamlarda <strong>Inter</strong>. Aileleri
        elle yazmayın; <code>--font-family-*</code> değişkenlerini kullanın.
      </p>
      <div className={styles.families}>
        <div className={styles.familyCard}>
          <span className={styles.familyLabel}>Display · Red Hat Display</span>
          <span className={styles.familySample} style={{ fontFamily: 'var(--font-family-display)', fontWeight: 700 }}>
            Aa
          </span>
          <code className={styles.varCode}>--font-family-display</code>
          <span className={styles.familyUse}>Bold. Heading ve UI Display stilleri.</span>
        </div>
        <div className={styles.familyCard}>
          <span className={styles.familyLabel}>Body · Inter</span>
          <span className={styles.familySample} style={{ fontFamily: 'var(--font-family-body)' }}>
            Aa
          </span>
          <code className={styles.varCode}>--font-family-body</code>
          <span className={styles.familyUse}>Regular, Medium, Semi Bold. Text, UI Text ve UI Numbers stilleri.</span>
        </div>
      </div>

      <h2 id="nasil-kullanilir">Nasıl kullanılır</h2>
      <p>
        Figma’daki her metin stilinin kodda bir sınıfı vardır: <code>Heading/LG</code> → <code>.odea-heading-lg</code>,{' '}
        <code>UI Numbers/SM Semi Bold</code> → <code>.odea-ui-numbers-sm-semi-bold</code>. Sınıf aile, ağırlık, boyut, satır yüksekliği ve
        harf aralığını birlikte verir. CSS Modules içinde tek tek gerekirse değişkenler stil adından türer:{' '}
        <code>--heading-lg-font-size</code>, <code>--heading-lg-line-height</code>, <code>--heading-lg-letter-spacing</code>.
      </p>

      {TEXT_GROUPS.map((group) => {
        const rows = TEXT_STYLES.filter((style) => style.group === group.key);
        return (
          <section key={group.key}>
            <h2 id={`grup-${group.key.toLowerCase().replace(' ', '-')}`}>
              {group.key} <span className={styles.count}>{rows.length} stil</span>
            </h2>
            <p>{group.use}</p>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th scope="col">Figma stili</th>
                    <th scope="col">Örnek</th>
                    <th scope="col">Ağırlık</th>
                    <th scope="col">Boyut / Satır</th>
                    <th scope="col">Harf aralığı</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((style) => (
                    <tr key={style.figma}>
                      <th scope="row" className={styles.styleCell}>
                        <span className={styles.figmaName}>{style.figma}</span>
                        <code className={styles.varCode}>.{style.className}</code>
                      </th>
                      <td>
                        <span className={`${styles.sample} ${style.className}`}>{SAMPLES[group.key]}</span>
                        {style.note && <span className={styles.note}>{style.note}</span>}
                      </td>
                      <td className={styles.metric}>{style.weight}</td>
                      <td className={styles.metric}>
                        {style.size} / {style.line === 'auto' ? 'auto' : style.line}
                      </td>
                      <td className={styles.metric}>{px(style.letter)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}

      <h2 id="kurallar">Kullanım kuralları</h2>
      <ul>
        <li>Tutar, bakiye ve oranlar her zaman <strong>UI Numbers</strong> ile yazılır; rakamlar sütunda hizalı kalır.</li>
        <li>Paragraf ve uzun açıklamada <strong>Text</strong>, liste satırı ve input gibi tek satırlık arayüz metninde <strong>UI Text</strong> kullanılır.</li>
        <li>Buton etiketleri yalnızca <code>UI Display/Button LG</code> ve <code>Button SM</code> ile, FULL CAPS yazılır.</li>
        <li>
          <code>UI Text/XS</code> (10 px) okunurluk sınırındadır; yalnız tarih rozeti ve mikro etiketlerde kullanılır.
        </li>
        <li>Stil dışında boyut, ağırlık veya harf aralığı vermeyin; gereken stil yoksa Figma kütüphanesine önerin.</li>
      </ul>
    </>
  );
}

/* ------------------------------------------------------------------ Boşluk */

const GAP_USE: Record<string, string> = {
  '--gap-xs': 'İkon ile metin, bitişik öğeler',
  '--gap-sm': 'Sıkı liste öğeleri',
  '--gap-md': 'Kart içindeki bloklar arası',
  '--gap-lg': 'Bölümler ve kartlar arası',
  '--inset-sm': 'Kompakt kart, çip',
  '--inset-md': 'Standart kart iç boşluğu',
  '--inset-lg': 'Geniş yüzey, sayfa kenarı',
  '--inset-xl': 'Modal, alt sayfa gövdesi',
};

export function SpacingDocs() {
  const scale = SPACE_TOKENS.filter((token) => token.name.startsWith('--space-'));
  const gaps = SPACE_TOKENS.filter((token) => token.name.startsWith('--gap-'));
  const insets = SPACE_TOKENS.filter((token) => token.name.startsWith('--inset-'));
  return (
    <>
      <h2 id="olcek">Ölçek · space</h2>
      <p>
        Tüm boşluklar bu {scale.length} adımlık ölçekten seçilir. Ara değer üretmeyin; ölçekteki en yakın adımı kullanın. Bileşenlerde
        doğrudan <code>--space-*</code> yerine aşağıdaki anlamlı <code>gap</code> ve <code>inset</code> değişkenleri tercih edilir.
      </p>
      <div className={styles.bars}>
        {scale.map((token) => (
          <Bar key={token.name} token={token} />
        ))}
      </div>

      <h2 id="gap">Öğeler arası boşluk · gap</h2>
      <p>
        <strong>Gap</strong> iki öğenin birbirine olan uzaklığıdır: satır içi gruplar, liste ve grid boşlukları.
      </p>
      <div className={styles.compare}>
        <div className={styles.demo}>
          <span className={styles.demoLabel}>gap-md</span>
          <div className={styles.demoRow} style={{ gap: 'var(--gap-md)' }}>
            <span className={styles.demoBox} />
            <span className={styles.demoBox} />
            <span className={styles.demoBox} />
          </div>
        </div>
      </div>
      <div className={styles.bars}>
        {gaps.map((token) => (
          <Bar key={token.name} token={token} use={`${GAP_USE[token.name] ?? ''} · = ${token.alias}`} />
        ))}
      </div>

      <h2 id="inset">İç boşluk · inset</h2>
      <p>
        <strong>Inset</strong> içeriğin kabuğa olan uzaklığıdır; kart, panel ve modal padding’i için kullanılır.
      </p>
      <div className={styles.compare}>
        <div className={styles.insetCard} style={{ padding: 'var(--inset-md)' }}>
          <span className={styles.demoLabel}>inset-md</span>
          <div className={styles.insetInner}>İçerik</div>
        </div>
      </div>
      <div className={styles.bars}>
        {insets.map((token) => (
          <Bar key={token.name} token={token} use={`${GAP_USE[token.name] ?? ''} · = ${token.alias}`} />
        ))}
      </div>

      <h2 id="grid">Grid</h2>
      <p>Mobil ekranlarda kenar boşluğu 24 px, sütun arası 8 px’tir. Tablet ve masaüstü değerleri aynı ölçekten gelir.</p>
      <TokenTable rows={GRID_TOKENS} />
    </>
  );
}

/* ------------------------------------------------------------------ Boyut */

export function SizeDocs() {
  const scale = SIZE_TOKENS.filter((token) => token.name.startsWith('--size-'));
  const semantic = SIZE_TOKENS.filter((token) => !token.name.startsWith('--size-'));
  return (
    <>
      <h2 id="olcek">Ölçek · size</h2>
      <p>İkon, avatar, kontrol yüksekliği gibi sabit ölçüler bu ölçekten seçilir.</p>
      <div className={styles.sizes}>
        {scale.map((token) => (
          <div key={token.name} className={styles.sizeItem}>
            <span className={styles.sizeBox} style={{ width: `var(${token.name})`, height: `var(${token.name})` }} />
            <code className={styles.varCode}>{token.name}</code>
          </div>
        ))}
      </div>

      <h2 id="anlamli">Anlamlı boyutlar</h2>
      <p>
        Bileşenlerde ölçek yerine bu değişkenler kullanılır. <code>--touch-target-min</code> (44 px) dokunulabilir her öğenin en küçük
        alanıdır; ikon küçük olsa bile buton alanı bunun altına inmez.
      </p>
      <TokenTable
        rows={semantic}
        preview={(row) => (
          <span className={styles.sizeBox} style={{ width: `var(${row.name})`, height: `var(${row.name})` }} />
        )}
      />

      <h2 id="buton-olculeri">Buton ölçüleri</h2>
      <p>
        Figma’daki <strong>12 - Buton Olculeri</strong> koleksiyonu: butonun yüksekliği, iç boşluğu, köşe yarıçapı, kenarlığı, ikon boyutu ve
        etiket tipografisi. Small 40 px, Large 56 px yüksekliktedir; çoğu değer yukarıdaki ölçeklere bağlıdır.
      </p>
      <TokenTable rows={BUTTON_TOKENS} />
    </>
  );
}

/* ------------------------------------------------------------------ Köşe yarıçapı + kenarlık */

const RADIUS_USE: Record<string, string> = {
  '--radius-none': 'Köşesiz yüzey, tam genişlik bant',
  '--radius-xs': 'Etiket, küçük rozet',
  '--radius-sm': 'Input, çip',
  '--radius-md': 'Kart, buton, panel',
  '--radius-lg': 'Büyük kart',
  '--radius-xl': 'Öne çıkan kart, modal',
  '--radius-2xl': 'Alt sayfa, geniş yüzey',
  '--radius-full': 'Hap biçim, avatar, nokta',
};

export function RadiusDocs() {
  return (
    <>
      <h2 id="olcek">Köşe yarıçapı</h2>
      <p>Yarıçap yüzeyin hiyerarşisini taşır: yüzey ne kadar büyükse köşe o kadar yumuşaktır.</p>
      <div className={styles.radii}>
        {RADIUS_TOKENS.map((radius) => (
          <div key={radius.name} className={styles.radiusCard}>
            <span className={styles.radiusBox} style={{ borderRadius: `var(${radius.name})` }} />
            <code className={styles.varCode}>{radius.name}</code>
            <span className={styles.radiusMeta}>
              {radius.value === '9999' ? 'tam' : px(radius.value)} · {RADIUS_USE[radius.name]}
            </span>
          </div>
        ))}
      </div>

      <h2 id="kenarlik">Kenarlık kalınlığı</h2>
      <p>
        Ayırıcı çizgiler <code>--border-width-thin</code>, odak halkası <code>--border-width-medium</code> kullanır. Kenarlık rengi{' '}
        <code>--odea-border-*</code> renk token’larından gelir.
      </p>
      <TokenTable
        rows={BORDER_TOKENS}
        preview={(row) => <span className={styles.borderSample} style={{ borderTopWidth: `var(${row.name})` }} />}
      />

      <h2 id="kurallar">Kullanım kuralları</h2>
      <ul>
        <li>İç içe köşelerde dış yarıçap iç yarıçaptan büyük olur.</li>
        <li>Yarıçap ve kenarlığı px olarak yazmayın; token seçin.</li>
        <li>
          <code>--radius-full</code> yalnız çip, rozet, avatar ve nokta gibi küçük öğelerde kullanılır.
        </li>
      </ul>
    </>
  );
}

/* ------------------------------------------------------------------ Gölge + opaklık */

const SHADOW_LEVELS = [
  { key: 'card', title: 'Card', use: 'Zeminden hafifçe ayrışan kart.' },
  { key: 'default', title: 'Default', use: 'Varsayılan yüzey gölgesi; kartlar ve butonlar.' },
  { key: 'dropdown', title: 'Dropdown', use: 'Açılır menü, popover.' },
  { key: 'modal', title: 'Modal', use: 'Modal ve alt sayfa; en yüksek seviye.' },
];

export function ElevationDocs() {
  const opacityScale = OPACITY_TOKENS.filter((token) => !token.alias);
  const opacitySemantic = OPACITY_TOKENS.filter((token) => token.alias);
  return (
    <>
      <h2 id="seviyeler">Gölge seviyeleri</h2>
      <p>
        Dört seviye vardır; yüzey ne kadar öndeyse gölge o kadar uzun ve yumuşaktır. Rengi her seviyenin kendi
        <code>--shadow-*-color</code> değişkeninden gelir. Card ve Default, Light/Dark modda değişen <code>--odea-effect-shadow</code>{' '}
        token’ını kullanır; Dropdown (%14) ve Modal (%18) slate renginin daha koyu sabit tonlarıdır. Koyu zeminde Default yerine{' '}
        <code>--shadow-default-dark-color</code> (#00000033) kullanılır.
      </p>
      <div className={styles.shadowGrid}>
        {SHADOW_LEVELS.map((level) => {
          const parts = SHADOW_TOKENS.filter((token) => token.name.startsWith(`--shadow-${level.key}-`));
          const value = (part: string) => parts.find((token) => token.name.endsWith(`-${part}`))?.value ?? '0';
          return (
            <div key={level.key} className={styles.shadowCell}>
              <div className={styles.elevationCard} style={{ boxShadow: `var(--shadow-${level.key})` } as CSSProperties}>
                <span className={styles.elevationTitle}>{level.title}</span>
                <span className={styles.elevationText}>{level.use}</span>
              </div>
              <code className={styles.varCode}>--shadow-{level.key}</code>
              <span className={styles.radiusMeta}>
                x {px(value('offset-x'))} · y {px(value('offset-y'))} · blur {px(value('blur'))} · spread {px(value('spread'))}
              </span>
              <span className={styles.radiusMeta}>
                renk: <code>{SHADOW_COLORS.find((color) => color.name === `--shadow-${level.key}-color`)?.value}</code>
              </span>
            </div>
          );
        })}
      </div>
      <pre>
        <code>{`box-shadow: var(--shadow-card);
/* parça parça: --shadow-card-offset-x / -offset-y / -blur / -spread */`}</code>
      </pre>

      <h2 id="opaklik">Opaklık</h2>
      <p>
        Opaklık ölçeği yarı saydam yüzey, devre dışı durum ve karartma katmanı için kullanılır. Bileşenlerde anlamlı değişkenleri
        tercih edin.
      </p>
      <TokenTable
        rows={opacitySemantic}
        unit="%"
        preview={(row) => <span className={styles.opacitySample} style={{ opacity: `var(${row.name})` }} />}
      />
      <div className={styles.opacityScale}>
        {opacityScale.map((token) => (
          <div key={token.name} className={styles.opacityItem}>
            <span className={styles.opacitySample} style={{ opacity: `var(${token.name})` }} />
            <code className={styles.varCode}>{token.name}</code>
          </div>
        ))}
      </div>

      <h2 id="kurallar">Kullanım kuralları</h2>
      <ul>
        <li>Bir yüzeye tek gölge verilir; katman katman gölge eklenmez.</li>
        <li>Gölgeyi hover veya seçim için büyütmeyin; durumu renk ve kenarlıkla anlatın.</li>
        <li>
          Devre dışı öğe <code>--opacity-state-disabled</code>, modal arkası <code>--opacity-overlay-default</code> kullanır.
        </li>
      </ul>
    </>
  );
}
