export default function LicensePage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">License</h1>
      <p className="mb-4 text-slate-600 dark:text-slate-400">
        This project is licensed under the{' '}
        <a
          href="https://github.com/mohsentaleb/react-tailwindcss-datetimepicker/blob/master/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 hover:underline dark:text-sky-400"
        >
          MIT License
        </a>
        .
      </p>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
        <p className="mb-4">MIT License</p>
        <p className="mb-4">Copyright (c) 2024 Mohsen Taleb</p>
        <p className="mb-4">
          Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
          documentation files (the "Software"), to deal in the Software without restriction, including without
          limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
          the Software, and to permit persons to whom the Software is furnished to do so, subject to the following
          conditions:
        </p>
        <p className="mb-4">
          The above copyright notice and this permission notice shall be included in all copies or substantial
          portions of the Software.
        </p>
        <p>
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
          LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
          EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
          AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
          USE OR OTHER DEALINGS IN THE SOFTWARE.
        </p>
      </div>
    </div>
  );
}
