import { registerController } from "@/modules/auth/user/auth.controller";

export async function POST(request: Request) {
  return registerController(request);
}