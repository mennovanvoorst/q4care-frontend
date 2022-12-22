import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AuthAPI from "../../lib/api/auth";
import useUser from "../../lib/hooks/useUser";
import { ALERT_BASE, ERROR_GENERIC } from "../../lib/utils/constant";
import { Error } from "../../lib/utils/types";
import Alert, { AlertVariants } from "../common/Alert";
import Button from "../common/Button";
import Heading from "../common/Heading";
import Spinner from "../common/Spinner";
import TextInput from "../common/TextInput";
import SkillApi from "../../lib/api/skills";

type Props = {
  defaultSkill?: any;
}

const SkillForm = ({ defaultSkill }: Props) => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    defaultValues: {
      name: defaultSkill ? defaultSkill.name : ""
    }
  });
  const [alert, setAlert] = useState<{ type: AlertVariants, message: string }>(ALERT_BASE);
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    if(isLoading) return;

    setLoading(true);
    setAlert(ALERT_BASE);

    try {
      if(defaultSkill) {
        await SkillApi.updateById(defaultSkill.id, data.name);
      } else {
        await SkillApi.create(data.name);
      }

      setAlert({ type: 'success', message: "De vaardigheid is toegevoegd/aangepast!" });
    } catch(e: any) {
      const err = e as Error;
      const acceptedErrors = ["INVALID_ARGUMENT", "RESOURCE_NOT_FOUND"]

      if(acceptedErrors.includes(err.code)) {
        if(err.code === "INVALID_ARGUMENT" && err.errors) Object.keys(err.errors).forEach(error => setError(error, { type: 'custom', message: err.errors[error].message }))
        if(err.code === "RESOURCE_NOT_FOUND" && err.message) setAlert({ type: 'error', message: err.message });
      } else {
        setAlert({ type: 'error', message: ERROR_GENERIC });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        { alert.type && <Alert variant={alert.type}>{alert.message}</Alert> }
        <TextInput label="Naam van de vaardigheid" className="bg-white text-slate-800" placeholder="Name" register={register("name", { required: "Naam is verplicht" })} error={errors.name?.message} />
        <Button type="submit" className="mt-4" disabled={isLoading} loading={isLoading} rounded>Wijzigingen opslaan</Button>
      </form>
    </>
  );
};

export default SkillForm;