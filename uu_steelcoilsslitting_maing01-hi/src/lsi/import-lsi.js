import { Utils } from "uu5g05";
import lsiCs from "./cs.json";

const libraryCode = process.env.NAME;

const importLsi = (lang) => import(`./${lang}.json`);
importLsi.libraryCode = libraryCode;

Utils.Lsi.setDefaultLsi(libraryCode, { cs: lsiCs });

export default importLsi;
