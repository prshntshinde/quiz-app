import SideMenu from "../components/SideMenu";

export default function AdminLayout({ children }) {
  return (
    <>
      <SideMenu />
      {children}
    </>
  );
}
export const metadata = {
  title: "Admin | Quiz App",
  description: "This is a Quiz App",
};
