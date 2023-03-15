//@@viewOn:imports
import { Utils, createVisualComponent, useSession, Lsi, useDataObject } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Plus4U5Elements from "uu_plus4u5g02-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import WelcomeRow from "../bricks/welcome-row.js";
import RouteBar from "../core/route-bar.js";
import importLsi from "../lsi/import-lsi.js";
import SettingsForm from "../bricks/settings-form.js";
import StripsForm from "../bricks/strips-form.js";
import RollsForm from "../bricks/rolls-form.js";
import usePlan from "../context/plan/usePlan.js";
import Calls from "../calls.js";
import OutputTable from "../bricks/output-table.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  icon: () =>
    Config.Css.css({
      fontSize: 48,
      lineHeight: "1em",
    }),

  container: () =>
    Config.Css.css({
      margin: 25,
    }),
  submitBtn: () =>
    Config.Css.css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 30,
    }),
  title: () =>
    Config.Css.css({
      textAlign: "center",
      marginBottom: 10,
      width: "100%",
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let Home = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Home",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { isPlanValid, plan, setPlan } = usePlan();
    const planData = useDataObject({
      handlerMap: {
        create: Calls.Plan.create,
      },
    });
    //@@viewOff:private

    //@@viewOn:interface
    const handleCreate = async () => {
      const res = await planData.handlerMap.create({ ...plan.input, overweight: 1 + plan.input.overweight / 100 });
      setPlan((plan) => ({ ...plan, output: res.output }));
    };

    const isLoading = planData.state.includes("pending");

    //@@viewOff:interface

    //@@viewOn:render
    const gridContent = (
      <>
        <div className="col-sm-12 col-md-12 col-xxl-4">
          <Uu5Elements.Box className={"p-3 my-3"} significance="distinct">
            <SettingsForm />
          </Uu5Elements.Box>
        </div>
        <div className="col-sm-12 col-md-6 col-xxl-4">
          <Uu5Elements.Box className={"p-3 my-3"} significance="distinct">
            <StripsForm />
          </Uu5Elements.Box>
        </div>
        <div className="col-sm-12 col-md-6 col-xxl-4">
          <Uu5Elements.Box className={"p-3 my-3"} significance="distinct">
            <RollsForm />
          </Uu5Elements.Box>
        </div>
      </>
    );

    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RouteBar />
        {isLoading ? (
          <Uu5Elements.Pending size="max">Probíhá vytváření plánu (max 15 sec)</Uu5Elements.Pending>
        ) : (
          <div className={`${Css.container()}`}>
            <OutputTable />
            <Uu5Elements.Box className={Config.Css.css({ padding: 16 })}>
              <div className={Css.title()}>
                <Uu5Elements.Text category="expose" segment="default" type="lead">
                  Vstupní parametry
                </Uu5Elements.Text>
              </div>
              <div className="row">{gridContent}</div>
              <div className={Css.submitBtn()}>
                <Uu5Elements.Button
                  icon="mdi-play"
                  colorScheme="primary"
                  disabled={!isPlanValid()}
                  onClick={handleCreate}
                >
                  Spustit
                </Uu5Elements.Button>
              </div>
            </Uu5Elements.Box>
          </div>
        )}
      </div>
    );
    //@@viewOff:render
  },
});

Home = withRoute(Home, { authenticated: true });

//@@viewOn:exports
export { Home };
export default Home;
//@@viewOff:exports
