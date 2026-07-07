interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  props: PropRow[];
  className?: string;
}

export function PropsTable({ props, className = "" }: PropsTableProps) {
  return (
    <div className={`overflow-x-auto rounded-lg border border-gray-200 ${className}`}>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Prop
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Type
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">
              Default
            </th>
            <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {props.map((prop) => (
            <tr key={prop.name} className="bg-white hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-mono text-xs font-medium text-gray-900 whitespace-nowrap">
                {prop.name}
                {prop.required && (
                  <span className="ml-1 text-red-400 text-[10px]">*</span>
                )}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-violet-600 whitespace-nowrap">
                {prop.type}
              </td>
              <td className="px-4 py-3 font-mono text-xs text-gray-400 hidden sm:table-cell whitespace-nowrap">
                {prop.default ?? "—"}
              </td>
              <td className="px-4 py-3 text-xs text-gray-500 leading-5">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
