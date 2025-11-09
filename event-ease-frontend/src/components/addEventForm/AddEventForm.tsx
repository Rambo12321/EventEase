"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { eventSchema } from "@/schemas/eventSchema";
import { postEvent } from "@/api/eventAPI";
import { useSelector } from "react-redux";
import { selectAuthToken } from "@/store/authSlice";
import { eventSubmitType } from "@/schemas/eventSchema";

import Dropdown from "../dropdown/Dropdown";

const AddEventForm = () => {
  const token = useSelector(selectAuthToken);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<eventSubmitType>({
    resolver: zodResolver(eventSchema),
  });

  const [serverError, setServerError] = useState<string | null>();

  const onSubmit = async (data: eventSubmitType) => {
    try {
      console.log("Submit hitted for data -> ", data);
      setServerError(null);

      if (token) {
        await postEvent(data, token);
      } else {
        const err = new Error();
        err.message = "Autherization token not found 👎🏻";
        throw err;
      }

      reset();
    } catch (error) {
      const err = error instanceof Error ? error : "Failed to submit the Event";
      console.log(`Error while submitting the form =>`, err);
      setServerError(err.toString());
    }
    return;
  };
  useEffect(() => {
    register("type", { required: true });
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <>
        <input
          {...register("title")}
          type="text"
          placeholder="Title"
          className="addEventFormInput"
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
        className="addEventFormInput"
        autoComplete="Description"
      />

      <>
        <input
          {...register("date")}
          type="datetime-local"
          className="addEventFormInput w-full!"
          autoComplete="Date"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </>

      <>
        <Dropdown
          width="327.81"
          topOffset="264"
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
          className="addEventFormInput"
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

export default AddEventForm;
