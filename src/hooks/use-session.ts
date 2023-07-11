import { useContext } from "react";
import { SessionContext } from "@/providers/session-provider";

export const useSession = () => useContext(SessionContext);
