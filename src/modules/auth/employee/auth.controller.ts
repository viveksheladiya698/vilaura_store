import { cookies } from "next/headers";
import { loginSchema } from "./auth.schema";
import { loginEmployee, logoutUser } from "./auth.service";

export async function employeeloginController(request: Request) {
  try {

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return Response.json(
        {
          success: false,
          message: "Request body must contain valid JSON.",
        },
        { status: 400 }
      )
    }

    const validationResult = loginSchema.safeParse(body);

    if (!validationResult.success) {
      return Response.json(
        {
          success: false,
          message: "Validation failed.",
          errors: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const result = await loginEmployee(validationResult.data);

    const cookieStore = await cookies();

    cookieStore.set("session_token", result.sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: result.expiresAt,
      path: "/",
    });

    return Response.json(
      {
        success: true,
        message: "Login successful.",
        data: {
          user: result.user,
        },
      },
      { status: 200 }
    );

  }
  catch (error) {

    if (error instanceof Error) {
      if (error.message === "INVALID_CREDENTIALS") {
        return Response.json(
          {
            success: false,
            message: "Invalid email or password.",
          },
          { status: 401 }
        );
      }

      if (error.message === "ACCOUNT_INACTIVE") {
        return Response.json(
          {
            success: false,
            message: "Your account is inactive.",
          },
          { status: 403 }
        );
      }
    }

    console.error("Login failed:", error);

    return Response.json(
      {
        success: false,
        message: "An unexpected error occurred.",
      },
      { status: 500 }
    );

  }
}


export async function logoutController() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (sessionToken) {
      await logoutUser(sessionToken);
    }

    cookieStore.delete("session_token");

    return Response.json(
      {
        success: true,
        message: "Logout successful.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout failed:", error);

    return Response.json(
      {
        success: false,
        message: "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}