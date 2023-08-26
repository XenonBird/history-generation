import { addPeople } from "./actions";
import { People } from "./main";

/**
 * Sets up the UI and event listeners for generating years and adding people.
 *
 * @param {Function} changeYearHandler - A function to handle advancing one year.
 */
export const generateUI = (changeYearHandler) => {
  const button = document.getElementById("generateButton");
  button.addEventListener("click", () => {
    if (People.length > 0) {
      // console.log("Number of people", People.length);
      var s = new Date().getTime();
      changeYearHandler();
      var e = new Date().getTime();
      var d = e - s;
      console.log("Time took :", d / 1000, "seconds");
    } else {
      const inputElement = document.getElementById("numPeopleInput");
      const numPeople = parseInt(inputElement.value); // Use parseInt to convert input value to a number

      // console.log(typeof People.length, People.length);

      if (!isNaN(numPeople) && numPeople > 0) {
        console.log("Number of people", People.length);
        addPeople(numPeople);
        inputElement.style.visibility = "hidden";
        button.textContent = "Advance one year";
      } else {
        alert("Please enter a valid number of people.");
      }
    }
  });
};
