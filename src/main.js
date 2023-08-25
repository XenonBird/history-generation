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
