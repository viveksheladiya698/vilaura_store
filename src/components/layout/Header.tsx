import Link from "next/link";
import { getOptionalUser } from "@/modules/user/require-user";
import { HeaderClient } from "./HeaderClient";

export async function Header() {
  const user = await getOptionalUser();

  return <HeaderClient isLoggedIn={!!user} userName={user?.name ?? null} />;
}