import z from "zod";

export const eventSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Event Title must be of atleast 3 characters" }),
  location: z
    .string()
    .min(3, { message: "Location name must be of atleast 3 characters" }),
  description: z.string().optional(),
  date: z
    .string()
    .min(1, "Date is required")
    .refine((val) => !isNaN(Date.parse(val)), "Please select a valid date.")
    .refine(
      (val) => {
        const today = new Date();

        const selected = new Date(val);

        return selected > today;
      },
      {
        message: "Event Date must be in future",
      }
    ),
  type: z.enum(["Private", "Global"], {
    message: "Value must be either Private or Global",
  }),
});

export const updateEventSchema = eventSchema.partial();
