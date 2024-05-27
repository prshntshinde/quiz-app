export default function SideMenu() {
  const links = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Quiz", href: "/admin/quiz" },
    { label: "Questions", href: "/admin/questions" },
  ];
  return (
    <div className="flex flex-col justify-between h-screen text-center bg-white border-e">
      <ul className="px-4 mt-3 space-y-1">
        {links.map((link) => (
          <li
            key={link.href}
            className="block px-4 py-2 font-bold border rounded-lg text-black-600 text-md hover:bg-sky-100 hover:text-blue-600 border-slate-300"
          >
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
