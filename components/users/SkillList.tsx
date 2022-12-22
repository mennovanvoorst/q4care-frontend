import React from "react";
import Button from "../common/Button";
import { IoTrashBin } from "react-icons/io5";

interface Props {
    skills: any[];
    onDelete?: (file: any) => void;
}

const SkillList = ({ skills, onDelete }: Props) => {
  const listedSkills = skills.map(skill => (
    <li className="flex items-center justify-between" key={skill.id}>
      {skill.name} 
      <div>
        {onDelete && <Button type="button" variant="transparent" size="sm" onClick={() => onDelete(skill)} rounded><IoTrashBin className="w-8" /></Button> }
      </div>
    </li>
  ));

  return (
    <ul className="text-left w-full">
      {listedSkills}
    </ul>
  )
};

export default SkillList;