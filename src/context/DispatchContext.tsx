import { createContext, type ActionDispatch } from "react";
import type { Action } from "../types";

interface Context {
  dispatch: ActionDispatch<[action: Action]>
}

const DispatchContext = createContext<Context>({
  dispatch: () => {}
});

export default DispatchContext;