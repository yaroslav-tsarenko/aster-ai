import { Fragment } from "react";

/* A deliberately tiny markdown renderer for the canned chat responses:
   paragraphs, **bold**, *italic*, `code`, fenced code blocks and lists. */

const renderInline = (text, keyPrefix = "") => {
  const parts = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|_[^_]+_|\*[^*]+\*)/g;
  let last = 0;
  let match;
  let i = 0;
  while ((match = re.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const token = match[0];
    const key = `${keyPrefix}-${i++}`;
    if (token.startsWith("**")) parts.push(<strong key={key} className="font-semibold text-n-1">{token.slice(2, -2)}</strong>);
    else if (token.startsWith("`")) parts.push(<code key={key} className="px-1.5 py-0.5 rounded bg-n-6 font-code text-[0.85em] text-color-2">{token.slice(1, -1)}</code>);
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
            <pre key={idx} className="overflow-x-auto scrollbar-thin p-4 rounded-xl bg-n-8 border border-n-6 font-code text-sm leading-6 text-n-2">
              {b.lang && <span className="block mb-2 text-xs uppercase tracking-wider text-n-4">{b.lang}</span>}
              <code>{b.text}</code>
            </pre>
          );
        if (b.type === "ul" || b.type === "ol") {
          const List = b.type;
          return (
            <List key={idx} className={`space-y-1.5 pl-5 ${b.type === "ul" ? "list-disc marker:text-color-1" : "list-decimal marker:text-n-4"}`}>
              {b.items.map((it, j) => (
                <li key={j}>{renderInline(it, `${idx}-${j}`)}</li>
              ))}
            </List>
          );
        }
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
