//@@viewOn:imports
import { Utils, createVisualComponent, Lsi, useDataList, useRoute, useState } from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import usePlan from "../context/plan/usePlan.js";
import Calls from "../calls.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  container: () =>
    Config.Css.css({
      margin: 25,
    }),
  title: () =>
    Config.Css.css({
      textAlign: "center",
      marginBottom: 10,
      width: "100%",
    }),
  buttonsContainer: () =>
    Config.Css.css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      marginTop: 5,
    }),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let History = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "History",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [modalOpen, setModalOpen] = useState(false);
    const { setPlan } = usePlan();
    const [, setRoute] = useRoute();
    const planDataList = useDataList({
      handlerMap: {
        load: Calls.Plan.list,
      },
      itemHandlerMap: {
        delete: Calls.Plan.delete,
      },
    });
    //@@viewOff:private

    //@@viewOn:interface
    const handleAdd = (data) => {
      setPlan({ input: data.input, output: data.output });
      setRoute("home");
    };

    const handleDelete = async (data) => {
      await Calls.Plan.delete({ id: data.id });
      await planDataList.handlerMap.load();

      setModalOpen(false);
    };
    //@@viewOff:interface

    const columns = [
      {
        header: <Lsi lsi={{ cs: "Datum & Čas" }} />,
        cell: (cellProps) => <Uu5Elements.DateTime value={cellProps.data.data.date} />,
      },
      {
        header: <Lsi lsi={{ cs: "Pásky [mm]" }} />,
        cell: (cellProps) => {
          const strips = cellProps.data.data.input.strips;

          return strips.map((strip, index) => `${strip.width}${index !== strips.length - 1 ? ", " : ""}`);
        },
      },
      {
        header: <Lsi lsi={{ cs: "# Svitků" }} />,
        cell: (cellProps) => cellProps.data.data.input.rolls.length,
      },
      {
        header: <Lsi lsi={{ cs: "Plán vytvořen" }} />,
        cell: (cellProps) => (cellProps.data.data.output ? "ANO" : "NE"),
      },
      {
        cell: (cellProps) => (
          <Uu5Elements.Button colorScheme="primary" onClick={() => handleAdd(cellProps.data.data)}>
            Vložit
          </Uu5Elements.Button>
        ),
        maxWidth: "max-content",
      },
      {
        cell: (cellProps) => (
          <Uu5Elements.Button colorScheme="negative" onClick={() => setModalOpen(cellProps.data.data)}>
            Smazat
          </Uu5Elements.Button>
        ),
        maxWidth: "max-content",
      },
    ];

    //@@viewOn:render

    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <RouteBar />
        <Uu5Elements.Modal open={!!modalOpen} onClose={() => setModalOpen(false)} header="Smazat plán výroby">
          <Uu5Elements.Text category="story" segment="body" type="common">
            Opravdu chcete smazat plán výroby z <Uu5Elements.DateTime value={modalOpen.date} />?
          </Uu5Elements.Text>
          <div className={Css.buttonsContainer()}>
            <Uu5Elements.Button colorScheme="primary" onClick={() => handleDelete(modalOpen)}>
              ANO
            </Uu5Elements.Button>
            <Uu5Elements.Button colorScheme="negative" onClick={() => setModalOpen(false)}>
              NE
            </Uu5Elements.Button>
          </div>
        </Uu5Elements.Modal>
        <div className={`${Css.container()}`}>
          <Uu5Elements.Box className={Config.Css.css({ padding: 16 })}>
            <div className={Css.title()}>
              <Uu5Elements.Text category="expose" segment="default" type="lead">
                Historie
              </Uu5Elements.Text>
            </div>
            <Uu5TilesElements.Table data={planDataList?.data || []} columnList={columns} so />
          </Uu5Elements.Box>
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

History = withRoute(History, { authenticated: true });

//@@viewOn:exports
export { History };
export default History;
//@@viewOff:exports
