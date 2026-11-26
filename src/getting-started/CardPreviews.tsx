/* Simple illustrative previews built with inline SVG — no external images. */

export function ComponentsPreview() {
  return (
    <svg viewBox="0 0 220 100" role="presentation" focusable="false">
      <rect x="14" y="8" width="192" height="38" rx="7" fill="#ffffff" stroke="#cdd5df" />
      <circle cx="34" cy="27" r="8" fill="#2d353c" />
      <rect x="50" y="18" width="66" height="6" rx="3" fill="#cdd5df" />
      <rect x="50" y="30" width="44" height="5" rx="2.5" fill="#e2e7ee" />
      <rect x="150" y="19" width="42" height="16" rx="8" fill="#ffd600" />
      <rect x="14" y="54" width="192" height="38" rx="7" fill="#2d353c" />
      <circle cx="34" cy="73" r="8" fill="#ffd600" />
      <rect x="50" y="64" width="58" height="6" rx="3" fill="#ffffff" opacity="0.85" />
      <rect x="50" y="76" width="36" height="5" rx="2.5" fill="#ffffff" opacity="0.35" />
      <rect x="150" y="65" width="42" height="16" rx="8" fill="#ffffff" opacity="0.15" />
    </svg>
  );
}

export function IconsPreview() {
  return (
    <svg viewBox="0 0 220 100" role="presentation" focusable="false">
      <g fill="none" stroke="#2d353c" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="42" cy="26" r="10" />
        <rect x="78" y="16" width="20" height="20" rx="4" />
        <path d="M126 36 L136 16 L146 36 Z" />
        <path d="M34 62 h16 M42 54 v16" />
        <path d="M78 70 L88 56 L98 70" />
        <path d="M120 70 L128 62 L136 70 L146 56" />
      </g>
      <g fill="#ffd600">
        <circle cx="180" cy="26" r="6" />
        <rect x="174" y="58" width="12" height="12" rx="3" />
      </g>
      <g fill="#3182ce">
        <circle cx="166" cy="70" r="5" />
        <circle cx="28" cy="88" r="4" />
      </g>
    </svg>
  );
}

export function ColorsPreview() {
  return (
    <svg viewBox="0 0 220 100" role="presentation" focusable="false">
      <g>
        <circle cx="66" cy="50" r="26" fill="#ffd600" />
        <circle cx="94" cy="50" r="26" fill="#3182ce" />
        <circle cx="122" cy="50" r="26" fill="#48bb78" />
        <circle cx="150" cy="50" r="26" fill="#f56565" />
        <circle cx="178" cy="50" r="26" fill="#9f7aea" />
      </g>
      <rect x="26" y="18" width="34" height="8" rx="4" fill="#2d353c" />
      <rect x="26" y="72" width="52" height="8" rx="4" fill="#cdd5df" />
    </svg>
  );
}
