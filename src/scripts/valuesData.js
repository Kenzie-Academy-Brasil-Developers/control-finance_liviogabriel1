const valuesCategory = ["Entrada", "Saída"];

let values = []

let insertedValues = [
  {
    id: 1,
    value: 90.0,
    categoryID: 0,
  },
  {
    id: 2,
    value: 40.0,
    categoryID: 1,
  },
  {
    id: 3,
    value: 15.5,
    categoryID: 0,
  },
];

const newId = insertedValues.length + 1;
const newValue = 150.0;
const newCategoryID = 0;

insertedValues.push({
  id: newId,
  value: newValue,
  categoryID: newCategoryID,
});