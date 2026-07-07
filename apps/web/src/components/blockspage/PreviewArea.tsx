interface PreviewAreaProps {
  children?: React.ReactNode;
}

export function PreviewArea({ children }: PreviewAreaProps) {
  return (
    <div className="bg-[#fafafa] border border-[#e4e4e7] rounded-xl min-h-[320px] flex items-center justify-center p-8">
      {children ? (
        children
      ) : (
        <p className="font-sans text-sm text-[#71717a] text-center">
          Live preview — coming in Phase 2
        </p>
      )}
    </div>
  );
}
