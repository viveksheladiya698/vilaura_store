import { registerController } from "@/modules/auth/auth.controller";

export async function POST(request: Request) {
  return registerController(request);
}