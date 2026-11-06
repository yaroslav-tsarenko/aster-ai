import { Fragment } from "react";

/* A deliberately tiny markdown renderer for the canned chat responses:
   paragraphs, **bold**, *italic*, `code`, fenced code blocks and lists. */

const renderInline = (text, keyPrefix = "") => {
  const parts = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|_[^_]+_|\*[^*]+\*|\[\d+\])/g;
  let last = 0;
  let match;
  let i = 0;
  while ((match = re.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    const key = `${keyPrefix}-${i++}`;
    if (token.startsWith("**")) parts.push(<strong key={key} className="font-medium text-fg">{token.slice(2, -2)}</strong>);
    else if (token.startsWith("`")) parts.push(<code key={key} className="px-1 py-0.5 rounded-sm bg-raised border border-line font-mono text-[0.85em] text-fg">{token.slice(1, -1)}</code>);
    else if (token.startsWith("[")) parts.push(<sup key={key} className="inline-flex items-center justify-center min-w-[1.05rem] h-[1.05rem] mx-0.5 px-1 rounded-sm bg-accent/15 font-mono text-[0.625rem] font-medium text-accent align-[0.35em]">{token.slice(1, -1)}</sup>);
    else parts.push(<em key={key} className="italic">{token.slice(1, -1)}</em>);
    last = match.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
};

const parseBlocks = (src) => {
  const lines = src.split("\n");
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const code = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      i++; // skip closing fence (may not exist while streaming)
      blocks.push({ type: "code", lang, text: code.join("\n") });
      continue;
    }

    if (line.startsWith("> ")) {
      const quote = [];
      while (i < lines.length && lines[i].startsWith("> ")) quote.push(lines[i++].slice(2));
      blocks.push({ type: "quote", lines: quote });
      continue;
    }

    if (/^\s*(-|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items = [];
      while (i < lines.length && /^\s*(-|\d+\.)\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*(-|\d+\.)\s+/, ""));
        i++;
      }
      blocks.push({ type: ordered ? "ol" : "ul", items });
      continue;
    }

    if (!line.trim()) {
      i++;
      continue;
    }

    const para = [];
    while (i < lines.length && lines[i].trim() && !lines[i].startsWith("```") && !/^\s*(-|\d+\.)\s+/.test(lines[i])) {
      para.push(lines[i++]);
    }
    blocks.push({ type: "p", lines: para });
  }
  return blocks;
};

const Markdown = ({ text, className = "" }) => {
  const blocks = parseBlocks(text);

  return (
    <div className={`space-y-3 ${className}`}>
      {blocks.map((b, idx) => {
        if (b.type === "code")
          return (
            <pre key={idx} className="overflow-x-auto scrollbar-thin p-3.5 rounded-md bg-bg border border-line font-mono text-[0.8125rem] leading-6 text-fg-2">
              {b.lang && <span className="block mb-2 t-label text-fg-4">{b.lang}</span>}
              <code>{b.text}</code>
            </pre>
          );
        if (b.type === "ul" || b.type === "ol") {
          const List = b.type;
          return (
            <List key={idx} className={`space-y-1.5 pl-5 ${b.type === "ul" ? "list-disc marker:text-fg-4" : "list-decimal marker:text-fg-4 marker:font-mono marker:text-xs"}`}>
              {b.items.map((it, j) => (
                <li key={j}>{renderInline(it, `${idx}-${j}`)}</li>
              ))}
            </List>
          );
        }
        if (b.type === "quote")
          return (
            <blockquote key={idx} className="pl-3.5 border-l-2 border-accent text-fg">
              {b.lines.map((l, j) => (
                <Fragment key={j}>
                  {j > 0 && <br />}
                  {renderInline(l, `${idx}-${j}`)}
                </Fragment>
              ))}
            </blockquote>
          );
        if (b.lines.length === 1 && b.lines[0].startsWith("Sources:"))
          return (
            <p key={idx} className="pt-3 border-t border-line font-mono text-xs leading-5 text-fg-3">
              {renderInline(b.lines[0], `${idx}`)}
            </p>
          );
        return (
          <p key={idx}>
            {b.lines.map((l, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {renderInline(l, `${idx}-${j}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
};

export default Markdown;
