import {
  random,
  randomBirthYear,
  randomGender,
  randomFirstName,
  randomLastName,
  randomNegativeQualities,
  randomNumberBiasedToLowerUnder10,
  randomPositiveQualities,
  randomWorks,
} from "../functions";
import { currentYear } from "../main";

/**
 * Represents an individual in the simulation.
 * @class
 */
class Person {
  /**
   * Create a new instance of a Person.
   * @constructor
   * @param {Object} [father={ id: 0, alive: Math.round(Math.random()) === 1 }] - Father information.
   * @param {Object} [mother={ id: 0, alive: Math.round(Math.random()) === 1 }] - Mother information.
   * @param {number} [birthYear=randomBirthYear(currentYear)] - Birth year.
   * @param {string} [goals=""] - Goals of the person.
   */
  constructor(
    father = { id: 0, alive: Math.round(Math.random()) === 1 },
    mother = { id: 0, alive: Math.round(Math.random()) === 1 },
    birthYear = randomBirthYear(currentYear),
    goals = ""
  ) {
    this.id = random(1000000, 100); // under 100 id s are reserved
    this.father = father;
    this.mother = mother;
    this.gender = randomGender();
    this.firstName = randomFirstName(this.gender);
    this.lastName = this.father.lastName || randomLastName();
    this.birthYear = birthYear;
    this.wives = [];
    this.children = [];
    this.wealth = random(3000);
    this.educationLevel = randomNumberBiasedToLowerUnder10();
    this.educationOn = randomWorks(4);
    this.hobbies = this.educationOn;
    this.skills = this.educationOn;
    this.qualities = {
      positive: randomPositiveQualities(4),
      negative: randomNegativeQualities(2),
    };
    this.occupation = this.educationOn[0];
    this.socialStatus = randomNumberBiasedToLowerUnder10();
    this.healthLevel = 10 - randomNumberBiasedToLowerUnder10();
    this.identities = [];
    this.events = { happy: [], sad: [] };
    this.goals = goals;
    this.friends = [];
    this.enemies = [];
    this.happyOn = [];
    this.angryOn = [];
    this.alive = true;
  }

  /**
   * Add a life event to the person's history.
   * @param {"happy" | "sad"} type - Type of event (either "happy" or "sad").
   * @param {string} title - Title of the event.
   * @param {string} on - The affected entity ("self" or another person's id).
   * @param {number} [year=currentYear] - The year the event occurred.
   */
  addALifeEvent(type, title, on, year = currentYear) {
    if (type === "happy") {
      this.events.happy.push({ title, on, year });
    } else {
      this.events.sad.push({ title, on, year });
    }
  }

  /**
   * Marry this person to another person.
   * @param {Person} person - The person to marry.
   */
  marry(person) {
    this.wives.push({ id: person.id, alive: true });
    person.wives.push({ id: this.id, alive: true });
    this.addALifeEvent("happy", "marriage", "self");
    person.addALifeEvent("happy", "marriage", "self");
  }

  /**
   * Have a baby with another person.
   * @param {Person} spouse - The spouse to have a baby with.
   * @param {number} [year=currentYear] - The year the baby is born.
   * @returns {Person} The newborn baby.
   */
  haveBaby(spouse, year = currentYear) {
    const baby = new Person(this, spouse, year);
    this.children.push({ id: baby.id, alive: true });
    spouse.children.push({ id: baby.id, alive: true });
    this.addALifeEvent("happy", "baby", "self");
    spouse.addALifeEvent("happy", "baby", "self");
    return baby;
  }

  /**
   * Describe the person's attributes and history.
   */
  describe() {
    console.log(`Name: ${this.firstName} ${this.lastName}`);
    console.log(`Gender: ${this.gender}`);
    console.log(`Birth Year: ${this.birthYear}`);
    console.log(`Hobbies: ${this.hobbies.join(", ")}`);
    console.log(`Qualities (Positive): ${this.qualities.positive.join(", ")}`);
    console.log(`Qualities (Negative): ${this.qualities.negative.join(", ")}`);
    console.log(`Skills: ${this.skills.join(", ")}`);
    console.log(`Occupation: ${this.occupation}`);
    console.log(`Wealth: ${this.wealth} gold coins`);
    console.log(`Education Level: ${this.educationLevel}/10`);
    console.log(`Education On: ${this.educationOn.join(", ")}`);
    console.log(`Social Status: ${this.socialStatus.level}/10`);
    console.log(`Health Level: ${this.socialStatus.healthLevel}/10`);
    console.log(`Identities: ${JSON.stringify(this.identities)}`);
    console.log(`Events (Happy): ${JSON.stringify(this.events.happy)}`);
    console.log(`Events (Sad): ${JSON.stringify(this.events.sad)}`);
    console.log(`Goals: ${this.goals}`);
    console.log(
      `Friends: ${this.friends.map((friend) => friend.id).join(", ")}`
    );
    console.log(`Enemies: ${this.enemies.map((enemy) => enemy.id).join(", ")}`);
    console.log(
      `Happy On: ${this.happyOn.map((person) => person.id).join(", ")}`
    );
    console.log(
      `Angry On: ${this.angryOn.map((person) => person.id).join(", ")}`
    );
  }
}

export default Person;
