import { IoPencil, IoSchoolOutline, IoTrashBin } from "react-icons/io5";
import Button from "../common/Button";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  email: string;
  hasPaid?: boolean;
  isTeacher?: boolean;
  isAdministrator?: boolean;
}
const UserCard = ({
  id,
  name,
  email,
  hasPaid = false,
  isTeacher = false,
  isAdministrator = false,
  ...props
}: Props) => {
  const getRole = () => {
    if (isAdministrator) return "Administrator";
    if (isTeacher) return "Docent";

    return "Student";
  };

  const getStatus = () => (hasPaid ? "Actief" : "Niet actief");

  return (
    <li
      className={`bg p-4 rounded-xl bg-slate-700 flex items-center gap-4`}
      {...props}
    >
      <span className="w-8">
        <IoSchoolOutline />
      </span>
      <p className="flex flex-col grow mb-0">
        <span className="font-medium">
          {name} ({getStatus()})
        </span>
        <span className="text-sm">{getRole()}</span>
      </p>
      <p className="flex flex-col grow text-sm mb-0">{email}</p>
      <Link href={`/users/edit/${id}`}>
        <Button variant="transparent" rounded>
          <IoPencil className="w-8" />
        </Button>
      </Link>
    </li>
  );
};

export default UserCard;
