export function PageLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <section className="mx-auto flex w-full max-w-[1264px] grow flex-col gap-6 px-4 py-12 text-[var(--cream)]">
      <h1 className="text-center text-4xl sm:text-5xl">{title}</h1>
      <div className="mx-auto w-full max-w-3xl text-lg leading-relaxed">
        {children}
      </div>
    </section>
  );
}
