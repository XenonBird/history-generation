import Person from "./classes/person";
import { People, currentYear } from "./main";
import Parameters from "./parameters";

export const announceEvent = (type, eventDescription) => {
  //   console.log(eventDescription);
  var app = document.getElementById("app");
  var p = document.createElement("p");
  var b = document.createElement("b");
  b.textContent = type + " : ";
  var span = document.createElement("span");
  span.textContent = eventDescription;
  p.appendChild(b);
  p.appendChild(span);
  app.appendChild(p);
};

export const addPeople = (numberOfPeople = 10) => {
  for (let i = 0; i < numberOfPeople; i++) {
    const person = new Person();
    People.push(person);
  }
};

export const marryBetweenPeople = () => {
  People.forEach((groom) => {
    if (
      groom.gender === "male" &&
      groom.wives.length === 0 && // only one marriage
      currentYear - groom.birthYear >= Parameters.minMarriageAge &&
      Math.random() < Parameters.probabilityOfMarriageEachYear
    ) {
      var bride = People.find(
        (person) =>
          person.wives.length === 0 &&
          person.gender !== groom.gender &&
          Math.abs(person.birthYear - groom.birthYear) < 15
      );
      if (bride) {
        groom.marry(bride);
        // add to to their memories
        groom.addAHappyMoment("marriage", "self");
        bride.addAHappyMoment("marriage", "self");

        // action for this event
        announceEvent(
          "Marriage",
          `${groom.firstName} ${groom.lastName} (${
            currentYear - groom.birthYear
          }) + ${bride.firstName} ${bride.lastName} (${
            currentYear - bride.birthYear
          })`
        );
        //  surname change after marriage
        bride.lastName = groom.lastName;
      }
    }
  });
};

export const makeBabiesToCouples = () => {
  People.forEach((man) => {
    const marriage = man.events.happy.findLast(
      (he) => he.type === "marriage" && he.on === "self"
    );
    var spouse = marriage ? People.find((p) => p.id === man.wives[0].id) : null;
    if (
      marriage &&
      spouse &&
      Math.random() < Parameters.probabilityOfHavingBabyEachYear
    ) {
      const baby = new Person(
        man.lastName,
        { id: man.id, alive: true },
        { id: spouse.id, alive: true },
        true
      );
      People.push(baby);
      // add children
      // add to to their memories
      man.addAHappyMoment("baby", "self");
      spouse.addAHappyMoment("baby", "self");
      // action for this event
      announceEvent(
        "New born",
        `${man.firstName} ${man.lastName} (${currentYear - man.birthYear}) + ${
          spouse.firstName
        } ${spouse.lastName} (${currentYear - spouse.birthYear}) -> ${
          baby.firstName
        } ${baby.lastName}`
      );
    }
  });
};
