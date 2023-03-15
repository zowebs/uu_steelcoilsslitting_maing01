//@@viewOn:imports
import { Utils, createVisualComponent, useRef } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import usePlan from "../context/plan/usePlan";
import generateTable from "../utils/generateTable";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  title: () =>
    Config.Css.css({
      textAlign: "center",
      marginBottom: 10,
      width: "100%",
    }),
  buttons: () =>
    Config.Css.css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      marginBottom: 10,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const OutputTable = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "OutputTable",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { plan, setPlan } = usePlan();
    const printRef = useRef();
    //@@viewOff:private

    //@@viewOn:interface
    const handleDownloadPdf = async () => {
      const element = printRef.current;
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/png");

      const pdf = new jsPDF("landscape");
      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("plán výroby.pdf");
    };

    const handleClose = () => {
      setPlan((plan) => ({ ...plan, output: false }));
    };
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);

    if (plan.output === false) return null;
    if (plan.output === null)
      return (
        <div className={Css.title()}>
          <Uu5Elements.Text category="expose" segment="default" type="broad" colorScheme="negative">
            Plán nebyl vytvořen, poupravte zadání.
          </Uu5Elements.Text>
        </div>
      );

    return (
      <div {...attrs}>
        <Uu5Elements.Box className={Config.Css.css({ padding: 16, marginBottom: 16 })}>
          <div className={Css.title()}>
            <Uu5Elements.Text category="expose" segment="default" type="lead">
              Výsledek
            </Uu5Elements.Text>
          </div>
          {generateTable(plan.output, plan.input, printRef)}
          <div className={Css.buttons()}>
            <Uu5Elements.Button colorScheme="primary" onClick={handleDownloadPdf}>
              Vytisknout
            </Uu5Elements.Button>
            <Uu5Elements.Button colorScheme="negative" onClick={handleClose}>
              Zavřít
            </Uu5Elements.Button>
          </div>
        </Uu5Elements.Box>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { OutputTable };
export default OutputTable;
//@@viewOff:exports
