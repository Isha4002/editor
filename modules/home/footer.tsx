import Link from "next/link";

export function Footer() {
  const socialLinks = [
    {
      href: "#",
      icon: (
        <img
          src="/github.svg"
          className="w-5 h-5 opacity-70 hover:opacity-100 transition"
        />
      ),
    },
  ];

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col items-center space-y-6 text-center">

        {/* Social Links */}
        <div className="flex gap-4">
          {socialLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              {link.icon}
            </Link>
          ))}
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} Codesnippet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}