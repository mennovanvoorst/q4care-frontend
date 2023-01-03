import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";
import { IoHomeOutline, IoHome, IoDocumentsOutline, IoDocuments, IoBook, IoBookOutline, IoPeople, IoPeopleOutline, IoSchool, IoSchoolOutline, IoReceipt, IoReceiptOutline } from "react-icons/io5";
import useUser from "../../lib/hooks/useUser";
import checkRole from "../../lib/utils/checkRole";
import { USER_ROLES } from "../../lib/utils/constant";

interface Props {
    children: React.ReactNode;
}

const NavBar = () => {
  const { user, isLoading, error } = useUser();
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    if(isLoading || !user) return;

    setItems([
    {
      label: "Dashboard",
      icon: <IoHome />,
      iconActive: <IoHomeOutline />,
      destination: "/",
      visible: true,
    },
    {
      label: "Certificaten",
      icon: <IoDocuments />,
      iconActive: <IoDocumentsOutline />,
      destination: "/certificates",
      visible: checkRole(user.flags, USER_ROLES.paid),
    },
    {
      label: "Leermiddelen",
      icon: <IoBook />,
      iconActive: <IoBookOutline />,
      destination: "/resources",
      visible: checkRole(user.flags, USER_ROLES.student)
    },
    {
      label: "Transacties",
      icon: <IoReceipt />,
      iconActive: <IoReceiptOutline />,
      destination: "/payments",
      visible: true,
    },
    {
      label: "Vaardigheden",
      icon: <IoSchool />,
      iconActive: <IoSchoolOutline />,
      destination: "/skills",
      visible: checkRole(user.flags, USER_ROLES.teacher)
    },
    {
      label: "Gebruikers",
      icon: <IoPeople />,
      iconActive: <IoPeopleOutline />,
      destination: "/users",
      visible: checkRole(user.flags, USER_ROLES.admin)
    },
  ]);
  }, [user, isLoading])

  const navItems = items.map(item => <NavLink key={item.label} href={item.destination} label={item.label} icon={item.icon} iconActive={item.iconActive} visible={item.visible} />)

  return (
    <nav className="w-full">
      <ul className="w-full flex flex-col gap-y-4">
        {navItems}
      </ul>
    </nav>
  )
};

export default NavBar;