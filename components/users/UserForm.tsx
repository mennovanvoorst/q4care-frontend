import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ALERT_BASE, ERROR_GENERIC, USER_ROLES } from "../../lib/utils/constant";
import { Error } from "../../lib/utils/types";
import Alert, { AlertVariants } from "../common/Alert";
import Button from "../common/Button";
import ResourceAPI from "../../lib/api/resources";
import TextInput from "../common/TextInput";
import UserAPI from "../../lib/api/user";
import Select from "../common/Select";
import { useUserSkills } from "../../lib/hooks/useUser";
import SkillList from "./SkillList";
import Datalist from "../common/Datalist";
import useSkills from "../../lib/hooks/useSkills";

type Props = {
  defaultUser?: any;
}

const roleOptions = [
  { value: USER_ROLES.default.toString(), label: "Default" },
  { value: USER_ROLES.paid.toString(), label: "Betaalde gebruiker" },
  { value: (USER_ROLES.paid + USER_ROLES.student).toString(), label: "Student" },
  { value: (USER_ROLES.paid + USER_ROLES.student + USER_ROLES.teacher).toString(), label: "Docent" },
  { value: (USER_ROLES.paid + USER_ROLES.student + USER_ROLES.teacher + USER_ROLES.admin).toString(), label: "Administrator" },
]

const UserForm = ({ defaultUser }: Props) => {
  const { skills: skillsList = [], isLoading: skillsLoading, error: skillsError } = useSkills();
  const [ skills, setSkills ] = useState(defaultUser ? defaultUser.skills.map((skill: any) => ( { id: skill.id, name: skill.name })) : []);
  const [ skillsAdded, setSkillsAdded ] = useState<string[]>([]);
  const [ skillsRemoved, setSkillsRemoved ] = useState<string[]>([]);
  const { register, handleSubmit, setError, getValues, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      firstName: defaultUser ? defaultUser.firstName : "",
      lastName: defaultUser ? defaultUser.lastName : "",
      email: defaultUser ? defaultUser.email : "",
      flags: defaultUser ? defaultUser.flags : USER_ROLES.default
    }
  });
  const [alert, setAlert] = useState<{ type: AlertVariants, message: string }>(ALERT_BASE);
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    if(isLoading) return;
    
    try {
      setLoading(true);
      let response;
      if(defaultUser) {
        response = await UserAPI.updateById(defaultUser.id, data.firstName, data.lastName, data.email, parseInt(data.flags, 10));
      } else {
        response = await UserAPI.create(data.firstName, data.lastName, data.email, parseInt(data.flags, 10));
      }

      for(const sk in skillsAdded) {
        await UserAPI.addSkillById(response.id, skillsAdded[sk]);
      }

      for(const sk in skillsRemoved) {
        await UserAPI.removeSkillById(response.id, skillsRemoved[sk]);
      }

      setSkillsAdded([]);
      setSkillsRemoved([]);
      setAlert(ALERT_BASE);
      setAlert({ type: 'success', message: "De gebruiker is toegevoegd/aangepast!" });
    } catch(e: any) {
      const err = e as Error;
      const acceptedErrors = ["INVALID_ARGUMENT", "RESOURCE_NOT_FOUND"];

      if(acceptedErrors.includes(err.code)) {
        if(err.code === "INVALID_ARGUMENT" && err.errors) Object.keys(err.errors).forEach((error: any) => setError(error, { type: 'custom', message: err.errors ? err.errors[error].message : ERROR_GENERIC }))
        if(err.code === "RESOURCE_NOT_FOUND" && err.message) setAlert({ type: 'error', message: err.message });
      } else {
        setAlert({ type: 'error', message: ERROR_GENERIC });
      }
    } finally {
      setLoading(false);
    }
  }

  const handleAddSkill = (skill: any) => {
    setSkills((prev: any[]) => [...prev, { id: skill.value, name: skill.label }]);
    setSkillsAdded(prev => [...prev, skill.value]);
  }
  const handleRemoveSkill = (skill: any) => {
    setSkills((prev: any[]) => prev.filter(oldSkill => oldSkill.id !== skill.id));
    setSkillsRemoved(prev => [...prev, skill.id]);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        { alert.type && <Alert variant={alert.type}>{alert.message}</Alert> }
        <TextInput label="Voornaam" className="bg-white text-slate-800" placeholder="firstName" register={register("firstName", { required: "Voornaam is verplicht" })} error={errors.firstName?.message} />
        <TextInput label="Achternaam" className="bg-white text-slate-800" placeholder="lastName" register={register("lastName", { required: "Achternaam is verplicht" })} error={errors.lastName?.message} />
        <TextInput label="Email" className="bg-white text-slate-800" placeholder="email" register={register("email", { required: "Email is verplicht" })} error={errors.email?.message} />
        <Select options={roleOptions} label="Rol" className="bg-white text-slate-800" placeholder="Flags" register={register("flags", { required: "Rol is verplicht" })} error={errors.flags?.message} />
        
        <Datalist label="Vaardigheid toevoegen" onSelect={handleAddSkill} className="bg-white text-slate-800" placeholder="Vaardigheid toevoegen" options={skillsList.map((skill: any) => ({ value: skill.id, label: skill.name }))} />
        <SkillList skills={skills} onDelete={handleRemoveSkill} />

        <Button type="submit" className="mt-4" disabled={isLoading} loading={isLoading} rounded>Wijzigingen opslaan</Button>
      </form>
    </>
  );
};

export default UserForm;