import Parameters from "./parameters";
import {
  boyNames,
  girlNames,
  lastNames,
  negativeQualities,
  positiveQualities,
  workNames,
} from "./samples/person";

export const random = (max = 1, min = 0) => {
  const range = Math.random() * (max - min);
  return Math.floor(range + min);
};

export const shuffleArray = (array) => {
  for (let i = 0; i < array.length; i++) {
    var j = random(array.length);
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export const randomGender = () => {
  const index = Math.random() < Parameters.malePopulationPercentage ? 0 : 1;
  return ["male", "female"][index];
};

export const randomFirstName = (gender) => {
  if (!gender) gender = randomGender();
  var fname = "";
  if (gender === "male") {
    fname = boyNames[Math.floor(random(boyNames.length))];
  } else {
    fname = girlNames[Math.floor(random(boyNames.length))];
  }
  return fname;
};

export const randomLastName = () => {
  var lname = lastNames[Math.floor(random(girlNames.length))];
  return lname;
};

export const randomBirthYear = (thisYear, group = "any") => {
  var age = 0;
  switch (group) {
    case "young":
      age = random(20);
      break;
    case "adult":
      age = random(30) - 20;
      break;
    case "old":
      age = random(20) - 50;
      break;
    default:
      age = random(Parameters.maxAge);
  }
  return thisYear - age;
};

export const randomWorks = (numberOfWork = 1) => {
  var arr = [...workNames];
  var personWorks = [];
  for (let i = 0; i < numberOfWork; i++) {
    let workIndex = random(arr.length);
    let work = arr[workIndex];
    personWorks.push(work);
    arr.splice(workIndex, 1);
  }
  if (personWorks.length === 1) return personWorks[0];
  return personWorks;
};

export const randomPositiveQualities = (numberOfPositiveQualities = 1) => {
  var arr = [...positiveQualities];
  var personQualities = [];
  for (let i = 0; i < numberOfPositiveQualities; i++) {
    let workIndex = random(arr.length);
    let work = arr[workIndex];
    personQualities.push(work);
    arr.splice(workIndex, 1);
  }
  if (personQualities.length === 1) return personQualities[0];
  return personQualities;
};

export const randomNegativeQualities = (numberOfNegativeQualities = 1) => {
  var arr = [...negativeQualities];
  var personQualities = [];
  for (let i = 0; i < numberOfNegativeQualities; i++) {
    let workIndex = random(arr.length);
    let work = arr[workIndex];
    personQualities.push(work);
    arr.splice(workIndex, 1);
  }
  if (personQualities.length === 1) return personQualities[0];
  return personQualities;
};

export const randomNumberBiasedToLowerUnder10 = () => {
  var x = Math.random();
  if (x < 0.004) return 9;
  if (x < 0.008) return 8;
  if (x < 0.016) return 7;
  if (x < 0.032) return 6;
  if (x < 0.064) return 5;
  if (x < 0.128) return 4;
  if (x < 0.256) return 3;
  if (x < 0.512) return 2;
  return 1;
};
