import z from "zod";

export const eventSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Event Title must be of atleast 3 characters" }),
  location: z
    .string()
    .min(3, { message: "Location name must be of atleast 3 characters" }),
  description: z.string().optional(),
  date: z.iso.datetime().refine((d) => new Date(d) > new Date(), {
    message: "Event Date must be in future",
  }),
  type: z.enum(["Private", "Global"], {
    message: "Value must be either Private or Global",
  }),
});

export const updateEventSchema = eventSchema.partial();
