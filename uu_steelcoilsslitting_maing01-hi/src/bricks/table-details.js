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

const TableDetails = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TableDetails",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ items, colSpan, unit, colSpanTitle, notBold }) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <tr>
        {colSpan && <td colSpan={colSpan}>{colSpanTitle}</td>}
        {items.map((x, i) => {
          let classes = "";

          if (i !== 3 && i !== items.length - 1 && !colSpan) classes = "fw-bold";
          if (notBold) classes = classes.replace("fw-bold", "");

          return (
            <td key={i} className={classes}>
              {x} {unit}
            </td>
          );
        })}
      </tr>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TableDetails };
export default TableDetails;
//@@viewOff:exports
