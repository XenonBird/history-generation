import Person from "./classes/person";
import { People, currentYear, statistics } from "./main";
import Parameters from "./parameters";

/**
 * Display the give event
 */
export const announceEvent = (type, object) => {
  //   console.log(eventDescription);
  var app = document.getElementById("app");
  var p = document.createElement("p");
  var b = document.createElement("b");
  b.textContent = type + " : ";
  var span = document.createElement("span");
  span.textContent = JSON.stringify({ ...object });

  p.appendChild(b);
  p.appendChild(span);
  app.appendChild(p);
};
/**
 * Adds given number of people to the People array
 * @param {numberOfPeople} numberOfPeople - Number of people
 */
export const addPeople = (numberOfPeople = 10) => {
  for (let i = 0; i < numberOfPeople; i++) {
    const person = new Person();
    People.push(person);
  }
};

/**
 * Marries between eligible couples with probability
 */
export const marryBetweenPeople = () => {
  People.forEach((groom) => {
    if (
      groom.gender === "male" &&
      groom.wives.length === 0 && // only one marriage
      currentYear - groom.birthYear >= Parameters.minMarriageAge &&
      Math.random() < Parameters.probabilityOfMarriageEachYear
    ) {
      var bride = People.find(
        (girl) =>
          girl.gender !== groom.gender &&
          girl.wives.length === 0 &&
          Math.abs(girl.birthYear - groom.birthYear) < 15
      );
      if (bride) {
        groom.marry(bride);
        announceEvent("marriage", {
          man: groom.firstName,
          age: currentYear - groom.birthYear,
          woman: bride.firstName,
          age: currentYear - bride.birthYear,
        });
        bride.lastName = groom.lastName; // change surname

        statistics.marriageThisYear++;
        statistics.marriageTotal++;
      }
    }
  });
};

/**
 * Adds baby to the married couples with probability
 */
export const makeBabiesToCouples = () => {
  People.forEach((man) => {
    const wife = man.wives[0];
    if (man.gender === "male" && wife) {
      var spouse = People.find((she) => she.id === wife.id);
      if (
        wife &&
        spouse &&
        Math.random() < Parameters.probabilityOfHavingBabyEachYear
      ) {
        const baby = man.haveBaby(spouse, currentYear);
        People.push(baby);
        announceEvent("new-child", {
          man: man.firstName,
          age: currentYear - man.birthYear,
          woman: spouse.firstName,
          age: currentYear - spouse.birthYear,
          baby: baby.firstName,
        });

        statistics.newBornThisYear++;
        statistics.newBorTotal++;
      }
    }
  });
};

/**
 * Updates statistics for single year
 */
export const updateStatistics = () => {
  People.forEach((person) => {
    if (person.alive) {
      statistics.population++;
      person.gender === "male" ? statistics.male++ : statistics.female++;
      const age = currentYear - person.birthYear;
      age < 18
        ? statistics.under18++
        : age > 60
        ? statistics.above60++
        : statistics.adult18to60++;
      // marriageThisYear;
      // marriageTotal;
      // newBornThisYear;
      // newBorTotal;
    }
  });
};

/**
 * Resets statistics for further usage
 */
export const resetStatistics = () => {
  statistics.population = 0;
  statistics.male = 0;
  statistics.female = 0;
  statistics.under18 = 0;
  statistics.adult18to60 = 0;
  statistics.above60 = 0;
  statistics.marriageThisYear = 0;
  statistics.newBornThisYear = 0;
};
