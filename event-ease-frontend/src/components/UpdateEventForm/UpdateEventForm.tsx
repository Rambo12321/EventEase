"use client";
import { useForm } from "react-hook-form";
import { updateEventSchema, eventUpdateType } from "@/schemas/eventSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Dropdown from "../dropdown/Dropdown";

const UpdateEventForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<eventUpdateType>({
    resolver: zodResolver(updateEventSchema),
  });

  const [serverError, setServerError] = useState<string>();

  const formSubmit = () => {
    console.log("Form Submitted");
  };

  return (
    <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-2">
      <>
        <input
          {...register("title")}
          type="text"
          placeholder="Title"
          className="updateEventFormInput"
          autoComplete="title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </>

      <input
        {...register("description")}
        type="text"
        placeholder="Description"
        className="updateEventFormInput"
        autoComplete="Description"
      />

      <>
        <input
          {...register("date")}
          type="datetime-local"
          className="updateEventFormInput"
          autoComplete="Date"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </>

      <>
        <Dropdown
          width="400"
          topOffset="450"
          onSelect={(val) =>
            setValue("type", val as "Private" | "Global", {
              shouldValidate: true,
            })
          }
        />
        {errors.type && (
          <p className="text-red-500 text-sm">{errors.type.message}</p>
        )}
      </>

      <>
        <input
          {...register("location")}
          type="text"
          placeholder="Location"
          className="updateEventFormInput"
          autoComplete="location"
        />
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}
      </>

      <button
        disabled={isSubmitting}
        type="submit"
        className="bg-blue-900 px-2 w-fit rounded-lg mt-5 self-center hover:bg-blue-300 hover:text-black hover: cursor-customPointer"
      >
        Submit!
      </button>

      {serverError && (
        <div className="self-center -mb-2.5 text-3xl glassEffect px-2 rounded-lg bg-red-500/30">
          {serverError}
        </div>
      )}
    </form>
  );
};

export default UpdateEventForm;
