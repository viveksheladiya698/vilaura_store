import { employeeloginController } from "@/modules/auth/employee/auth.controller";

export async function POST(request: Request) {
  return employeeloginController(request);
}