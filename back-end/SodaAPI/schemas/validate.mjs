import zod from "zod";

const sodaSchema = zod.object({
  name: zod.string({
    invalid_type_error: "Soda name must be a string",
    required_error: "Soda name is required",
  }),
  price: zod
    .number({
      invalid_type_error: "Soda price must be a number",
      required_error: "Soda price is required",
    })
    .positive()
    .min(0.1)
    .max(10),
  description: zod.string({
    invalid_type_error: "Soda description must be a string",
    required_error: "Soda description is required",
  }),
});

export function ValidateSoda(sodaItem) {
  return sodaSchema.safeParse(sodaItem);
}
