import { useContext } from "react";
import { CommandPaletteContext } from "../context/command-palette-context";

const useCommandPalette = () => useContext(CommandPaletteContext);

export default useCommandPalette;
