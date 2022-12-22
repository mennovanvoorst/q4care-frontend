import { IoPencil, IoSchoolOutline } from "react-icons/io5";
import Button from "../common/Button";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
}
const SkillCard = ({ id, name, ...props}: Props) => {
  return (
    <li className={`bg p-4 rounded-xl bg-slate-700 flex items-center gap-4`} {...props}>
        <span className="w-8"><IoSchoolOutline /></span>
        <p className="flex flex-col grow mb-0">
          <span className="font-medium">{name}</span>
        </p>
        <Link href={`/skills/edit/${id}`}><Button variant="transparent" size="sm" rounded><IoPencil className="w-8" /></Button></Link>
    </li>
  );
};

export default SkillCard;