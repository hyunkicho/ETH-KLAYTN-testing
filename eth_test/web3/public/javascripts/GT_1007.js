if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
  console.log("c");
} else {
  // set the provider you want from Web3.providers
  //web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/a5d883b8e91348bba8f7e625b35ebdc5"));
  web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

}

web3.eth.defaultAccount = web3.eth.accounts[0];

contractAddress = '0xccb496107edf82c1041e80606df7ad262bbdf167'; 
let contract = new web3.eth.Contract(giniLottoABI, contractAddress);
let methods = contract.methods;

contractAddress2 = '0xb6ccce90234d96133f2b8ede355277b75aea2c82'; 
let contract2 = new web3.eth.Contract(giniTokenABI, contractAddress2);
let methods2 = contract2.methods;

//var keystore = JSON.parse('{"version":3,"id":"22f86c23-52d1-4497-95f2-ef54c151488e","address":"cadee10fe938333fdda553ca9ec797cb679c5e18","crypto":{"ciphertext":"2904f3ee24bd7e1099b36465e0cba852a413365c31a89c9c66b26e1ca944a1a0","cipherparams":{"iv":"17c2ab650755e95134a59092b7f46db3"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"7193254837b2213eab2da5b3cd0446f8a2981066131f716582da8de622e91abc","n":8192,"r":8,"p":1},"mac":"0e61d7d9549aad660406197159fde97377233053db542c7a20c3508ad805a481"}}');
//var password = "wedata1016";
let nonce = 0;
let gameLotNumberMax = 25;
let address = ["0x5c11e0be060c2863fdc52802d50c09c9767b06f2","0xCfbca090181a0121B6f61B84eA583F405C86CF2d","0x6580c36587fF032b2EFb805AaFb9834ab718cA7c","0xf722BBF84311C3dbf2137Ef06a88775080591420","0x71A7B15aC83bf8421973f551309d0E0530a2f716","0x7Ba30853dD95948Db298672A50a876B5e4acED54"]
// let privateKey_arr = ["7e80cf8b04f92877e8f62cd6e015a5de2c8491aa5264d849782f16e981895c2d","c830a46b1765723de8eaeb2086186d28917e6d6af2e780e19c7b8f77c3b80e20","d9798406f7fa8a75d251cf909798fa7902520e64fdd49a62e5e6ad7835b7caa9","83352bd3f8e0648702f87ed66c52c28a8fbdd9033cf7938aefdb93aea1e69570","963f41f8e6e08d9c60408d114f00d148980cf8912c1b2fb01f52e14b2cb4bfc4","d61415b113fe73ad58058adf1394a1d8c5268db3a448355147b7caaac48320be"]



function login(){
var password = "wedata1016"
var privateKey = document.getElementById("privatekey").value;//privateKey_arr[0]

var keystore = web3.eth.accounts.encrypt(privateKey, password);
//let password = document.getElementById('pass').value;
// console.log(password);
// console.log(keystore);
// a= Promise.resolve(web3.eth.accounts.decrypt(keystore,password));
a= Promise.resolve(web3.eth.accounts.wallet.decrypt([keystore], password));
a.then(function (result){
console.log("로그인 되었습니다!");
document.getElementById("address").innerText = result[0].address;
web3.eth.defaultAccount = result[0].address;
document.getElementById("privateKey").innerText = result[0].privateKey;
let address = result[0].address;
let balval = 000;
let balance = web3.eth.getBalance(result[0].address).then(balval => {
    console.log("이더리움 잔액 : " + balval/10**18 + "ETH");
});
getNonce(address);
 methods.balanceOf(result[0].address).call().then(l => {
     document.getElementById('myBalance').innerText = l
 });
web3.eth.personal.unlockAccount(address, password, 6**100000).then(console.log('Account unlocked!'));
});
}


function login_auto(vpk){
var password = "wedata1016"
var privateKey = privateKey_arr[vpk]
var keystore = web3.eth.accounts.encrypt(privateKey, password);
//let password = document.getElementById('pass').value;
// console.log(password);
// console.log(keystore);
// a= Promise.resolve(web3.eth.accounts.decrypt(keystore,password));
a= Promise.resolve(web3.eth.accounts.wallet.decrypt([keystore], password));
a.then(function (result){
  console.log("로그인 되었습니다!");
  document.getElementById("address").innerText = result[0].address;
  web3.eth.defaultAccount = result[0].address;
  console.log(result[0].address);
  document.getElementById("privateKey").innerText = result[0].privateKey;
  let address = result[0].address;
  // let balval = 000;
  // let balance = web3.eth.getBalance(result[0].address).then(balval => {
  //     console.log("이더리움 잔액 : " + balval/10**18 + "ETH");
  });
  // getNonce(address);
  //  methods.balanceOf(result[0].address).call().then(l => {
  //      document.getElementById('myBalance').innerText = l
  //  });
 web3.eth.personal.unlockAccount(address, password, 6**100000).then(console.log('Account unlocked!'));
};


function getNonce(address) {
console.log(address);
web3.eth.getTransactionCount(address)
.then(l => {console.log(l); nonce = l;})
}


function buy250Lottery() {
var _buyer = "0x576ff80a742c6f5ff1cd56fcc61e5f0cc94163e5";//account6
var _donationid = 1;
var _lotNumber = [20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776]
var enabi = contract.methods.buyLottery(_buyer,_donationid,_lotNumber).encodeABI();
console.log(enabi);
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:6900000, gasPrice:10000000, data:enabi})
.on('transactionHash', function(hash){
  console.log(hash);
  //res.send({status: 'success', msg: ''});
})
.on('receipt', function(receipt){console.log(receipt)})
.on('confirmation', function(confirmationNumber, receipt){
  console.log(confirmationNumber);
  if(confirmationNumber == 3){
   console.log("confirmed")
   buy50Lottery();
  }
})
.on('error', function(err){
    console.log(err);
    sleep(200000);
    buy50Lottery();
  })
}



function generateRandomTicket(TicketCount) {

let _ticket = new Array();

for(var i=0; i<TicketCount; i++){
  let gg = generateRandom(31, 35184372088831);
  _ticket = _ticket.concat(gg);
  //Ticket[i]=generateRandom(1, gameLotNumberMax);
}
console.log("generate_Complete")
console.log(_ticket)
return _ticket;
}

function GetRandomNum(randomCount){
  generateRandomTicket(randomCount);

}

function RandomNum(){
  let randomCount = document.getElementById("RandomNum").value;
  let ticket = generateRandomTicket(randomCount);
  document.getElementById("RandomNum2").innerHTML = ticket;
}
// function debug() {
// console.log(Ticket)
// }
//function buyAutoLottery(vnonce) {



function buyAutoLotteryMIN() { //160개

let NumtoBuy = document.getElementById("NumtoBuy").value;
var _ticket = generateRandomTicket(NumtoBuy);
var _buyer = document.getElementById("Buyer").value;
var _donationid = 1;
var _lotNumber = _ticket;
var enabi = contract.methods.buyLottery(_buyer,_donationid, _lotNumber).encodeABI();
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:6900000, gasPrice:1000000000, data:enabi})
  .on('transactionHash', function(hash){
  console.log(hash);
  })
  .on('receipt', function(receipt){console.log(receipt)})
  .on('confirmation', function(confirmationNumber, receipt){
    console.log(confirmationNumber);
    if(confirmationNumber == 3){
    console.log("confirmed")
    i++;
    buyAutoLotteryMIN();
    }
  })
  .on('error', async function(err){
    console.log(err);
    if(i<1200){
    await sleep(200000);
    buyAutoLotteryMIN();
    }
  })
}


function buyAutoLotteryInput(repeat_num) {
for(var i=0;i<repeat_num;i++){
      function buyAutoLotteryMIN() { //160개
      let NumtoBuy = document.getElementById("NumtoBuy").value;
      var _ticket = generateRandomTicket(NumtoBuy);
      var _buyer = document.getElementById("Buyer").value;
      var _donationid = 1;
      var _lotNumber = _ticket;
      var enabi = contract.methods.buyLottery(_buyer,_donationid, _lotNumber).encodeABI();
        web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:6900000, gasPrice:1000000000, data:enabi})
        .on('transactionHash', function(hash){
        console.log(hash);
        })
        .on('receipt', function(receipt){console.log(receipt)})
        .on('confirmation', function(confirmationNumber, receipt){
        console.log(confirmationNumber);
        if(confirmationNumber == 3){
        console.log("confirmed")
        console.log("Active"+i+"times");
        }
      })
        .on('error', async function(err){
        console.log(err);
        await sleep(200000);
        if(i<1200){
        buyAutoLottery150();
         i++;
        }
  
        })
       }

  }
}

function buyAutoLotteryMAX() {
  let repeat = document.innerHTML.value("repeat");
  buyAutoLotteryInput(repeat);
}


const sleep = (ms) => {
return new Promise(resolve=>{
setTimeout(resolve,ms)
})
}

const generateRandom = function (min, max) {
let temparr = [];

//while(temparr.length < 5){
var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
temparr.push(ranNum);
temparr = Array.from(new Set(temparr));
//}

return temparr;
}


//Admin 권한 로또 실행

function adminGenerateRandom() {
console.log("adminGenerateRandom")
var enabi = contract.methods.adminGenerateRandom().encodeABI();
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:5900000, gasPrice:10000000, data:enabi})
.on('transactionHash', function(hash){
console.log(hash);
//res.send({status: 'success', msg: ''});
})
.on('receipt', function(receipt){console.log(receipt)})
.on('confirmation', function(confirmationNumber, receipt){
console.log(confirmationNumber);
if(confirmationNumber == 3){
console.log("confirmed")
}
})
.on('error', function(err){
console.log(err);
})
}

function adminDrawNumber() {
console.log("adminDrawNumber")
var enabi = contract.methods.adminDrawNumber().encodeABI();
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:5900000, gasPrice:10000000, data:enabi})
.on('transactionHash', function(hash){
console.log(hash);
//res.send({status: 'success', msg: ''});
})
.on('receipt', function(receipt){console.log(receipt)})
.on('confirmation', function(confirmationNumber, receipt){
console.log(confirmationNumber);
if(confirmationNumber == 3){
console.log("confirmed")
}
})
.on('error', function(err){
console.log(err);
})
}


function adminCalWinner() {
console.log("adminCalWinner")
var enabi = contract.methods.adminCalWinner().encodeABI();
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:5900000, gasPrice:10000000, data:enabi})
.on('transactionHash', function(hash){
console.log(hash);
//res.send({status: 'success', msg: ''});
})
.on('receipt', function(receipt){console.log(receipt)})
.on('confirmation', function(confirmationNumber, receipt){
console.log(confirmationNumber);
if(confirmationNumber == 3){
console.log("confirmed")
}
})
.on('error', function(err){
console.log(err);
})
}


function adminDistribute() {
console.log("adminDistribute")
var enabi = contract.methods.adminDistribute().encodeABI();
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:5900000, gasPrice:10000000, data:enabi})
.on('transactionHash', function(hash){
console.log(hash);
//res.send({status: 'success', msg: ''});
})
.on('receipt', function(receipt){console.log(receipt)})
.on('confirmation', function(confirmationNumber, receipt){
console.log(confirmationNumber);
if(confirmationNumber == 3){
console.log("confirmed")
}
})
.on('error', function(err){
console.log(err);
})
}

function adminEndGame() {
console.log("adminEndGame")
var enabi = contract.methods.adminEndGame().encodeABI();
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:5900000, gasPrice:10000000, data:enabi})
.on('transactionHash', function(hash){
console.log(hash);
//res.send({status: 'success', msg: ''});
})
.on('receipt', function(receipt){console.log(receipt)})
.on('confirmation', function(confirmationNumber, receipt){
console.log(confirmationNumber);
if(confirmationNumber == 3){
console.log("confirmed")
}
})
.on('error', function(err){
console.log(err);
})
}

function withdrawRewards() {
console.log("withdrawRewards")
rewards = getElementById.innerText("rewards");
var enabi = contract.methods.withdrawRewards(rewards).encodeABI();
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:5900000, gasPrice:10000000, data:enabi})
.on('transactionHash', function(hash){
console.log(hash);
//res.send({status: 'success', msg: ''});
})
.on('receipt', function(receipt){console.log(receipt
)})
.on('confirmation', function(confirmationNumber, receipt){
console.log(confirmationNumber);
if(confirmationNumber == 3){
console.log("confirmed")
}
})
.on('error', function(err){
  console.log(err);
})
} {
console.log("adminEndGame")
var enabi = contract.methods.adminEndGame().encodeABI();
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:5900000, gasPrice:10000000, data:enabi})
.on('transactionHash', function(hash){
console.log(hash);
//res.send({status: 'success', msg: ''});
})
.on('receipt', function(receipt){console.log(receipt)})
.on('confirmation', function(confirmationNumber, receipt){
console.log(confirmationNumber);
if(confirmationNumber == 3){
console.log("confirmed")
}
})
.on('error', function(err){
  console.log(err);
})
}


function TestregisterReferal() {
console.log("TestregisterReferal")
var _referals = ["0xAF9eF1a95cC469A41C4215d7e76d334997a8ce8D"
,"0xa5a0eB8583f8CaD0F8f0fe1fa7c862c46bb0b5e1"
,"0xe41Fa36804fefe9ABC45e55bA55153333A6baB99"
,"0x1a92E8E207eb7CF73c8c680bBCa44F49B72b7D64"
,"0x313C56ec707d6860d1535B64495eD2890858f063"
,"0xA6b1AD3fFbF707498eE00c268465a5d0E5b848AC"
,"0x2317d60a99116125270Eb0aADdD7cFdf790F2d58"
,"0x8478Efc6982e75abFb77E4643D3ce45D05e44259"
,"0xD9CF85502F48E2800f5792e7B5d82455D1505611"
,"0x16eDbF6d9B23d28682E269b6E43A98a278DEa340"
,"0xB6Ef21244930aE6B663EE86da8D352aC25F78a85"
,"0x584519ff9CDf3cC1556094b74C51d3FD03FAa55A"
,"0xEAB3feb77877fadf95229196822adBE62cD863f0"];
var enabi = contract.methods.TestregisterReferal(_referals).encodeABI();
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:5900000, gasPrice:10000000, data:enabi})
.on('transactionHash', function(hash){
console.log(hash);
//res.send({status: 'success', msg: ''});
})
.on('receipt', function(receipt){console.log(receipt)})
.on('confirmation', function(confirmationNumber, receipt){
console.log(confirmationNumber);
if(confirmationNumber == 3){
console.log("confirmed")
}
})
.on('error', function(err){
console.log(err);
})
}

//조회

function checking_lotto() {

  methods.gameId().call().then(l => {
    document.getElementById('gameId').innerText =  l;
  });
  
  methods.gameLotNumberMax().call().then(l => {
    document.getElementById('gameLotNumberMax').innerText =  l;
    let gameLotNumberMax = l;
  });
  
  
  methods.gameIndex(document.getElementById('gameId').innerText).call().then(l => {
   console.log(l)
   document.getElementById('isLotNumberDrawed ').innerText =  l[5] ;
   document.getElementById('isActive ').innerText =  l[6] ;
   document.getElementById('isWinnerCalculated').innerText =  l[7] ;
   document.getElementById('isDistributed ').innerText =  l[8] ;
   document.getElementById('ticketId ').innerText =  l[9] ;

  });
}

function checking_Token() {
  document.getElementById('gameId').innerText =  l;


  methods2.balanceOf().call().then(l => {
    document.getElementById('gameId').innerText =  l;
  });
  
  methods2.owner().call().then(l => {
    document.getElementById('owner').innerText =  l;
  });
  
  
  methods2.allowance(document.getElementById('owner'),).call().then(l => {
   

  });
}