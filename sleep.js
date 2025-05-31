module.exports = function sleep(timeSleep = 1000) {
    return new Promise((resolve) => {
       setTimeout(() => {
          resolve();
       }, timeSleep);
    });
 };