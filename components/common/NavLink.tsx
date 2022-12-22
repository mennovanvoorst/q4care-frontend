import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
    icon: React.ReactNode;
    iconActive: React.ReactNode;
  href: string;
  label: string;
  visible: boolean;
}
const NavLink = ({icon, iconActive, href, label, visible}: Props) => {
  const router = useRouter();
  const { asPath } = router;

  const isActive = asPath === href;

  if(!visible) return <></>;

  return (
    <li className={`bg px-4 py-2 font-medium rounded ${isActive ? "bg-slate-700" : "bg-transparent"} hover:bg-slate-600`}>
        <Link href={href} className="flex items-center">
            <span className="w-6 mr-4 flex items-center justify-center">{ isActive ? icon : iconActive}</span>
            {label}
        </Link>
    </li>
  );
};

export default NavLink;