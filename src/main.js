import Parameters from "./parameters";
import {
  addPeople,
  announceEvent,
  makeBabiesToCouples,
  marryBetweenPeople,
  resetStatistics,
  updateStatistics,
} from "./actions";

export var currentYear = Parameters.startingYear;

export const People = [];
export const deadPeople = [];

export const statistics = {
  population: 0,
  male: 0,
  female: 0,
  under18: 0,
  adult18to60: 0,
  above60: 0,
  marriageThisYear: 0,
  marriageTotal: 0,
  newBornThisYear: 0,
  newBorTotal: 0,
};

addPeople(100);

const changeYear = () => {
  resetStatistics();
  announceEvent("New Year", {
    massage: `=========================== ${currentYear} ===========================`,
  });

  marryBetweenPeople();
  makeBabiesToCouples();

  updateStatistics();
  announceEvent("Statistics ", statistics);
  currentYear++;
};

for (let i = 0; i < 10; i++) {
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
