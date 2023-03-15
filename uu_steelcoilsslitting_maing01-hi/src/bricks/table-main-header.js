//@@viewOn:imports
import { createVisualComponent } from "uu5g05";

import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const TableMainHeader = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TableMainHeader",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ inputCols, outputCols, firstTitle = "Vstup" }) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <tr>
        <th colSpan={inputCols} className="text-dark fs-3">
          {firstTitle}
        </th>
        {outputCols && (
          <th colSpan={outputCols + 2 /*2x odpad*/} className="text-dark fs-3">
            Výstup
          </th>
        )}
      </tr>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TableMainHeader };
export default TableMainHeader;
//@@viewOff:exports
