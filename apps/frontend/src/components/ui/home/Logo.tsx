function Logo() {
  return (
    <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/40 shadow-[0_0_24px_-4px_var(--primary)]">
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 text-primary"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 7V5a1 1 0 0 1 1-1h2" />
        <path d="M20 7V5a1 1 0 0 0-1-1h-2" />
        <path d="M4 17v2a1 1 0 0 0 1 1h2" />
        <path d="M20 17v2a1 1 0 0 1-1 1h-2" />
        <path d="M8 12h8" />
        <path d="M12 8v8" />
      </svg>
    </span>
  );
}

export default Logo;
