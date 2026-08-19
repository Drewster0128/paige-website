export function MediumFilterButton({
  count,
  isSelected,
  label,
  onClick,
}: {
  count: number;
  isSelected: boolean;
  label: string;
  onClick: () => void;
}): React.JSX.Element {
  return (
    <button
      aria-pressed={isSelected}
      className={`rounded-md border px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] transition ${
        isSelected
          ? "border-[var(--brand-primary)] bg-[var(--brand-primary)] text-[var(--cream)]"
          : "border-[var(--brand-primary)]/40 bg-[var(--cream)] text-[var(--brand-primary)] hover:border-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-[var(--cream)]"
      } focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-primary)]`}
      onClick={onClick}
      type="button"
    >
      {label}
      <span className="ml-2 opacity-70">{count}</span>
    </button>
  );
}
