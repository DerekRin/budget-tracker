let db;

const request = indexedDB.open("budget_tracker", 1);

request.onupgradeneeded = function (event) {
  const db = event.target.result;

  db.createObjectStore("new_budget", { autoIncrement: true });
};

// upon a successful
request.onsuccess = function (event) {
  db = event.target.result;

  if (navigator.onLine) {
    // uploadPizza();
  }
};

request.onerror = function (event) {
  // log error here
  console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
  const transaction = db.transaction(["new_budget"], "readwrite");

  const budgetObjectStore = transaction.objectStore("new_budget");

  budgetObjectStore.add(record);
}

//check database
function databaseExists(name) {
  return new Promise(function (resolve, reject) {
    var db = indexedDB,
      req;

    try {
      // See if it exist
      req = db.webkitGetDatabaseNames();
      req.onsuccess = function (evt) {
        ~[].slice.call(evt.target.result).indexOf(name)
          ? resolve(true)
          : reject(false);
      };
    } catch (e) {
      // Try if it exist
      req = db.open(name);
      req.onsuccess = function () {
        req.result.close();
        resolve(true);
      };
      req.onupgradeneeded = function (evt) {
        evt.target.transaction.abort();
        reject(false);
      };
    }
  });
}
