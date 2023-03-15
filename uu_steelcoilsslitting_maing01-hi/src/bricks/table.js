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

const Table = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Table",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render({ classes, children }) {
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <div className={`table-responsive ${classes}`}>
        <table className="table table-bordered table-nonfluid text-center">{children}</table>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Table };
export default Table;
//@@viewOff:exports
