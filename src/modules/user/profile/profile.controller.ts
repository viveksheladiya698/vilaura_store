import { updateProfileSchema } from "./profile.schema";
import { getProfile, updateProfile } from "./profile.service";
import { uploadCategoryImage } from "@/lib/upload-image";
import { handleApiError } from "@/lib/handle-api-error";

export async function getProfileController(userId: string) {
  try {
    const user = await getProfile(userId);
    return Response.json({ success: true, data: user });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function updateProfileController(request: Request, userId: string) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const phone = formData.get("phone");
    const imageValue = formData.get("profileImage");

    const validationResult = updateProfileSchema.safeParse({
      name: typeof name === "string" && name.trim() ? name : undefined,
      phone: typeof phone === "string" && phone.trim() ? phone : undefined,
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

    let profileImage: string | undefined;

    if (imageValue instanceof File && imageValue.size > 0) {
      profileImage = await uploadCategoryImage(imageValue, "profiles");
    }

    const user = await updateProfile(userId, validationResult.data, profileImage);

    return Response.json({
      success: true,
      message: "Profile updated successfully.",
      data: user,
    });
  } catch (error) {
    return handleApiError(error);
  }
}