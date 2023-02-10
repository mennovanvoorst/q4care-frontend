import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ALERT_BASE, ERROR_GENERIC } from "../../lib/utils/constant";
import { Error } from "../../lib/utils/types";
import Alert, { AlertVariants } from "../common/Alert";
import Button from "../common/Button";
import RichTextEditor from "../common/RichTextEditor";
import ResourceAPI from "../../lib/api/resources";
import TextInput from "../common/TextInput";
import FileUploader from "../common/FileUploader";
import FileList from "../common/FileList";
import FileAPI from "../../lib/api/files";
import Modal from "../common/Modal";
import { useRouter } from "next/router";

type Props = {
  defaultResource?: any;
};

const ResourceForm = ({ defaultResource }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: defaultResource ? defaultResource.title : "",
      body: defaultResource ? defaultResource.body : "",
      files: defaultResource ? defaultResource.files : [],
    },
  });
  const [alert, setAlert] = useState<{ type: AlertVariants; message: string }>(
    ALERT_BASE
  );
  const [isLoading, setLoading] = useState(false);
  const [savedId, setSavedId] = useState<null | string>(null);
  const [files, setFiles] = useState<any[]>(
    defaultResource ? defaultResource.files : []
  );
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    register("body", { required: "Content is verplicht" });
  }, [register]);

  const onEditorStateChange = (editorState: any) => {
    setValue("body", editorState);
  };

  const onSubmit = async (data: any) => {
    if (isLoading) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("body", data.body);

      Array.from(data.files).map((file: any) => {
        formData.append("files", file);
      });

      let response;

      if (defaultResource || savedId) {
        response = await ResourceAPI.updateById(
          savedId || defaultResource.id,
          formData
        );
      } else {
        console.log("create");
        response = await ResourceAPI.create(formData);
      }

      setAlert(ALERT_BASE);

      setSavedId(response.id);
      setAlert({
        type: "success",
        message: "Het leermiddel is toegevoegd/aangepast!",
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

  const handleFileDelete = async (file: any) => {
    if (isLoading) return;

    try {
      let response = await FileAPI.destroy(file.id);

      setLoading(true);
      setAlert(ALERT_BASE);

      setSavedId(response.id);
      setAlert({
        type: "success",
        message: "Bestand is successvol verwijderd",
      });

      setFiles((prev) => prev.filter((newFile) => newFile.id !== file.id));
    } catch (e: any) {
      const err = e as Error;
      const acceptedErrors = ["INVALID_ARGUMENT"];

      if (acceptedErrors.includes(err.code)) {
        if (err.code === "INVALID_ARGUMENT" && err.errors)
          Object.keys(err.errors).forEach((error: any) =>
            setError(error, {
              type: "custom",
              message: err.errors ? err.errors[error].message : ERROR_GENERIC,
            })
          );
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
      let response = await ResourceAPI.destroy(defaultResource.id);

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

  const editorContent = watch("body");

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {alert.type && <Alert variant={alert.type}>{alert.message}</Alert>}
        <TextInput
          label="Titel"
          className="bg-white text-slate-800"
          placeholder="title"
          register={register("title", { required: "Titel is verplicht" })}
          error={errors.title?.message}
        />
        <RichTextEditor
          label="Content"
          className="bg-white text-slate-800"
          value={editorContent}
          onChange={onEditorStateChange}
          error={errors.body?.message}
        />
        <FileUploader
          label="Bestanden"
          className="bg-white text-slate-800"
          register={register("files")}
          error={errors.files?.message}
          multiple
        />
        <FileList files={files} onDelete={handleFileDelete} />

        <div className="flex gap-4 mt-4">
          <Button
            type="submit"
            disabled={isLoading}
            loading={isLoading}
            rounded
          >
            Wijzigingen opslaan
          </Button>
          {defaultResource && (
            <Button
              variant="secondary"
              type="button"
              disabled={isLoading}
              loading={isLoading}
              onClick={() => setShowModal(true)}
              rounded
            >
              Verwijder leermiddel
            </Button>
          )}
        </div>
      </form>

      {defaultResource && (
        <Modal
          show={showModal}
          title={`Leermiddel verwijderen`}
          content={`Weet je zeker dat je ${defaultResource.title} wilt verwijderen?`}
          confirmText="Verwijderen"
          cancelText="Annuleren"
          onCancel={() => setShowModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

export default ResourceForm;
