#!/usr/bin/env python3
"""Figma Foundation değişkenlerinden (scripts/figma-foundation.json) şunları üretir:
- src/styles/foundation.css   : tüm tipografi / boşluk / boyut / grid / radius / kenarlık / opaklık / gölge değişkenleri
- src/styles/typography.css   : 38 Figma metin stili için .odea-<stil> sınıfları
- src/foundations/foundation.data.ts : doküman sayfalarının verisi

Kullanım: python3 scripts/gen-foundation.py
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
data = json.loads((ROOT / 'scripts/figma-foundation.json').read_text())


def num(v):
    v = round(float(v), 2)
    return str(int(v)) if v == int(v) else f'{v:g}'


def css_name(figma_name, prefix=''):
    return '--' + prefix + figma_name.replace('/', '-')


WEIGHTS = {'Regular': 400, 'Medium': 500, 'Semi Bold': 600, 'Bold': 700}
FAMILY = {'Red Hat Display': 'display', 'Inter': 'body'}

lines = ['/* Odea Foundation — Figma değişkenlerinden üretildi (scripts/gen-foundation.py). Elle düzenlemeyin. */', ':root {']


def section(title):
    lines.append(f'\n  /* {title} */')


section('Yazı ağırlıkları')
for name, w in WEIGHTS.items():
    lines.append(f"  --font-weight-{name.lower().replace(' ', '')}: {w};")

prefixes = {
    '04 - Tipografi': ('Tipografi', ''),
    '05 - Bosluk': ('Boşluk', ''),
    '06 - Boyut': ('Boyut', ''),
    '07 - Grid': ('Grid', 'grid-'),
    '08 - Radius': ('Köşe yarıçapı', ''),
    '09 - Kenarlik': ('Kenarlık', ''),
    '10 - Opaklik': ('Opaklık', 'opacity-'),
    '11 - Golge': ('Gölge', 'shadow-'),
    '12 - Buton Olculeri': ('Buton ölçüleri', 'button-'),
}

def var_for(coll, name):
    prefix = prefixes[coll][1]
    if coll == '10 - Opaklik' and name.startswith('opacity/'):
        prefix = ''
    return css_name(name, prefix)


VARMAP = {n: var_for(c, n) for c in prefixes for n, _ in data['vars'][c]}
RAW = {n: v for c in data['vars'].values() for n, v in c}
# Tipografi koleksiyonundaki metin değerli değişkenler (aile / stil) CSS'te farklı adlarla tutulur.
VARMAP.update({'font/family/display': '--font-family-display', 'font/family/body': '--font-family-body',
               'font/style/bold': '--font-weight-bold', 'font/style/regular': '--font-weight-regular',
               'font/style/medium': '--font-weight-medium', 'effect/shadow': '--odea-effect-shadow'})
RAW.update({'font/family/display': 'Red Hat Display', 'font/family/body': 'Inter', 'font/style/bold': 'Bold',
            'font/style/regular': 'Regular', 'font/style/medium': 'Medium'})

tokens = {}  # collection -> list of (cssvar, raw value, alias css var or None)
for coll, (title, _) in prefixes.items():
    section(title)
    out = []
    for name, value in data['vars'][coll]:
        var = VARMAP[name]
        if isinstance(value, str) and value.startswith('@'):
            target = value[1:]
            lines.append(f'  {var}: var({VARMAP[target]});')
            out.append((var, RAW[target], VARMAP[target]))
        else:
            if coll == '10 - Opaklik':
                css = num(value / 100)
            else:
                css = f'{num(value)}px'
            lines.append(f'  {var}: {css};')
            out.append((var, value, None))
    tokens[coll] = out

section('Gölge renkleri (11 - Golge renk değişkenleri)')
shadow_colors = []
for name, value in data['shadowColors']:
    var = css_name(name, 'shadow-')
    css = f'var({VARMAP[value[1:]]})' if value.startswith('@') else value
    lines.append(f'  {var}: {css};')
    shadow_colors.append({'name': var, 'value': css})

section('Birleşik gölgeler')
for level in ['card', 'dropdown', 'modal', 'default']:
    lines.append(
        f'  --shadow-{level}: var(--shadow-{level}-offset-x) var(--shadow-{level}-offset-y) '
        f'var(--shadow-{level}-blur) var(--shadow-{level}-spread) var(--shadow-{level}-color);'
    )
lines.append('  /* Figma efekt stilleri: Elevation / Button ve Elevation / Strong */')
lines.append('  --shadow-button: var(--button-shadow-offset-x) var(--button-shadow-offset-y) var(--button-shadow-blur) var(--button-shadow-spread) var(--odea-button-shadow-color);')
lines.append('  --shadow-strong: var(--shadow-default-offset-x) var(--shadow-default-offset-y) var(--shadow-default-blur) var(--shadow-default-spread) var(--shadow-default-dark-color);')
lines.append('}')
(ROOT / 'src/styles/foundation.css').write_text('\n'.join(lines) + '\n')

# ---- metin stilleri ----
GROUPS = {
    'Heading': ('Başlık', 'Ekran ve bölüm başlıkları; içerik hiyerarşisi.'),
    'Text': ('Metin', 'Gövde ve uzun okuma metni (paragraf, açıklama); satır yüksekliği %150.'),
    'UI Display': ('UI Display', 'Kısa, vurgulu başlık ve etiketler (kart başlığı, sekme, bölüm etiketi); pozitif harf aralığı.'),
    'UI Text': ('UI Text', 'Arayüz metni: input değeri, liste satırı, yardımcı metin, kısa açıklama.'),
    'UI Numbers': ('UI Numbers', 'Tutar, bakiye, fiyat ve oran gibi sayısal değerler; -%3 harf aralığı.'),
}
NOTES = {
    'UI Display/Button LG': 'Buton etiketi, büyük boy. FULL CAPS, %10 harf aralığı.',
    'UI Display/Button SM': 'Buton etiketi, küçük/varsayılan boy. FULL CAPS, %10 harf aralığı.',
    'UI Display/SM': 'Küçük vurgulu etiket (Section Divider, hafta günleri). FULL CAPS, %10 harf aralığı.',
    'UI Text/XS': 'En küçük yardımcı metin (10 px): tarih rozeti, mikro etiket. Gövde metni için kullanma.',
    'UI Text/XS Medium': 'Kısayol ikon etiketi gibi 10 px vurgulu mikro etiket.',
    'UI Numbers/SM Semi Bold': 'Küçük vurgulu rakam/yüzde (trend göstergesi, özet değeri).',
}
BUTTON_BASE = {'Button LG': 'md', 'Button SM': 'base'}
# Figma metin stillerindeki Text case ayarı (typo sayfası: UI Display Small büyük harf)
TEXT_CASE = {'UI Display/SM': 'uppercase'}

slug = lambda s: re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')
styles_out = []
type_css = ['/* Odea metin stilleri — Figma Text Styles ile birebir (scripts/gen-foundation.py). Elle düzenlemeyin. */']
for name, family, style, size, line, letter in data['styles']:
    group, variant = name.split('/')
    parts = variant.split(' ')
    if variant in BUTTON_BASE:
        base = f'{slug(group)}-{BUTTON_BASE[variant]}'
        extra = None
    else:
        base = f'{slug(group)}-{parts[0].lower()}'
        extra = ' '.join(parts[1:]) or None
    has_vars = any(n.replace('/', '-') == base + '-font-size' for n, _ in data['vars']['04 - Tipografi'])
    cls = 'odea-' + slug(name)
    decl = {
        'font-family': f'var(--font-family-{FAMILY[family]})',
        'font-weight': f"var(--font-weight-{style.lower().replace(' ', '')})",
        'font-size': f'var(--{base}-font-size)' if has_vars else f'{num(size)}px',
        'line-height': (f'var(--{base}-line-height)' if has_vars else f'{num(line)}px') if line else 'normal',
        'letter-spacing': f'var(--{base}-letter-spacing)' if has_vars and variant not in BUTTON_BASE else f'{num(letter)}px',
    }
    if group == 'UI Numbers':
        decl['font-variant-numeric'] = 'tabular-nums'
    if name in TEXT_CASE:
        decl['text-transform'] = TEXT_CASE[name]
    type_css.append(f'.{cls} {{\n' + '\n'.join(f'  {k}: {v};' for k, v in decl.items()) + '\n}')
    styles_out.append({
        'figma': name,
        'group': group,
        'className': cls,
        'varPrefix': base if has_vars else None,
        'family': FAMILY[family],
        'weight': style,
        'size': num(size),
        'line': num(line) if line else 'auto',
        'letter': num(letter),
        'note': NOTES.get(name),
    })
(ROOT / 'src/styles/typography.css').write_text('\n\n'.join(type_css) + '\n')

# ---- doküman verisi ----
def rows(coll):
    return [{'name': v, 'value': raw if isinstance(raw, str) else num(raw), 'alias': a} for v, raw, a in tokens[coll]]

ts = ['// Üretildi: scripts/gen-foundation.py — Figma Foundation değişkenleri. Elle düzenlemeyin.', '']
ts.append('export type TokenRow = { name: string; value: string; alias: string | null };')
ts.append("export type TextStyleRow = { figma: string; group: string; className: string; varPrefix: string | null; family: 'display' | 'body'; weight: string; size: string; line: string; letter: string; note: string | null };")
ts.append(f'export const TEXT_GROUPS = {json.dumps([{"key": k, "title": t, "use": u} for k, (t, u) in GROUPS.items()], ensure_ascii=False, indent=2)} as const;')
ts.append(f'export const TEXT_STYLES: TextStyleRow[] = {json.dumps(styles_out, ensure_ascii=False, indent=2)};')
for key, coll in [('SPACE', '05 - Bosluk'), ('SIZE', '06 - Boyut'), ('GRID', '07 - Grid'), ('RADIUS', '08 - Radius'),
                  ('BORDER', '09 - Kenarlik'), ('OPACITY', '10 - Opaklik'), ('SHADOW', '11 - Golge'),
                  ('BUTTON', '12 - Buton Olculeri')]:
    ts.append(f'export const {key}_TOKENS: TokenRow[] = {json.dumps(rows(coll), ensure_ascii=False, indent=2)};')
ts.append(f'export const SHADOW_COLORS = {json.dumps(shadow_colors, ensure_ascii=False, indent=2)};')
(ROOT / 'src/foundations/foundation.data.ts').write_text('\n'.join(ts) + '\n')

print(f"foundation.css: {sum(len(v) for v in tokens.values())} değişken + 4 birleşik gölge; typography.css: {len(styles_out)} stil")
