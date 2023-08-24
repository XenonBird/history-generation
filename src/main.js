import Parameters from "./parameters";
import {
  addPeople,
  announceEvent,
  makeBabiesToCouples,
  marryBetweenPeople,
} from "./actions";

export var currentYear = Parameters.startingYear;

export const People = [];
export const deadPeople = [];

addPeople(100);

const changeYear = () => {
  announceEvent(
    "Year " + currentYear,
    "========================== Happy new year"
  );
  marryBetweenPeople();
  makeBabiesToCouples();
  currentYear++;
};

for (let i = 0; i < 40; i++) {
  changeYear();
}

const plot = () => {
  const app = document.getElementById("app");
  const table = document.createElement("table");
  const headingRow = document.createElement("tr");
  for (const key in People[0]) {
    const th = document.createElement("th");
    th.textContent = key;
    headingRow.appendChild(th);
  }
  table.appendChild(headingRow);

  People.forEach((singlePerson) => {
    const row = document.createElement("tr");
    for (const key in singlePerson) {
      const td = document.createElement("td");
      if (typeof singlePerson[key] === "object") {
        td.textContent = JSON.stringify(singlePerson[key], null, 2);
      } else {
        td.textContent = singlePerson[key];
      }
      row.appendChild(td);
    }
    table.appendChild(row);
  });

  app.appendChild(table);
};
// plot();
