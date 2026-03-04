import { useEffect, useState } from 'react';

import type { Highlighter } from 'shiki';

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import('shiki').then(({ createHighlighter }) =>
      createHighlighter({
        themes: ['github-light', 'github-dark'],
        langs: ['tsx', 'typescript', 'bash', 'css', 'html', 'javascript'],
      }),
    );
  }
  return highlighterPromise;
}

export function useHighlighter() {
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);

  useEffect(() => {
    getHighlighter().then(setHighlighter);
  }, []);

  return highlighter;
}
