import Table from "../bricks/table";
import TableDetails from "../bricks/table-details";
import TableMainHeader from "../bricks/table-main-header";
import TableSecondaryHeader from "../bricks/table-secondary-header";
import _ from "lodash";

export default (output, input, printRef) => {
  const mainRoll = {
    strips: output.strips,
    width: input.width,
    thickness: input.thickness,
    weight: output.usedRolls.map((roll) => roll.weight).reduce((partialSum, a) => partialSum + a, 0),
  };

  const inputCols = 3;
  const outputCols = countNumberOfColls();
  const missingCols = 3;
  const usedRollsCols = 2;

  const waste = countWaste();
  const wasteWeight = countWasteWeight(waste);
  const numbers = getNumbers(outputCols);
  const titlesRow = getTitlesRow(numbers);
  const unitsRow = getUnitsRow(outputCols);
  const detailsRow = getDetailsNWidths(waste, getNumberedStrips());
  const weightsRow = [wasteWeight, ...getNumberedWeights(), wasteWeight];
  const missingRows = getMissingRows();
  const usedRolls = getUsedRollsRows();
  const usedRollsTitles = ["série", "hmotnost"];

  return (
    <>
      <div className="row p-0 m-0" ref={printRef}>
        <div className="col-12 p-0">
          <div className="container container-gray-trans">
            <div className="row p-0 m-0">
              <div className="col-12 d-flex justify-content-center">
                <Table classes="mb-5">
                  <thead>
                    <TableMainHeader inputCols={inputCols} outputCols={outputCols} />
                    <TableSecondaryHeader items={titlesRow} />
                    <TableSecondaryHeader items={unitsRow} />
                  </thead>
                  <tbody>
                    <TableDetails items={detailsRow} />
                    <TableDetails items={weightsRow} colSpan={inputCols} colSpanTitle={"Dílčí hmotnost [kg]"} />
                  </tbody>
                </Table>
              </div>
            </div>
            <div className="row p-0 m-0">
              <div className="col-sm-12 col-md-6 d-flex justify-content-center">
                <Table>
                  <thead>
                    <TableMainHeader inputCols={missingCols} firstTitle={"Chybějící pásky"} />
                  </thead>
                  <tbody>
                    {missingRows.map((row, i) => (
                      <TableDetails key={i} items={row} notBold />
                    ))}
                  </tbody>
                </Table>
              </div>
              <div className="col-sm-12 col-md-6 d-flex justify-content-center">
                <Table>
                  <thead>
                    <TableMainHeader inputCols={usedRollsCols} firstTitle={"Použité svitky"} />
                    <TableSecondaryHeader items={usedRollsTitles} noAddits bold />
                  </thead>
                  <tbody>
                    {usedRolls.map((row, i) => (
                      <TableDetails key={i} items={row} notBold />
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function countWaste() {
    let totalStripsWidth = 0;
    const arrayOfStrips = mainRoll.strips;

    arrayOfStrips.forEach((obj) => {
      for (let key in obj) {
        totalStripsWidth += obj[key].width * parseInt(key);
      }
    });

    return (mainRoll.width - totalStripsWidth) / 2;
  }

  function countNumberOfColls() {
    const stripsArray = mainRoll.strips;
    let sum = 0;
    stripsArray.forEach((x) => {
      sum += parseInt(Object.keys(x)[0]);
    });

    return sum;
  }

  function getNumbers(outputCols) {
    return _.range(1, outputCols + 1);
  }

  function getNumberedStrips() {
    const output = [];

    const arrayOfStrips = mainRoll.strips;

    arrayOfStrips.forEach((obj) => {
      for (let key in obj) {
        for (let i = 0; i < parseInt(key); i++) output.push(obj[key].width);
      }
    });

    return output;
  }

  function getNumberedWeights() {
    const output = [];

    const arrayOfStrips = mainRoll.strips;

    arrayOfStrips.forEach((obj) => {
      for (let key in obj) {
        for (let i = 0; i < parseInt(key); i++) {
          const stripWidth = obj[key].width;
          const rollWeight = mainRoll.weight;
          const rollWidth = mainRoll.width;

          const stripWeight = (rollWeight / rollWidth) * stripWidth;
          output.push(_.round(stripWeight, 1));
        }
      }
    });

    return output;
  }

  function countWasteWeight(wasteWidth) {
    const rollWeight = mainRoll.weight;
    const rollWidth = mainRoll.width;

    const wasteWeight = (rollWeight / rollWidth) * wasteWidth;

    return _.round(wasteWeight, 1);
  }

  function getTitlesRow(numbers) {
    return ["Tloušťka", "Šířka", "Hmotnost", "Odpad", ...numbers, "Odpad"];
  }

  function getUnitsRow(count) {
    const mm = "mm";

    return [mm, mm, "kg", mm, ..._.fill(Array(count), mm), mm];
  }

  function getDetailsNWidths(waste, strips) {
    const thickness = mainRoll.thickness;
    const width = mainRoll.width;
    const weight = mainRoll.weight;

    return [thickness, width, weight, waste, ...strips, waste];
  }

  function getMissingRows() {
    const output = [];

    const arrayOfStrips = mainRoll.strips;

    arrayOfStrips.forEach((obj) => {
      const innerArray = [];

      //tento cyklus proběhne vždy jen jednou...
      for (let key in obj) {
        const stripWidth = obj[key].width;
        const neededWeight = obj[key].neededWeight;
        const currentWeight = obj[key].currentWeight;

        const missingWeight = _.round(neededWeight - currentWeight, 1);
        const sentence = missingWeight > 0 ? "NEDOKONČENO, chybí" : "DOKONČENO, navíc";

        innerArray.push(`${stripWidth} mm`);
        innerArray.push(sentence);
        innerArray.push(`${Math.abs(missingWeight)} kg`);
      }
      output.push(innerArray);
    });

    return output;
  }

  function getUsedRollsRows() {
    const usedRolls = output.usedRolls;

    const res = usedRolls.map((roll) => {
      const serie = roll.serie;
      const weight = roll.weight;

      return [`${serie}`, `${weight} kg`];
    });

    return res;
  }
};
