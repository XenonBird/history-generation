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

class Person {
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

  addALifeEvent(type, title, on, year = currentYear) {
    if (type === "happy") {
      this.events.happy.push({ title, on, year });
    } else {
      this.events.sad.push({ title, on, year });
    }
  }

  marry(person) {
    this.wives.push({ id: person.id, alive: true });
    person.wives.push({ id: this.id, alive: true });
    this.addALifeEvent("happy", "marriage", "self");
    person.addALifeEvent("happy", "marriage", "self");
  }

  haveBaby(spouse, year = currentYear) {
    const baby = new Person(this, spouse, year);
    this.children.push({ id: baby.id, alive: true });
    spouse.children.push({ id: baby.id, alive: true });
    this.addALifeEvent("happy", "baby", "self");
    spouse.addALifeEvent("happy", "baby", "self");
    return baby;
  }

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
