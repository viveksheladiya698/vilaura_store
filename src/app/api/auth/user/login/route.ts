import { loginController } from "@/modules/auth/user/auth.controller";

export async function POST(request: Request) {
  return loginController(request);
}