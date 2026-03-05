import { useEffect, useState } from 'react';

import { useLocalStorage, useMediaQuery } from 'usehooks-ts';

import { useHighlighter } from '../hooks/useHighlighter';

interface CodeBlockProps {
  code: string;
  lang?: string;
}

export default function CodeBlock({ code, lang = 'tsx' }: CodeBlockProps) {
  const highlighter = useHighlighter();
  const isDarkOS = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkMode] = useLocalStorage('usehooks-ts-dark-mode', isDarkOS);
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (!highlighter) return;
    const shikiLang = lang === 'js' ? 'javascript' : lang === 'ts' ? 'typescript' : lang;
    const highlighted = highlighter.codeToHtml(code, {
      lang: shikiLang,
      theme: isDarkMode ? 'github-dark' : 'github-light',
    });
    setHtml(highlighted);
  }, [highlighter, code, lang, isDarkMode]);

  function handleCopy() {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!html) {
    return (
      <pre className="overflow-x-auto rounded-lg bg-slate-50 p-4 text-sm text-slate-800 dark:bg-slate-800 dark:text-slate-200">
        <code>{code}</code>
      </pre>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-transparent">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 rounded bg-slate-700 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <div
        className="overflow-x-auto text-sm [&_pre]:p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
