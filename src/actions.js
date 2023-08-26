import Person from "./classes/person";
import { People, currentYear, statistics } from "./main";
import Parameters from "./parameters";

/**
 * Display the give event
 */
export const announceEvent = (type, object) => {
  //   console.log(eventDescription);
  var app = document.getElementById("app");
  var div = document.createElement("div");
  var h4 = document.createElement("h4");
  h4.textContent = type + " : ";
  var pre = document.createElement("pre");
  pre.textContent = JSON.stringify({ ...object }, null, 4);

  div.appendChild(h4);
  div.appendChild(pre);
  app.appendChild(div);
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
      groom.alive &&
      groom.gender === "male" &&
      groom.wives.length === 0 && // only one marriage
      currentYear - groom.birthYear >= Parameters.minMarriageAge &&
      Math.random() < Parameters.probabilityOfMarriageEachYear
    ) {
      var bride = People.find(
        (girl) =>
          girl.alive &&
          girl.gender !== groom.gender &&
          girl.wives.length === 0 &&
          Math.abs(girl.birthYear - groom.birthYear) < 15
      );
      if (bride) {
        groom.marry(bride);
        announceEvent("marriage", {
          man: { name: groom.firstName, age: currentYear - groom.birthYear },
          woman: { name: bride.firstName, age2: currentYear - bride.birthYear },
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
    if (man.alive && man.gender === "male" && wife) {
      var spouse = People.find((she) => she.id === wife.id);
      if (
        wife &&
        spouse &&
        Math.random() < Parameters.probabilityOfHavingBabyEachYear
      ) {
        const baby = man.haveBaby(spouse, currentYear);
        People.push(baby);
        announceEvent("new-child", {
          man: { name: man.firstName, age: currentYear - man.birthYear },
          woman: {
            name: spouse.firstName,
            age2: currentYear - spouse.birthYear,
          },
          baby: baby.firstName,
        });

        statistics.newBornThisYear++;
        statistics.newBorTotal++;
      }
    }
  });
};

export const makePeoplePassAway = () => {
  People.forEach((person) => {
    if (person.alive && Math.random() < Parameters.probabilityOfNaturalDeath) {
      person.passAway();
      person.father.alive && person.father.id !== 0;
      announceEvent("Death", {
        person: `${person.firstName} ${person.lastName} (${
          currentYear - person.birthYear
        })`,
      });

      statistics.deathThisYear++;
      statistics.deathTotal++;
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
  console.log("People", statistics.population);
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
  statistics.deathThisYear = 0;
};
