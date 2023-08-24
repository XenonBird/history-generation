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
    lastName = randomLastName(),
    father = { id: 0, alive: Math.round(Math.random()) === 1 },
    mother = { id: 0, alive: Math.round(Math.random()) === 1 },
    bornThisYear = false,
    goals = "",
    birthYear = bornThisYear ? currentYear : randomBirthYear(currentYear),
    id = random(1000000),
    gender = randomGender(),
    firstName = randomFirstName(gender),
    wives = [],
    wealth = random(3000),
    healthLevel = 10 - randomNumberBiasedToLowerUnder10(),
    socialStatus = randomNumberBiasedToLowerUnder10(),
    educationLevel = randomNumberBiasedToLowerUnder10(),
    educationOn = randomWorks(4),
    qualities = {
      positive: randomPositiveQualities(4),
      negative: randomNegativeQualities(2),
    },
    occupation = educationOn[0],
    identities = [],
    events = { happy: [], sad: [] },
    friends = [],
    enemies = [],
    happyOn = [],
    angryOn = []
  ) {
    this.id = id;
    this.gender = gender;
    this.firstName = firstName;
    this.lastName = lastName;
    this.father = father;
    this.mother = mother;
    this.birthYear = birthYear;
    this.wives = wives;
    this.wealth = wealth;
    this.educationLevel = educationLevel;
    this.educationOn = educationOn;
    this.hobbies = educationOn;
    this.skills = educationOn;
    this.qualities = qualities;
    this.occupation = occupation;
    this.socialStatus = socialStatus;
    this.healthLevel = healthLevel;
    this.identities = identities;
    this.events = events;
    this.goals = goals;
    this.friends = friends;
    this.enemies = enemies;
    this.happyOn = happyOn;
    this.angryOn = angryOn;
  }

  marry(person) {
    if (this.gender !== person.gender) {
      this.wives.push({ id: person.id, alive: true });
      person.wives.push({ id: this.id, alive: true });
    } else {
      console.log("Same-gender marriage is not supported in this era.");
    }
  }

  addAHappyMoment(type, on, year = currentYear) {
    this.events.happy.push({
      year: currentYear,
      type: type,
      on: on,
    });
  }
  addASadMoment(type, on, year = currentYear) {
    this.events.sad.push({
      year: currentYear,
      type: type,
      on: on,
    });
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
