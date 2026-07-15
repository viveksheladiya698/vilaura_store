// product.controller.ts
import { createProductSchema, productImageMetaSchema } from "./product.schema";
import { createProduct } from "./product.service";
import { uploadCategoryImage } from "@/lib/upload-image";
import { handleApiError } from "@/lib/handle-api-error";

export async function createProductController(request: Request) {
  try {
    const formData = await request.formData();

    const categoryId = formData.get("categoryId");
    const productName = formData.get("productName");
    const shortDescription = formData.get("shortDescription");
    const description = formData.get("description");
    const price = formData.get("price");
    const gender = formData.get("gender");

    const validationResult = createProductSchema.safeParse({
      categoryId,
      productName,
      shortDescription:
        typeof shortDescription === "string" && shortDescription.trim().length > 0
          ? shortDescription
          : undefined,
      description:
        typeof description === "string" && description.trim().length > 0 ? description : undefined,
      price: typeof price === "string" ? Number(price) : price,
      gender,
    });

    if (!validationResult.success) {
      return Response.json(
        {
          success: false,
          message: "Validation failed.",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // ---- Collect image files sent as images[0], images[1], images[2]... ----
    const imageFiles: File[] = [];
    let index = 0;
    while (formData.has(`images[${index}]`)) {
      const file = formData.get(`images[${index}]`);
      if (file instanceof File && file.size > 0) {
        imageFiles.push(file);
      }
      index++;
    }

    if (imageFiles.length === 0) {
      return Response.json(
        { success: false, message: "Please upload at least one product image." },
        { status: 400 }
      );
    }

    // ---- Validate metadata + upload each file to /public/uploads/products ----
    const uploadedImages = await Promise.all(
      imageFiles.map(async (file, i) => {
        const isPrimaryRaw = formData.get(`images[${i}][isPrimary]`);
        const sortOrderRaw = formData.get(`images[${i}][sortOrder]`);
        const altTextRaw = formData.get(`images[${i}][altText]`);

        const metaResult = productImageMetaSchema.safeParse({
          isPrimary: isPrimaryRaw === "true",
          sortOrder: sortOrderRaw ? Number(sortOrderRaw) : i,
          altText: typeof altTextRaw === "string" && altTextRaw.trim() ? altTextRaw : undefined,
        });

        if (!metaResult.success) {
          throw new Error("INVALID_IMAGE_METADATA");
        }

        const imageUrl = await uploadCategoryImage(file, "products");

        return { imageUrl, ...metaResult.data };
      })
    );

    const product = await createProduct(validationResult.data, uploadedImages);

    return Response.json(
      { success: true, message: "Product created successfully.", data: product },
      { status: 201 }
    );
  } catch (error) {
    return handleApiError(error);
  }
}