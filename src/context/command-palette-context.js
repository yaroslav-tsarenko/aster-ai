import { createContext } from "react";

export const CommandPaletteContext = createContext({
  open: () => {},
  close: () => {},
  isOpen: false,
});
