import { Fragment } from 'react';

// Renderiza texto con marcadores ligeros: **negrita** y `código`.
export function Rich({ text }: { text: string }) {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return (
    <>
      {tokens.map((t, i) => {
        if (t.startsWith('**') && t.endsWith('**')) {
          return <strong key={i} className="font-bold">{t.slice(2, -2)}</strong>;
        }
        if (t.startsWith('`') && t.endsWith('`')) {
          return <code key={i} className="rich-code">{t.slice(1, -1)}</code>;
        }
        return <Fragment key={i}>{t}</Fragment>;
      })}
    </>
  );
}
