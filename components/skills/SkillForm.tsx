import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ALERT_BASE, ERROR_GENERIC } from "../../lib/utils/constant";
import { Error } from "../../lib/utils/types";
import Alert, { AlertVariants } from "../common/Alert";
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import SkillApi from "../../lib/api/skills";
import { useRouter } from "next/router";
import Modal from "../common/Modal";

type Props = {
  defaultSkill?: any;
};

const SkillForm = ({ defaultSkill }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: defaultSkill ? defaultSkill.name : "",
    },
  });
  const [alert, setAlert] = useState<{ type: AlertVariants; message: string }>(
    ALERT_BASE
  );
  const [isLoading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data: any) => {
    if (isLoading) return;

    setLoading(true);
    setAlert(ALERT_BASE);

    try {
      if (defaultSkill) {
        await SkillApi.updateById(defaultSkill.id, data.name);
      } else {
        await SkillApi.create(data.name);
      }

      setAlert({
        type: "success",
        message: "De vaardigheid is toegevoegd/aangepast!",
      });
    } catch (e: any) {
      const err = e as Error;
      const acceptedErrors = ["INVALID_ARGUMENT", "RESOURCE_NOT_FOUND"];

      if (acceptedErrors.includes(err.code)) {
        if (err.code === "INVALID_ARGUMENT" && err.errors)
          Object.keys(err.errors).forEach((error: any) =>
            setError(error, {
              type: "custom",
              message: err.errors ? err.errors[error].message : ERROR_GENERIC,
            })
          );
        if (err.code === "RESOURCE_NOT_FOUND" && err.message)
          setAlert({ type: "error", message: err.message });
      } else {
        setAlert({ type: "error", message: ERROR_GENERIC });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (isLoading) return;

    try {
      setLoading(true);
      let response = await SkillApi.destroy(defaultSkill.id);

      router.push("/skills");
    } catch (e: any) {
      const err = e as Error;
      const acceptedErrors = ["INVALID_ARGUMENT", "RESOURCE_NOT_FOUND"];

      if (acceptedErrors.includes(err.code)) {
        if (err.code === "INVALID_ARGUMENT" && err.errors)
          Object.keys(err.errors).forEach((error: any) =>
            setError(error, {
              type: "custom",
              message: err.errors ? err.errors[error].message : ERROR_GENERIC,
            })
          );
        if (err.code === "RESOURCE_NOT_FOUND" && err.message)
          setAlert({ type: "error", message: err.message });
      } else {
        setAlert({ type: "error", message: ERROR_GENERIC });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {alert.type && <Alert variant={alert.type}>{alert.message}</Alert>}
        <TextInput
          label="Naam van de vaardigheid"
          className="bg-white text-slate-800"
          placeholder="Name"
          register={register("name", { required: "Naam is verplicht" })}
          error={errors.name?.message}
        />

        <div className="flex gap-4 mt-4">
          <Button
            type="submit"
            disabled={isLoading}
            loading={isLoading}
            rounded
          >
            Wijzigingen opslaan
          </Button>
          {defaultSkill && (
            <Button
              variant="secondary"
              type="button"
              disabled={isLoading}
              loading={isLoading}
              onClick={() => setShowModal(true)}
              rounded
            >
              Verwijder vaardigheid
            </Button>
          )}
        </div>
      </form>

      {defaultSkill && (
        <Modal
          show={showModal}
          title={`Vaardigheid verwijderen`}
          content={`Weet je zeker dat je ${defaultSkill.name} wilt verwijderen?`}
          confirmText="Verwijderen"
          cancelText="Annuleren"
          onCancel={() => setShowModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default SkillForm;
