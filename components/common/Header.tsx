import Image from "next/image";
import Link from "next/link";
import useUser from "../../lib/hooks/useUser";
import Logo from "../../public/images/logo.png";
import Dropdown from "./Dropdown";

const items = [
  {
    label: "Uitloggen",
    destination: "/auth/logout"
  }
];

const Header = () => {
  const { user, isLoading, error } = useUser();

  const isAuthenticated = !error && user;

  return (
    <header className="w-full h-16 flex items-center justify-between">
      <div className="font-medium text-2xl text-white flex items-center gap-4"><Image src={Logo} alt="Q4Care" height={32} /> Q4care portaal</div>
      { isAuthenticated ? <Dropdown items={items} variant="secondary">{ `${user.firstName} ${user.lastName}` }</Dropdown> : <span className="font-medium text-white hover:underline"><Link href="/auth/login">Inloggen</Link></span> }
    </header> 
  )
};

export default Header;