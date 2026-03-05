import { useCallback, useEffect, useRef, useState } from 'react';

import llmText from '../public/llms.txt?raw';

function ClipboardIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 256 256">
      <path d="M238,88.18a52.42,52.42,0,0,1-15.4,35.66l-34.75,34.75A52.28,52.28,0,0,1,150.62,174h-.05A52.63,52.63,0,0,1,98,119.9a6,6,0,0,1,6-5.84h.17a6,6,0,0,1,5.83,6.16A40.62,40.62,0,0,0,150.58,162h0a40.4,40.4,0,0,0,28.73-11.9l34.75-34.74A40.63,40.63,0,0,0,156.63,57.9l-11,11a6,6,0,0,1-8.49-8.49l11-11a52.62,52.62,0,0,1,74.43,0A52.83,52.83,0,0,1,238,88.18Zm-127.62,98.9-11,11A40.36,40.36,0,0,1,70.6,210h0a40.63,40.63,0,0,1-28.7-69.36L76.62,105.9A40.63,40.63,0,0,1,146,135.77a6,6,0,0,0,5.83,6.16H152a6,6,0,0,0,6-5.84A52.63,52.63,0,0,0,68.14,97.42L33.38,132.16A52.63,52.63,0,0,0,70.56,222h0a52.26,52.26,0,0,0,37.22-15.42l11-11a6,6,0,1,0-8.49-8.48Z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 256 256">
      <path d="M222,104a6,6,0,0,1-12,0V54.49l-69.75,69.75a6,6,0,0,1-8.48-8.48L201.51,46H152a6,6,0,0,1,0-12h64a6,6,0,0,1,6,6Zm-38,26a6,6,0,0,0-6,6v72a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V80a2,2,0,0,1,2-2h72a6,6,0,0,0,0-12H48A14,14,0,0,0,34,80V208a14,14,0,0,0,14,14H176a14,14,0,0,0,14-14V136A6,6,0,0,0,184,130Z" />
    </svg>
  );
}

function ClaudeIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 12 12" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.3545 7.9775L4.7145 6.654L4.7545 6.539L4.7145 6.475H4.6L4.205 6.451L2.856 6.4145L1.6865 6.366L0.5535 6.305L0.268 6.2445L0 5.892L0.0275 5.716L0.2675 5.5555L0.6105 5.5855L1.3705 5.637L2.5095 5.716L3.3355 5.7645L4.56 5.892H4.7545L4.782 5.8135L4.715 5.7645L4.6635 5.716L3.4845 4.918L2.2085 4.074L1.5405 3.588L1.1785 3.3425L0.9965 3.1115L0.9175 2.6075L1.2455 2.2465L1.686 2.2765L1.7985 2.307L2.245 2.65L3.199 3.388L4.4445 4.3045L4.627 4.4565L4.6995 4.405L4.709 4.3685L4.627 4.2315L3.9495 3.0085L3.2265 1.7635L2.9045 1.2475L2.8195 0.938C2.78711 0.819128 2.76965 0.696687 2.7675 0.5735L3.1415 0.067L3.348 0L3.846 0.067L4.056 0.249L4.366 0.956L4.867 2.0705L5.6445 3.5855L5.8725 4.0345L5.994 4.4505L6.0395 4.578H6.1185V4.505L6.1825 3.652L6.301 2.6045L6.416 1.257L6.456 0.877L6.644 0.422L7.0175 0.176L7.3095 0.316L7.5495 0.6585L7.516 0.8805L7.373 1.806L7.0935 3.2575L6.9115 4.2285H7.0175L7.139 4.1075L7.6315 3.4545L8.4575 2.4225L8.8225 2.0125L9.2475 1.5605L9.521 1.345H10.0375L10.4175 1.9095L10.2475 2.4925L9.7155 3.166L9.275 3.737L8.643 4.587L8.248 5.267L8.2845 5.322L8.3785 5.312L9.8065 5.009L10.578 4.869L11.4985 4.7115L11.915 4.9055L11.9605 5.103L11.7965 5.5065L10.812 5.7495L9.6575 5.9805L7.938 6.387L7.917 6.402L7.9415 6.4325L8.716 6.5055L9.047 6.5235H9.858L11.368 6.636L11.763 6.897L12 7.216L11.9605 7.4585L11.353 7.7685L10.533 7.574L8.6185 7.119L7.9625 6.9545H7.8715V7.0095L8.418 7.5435L9.421 8.4485L10.6755 9.6135L10.739 9.9025L10.578 10.13L10.408 10.1055L9.3055 9.277L8.88 8.9035L7.917 8.0935H7.853V8.1785L8.075 8.503L9.2475 10.2635L9.3085 10.8035L9.2235 10.98L8.9195 11.0865L8.5855 11.0255L7.8985 10.063L7.191 8.9795L6.6195 8.008L6.5495 8.048L6.2125 11.675L6.0545 11.86L5.69 12L5.3865 11.7695L5.2255 11.396L5.3865 10.658L5.581 9.696L5.7385 8.931L5.8815 7.981L5.9665 7.665L5.9605 7.644L5.8905 7.653L5.1735 8.6365L4.0835 10.109L3.2205 11.0315L3.0135 11.1135L2.655 10.9285L2.6885 10.5975L2.889 10.303L4.083 8.785L4.803 7.844L5.268 7.301L5.265 7.222H5.2375L2.066 9.28L1.501 9.353L1.2575 9.125L1.288 8.752L1.4035 8.6305L2.3575 7.9745L2.3545 7.9775Z"
      />
    </svg>
  );
}

function ChatGptIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 16 16" fill="currentColor">
      <path d="M14.9449 6.54871C15.3128 5.45919 15.1861 4.26567 14.5978 3.27464C13.7131 1.75461 11.9345 0.972595 10.1974 1.3406C9.42464 0.481584 8.3144 -0.00692594 7.15045 7.42132e-05C5.37487 -0.00392587 3.79946 1.1241 3.2532 2.79113C2.11256 3.02164 1.12799 3.72615 0.551837 4.72468C-0.339497 6.24071 -0.1363 8.15175 1.05451 9.45178C0.686626 10.5413 0.813308 11.7348 1.40162 12.7258C2.28637 14.2459 4.06498 15.0279 5.80204 14.6599C6.5743 15.5189 7.68504 16.0074 8.849 15.9999C10.6256 16.0044 12.2015 14.8754 12.7478 13.2069C13.8884 12.9764 14.873 12.2718 15.4491 11.2733C16.3394 9.75728 16.1357 7.84774 14.9454 6.54771L14.9449 6.54871ZM8.85001 14.9544C8.13907 14.9554 7.45043 14.7099 6.90468 14.2604C6.92951 14.2474 6.97259 14.2239 7.00046 14.2069L10.2293 12.3668C10.3945 12.2743 10.4959 12.1008 10.4949 11.9133V7.42173L11.8595 8.19925C11.8742 8.20625 11.8838 8.22025 11.8858 8.23625V11.9558C11.8838 13.6099 10.5263 14.9509 8.85001 14.9544ZM2.32133 12.2028C1.9651 11.5958 1.8369 10.8843 1.95902 10.1938C1.98284 10.2078 2.02489 10.2333 2.05479 10.2503L5.28366 12.0903C5.44733 12.1848 5.65003 12.1848 5.81421 12.0903L9.75604 9.84429V11.3993C9.75705 11.4153 9.74945 11.4308 9.73678 11.4408L6.47295 13.3004C5.01915 14.1264 3.1625 13.6354 2.32184 12.2028H2.32133ZM1.47155 5.24819C1.82626 4.64017 2.38619 4.17516 3.05305 3.93366C3.05305 3.96116 3.05152 4.00966 3.05152 4.04366V7.72424C3.05051 7.91124 3.15186 8.08475 3.31654 8.17725L7.25838 10.4228L5.89376 11.2003C5.88008 11.2093 5.86285 11.2108 5.84765 11.2043L2.58331 9.34327C1.13255 8.51426 0.63494 6.68272 1.47104 5.24869L1.47155 5.24819ZM12.6834 7.82274L8.74157 5.57669L10.1062 4.79968C10.1199 4.79068 10.1371 4.78918 10.1523 4.79568L13.4166 6.65522C14.8699 7.48373 15.3681 9.31827 14.5284 10.7523C14.1732 11.3593 13.6138 11.8243 12.9474 12.0663V8.27575C12.9489 8.08875 12.8481 7.91574 12.6839 7.82274H12.6834ZM14.0414 5.8057C14.0176 5.7912 13.9756 5.7662 13.9457 5.7492L10.7168 3.90916C10.5531 3.81466 10.3504 3.81466 10.1863 3.90916L6.24442 6.15521V4.60017C6.2434 4.58417 6.251 4.56867 6.26367 4.55867L9.52751 2.70063C10.9813 1.87311 12.84 2.36563 13.6781 3.80066C14.0323 4.40667 14.1605 5.11618 14.0404 5.8057H14.0414ZM5.50257 8.57726L4.13744 7.79974C4.12275 7.79274 4.11312 7.77874 4.11109 7.76274V4.04316C4.11211 2.38713 5.47368 1.0451 7.15197 1.0461C7.86189 1.0461 8.54902 1.2921 9.09476 1.74011C9.06993 1.75311 9.02737 1.77661 8.99899 1.79361L5.77012 3.63365C5.60493 3.72615 5.50358 3.89916 5.50459 4.08666L5.50257 8.57626V8.57726ZM6.24391 7.00022L7.99972 5.9997L9.75553 6.99972V9.00027L7.99972 10.0003L6.24391 9.00027V7.00022Z" />
    </svg>
  );
}

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

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

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
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <ul className="absolute right-0 z-50 mt-1 w-56 list-none rounded-lg border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800">
          <MenuItem
            icon={<LinkIcon />}
            label="Copy page link"
            description="Copy the current page URL to clipboard"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setMenuOpen(false);
            }}
          />
          <MenuItem
            icon={<ExternalLinkIcon />}
            label="View as Markdown"
            description="Open the Markdown file in a new tab"
            onClick={() => {
              const blob = new Blob([llmText], { type: 'text/plain' });
              window.open(URL.createObjectURL(blob), '_blank');
              setMenuOpen(false);
            }}
          />
          <MenuItem
            icon={<ClaudeIcon />}
            label="Open in Claude"
            description="Ask Claude about this page"
            onClick={() => {
              window.open('https://claude.ai/new?q=' + encodeURIComponent(llmText), '_blank');
              setMenuOpen(false);
            }}
          />
          <MenuItem
            icon={<ChatGptIcon />}
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
