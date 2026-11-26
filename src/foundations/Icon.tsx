import iconManifestRaw from './icons/manifest.json';

export const ICON_SETS = [
  'Arrows / Simple',
  'Arrows / Circle',
  'Arrows / Square',
  'Arrows / Arc',
  'Arrows / Arcs',
  'Arrows / Bend',
  'Arrows / Elbow',
  'Arrows / Fat / Simple',
  'Arrows / Fat / 1 Line',
  'Arrows / Fat / 2 Lines',
  'Arrows / Line',
  'Arrows / U Turn',
  'Arrows / Double',
  'Arrows / Caret',
  'Arrows / Caret Circle',
  'Banking',
  'Design',
  'Brands',
  'Development',
  'Commerce',
  'Education',
  'Games',
  'Communications',
  'Maps',
  'Currency',
  'Security',
  'Media',
  'System',
  'Office',
  'Time',
  'Health',
  'People',
  'Weather',
  'Math',
] as const;

export type IconSet = (typeof ICON_SETS)[number];

export type IconManifestEntry = {
  set: IconSet;
  name: string;
  file: string;
  size: number;
  vb: number[];
};

export const iconManifest = iconManifestRaw as IconManifestEntry[];

export type IconProps = {
  set: IconSet;
  name: string;
  size?: number;
  title?: string;
  className?: string;
};

const rawIcons = import.meta.glob('./icons/**/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

// Exact lookup keyed by the real name, plus a loose fallback so "term-deposit"
// also finds "TermDeposit". Loose keys keep the first entry on collisions
// (e.g. Banking has both "Debt payment" and "DebtPayment").
const iconSource = new Map<string, string>();
const iconSourceLoose = new Map<string, string>();
for (const entry of iconManifest) {
  const raw = rawIcons[`./icons/${entry.file}`];
  if (!raw) continue;
  const set = normalize(entry.set);
  iconSource.set(`${set}/${entry.name.toLowerCase()}`, raw);
  const looseKey = `${set}/${normalize(entry.name)}`;
  if (!iconSourceLoose.has(looseKey)) iconSourceLoose.set(looseKey, raw);
}

const sizedCache = new Map<string, string>();

function resizeSvg(raw: string, size: number) {
  return raw.replace(/<svg\b([^>]*)>/, (_match, attributes: string) => {
    const rest = attributes.replace(/\s(?:width|height)="[^"]*"/g, '');
    return `<svg width="${size}" height="${size}"${rest}>`;
  });
}

const warned = new Set<string>();

export default function Icon({ set, name, size = 24, title, className }: IconProps) {
  const normalizedSet = normalize(set);
  const key = `${normalizedSet}/${normalize(name)}`;
  const raw =
    iconSource.get(`${normalizedSet}/${name.toLowerCase()}`) ??
    iconSourceLoose.get(key);

  if (!raw) {
    if (import.meta.env.DEV && !warned.has(key)) {
      warned.add(key);
      console.warn(`Icon: "${set} / ${name}" bulunamadı.`);
    }
    return null;
  }

  const cacheKey = `${normalizedSet}/${name.toLowerCase()}@${size}`;
  let svg = sizedCache.get(cacheKey);
  if (!svg) {
    svg = resizeSvg(raw, size);
    sizedCache.set(cacheKey, svg);
  }

  return (
    <span
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ display: 'inline-flex', flex: 'none', width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
