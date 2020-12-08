if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    console.log("c");
} else {
    // set the provider you want from Web3.providers
    //web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/a5d883b8e91348bba8f7e625b35ebdc5"));
    web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

}

function create_100accounts(){
  web3.eth.accounts.wallet.create(100, web3.utils.randomHex(32));
  var arr = [];
  for(i=0;i<100;i++){
  a = web3.eth.accounts.wallet[i]["privateKey"]
  arr.push(a);
  }
}

function give_test_ether(){
  for(i=0;i<100;i++){
    a=Promins.resolve= login()
    a.then(function(result)
    let privateKey = web3.eth.accounts.wallet[i]["privateKey"];
    let _to = web3.eth.accounts.wallet[i]["address"];
    web3.eth.sendTransaction({
      from: '0x6A0dBd076F67fA016eFD2622012318bdD8Fe1b6a',
      to: _to,
      value: web3.utils.toWei('1', 'ether')
    })
    .on('transactionHash', function(hash){
    })
    .on('receipt', function(receipt){
    })
    .on('confirmation', function(confirmationNumber, receipt){  })
    .on('error', console.error);
    )
  }
}




web3.eth.defaultAccount = web3.eth.accounts[0];

contractAddress = '0xd855ab907d0fbc7f160a2a3c77db3411b908f762'; 
let contract = new web3.eth.Contract(giniLottoABI, contractAddress);
let methods = contract.methods;

contractAddress2 = '0xb329523cd30e0508edcc933bfe0a686a9e60a722'; 
let contract2 = new web3.eth.Contract(giniTokenABI, contractAddress2);
let methods2 = contract2.methods;

//var keystore = JSON.parse('{"version":3,"id":"22f86c23-52d1-4497-95f2-ef54c151488e","address":"cadee10fe938333fdda553ca9ec797cb679c5e18","crypto":{"ciphertext":"2904f3ee24bd7e1099b36465e0cba852a413365c31a89c9c66b26e1ca944a1a0","cipherparams":{"iv":"17c2ab650755e95134a59092b7f46db3"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"7193254837b2213eab2da5b3cd0446f8a2981066131f716582da8de622e91abc","n":8192,"r":8,"p":1},"mac":"0e61d7d9549aad660406197159fde97377233053db542c7a20c3508ad805a481"}}');
//var password = "wedata1016";
let nonce = 0;
let gameLotNumberMax = 25;
let privateKey_arr = ["f826cc54a71b7e2bbf67491047648c469c1c6b89a8335f682c9c781a83b1924c",""]

function login(){
var password = "wedata1016"
var privateKey = "c830a46b1765723de8eaeb2086186d28917e6d6af2e780e19c7b8f77c3b80e20";//privateKey_arr[0]
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
  a= Promise.resolve(web3.eth.accounts.wallet.decrypt([keystore], password));
  a.then(function (result){
    console.log("로그인 되었습니다!");
    document.getElementById("address").innerText = result[0].address;
    web3.eth.defaultAccount = result[0].address;
    console.log(result[0].address);
    document.getElementById("privateKey").innerText = result[0].privateKey;
    let address = result[0].address;
   
    });
  
   web3.eth.personal.unlockAccount(address, password, 6**100000).then(console.log('Account unlocked!'));
  };



function generateRandomTicket(TicketCount) {
  
  let Ticket = new Array();
  
  for(var i=0; i<TicketCount; i++){
    let gg = generateRandom(31, 35184372088831);
    Ticket = Ticket.concat(gg);
    //Ticket[i]=generateRandom(1, gameLotNumberMax);
  }
  console.log("generate_Complete")
  
  return Ticket;
  }

  function buyAutoLottery150() { //3개

  console.log("a")
  var _ticket = generateRandomTicket(50);
  var _buyer = "0xaa2dca83ba1861ad935a5d62b075f9ad28d5c67b";
  var _donationid = 1;
  var _lotNumber = _ticket;
  console.log(_ticket)
  var enabi = contract.methods.buyLottery(_buyer,_donationid, _lotNumber).encodeABI();
       web3.eth.sendTransaction({from:web3.eth.defaultAccount ,to:contractAddress, value:0, gas:6000000, gasPrice:1000000000, data:enabi})
       .on('transactionHash', function(hash){
       console.log(hash);
       })
       .on('receipt', function(receipt){console.log(receipt)})
       .on('confirmation', function(confirmationNumber, receipt){
       console.log(confirmationNumber);
       if(confirmationNumber == 3){
       console.log("confirmed")
         if(i<1200){
        buyAutoLottery150();
        i++;
        }

      }
  })
       .on('error', function(err){
         console.log(err);
         //await sleep(200000);
         if(i<1200){
        buyAutoLottery150();
           i++;
         }

         })
       }

function buyAutoLottery600000tickets() {
for(var i=0;i<5;i++){
  buyAutoLottery(nonce + i);
  console.log("Active")
  }
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