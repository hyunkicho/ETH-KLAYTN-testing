if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    console.log("c");
} else {
    // set the provider you want from Web3.providers
    console.log("a");
    web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/a5d883b8e91348bba8f7e625b35ebdc5"));
    console.log("b");
}

web3.eth.defaultAccount = web3.eth.accounts[0];

// 테스트 용도로 새로 만든 ca contractAddress = '0xb6c9871a7fe52750e7e417bd7730295b88f8c519';
//test1과 동일 contractAddress = '0xe05e088f090682c18abc146e2557ae610d18cacd'; 
contractAddress = '0x350e6ea5ae03153a7c108ef3961d23159c7a1463'; 
let contract = new web3.eth.Contract(giniLottoABI, contractAddress);
let methods = contract.methods;



//var buyer = document.getElementById("buyer").value;
//var donationId = document.getElementById("donationId").value;
//var lotNumber = document.getElementById("lotNumber").value;
//var privatekey = document.getElementById("privatekey").value;
var keystore = JSON.parse('{"version":3,"id":"22f86c23-52d1-4497-95f2-ef54c151488e","address":"cadee10fe938333fdda553ca9ec797cb679c5e18","crypto":{"ciphertext":"2904f3ee24bd7e1099b36465e0cba852a413365c31a89c9c66b26e1ca944a1a0","cipherparams":{"iv":"17c2ab650755e95134a59092b7f46db3"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"7193254837b2213eab2da5b3cd0446f8a2981066131f716582da8de622e91abc","n":8192,"r":8,"p":1},"mac":"0e61d7d9549aad660406197159fde97377233053db542c7a20c3508ad805a481"}}');
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

function login(){
//let password = document.getElementById('pass').value;
console.log(password);
console.log(keystore);
// a= Promise.resolve(web3.eth.accounts.decrypt(keystore,password));
a= Promise.resolve(web3.eth.accounts.wallet.decrypt([keystore], password));
a.then(function (result){
  alert("로그인 되었습니다!");
  document.getElementById("address").innerText = result[0].address;
  web3.eth.defaultAccount = result[0].address;
  document.getElementById("privateKey").innerText = result[0].privateKey;
  let address = result[0].address;
  let balval = 000;
  let balance = web3.eth.getBalance(result[0].address).then(balval => {
      console.log("이더리움 잔액 : " + balval/10**18 + "ETH");
  });
  getNonce(address);
  // methods.balanceOf(result[0].address).call().then(l => {
  //     document.getElementById('myBalance').innerText = l
  // });
// web3.eth.personal.unlockAccount(address, password, 6**100000).then(console.log('Account unlocked!'));
});
}

//contract 함수


function getNonce(address) {
  console.log(address);
web3.eth.getTransactionCount(address)
.then(l => {console.log(l); nonce = l;})
}

//전송
function buyLottery(vnonce) {
var _buyer = "0x576ff80a742c6f5ff1cd56fcc61e5f0cc94163e5";
var _donationid = 1;
var _lotNumber = [18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20,18,2,1,5,20] ;
var enabi = contract.methods.buyLottery(_buyer,_donationid,_lotNumber).encodeABI();
console.log(enabi);
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:5900000, gasPrice:10000000, data:enabi, nonce:vnonce})
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
  buyLottery(vnonce + 1);
})
}

function buy20Lottery() {
  var _buyer = "0x576ff80a742c6f5ff1cd56fcc61e5f0cc94163e5";
  var _donationid = 1;
  var _lotNumber = [20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776,20963735371776];

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
     buy20Lottery();
    }
  })
  .on('error', function(err){
      console.log(err);
      buyLottery(nonce+1);
    })
  }





async function buy1000tickets() {//200개 구매
      for(var i=0;i<1000;i++){
          console.log("Active")
          buyLottery(nonce + i);
          await sleep(10000);
  }
}

//조회

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
web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:5900000, gasPrice:10000000, data:enabi, nonce:vnonce})
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
  await sleep(100000);
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


function adminCalWithTicket() {
console.log("adminCalWithTicket")
var enabi = contract.methods.adminCalWithTicket().encodeABI();
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

