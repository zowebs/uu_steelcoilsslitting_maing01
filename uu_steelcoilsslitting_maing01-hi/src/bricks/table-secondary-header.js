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

const TableSecondaryheader = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TableSecondaryheader",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ items, noAddits, bold }) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <tr>
        {items.map((item, i) => {
          let classes = "";

          if (!noAddits) {
            if (i === 3 || i === items.length - 1) classes = "px-4";
            else if (i < 3) classes = "text-dark fst-italic";
            else classes = "text-dark";
          }

          if (bold) classes += " fw-bold";

          return (
            <td key={i} className={classes}>
              {item}
            </td>
          );
        })}
      </tr>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TableSecondaryheader };
export default TableSecondaryheader;
//@@viewOff:exports
