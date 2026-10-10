export default function DashboardPage() {
  return (
    <div className="p-xl gap-xl flex w-full flex-col">
      <div className="gap-xl flex items-center justify-between">
        <div className="flex flex-col">
          <div className="gap-sm flex items-center">
            <span className="text-label-mono font-label-mono text-primary uppercase tracking-[0.2em]">
              Dashboard
            </span>
            <div className="bg-outline-variant/30 h-px w-12"></div>
          </div>
          <h1 className="text-headline-lg font-headline-lg text-on-surface">Welcome to Omnihub</h1>
        </div>
      </div>

      <div className="p-lg border-outline-variant/10 rounded-xl border bg-surface-container-low shadow-md">
        <div className="gap-md mb-lg flex items-center">
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
            <span className="text-primary">✨</span>
          </div>
          <div>
            <h2 className="text-headline-md font-headline-md text-on-surface leading-tight">
              Dashboard Coming Soon
            </h2>
            <p className="text-caption text-on-surface-variant">
              More features and content will be added here
            </p>
          </div>
        </div>
        <p className="text-body-md text-on-surface-variant">
          This is your dashboard home page. Navigate using the menu on the left to access different
          features like connected apps, file manager, chat engine, and billing.
        </p>
      </div>
    </div>
  );
}
