//@@viewOn:imports
import { Utils, createVisualComponent, PropTypes, useScreenSize } from "uu5g05";
import { Text as TextElement } from "uu5g05-elements";
import { Text } from "uu5g05-forms";
import usePlan from "../context/plan/usePlan";

import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  container: () =>
    Config.Css.css({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 5,
    }),
  title: () =>
    Config.Css.css({
      textAlign: "center",
      marginBottom: 10,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SettingsForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SettingsForm",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { plan, setInputAttr } = usePlan();
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <div className={Css.title()}>
          <TextElement category="expose" segment="default" type="broad">
            Obecné nastavení
          </TextElement>
        </div>

        {/* Max přesah */}
        <div className={Css.container()}>
          <TextElement category="interface" segment="content" type="large">
            Maximální přesah [%]:
          </TextElement>
          <Text.Input
            type="number"
            value={plan.input.overweight}
            onChange={(e) => setInputAttr("overweight", e.data.value)}
          />
        </div>

        {/* Šířka svitku */}
        <div className={Css.container()}>
          <TextElement category="interface" segment="content" type="large">
            Šířka svitku [mm]:
          </TextElement>
          <Text.Input type="number" value={plan.input.width} onChange={(e) => setInputAttr("width", e.data.value)} />
        </div>

        {/* Tloušťka svitku */}
        <div className={Css.container()}>
          <TextElement category="interface" segment="content" type="large">
            Tloušťka svitku [mm]:
          </TextElement>
          <Text.Input
            type="number"
            value={plan.input.thickness}
            onChange={(e) => setInputAttr("thickness", e.data.value)}
          />
        </div>

        {/* Minimální odpad*/}
        <div className={Css.container()}>
          <TextElement category="interface" segment="content" type="large">
            Minimální odpad [mm]:
          </TextElement>
          <Text.Input
            type="number"
            value={plan.input.minWaste}
            onChange={(e) => setInputAttr("minWaste", e.data.value)}
          />
        </div>

        {/* Maximální odpad*/}
        <div className={Css.container()}>
          <TextElement category="interface" segment="content" type="large">
            Maximální odpad [mm]:
          </TextElement>
          <Text.Input
            type="number"
            value={plan.input.maxWaste}
            onChange={(e) => setInputAttr("maxWaste", e.data.value)}
          />
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SettingsForm };
export default SettingsForm;
//@@viewOff:exports
