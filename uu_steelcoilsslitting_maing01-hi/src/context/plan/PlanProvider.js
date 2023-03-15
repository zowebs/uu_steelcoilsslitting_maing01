import { useState } from "uu5g05";
import PlanContext from "./PlanContext";

const mockInputData = {
  width: 1250,
  thickness: 1.9,
  minWaste: 1,
  maxWaste: 6,
  overweight: 1.1,
  rolls: [
    { weight: 11110, serie: "XVH1053555" },
    { weight: 11190, serie: "XVH1053556" },
    { weight: 11190, serie: "XVH1053557" },
    { weight: 11200, serie: "XVH1053558" },
    { weight: 11230, serie: "XVH1053559" },
    { weight: 11310, serie: "XVH1053560" },
    { weight: 11320, serie: "XVH1053561" },
    { weight: 11350, serie: "XVH1053562" },
    { weight: 11350, serie: "XVH1053563" },
    { weight: 11350, serie: "XVH1053564" },
    { weight: 11350, serie: "XVH1053565" },
  ],
  strips: [
    { width: 94, neededWeight: 25000 },
    { width: 120, neededWeight: 8000 },
    { width: 145, neededWeight: 10000 },
    { width: 169, neededWeight: 12000 },
    { width: 143, neededWeight: 25000 },
  ],
};

// output-options:
//  - false   -> nespuštěno
//  - object  -> spuštěno - uspech
//  - null    -> spuštěno - neuspech
const initialPlan = {
  input: mockInputData,
  output: false,
  // {
  //   width: "",
  //   thickness: "",
  //   minWaste: "",
  //   maxWaste: "",
  //   overweight: "",
  //   rolls: [],
  //   strips: [],
  // },
};

export default function PlanProvider(props) {
  const [plan, setPlan] = useState(initialPlan);

  const setInputAttr = (attr, value) => {
    setPlan((plan) => ({ ...plan, input: { ...plan.input, [attr]: value } }));
  };

  const isPlanValid = () => {
    if (!plan.input.width) return false;
    if (!plan.input.thickness) return false;
    if (!plan.input.minWaste) return false;
    if (!plan.input.maxWaste) return false;
    if (!plan.input.overweight) return false;
    if (!plan.input.rolls.length) return false;
    if (!plan.input.strips.length) return false;

    for (const roll of plan.input.rolls) {
      if (!roll.serie) return false;
      if (!roll.weight) return false;
    }

    for (const strip of plan.input.strips) {
      if (!strip.width) return false;
      if (!strip.neededWeight) return false;
    }

    return true;
  };

  return (
    <PlanContext.Provider value={{ plan, setInputAttr, isPlanValid, setPlan }}>{props.children}</PlanContext.Provider>
  );
}
