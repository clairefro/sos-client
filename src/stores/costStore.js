import { makeAutoObservable } from "mobx";

import { currentDateStamp } from "../util/date/currentDatestamp";

const storageKey = "sos-usage";
const initialObject = { cost: 0.0, callDates: [] };

class CostStore {
  cost = 0.0;
  callDates = [];
  questionCost = 0.0;
  responseCost = 0.0;

  constructor() {
    makeAutoObservable(this);
    this.initializeObject();
  }

  initializeObject() {
    const storedObject = this.getObjectFromLocalStorage();
    if (storedObject) {
      this.cost = storedObject.cost;
      this.callDates = storedObject.callDates;
    } else {
      this.resetObject();
    }
  }

  getObjectFromLocalStorage() {
    const storedValue = localStorage.getItem(storageKey);
    if (storedValue) {
      try {
        return JSON.parse(storedValue);
      } catch (e) {
        console.error("Error parsing JSON from local storage, resetting", e);
        this.resetObject();
        return initialObject;
      }
    }
    return null;
  }

  setObjectToLocalStorage(obj) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(obj));
    } catch (e) {
      console.error("Error saving object to local storage", e);
    }
  }

  resetObject() {
    this.cost = initialObject.cost;
    this.callDates = initialObject.callDates;
    this.setObjectToLocalStorage(initialObject);
  }

  addCost(amount) {
    this.cost += amount;
    this.setObjectToLocalStorage({
      cost: this.cost,
      callDates: this.callDates,
    });
  }

  addCall() {
    const date = currentDateStamp();
    this.callDates.push(date);
    this.setObjectToLocalStorage({
      cost: this.cost,
      callDates: this.callDates,
    });
  }

  getCost() {
    return this.cost;
  }

  getCallDates() {
    return this.callDates;
  }

  setQuestionCost(amount) {
    this.questionCost = amount;
  }

  setResponseCost(amount) {
    this.responseCost = amount;
  }

  getQuestionCost() {
    return this.questionCost;
  }

  getResponseCost() {
    return this.responseCost;
  }
}

export const costStore = new CostStore();

// Example usage:
// costStore.addCost(50);
// costStore.addCall();
// costStore.setQuestionCost(20);
// costStore.setResponseCost(30);
// console.log('Updated Cost:', costStore.getCost());
// console.log('Updated Call Dates:', costStore.getCallDates());
// console.log('Question Cost:', costStore.getQuestionCost());
// console.log('Response Cost:', costStore.getResponseCost());
