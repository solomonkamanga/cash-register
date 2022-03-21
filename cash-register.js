// currency denominations in pennies
const denom = [
    ["ONE HUNDRED", 10000],
    ["TWENTY", 2000],
    ["TEN", 1000],
    ["FIVE", 500],
    ["ONE", 100],
    ["QUARTER", 25],
    ["DIME", 10],
    ["NICKEL", 5],
    ["PENNY", 1]
  ];
  
  function checkCashRegister(price, cash, cid) {
    // change in pennies
    var change = cash * 100 - price * 100;
    var clientCash = {};
    var registerCash = {};
    var index = 0;
  
    // if there is no change
    if (change === 0) { return { status: "CLOSED", change: cid }; }
  
    // swap out array for an object
    cid.forEach(money => {
      registerCash[money[0]] = parseInt(money[1] * 100);
    });
  
    // give bills from big to small until change is 0 or fails
    while (index < denom.length && change > 0) {
      var denomName = denom[index][0];
      var denomValue = denom[index][1];
      // check if the register can accept and give change
      if (change - denomValue > 0 && registerCash[denomName] > 0) {
        clientCash[denomName] = 0;
        // give as many of this bill
        while (change - denomValue >= 0 && registerCash[denomName] > 0) {
          clientCash[denomName] += denomValue / 100;
          registerCash[denomName] = parseInt(registerCash[denomName] - denomValue);
          change -= denomValue;
        }
      }
      index++;
    }
  
    if (change === 0) {
      let hasMoney = false;
  
      Object.keys(registerCash).forEach(key => {
        if (registerCash[key] > 0) {
          hasMoney = true;
        }
      });
  
      if (hasMoney) {
        return {
          status: "OPEN",
          change: Object.keys(clientCash).map(key => {
            let obj = [key, clientCash[key]];
            return obj;
          })
        };
      } else {
        return {
          status: "CLOSED",
          change: cid
        };
      }
    }
    return {
      status: "INSUFFICIENT_FUNDS",
      change: []
    }
  }
  
  console.log(checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
  ]));