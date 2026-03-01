export type PropRow = {
  name: string;
  required: boolean;
  type: string;
  default: string;
  description: string;
};

export default function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="py-2 pl-4 pr-4 font-semibold text-slate-900 dark:text-white">Prop</th>
            <th className="py-2 pr-4 font-semibold text-slate-900 dark:text-white">Type</th>
            <th className="py-2 pr-4 font-semibold text-slate-900 dark:text-white">Default</th>
            <th className="py-2 pr-4 font-semibold text-slate-900 dark:text-white">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.name}
              className={i % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800/50' : ''}
            >
              <td className="py-2 pl-4 pr-4">
                <code className="text-sm font-medium text-slate-900 dark:text-white">{row.name}</code>
                {row.required && (
                  <span className="ml-1.5 rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900 dark:text-red-300">
                    required
                  </span>
                )}
              </td>
              <td className="py-2 pr-4">
                <code className="whitespace-nowrap text-xs text-slate-600 dark:text-slate-400">{row.type}</code>
              </td>
              <td className="py-2 pr-4">
                <code className="text-xs text-slate-500 dark:text-slate-500">{row.default}</code>
              </td>
              <td className="py-2 pr-4 text-slate-600 dark:text-slate-400">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
