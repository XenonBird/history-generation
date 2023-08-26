import Parameters from "./parameters";
import {
  announceEvent,
  makeBabiesToCouples,
  makePeoplePassAway,
  marryBetweenPeople,
  resetStatistics,
  updateStatistics,
} from "./actions";
import { generateUI } from "./ui";
import { random, shuffleArray } from "./functions";

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
  deathThisYear: 0,
  deathTotal: 0,
};

/**
 * Advances the simulation by a specified number of years.
 *
 * @param {number} numberOfYears - The number of years to advance the simulation by.
 */
const changeYear = (numberOfYears = 1) => {
  const singleYearChange = () => {
    resetStatistics();
    announceEvent("New Year", {
      massage: `=========================== ${currentYear} ===========================`,
    });

    shuffleArray(People);
    marryBetweenPeople();
    makeBabiesToCouples();
    makePeoplePassAway();

    announceEvent(
      "A random person",
      People.find((p) => currentYear - p.birthYear < 5)
    );

    updateStatistics();
    announceEvent("Statistics ", statistics);
    currentYear++;
  };
  for (let i = 0; i < numberOfYears; i++) {
    singleYearChange();
  }
};

generateUI(changeYear);
