if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/a5d883b8e91348bba8f7e625b35ebdc5"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

// 6513개 버젼 contractAddress = '0xa0410a23e07a93b288dbfc760e5b5e1f6b39f498';
// 715 개 버전 contractAddress = '0xe05e088f090682c18abc146e2557ae610d18cacd';
// 150 개 버전 contractAddress = '0xb177fb2d52bfe20af534f26a20a9d7bf9ed94b64';
contractAddress = '0x517b1312978Dfa5235Ab544e65F4C76DBCa36Dc7'; 
let contract = new web3.eth.Contract(giniTokenABI, contractAddress);
let methods = contract.methods;
console.log(password);
console.log(keystore);



//var buyer = document.getElementById("buyer").value;
//var donationId = document.getElementById("donationId").value;
//var lotNumber = document.getElementById("lotNumber").value;
//var privatekey = document.getElementById("privatekey").value;
var keystore = JSON.parse('{"version":3,"id":"2fd3d37a-a9d1-4178-a37c-ad3b1b2e5a46","address":"aa2dca83ba1861ad935a5d62b075f9ad28d5c67b","crypto":{"ciphertext":"12083deda50ca11f652765d4b849f859163d3cc4cc0d70f400507d04f445bb98","cipherparams":{"iv":"cbcda40166a1a82b4dd9383aba42bb3e"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"0fedcafed04570edf840dac2ae644999aa1842728e3a6aa312d1d32eb8460206","n":8192,"r":8,"p":1},"mac":"619b64a77d2986c2557daa441cb7386f1762dd647ece6b89c6bb80ad8daf2c52"}}');
var password = "wedata1016";
let nonce = 0;
let gameLotNumberMax = 25;
console.log(password);
console.log(keystore);

//admin keystore 접근 및 decrypt
var privatekey;
try {
  // privatekey = web3.eth.accounts.wallet.decrypt([keystore], password);
}
catch (exception) {
}

//사용주소설정
// web3.eth.defaultAccount = "0xaa2dca83ba1861ad935a5d62b075f9ad28d5c67b";


// function login(){
//   //let password = document.getElementById('pass').value;
//   console.log(password);
//   console.log(keystore);
//   // a= Promise.resolve(web3.eth.accounts.decrypt(keystore,password));
//   a= Promise.resolve(web3.eth.accounts.wallet.decrypt([keystore], password));
//   a.then(function (result){
//     alert("로그인 되었습니다!");
//     document.getElementById("address").innerText = result[0].address;
//     web3.eth.defaultAccount = result[0].address;
//     document.getElementById("privateKey").innerText = result[0].privateKey;
//     let address = result[0].address;
//     let balval = 000;
//     let balance = web3.eth.getBalance(result[0].address).then(balval => {
//         console.log("이더리움 잔액 : " + balval/10**18 + "ETH");
//     });
//     getNonce(address);
//     methods.balanceOf(result[0].address).call().then(l => {
//         l=giniAmount;
//         giniAmount/10**18 = giniAmountEasy;
//         document.getElementById('myBalance').innerText = giniAmountEasy;
//     });
//   // web3.eth.personal.unlockAccount(address, password, 6**100000).then(console.log('Account unlocked!'));
//   });
// }

//contract 함수


function getNonce(address) {
  console.log(address);
web3.eth.getTransactionCount(address)
.then(l => {console.log(l); nonce = l;})
}

//전송
function buyLottery(vnonce) {
  var _buyer = "0xaa2dca83ba1861ad935a5d62b075f9ad28d5c67b";
  var _donationid = 1;
  var _lotNumber = [18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20] ;
  //var _lotNumber = [18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20]
  //위에껀 20개 아래꺼 30개
  var enabi = contract.methods.buyLottery(_buyer,_donationid,_lotNumber).encodeABI();
  console.log(enabi);
  web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:5900000, gasPrice:100000000, data:enabi, nonce:vnonce})
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

function buy20Lottery() {
  var _buyer = "0xaa2dca83ba1861ad935a5d62b075f9ad28d5c67b";
  var _donationid = 1;
  var _lotNumber = [18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20] ;
  //var _lotNumber = [18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20];
  //위에껀 20개 아래꺼 30개 
  var enabi = contract.methods.buyLottery(_buyer,_donationid,_lotNumber).encodeABI();
  console.log(enabi);
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





async function buy1000tickets() {//200개
      for(var i=0;i<10;i++){
          console.log("Active")
          buyLottery(nonce + i);
          await sleep(80000);
  }
}

//로또 조회

function checking() {

methods.gameId().call().then(l => {
  document.getElementById('gameId').innerText =  l;
});

methods.gameLotNumberMax().call().then(l => {
  document.getElementById('gameLotNumberMax').innerText =  l;
  let gameLotNumberMax = l;
});


methods.gameIndex(document.getElementById('gameId').innerText).call().then(l => {
 console.log(l)
 document.getElementById('gameIndex_ticketNumber').innerText =  l[5] ;
});
}
//토큰 조회
function checking2() {

  methods2.owner().call().then(l => {
      document.getElementById('owner').innerText =  l;
  });

  methods2.balanceOf().call().then(l => {
      document.getElementById('totalSupply').innerText =  l;
      let gameLotNumberMax = l;
  });


  methods2.gameIndex(document.getElementById('gameId').innerText).call().then(l => {
     console.log(l)
     document.getElementById('gameIndex_ticketNumber').innerText =  l[5] ;
  });
  }

  //티켓 구매 테스트


function generateRandomTicket(TicketCount) {
  
let Ticket = new Array();
console.log(gameLotNumberMax);
console.log(TicketCount);


for(var i=0; i<TicketCount; i++){
  let gg = generateRandom(1, gameLotNumberMax);
  Ticket = Ticket.concat(gg);
  // Ticket[i]=generateRandom(1, gameLotNumberMax);
}
console.log("generate_Complete")

return Ticket;
}

function debug() {
console.log(Ticket)
}
//function buyAutoLottery(vnonce) {

function buyAutoLottery(vnonce) {
console.log("a")
var _ticket = generateRandomTicket(20);
//console.log(Ticket)
var _buyer = "0xaa2dca83ba1861ad935a5d62b075f9ad28d5c67b";
var _donationid = 1;
var _lotNumber = _ticket;
console.log(_ticket)
var enabi = contract.methods.buyLottery(_buyer,_donationid, _lotNumber).encodeABI();
console.log(enabi);
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:5300000, gasPrice:100000000, data:enabi, nonce:vnonce})
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

async function buyAutoLottery1000tickets() {
for(var i=0;i<50;i++){
  console.log("Active")
  buyAutoLottery(nonce + i);
  await sleep(30000);
}
}



const sleep = (ms) => {
return new Promise(resolve=>{
setTimeout(resolve,ms)
})
}

const generateRandom = function (min, max) {
let temparr = [];

while(temparr.length < 5){
  var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
  temparr.push(ranNum);
  temparr = Array.from(new Set(temparr));
}

return temparr;
}


//admin 함수

function adminGenerateRandom() {
console.log("adminGenerateRandom")
var enabi = contract.methods.adminGenerateRandom().encodeABI();
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:7000000, gasPrice:100000000, data:enabi})
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
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:7000000, gasPrice:100000000, data:enabi})
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


function adminCalWithTicket() {
console.log("adminCalWithTicket")
var enabi = contract.methods.adminCalWithTicket().encodeABI();
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:7000000, gasPrice:100000000, data:enabi})
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
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:7000000, gasPrice:100000000, data:enabi})
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
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:7000000, gasPrice:100000000, data:enabi})
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
var _referals = ["0x6B86Ce01A24c5243C435B1b70F1296E35DeD59c7"
,"0x5197074A647CA00c2FcB43e3bDFbcF42245C9016"
,"0xFA5fB3abE938c5606EDC1719ED68b34cE43d741C"
,"0xA0565ed938bE639872b92344CFa29ab096C86215"
,"0xE14d71c804AAA43CED147257dbA12a61b97bA0b4"
,"0x33Fa4a46B7BED89a13e20f4d7a050478F9164293"
,"0x8E44865017676d260570ECfb43f2Ae9ECD7Add3d"
,"0xEd21785257b46Af588c583b979ee781338d123Ed"
,"0x66629c14978566148a89146A393dF1f85ab82cD2"
,"0x3630Ba941A9950E626Ce4103aE1400a44975F84b"
,"0xcd5d4A0092fA4A7CE8edbF81Ad2803bA1f7bEE3f"
,"0xE58483CbD1b83AC622c43bdBEe4573f242847a8a"
,"0xE649803DaFe5759713c5bd93a8D7370c023753fC"];
var enabi = contract.methods.TestregisterReferal(_referals).encodeABI();
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:5300000, gasPrice:100000000, data:enabi})
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

