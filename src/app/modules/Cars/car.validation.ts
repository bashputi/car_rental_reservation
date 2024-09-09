import { z } from "zod";


const createCarValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }),
        // type: z.string({ required_error: "Type is required" }),
        description: z.string({ required_error: "Description is required" }),
        color: z.string({ required_error: "Description is required" }),
        isElectric: z.boolean({ required_error: "Description is required" }),
        status: z.enum(["available", "unavailable"]).optional(),
        features: z.array(z.string({ required_error: "Description is required" })),
        // image: z.string({ required_error: "Image is required" }),
        pricePerHour: z.number({ required_error: "Description is required" }),
        isDeleted: z
          .boolean({ required_error: "Description is required" })
          .optional(), 
    }),
});

const updateCarValidationSchema = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }).optional(),
        type: z.string({ required_error: "Type is required" }).optional(),
        description: z
          .string({ required_error: "Description is required" })
          .optional(),
        color: z.string({ required_error: "Description is required" }).optional(),
        isElectric: z
          .boolean({ required_error: "Description is required" })
          .optional(),
        status: z.enum(["available", "unavailable"]).optional(),
        features: z
          .array(z.string({ required_error: "Description is required" }))
          .optional(),
        image: z.string({ required_error: "Image is required" }).optional(),
        pricePerHour: z
          .number({ required_error: "Description is required" })
          .optional(),
        isDeleted: z
          .boolean({ required_error: "Description is required" })
          .optional(),
      }),
})

export const CarValidation = {
    createCarValidationSchema,
    updateCarValidationSchema,
};