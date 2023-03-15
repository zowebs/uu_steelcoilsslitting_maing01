//@@viewOn:imports
import { Utils, createVisualComponent, PropTypes, useScreenSize } from "uu5g05";
import { Text as TextElement, Button } from "uu5g05-elements";
import { Text } from "uu5g05-forms";
import usePlan from "../context/plan/usePlan";

import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  container: (withBorder = false) =>
    Config.Css.css({
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      borderBottom: withBorder ? "1px solid black" : "",
      marginTop: 5,
    }),
  title: () =>
    Config.Css.css({
      textAlign: "center",
      marginBottom: 10,
    }),
  button: () =>
    Config.Css.css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    }),
  input: () =>
    Config.Css.css({
      marginLeft: 10,
      marginRight: 10,
    }),

  itemContainer: () =>
    Config.Css.css({
      width: 150,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const StripsForm = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "StripsForm",
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
    const handleAdd = () => {
      const newStrips = [...plan.input.strips];
      newStrips.push({ width: "", neededWeight: "" });

      setInputAttr("strips", newStrips);
    };

    const handleChange = (attr, value, index) => {
      const newStrips = [...plan.input.strips];
      newStrips[index][attr] = value;

      setInputAttr("strips", newStrips);
    };

    const handleDelete = (index) => {
      const newStrips = [...plan.input.strips];
      newStrips.splice(index, 1);

      setInputAttr("strips", newStrips);
    };
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <div className={Css.title()}>
          <TextElement category="expose" segment="default" type="broad">
            Pásky
          </TextElement>
        </div>
        <div>
          <div className={Css.container(true)}>
            <div className={Css.itemContainer()}>
              <TextElement category="interface" segment="content" type="large">
                Šířka [mm]
              </TextElement>
            </div>
            <div className={Css.itemContainer()}>
              <TextElement category="interface" segment="content" type="large">
                Hmotnost [kg]
              </TextElement>
            </div>
            <Button icon="mdi-plus" onClick={handleAdd} colorScheme="primary" />
          </div>
          {plan.input.strips.map((strip, index) => (
            <div className={Css.container()} key={index}>
              <div className={Css.itemContainer()}>
                <Text.Input
                  type="number"
                  className={Css.input()}
                  value={strip.width}
                  onChange={(e) => handleChange("width", e.data.value, index)}
                />
              </div>

              <div className={Css.itemContainer()}>
                <Text.Input
                  type="number"
                  className={Css.input()}
                  value={strip.neededWeight}
                  onChange={(e) => handleChange("neededWeight", e.data.value, index)}
                />
              </div>
              <Button icon="mdi-delete" onClick={() => handleDelete(index)} colorScheme="negative" />
            </div>
          ))}
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { StripsForm };
export default StripsForm;
//@@viewOff:exports
