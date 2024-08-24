import { makeAutoObservable } from "mobx";

const storageKey = 'sos-usage';
const initialObject = { cost: 0.0, callDates: [] };

class CostStore {
  cost: number = 0.0;
  callDates: string[] = [];
  questionCost: number = 0.0;
  responseCost: number = 0.0;

  constructor() {
    makeAutoObservable(this);
    this.initializeObject();
  }

  initializeObject(): void {
    const storedObject = this.getObjectFromLocalStorage();
    if (storedObject) {
      this.cost = storedObject.cost;
      this.callDates = storedObject.callDates;
    } else {
      this.resetObject();
    }
  }

  getObjectFromLocalStorage(): { cost: number; callDates: string[] } | null {
    const storedValue = localStorage.getItem(storageKey);
    if (storedValue) {
      try {
        return JSON.parse(storedValue);
      } catch (e) {
        console.error('Error parsing JSON from local storage, resetting', e);
        this.resetObject();
        return initialObject;
      }
    }
    return null;
  }

  setObjectToLocalStorage(obj: { cost: number; callDates: string[] }): void {
    try {
      localStorage.setItem(storageKey, JSON.stringify(obj));
    } catch (e) {
      console.error('Error saving object to local storage', e);
    }
  }

  resetObject(): void {
    this.cost = initialObject.cost;
    this.callDates = initialObject.callDates;
    this.setObjectToLocalStorage(initialObject);
  }

  addCost(amount: number): void {
    this.cost += amount;
    this.setObjectToLocalStorage({ cost: this.cost, callDates: this.callDates });
  }

  addCallDate(date: string): void {
    this.callDates.push(date);
    this.setObjectToLocalStorage({ cost: this.cost, callDates: this.callDates });
  }

  getCost(): number {
    return this.cost;
  }

  getCallDates(): string[] {
    return this.callDates;
  }

  setQuestionCost(amount: number): void {
    this.questionCost = amount;
  }

  setResponseCost(amount: number): void {
    this.responseCost = amount;
  }

  getQuestionCost(): number {
    return this.questionCost;
  }

  getResponseCost(): number {
    return this.responseCost;
  }
}

export const costStore = new CostStore();

// Example usage:
// costStore.addCost(50);
// costStore.addCallDate('2023-06-25');
// costStore.setQuestionCost(20);
// costStore.setResponseCost(30);
// console.log('Updated Cost:', costStore.getCost());
// console.log('Updated Call Dates:', costStore.getCallDates());
// console.log('Question Cost:', costStore.getQuestionCost());
// console.log('Response Cost:', costStore.getResponseCost());
