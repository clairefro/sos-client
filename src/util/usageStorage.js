const storageKey = 'sos-usage';

const initialObject = { cost: 0.0, callDates: [] }

const usageStorage = {
    // Retrieve the object from local storage
    getObject: function () {
        const storedValue = localStorage.getItem(storageKey);
        if (storedValue) {
            try {
                return JSON.parse(storedValue);
            } catch (e) {
                console.error('Error parsing JSON from local storag, resetting', e);
                this.resetObject()
                return initialObject;
            }
        }
        return null;
    },

    // Store the object in local storage
    setObject: function (obj) {
        if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
            if ('cost' in obj && 'callDates' in obj && typeof obj.cost === 'number' && Array.isArray(obj.callDates)) {
                try {
                    localStorage.setItem(storageKey, JSON.stringify(obj));
                } catch (e) {
                    console.error('Error saving object to local storage', e);
                }
            } else {
                console.error('Object does not have the required properties or property types for "cost" and "callDates". Restting storage object');
                this.resetObject()
            }
        } else {
            console.error('Provided value is not a valid object');
        }
    },

    initializeObject: function () {
        if (!this.getObject()) {
            this.setObject(initialObject);
        }
    },

    resetObject: function () {
        const obj = this.getObject();
        if (!obj || typeof obj.cost !== 'number' || !Array.isArray(obj.callDates)) {
            this.setObject(initialObject);
        }
    },

    // Increment the cost by a given amount
    addCost: function (amount) {
        const obj = this.getObject();
        if (obj) {
            obj.cost += amount;
            this.setObject(obj);
        } else {
            console.error('No object found in local storage to update cost');
        }
    },

    addCallDate: function (date) {
        const obj = this.getObject();
        if (obj) {
            obj.callDates.push(date);
            this.setObject(obj);
        } else {
            console.error('No object found in local storage to update call dates');
        }
    },

    // Retrieve the cost
    getCost: function () {
        const obj = this.getObject();
        return obj ? obj.cost : null;
    },

    // Retrieve the call dates
    getCallDates: function () {
        const obj = this.getObject();
        return obj ? obj.callDates : [];
    }
};

export { usageStorage }

// // Example usage:
// usageStorage.initializeObject(); // Initialize if not present
// usageStorage.resetObject(); // Reset if required properties are not present

// // Increment the cost
// usageStorage.addCost(50);

// // Add a new call date
// usageStorage.addCallDate('2023-06-25');

// // Get the updated cost
// const updatedCost = usageStorage.getCost();
// console.log('Updated Cost:', updatedCost);

// // Get the updated call dates
// const updatedCallDates = usageStorage.getCallDates();
// console.log('Updated Call Dates:', updatedCallDates);
