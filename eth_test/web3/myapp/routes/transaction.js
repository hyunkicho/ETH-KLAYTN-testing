var express = require('express');
var Web3 = require('web3');
var router = express.Router();

router.post('/login', function(){
    try {
        //web3, contract 초기화
        var web3 = new Web3();
        //web3.setProvider(new web3.providers.HttpProvider("http://"+etherconfig.ip+":"+etherconfig.port))
        web3.setProvider(new web3.providers.HttpProvider(etherconfig.url));
        var contract = new web3.eth.Contract(TokenABI, etherconfig.contractAddr);
    
        //admin keystore 접근 및 decrypt
        var pk;
        try {
          var password = "wedata1016";  
          var keystore = JSON.parse('{"version":3,"id":"2fd3d37a-a9d1-4178-a37c-ad3b1b2e5a46","address":"aa2dca83ba1861ad935a5d62b075f9ad28d5c67b","crypto":{"ciphertext":"12083deda50ca11f652765d4b849f859163d3cc4cc0d70f400507d04f445bb98","cipherparams":{"iv":"cbcda40166a1a82b4dd9383aba42bb3e"},"cipher":"aes-128-ctr","kdf":"scrypt","kdfparams":{"dklen":32,"salt":"0fedcafed04570edf840dac2ae644999aa1842728e3a6aa312d1d32eb8460206","n":8192,"r":8,"p":1},"mac":"619b64a77d2986c2557daa441cb7386f1762dd647ece6b89c6bb80ad8daf2c52"}}');
          pk = web3.eth.accounts.wallet.decrypt([keystore], password);
        }
        catch (exception) {
            console.log(exception);
            res.send({status: 'error', msg: 'Wrong Password.'});
        }
    } catch (exception) {
        console.log("!!!! > "+exception);
        res.send({status: 'error', msg: exception.toString()});
    }
    res.send({status:'success', msg:'로그인되었습니다.'})
});

module.exports = router;