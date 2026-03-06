import { useCallback, useRef, useState } from 'react';

import { useOnClickOutside } from 'usehooks-ts';

import ChatGptIcon from '../assets/chatgpt.svg?react';
import CheckIcon from '../assets/check.svg?react';
import ChevronDownIcon from '../assets/chevron-down.svg?react';
import ClaudeIcon from '../assets/claude.svg?react';
import ClipboardIcon from '../assets/clipboard.svg?react';
import ExternalLinkIcon from '../assets/external-link.svg?react';
import LinkIcon from '../assets/link.svg?react';
import llmText from '../public/llms.txt?raw';

function MenuItem({
  icon,
  label,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <li>
      <button
        className="block w-full cursor-pointer bg-transparent px-3 py-2 text-left text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-700"
        onClick={onClick}
      >
        <div className="flex items-center gap-2 text-sm">
          {icon}
          {label}
        </div>
        <div className="mt-0.5 ml-6 text-xs text-slate-500 dark:text-slate-400">{description}</div>
      </button>
    </li>
  );
}

export default function CopyLlmButton() {
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const containerRef = useRef<HTMLDivElement>(null);

  const copyMarkdown = useCallback(async () => {
    await navigator.clipboard.writeText(llmText);
    setCopied(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  }, []);

  useOnClickOutside(containerRef, () => setMenuOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <div className="inline-flex items-stretch rounded border border-slate-200 dark:border-slate-700">
        <button
          onClick={copyMarkdown}
          className="inline-flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800 md:px-3"
          title="Copy Docs for LLMs"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
          ) : (
            <ClipboardIcon className="h-4 w-4" />
          )}
          <span className="hidden md:inline">{copied ? 'Copied!' : 'Copy Docs for LLMs'}</span>
        </button>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="inline-flex items-center border-l border-slate-200 px-1.5 text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
          aria-label="More options"
        >
          <ChevronDownIcon className="h-3.5 w-3.5" />
        </button>
      </div>

      {menuOpen && (
        <ul className="absolute right-0 z-50 mt-1 w-56 list-none rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <MenuItem
            icon={<LinkIcon className="h-4 w-4 shrink-0" />}
            label="Copy page link"
            description="Copy the current page URL to clipboard"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setMenuOpen(false);
            }}
          />
          <MenuItem
            icon={<ExternalLinkIcon className="h-4 w-4 shrink-0" />}
            label="View as Markdown"
            description="Open the Markdown file in a new tab"
            onClick={() => {
              const blob = new Blob([llmText], { type: 'text/plain' });
              window.open(URL.createObjectURL(blob), '_blank');
              setMenuOpen(false);
            }}
          />
          <MenuItem
            icon={<ClaudeIcon className="h-4 w-4 shrink-0" />}
            label="Open in Claude"
            description="Ask Claude about this page"
            onClick={() => {
              window.open('https://claude.ai/new?q=' + encodeURIComponent(llmText), '_blank');
              setMenuOpen(false);
            }}
          />
          <MenuItem
            icon={<ChatGptIcon className="h-4 w-4 shrink-0" />}
            label="Open in ChatGPT"
            description="Ask ChatGPT about this page"
            onClick={() => {
              window.open('https://chatgpt.com/?q=' + encodeURIComponent(llmText), '_blank');
              setMenuOpen(false);
            }}
          />
        </ul>
      )}
    </div>
  );
}
