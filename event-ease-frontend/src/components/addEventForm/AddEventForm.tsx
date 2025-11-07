"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { eventSchema } from "@/schemas/eventSchema";

type addEventData = z.infer<typeof eventSchema>;

const AddEventForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<addEventData>({
    resolver: zodResolver(eventSchema),
  });

  const [serverError, setServerError] = useState<string | null>();

  const onSubmit = () => {
    try {
      setServerError(null);
    } catch (error) {
      console.log(
        `Error while submitting the form -> ${
          error instanceof Error ? error : "Failed to submit the Event"
        }`
      );
    }
    return;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5">
      <input
        {...register("title")}
        type="text"
        placeholder="Title"
        className="addEventFormInput"
        autoComplete="title"
      />
      <input
        {...register("description")}
        type="text"
        placeholder="Description"
        className="addEventFormInput"
        autoComplete="Description"
      />
      <input
        {...register("date")}
        type="date"
        className="addEventFormInput mx-auto"
        autoComplete="Date"
      />
      <input
        {...register("type")}
        type="text"
        placeholder="Type"
        className="addEventFormInput"
        autoComplete="type"
      />
      <input
        {...register("location")}
        type="text"
        placeholder="Location"
        className="addEventFormInput"
        autoComplete="location"
      />
      <button
        type="submit"
        className="bg-blue-900 px-2 w-fit rounded-lg mt-5 self-center hover:bg-blue-300 hover:text-black hover: cursor-customPointer"
      >
        Submit
      </button>
    </form>
  );
};

export default AddEventForm;
