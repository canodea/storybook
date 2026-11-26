import { useEffect, useRef, useState, type ReactNode } from 'react';
import { DocHero } from '../docs-ui/DocHero';
import { DocTip } from '../docs-ui/DocTip';
import page from '../docs-ui/DocPage.module.css';
import { colorCollections, type ColorToken } from './colors.data';
import styles from './ColorDocs.module.css';

const HUE_ORDER = ['neutral', 'brand', 'blue', 'green', 'orange', 'red', 'yellow', 'pink', 'teal', 'purple', 'cyan'];
const SEMANTIC_ORDER = ['text', 'background', 'surface', 'border', 'brand', 'accent', 'status', 'icon', 'effect', 'system'];

const primitive = colorCollections.find((collection) => collection.id === 'primitive')!;
const semantic = colorCollections.find((collection) => collection.id === 'semantic')!;
const product = colorCollections.find((collection) => collection.id === 'product')!;

const buttonTokens = semantic.tokens.filter((token) => token.group === 'button');
const semanticTokens = semantic.tokens.filter((token) => token.group !== 'button');

const cx = (...values: Array<string | false | undefined>) => values.filter(Boolean).join(' ');

function groupTokens(tokens: ColorToken[], order: string[]) {
  const groups = new Map<string, ColorToken[]>();
  for (const token of tokens) {
    groups.set(token.group, [...(groups.get(token.group) ?? []), token]);
  }
  return [...groups].sort((a, b) => {
    const rankA = order.indexOf(a[0]);
    const rankB = order.indexOf(b[0]);
    return (rankA === -1 ? order.length : rankA) - (rankB === -1 ? order.length : rankB);
  });
}

function copyText(text: string) {
  const fallback = () => {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  };
  try {
    void navigator.clipboard.writeText(text).catch(fallback);
  } catch {
    fallback();
  }
}

type CopyButtonProps = {
  value: string;
  onCopied: (value: string) => void;
  className?: string;
  children: ReactNode;
};

function CopyButton({ value, onCopied, className, children }: CopyButtonProps) {
  return (
    <button type="button" className={cx(styles.copyButton, className)} title={`${value} kopyala`} onClick={() => onCopied(value)}>
      {children}
    </button>
  );
}

function ValueCell({
  hex,
  alias,
  dark = false,
  onCopied,
}: {
  hex: string;
  alias?: string;
  dark?: boolean;
  onCopied: (value: string) => void;
}) {
  return (
    <div className={styles.valueCell}>
      <span className={cx(styles.swatch, styles.swatchSmall, dark && styles.swatchDark)} aria-hidden="true">
        <span className={styles.swatchFill} style={{ background: hex }} />
      </span>
      <CopyButton value={hex} onCopied={onCopied} className={styles.hex}>
        {hex}
      </CopyButton>
      {alias && <span className={styles.alias}>{alias}</span>}
    </div>
  );
}

function TokenTable({ tokens, onCopied }: { tokens: ColorToken[]; onCopied: (value: string) => void }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">Token</th>
            <th scope="col">Light</th>
            <th scope="col">Dark</th>
            <th scope="col">Açıklama</th>
            <th scope="col">CSS değişkeni</th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token.name}>
              <th scope="row" className={styles.tokenCell}>
                <CopyButton value={token.name} onCopied={onCopied} className={styles.tokenName}>
                  {token.name}
                </CopyButton>
              </th>
              <td>
                <ValueCell hex={token.light} alias={token.lightAlias} onCopied={onCopied} />
              </td>
              <td className={styles.darkCell}>
                <ValueCell hex={token.dark ?? token.light} alias={token.darkAlias} dark onCopied={onCopied} />
              </td>
              <td className={styles.description}>{token.description ?? '—'}</td>
              <td>
                <code className={styles.cssVar}>{token.cssVar}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ColorDocs() {
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = (value: string) => {
    copyText(value);
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1500);
  };

  const search = query.trim().toLocaleLowerCase('tr');
  const matches = (token: ColorToken) => !search || token.name.toLocaleLowerCase('tr').includes(search);

  const primitiveGroups = groupTokens(primitive.tokens.filter(matches), HUE_ORDER);
  const semanticGroups = groupTokens(semanticTokens.filter(matches), SEMANTIC_ORDER);
  const visibleButtonTokens = buttonTokens.filter(matches);
  const productTokens = product.tokens.filter((token) => token.group === 'product' && matches(token));
  const assetTokens = product.tokens.filter((token) => token.group === 'asset' && matches(token));
  const nothingFound =
    primitiveGroups.length + semanticGroups.length + visibleButtonTokens.length + productTokens.length + assetTokens.length === 0;

  return (
    <div className={`${page.page} sb-unstyled`}>
      <DocHero
        eyebrow="Foundations"
        title="Renkler"
        lead="Odea’nın renk temeli: ham paletten anlamsal token’lara, ürün ve varlık renklerine kadar tek referans."
      />

      <div className={styles.intro}>
        <p>Renk sistemi üç katmandan oluşur. Tasarımda ve kodda her zaman ihtiyacınıza en yakın katmanı seçin.</p>
        <div className={styles.layers}>
          <div className={styles.layer}>
            <span className={styles.layerName}>Temel palet</span>
            <span className={styles.layerDesc}>Ham renkler. Doğrudan kullanmayın; anlamsal token’ları besler.</span>
          </div>
          <div className={styles.layer}>
            <span className={styles.layerName}>Anlamsal</span>
            <span className={styles.layerDesc}>Light ve Dark modlu token’lar. Tasarımda bunları kullanın.</span>
          </div>
          <div className={styles.layer}>
            <span className={styles.layerName}>Ürün ve Varlık</span>
            <span className={styles.layerDesc}>Kategori ve grafik serisi renkleri. Anlamsal token’ların yerini almaz.</span>
          </div>
        </div>
      </div>

      <DocTip>
        <p>Bileşenlerde ham palet yerine anlamsal token kullanın.</p>
      </DocTip>

      <label className={styles.searchLabel} htmlFor="color-token-search">
        Token ara
      </label>
      <input
        id="color-token-search"
        className={styles.search}
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="örn. text/primary, surface, asset/01"
      />

      {nothingFound && <p className={styles.empty}>“{query}” ile eşleşen token bulunamadı.</p>}

      {primitiveGroups.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle} id="temel-palet">
            Temel palet
          </h2>
          <p className={styles.sectionText}>
            Tüm ham renkler buradadır. Bir bileşende bu değerleri doğrudan kullanmak yerine anlamsal karşılığını seçin.
          </p>
          {primitiveGroups.map(([group, tokens]) => (
            <div key={group}>
              <h3 className={styles.groupTitle}>{group}</h3>
              <div className={styles.swatchGrid}>
                {tokens.map((token) => (
                  <div key={token.name} className={styles.swatchCard}>
                    <span className={styles.swatch} aria-hidden="true">
                      <span className={styles.swatchFill} style={{ background: token.light }} />
                    </span>
                    <CopyButton value={token.name} onCopied={copy} className={styles.tokenName}>
                      {token.name}
                    </CopyButton>
                    <CopyButton value={token.light} onCopied={copy} className={styles.hex}>
                      {token.light}
                    </CopyButton>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {semanticGroups.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle} id="anlamsal">
            Anlamsal token’lar
          </h2>
          <p className={styles.sectionText}>
            Light değerleri <code>var(--odea-*)</code> olarak tanımlıdır; Dark sütunu aynı token’ın koyu temadaki değerini{' '}
            <code>#1c1d21</code> zemin üzerinde gösterir. Alias satırları token’ın hangi temel renkten türediğini belirtir.
          </p>
          {semanticGroups.map(([group, tokens]) => (
            <div key={group}>
              <h3 className={styles.groupTitle}>{group}</h3>
              <TokenTable tokens={tokens} onCopied={copy} />
            </div>
          ))}
        </section>
      )}

      {visibleButtonTokens.length > 0 && (
        <details className={styles.details} open={search ? true : undefined}>
          <summary className={styles.detailsSummary}>Button token’ları ({visibleButtonTokens.length})</summary>
          <TokenTable tokens={visibleButtonTokens} onCopied={copy} />
        </details>
      )}

      {productTokens.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle} id="urun">
            Ürün renkleri
          </h2>
          <p className={styles.sectionText}>Kategori etiketlerinde ve grafiklerde kullanılır.</p>
          <div className={styles.chips}>
            {productTokens.map((token) => (
              <span key={token.name} className={styles.chip} title={`${token.name} · ${token.light}`}>
                <span className={styles.chipDot} style={{ background: token.light }} aria-hidden="true" />
                <span>{token.description ?? token.name}</span>
                <code className={styles.chipHex}>{token.light}</code>
              </span>
            ))}
          </div>
        </section>
      )}

      {assetTokens.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle} id="varlik">
            Varlık serisi
          </h2>
          <p className={styles.sectionText}>Çoklu serili grafiklerde 01–28 sırasıyla kullanılır.</p>
          <ol className={styles.assets}>
            {assetTokens.map((token) => (
              <li key={token.name} className={styles.asset} title={`${token.name} · ${token.light}`}>
                <span className={styles.assetColor} style={{ background: token.light }} aria-hidden="true" />
                <span className={styles.assetName}>{token.name.split('/')[1]}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <div className={styles.toast} data-visible={copied} role="status" aria-live="polite">
        {copied ? 'Kopyalandı' : ''}
      </div>
    </div>
  );
}
