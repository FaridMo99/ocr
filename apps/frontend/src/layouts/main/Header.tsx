import Logo from "../../components/ui/home/Logo";

function Header() {
  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
      <a href="/" className="flex items-center gap-2.5">
        <Logo />
        <span className="font-display text-lg font-semibold tracking-tight">
          TextGrab
        </span>
      </a>
    </header>
  );
}

export default Header;
