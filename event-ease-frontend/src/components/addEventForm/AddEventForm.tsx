"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { eventSchema } from "@/schemas/eventSchema";
import { postEvent } from "@/api/eventAPI";
import { useSelector } from "react-redux";
import { selectAuthToken } from "@/store/authSlice";
import { eventSubmitType } from "@/schemas/eventSchema";

const AddEventForm = () => {
  const token = useSelector(selectAuthToken);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<eventSubmitType>({
    resolver: zodResolver(eventSchema),
  });

  const [serverError, setServerError] = useState<string | null>();

  const formRef = useRef<HTMLFormElement | null>(null);
  const onSubmit = async (data: eventSubmitType) => {
    try {
      console.log("Submit hitted for data -> ", data);
      setServerError(null);

      let ans = "";

      if (token) {
        ans = await postEvent(data, token);
        console.log("Response -> ", ans);
      } else {
        const err = new Error();
        err.message = "Autherization token not found 👎🏻";
        throw err;
      }

      if (formRef) {
        formRef.current?.reset();
      }
    } catch (error) {
      const err = error instanceof Error ? error : "Failed to submit the Event";
      console.log(`Error while submitting the form =>`, err);
      setServerError(err.toString());
    }
    return;
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2"
    >
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
        type="tex t"
        placeholder="Description"
        className="addEventFormInput"
        autoComplete="Description"
      />

      <>
        <input
          {...register("date")}
          type="datetime-local"
          className="addEventFormInput mx-auto"
          autoComplete="Date"
        />
        {errors.date && (
          <p className="text-red-500 text-sm">{errors.date.message}</p>
        )}
      </>

      <>
        <input
          {...register("type")}
          type="text"
          placeholder="Type"
          className="addEventFormInput"
          autoComplete="type"
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
