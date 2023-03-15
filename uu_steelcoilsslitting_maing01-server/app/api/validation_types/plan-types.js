/* eslint-disable */

const createDtoInType = shape({
  width: number().isRequired(),
  thickness: number().isRequired(),
  minWaste: number().isRequired(),
  maxWaste: number().isRequired(),
  overweight: number().isRequired(),
  rolls: array(
    shape({
      serie: string().isRequired(),
      weight: number().isRequired(),
    })
  ).isRequired(),
  strips: array(
    shape({
      width: number().isRequired(),
      neededWeight: number().isRequired(),
    })
  ).isRequired(),
});

const deleteDtoInType = shape({
  id: string().isRequired(),
});

const planListDtoInType = shape({
  pageInfo: shape({
    pageIndex: integer(),
    pageSize: integer(),
  }),
});
