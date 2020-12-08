pragma solidity ^0.5.6; //0.5.10+commit.5a6ea5b1.Emscripten.clang
import "./SafeMath.sol";
import "./giniToken.sol";
import "./giniDonation.sol";

contract giniLotto {
    using SafeMath for uint256;
    uint  startTime ;
    
    giniToken giniTokenContract;
    giniDonation giniDonationContract;
    address public donationAddress;
    address public gtAddress ;

    //# TOKEN & PRICE
    uint    public gtPrice = 1 * (10 ** 18); //1 gini for 1 game
    uint    public divisor = 10000;

    //# FUND USAGE
    uint public SALES_AMOUNT; // SALES AMOUNT OF CURRENT GAME
    enum fundId {NOT_WINNING_PAYBACK, MAINTENANCE_COST, LAMP_TOKEN_STAKING_REWARD, GINI_STORE_REWARD, PARTICIPATION_REWARD}
    uint[5] fundDistributionRaio = [200, 800, 1000, 1300, 1900]; //[2%, 8%, 10%, 13%, 19%] - total 52% of SALES_AMOUNT
    mapping (uint8 => address) public fundAddressIndex;

    uint public PRIZE_MONEY; // 48% of SALES_AMOUNT
    uint public PRIZE_MONEY_FOR_REFERAL = 2500; // 25% of rank 1
    uint[3] public PRIZE_MONEY_RATIO_BY_RANK = [6000, 1400, 700]; // rank 1 - 30%, 2 - 7.5%, 3 - 3.5% of PRIZE_MONEY
    uint[] public PRIZE_MONEY_FOR_REFERAL_RATIO ; // ex [1000,500,300,200,100,100,100,100,50,50]
    //#DONATION
    uint  public donationVotingDuration = 2 ;
    bool   public isDonationSet;

    //# GAME
    uint48[5] internal maskBit = [67108862, 2147483646, 68719476734, 2199023255550, 70368744177662];

    uint  public gameDuration = 1 days;
    uint  public gameLotNumberCounts;
    uint  public gameLotNumberMax;
    uint  public gameId;

    //REFERAL
    uint referalLevel = 2;


    mapping (uint => address) public playerIndex;
    mapping (address => playerInfo) public playerTree;
    mapping (uint => gameInfo) public gameIndex;

    struct rankInfo {
        uint rewards;
        uint winnerCounts;
        mapping (address => mapping(uint => bool)) isRewarded;
    }
    struct playerInfo {
        uint   referalLevel;
        uint   referalRewards;
        uint   lastPlayedGameId;
        address referal;
        mapping (uint => uint) referalPlayed; // gameId => count
    }
    struct lotNumberInfo {
        mapping (address => bool) isRewarded;
        address[] addrs;
    }
    struct gameInfo {
        uint  startedTime;
        
        //RAND NUMBER
        uint klayBlockNumber; // klaytn block number
        uint  rndSource;
        uint[] drawedLotNumber; // 5 numbers from sourceHash
        uint64 drawedLotNumberBit;
        
        mapping (uint => address[]) lotNumberIndex;
        uint salesAmount;

        mapping (uint => rankInfo) rankIndex;
        
        bool isActive;
        bool isLotNumberDrawed;
        uint winnerCalculated;
        bool isDistributed;
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//getter

    function getGameLotNumberIndex(uint _gameId, uint _lotNumber)public view returns(address[] memory addr) {
            return gameIndex[_gameId].lotNumberIndex[_lotNumber];
    }
    function getDrawedLotNumber(uint _gameId)public view returns(uint[] memory _lotNumber) {
            return gameIndex[_gameId].drawedLotNumber;
    }
    
    function getRankInfo(uint _gameId, uint _score)public view returns(uint rewards, uint winnerCounts) {
            rewards = gameIndex[_gameId].rankIndex[_score].rewards;
            winnerCounts = gameIndex[_gameId].rankIndex[_score].winnerCounts;
            return (rewards, winnerCounts);
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    function dropTheBit(uint64 _x) public pure returns(uint64) { //log2(64)
        uint64 x = _x;
        x = (x & 0x5555555555555555) + ((x >> 1) & 0x5555555555555555);
        x = (x & 0x3333333333333333) + ((x >> 2) & 0x3333333333333333);
        x = (x & 0x0f0f0f0f0f0f0f0f) + ((x >> 4) & 0x0f0f0f0f0f0f0f0f);
        x = (x & 0x00ff00ff00ff00ff) + ((x >> 8) & 0x00ff00ff00ff00ff);
        x = (x & 0x0000ffff0000ffff) + ((x >> 16) & 0x0000ffff0000ffff);
        x = (x & 0x00000000ffffffff) + ((x >> 32) & 0x00000000ffffffff);
        return x;
    }

    function cntWin(uint _p, uint _r, uint _init, uint _tgt) internal returns(uint){
        gameInfo storage _gameInfo = gameIndex[gameId];

        uint _cnt;
        for (uint _i = _init; _i <= _tgt && _i <= gameLotNumberMax; _i++){
            if (_p & (2 ** _i) == 0 && (2 ** _i) & _gameInfo.drawedLotNumberBit == 0){
                uint _p1 = _p | (2 ** _i);
                if (_r == gameLotNumberCounts - 2){ //for rank 3
                    _cnt += cntWin(_p1, 0, _i + 1, gameLotNumberMax);
                }
                else if(_gameInfo.lotNumberIndex[_p1].length > 0){
                    _cnt += _gameInfo.lotNumberIndex[_p1].length;
                }
            }
        }
        return(_cnt);
    }
    function combination(uint _p, uint _r, uint _ir, uint8 _t, uint _init, uint _tgt) internal returns(uint) {
        uint _cnt;
        gameInfo storage _gameInfo = gameIndex[gameId];
        if (_r == 0) {
            _cnt += cntWin(_p, _ir, _init, _tgt);
            return(_cnt);
        }
        else if (_t == gameLotNumberCounts) {return 0;}
        else {
            _cnt += combination(_p | 2 ** _gameInfo.drawedLotNumber[_t], _r - 1, _ir, _t + 1, _init, _tgt);
            _cnt += combination(_p, _r, _ir, _t + 1, _init, _tgt);
            return(_cnt);
        }
    }

//////////////////////
//RW
    constructor (address _tokenAddress) public {
        gtAddress = _tokenAddress;
        giniTokenContract = giniToken(gtAddress);
        gameIndex[gameId].isDistributed = true;
//enum fundId {NOT_WINNING_PAYBACK, MAINTENANCE_COST, LAMP_TOKEN_STAKING_REWARD, GINI_STORE_REWARD, PARTICIPATION_REWARD}
        fundAddressIndex[uint8(fundId.NOT_WINNING_PAYBACK)] = 0x6289Ff0193209e85818c534afbC8e3493DeDA81D;
        fundAddressIndex[uint8(fundId.MAINTENANCE_COST)] = 0xFC97dd1e237Da25Bc9097aF08c583f399a1f9E63;
        fundAddressIndex[uint8(fundId.LAMP_TOKEN_STAKING_REWARD)] = 0xa61282F65e25BDCfbF597b39303CA535DA52859f;
        fundAddressIndex[uint8(fundId.GINI_STORE_REWARD)] = 0xa61282F65e25BDCfbF597b39303CA535DA52859f;
        fundAddressIndex[uint8(fundId.PARTICIPATION_REWARD)] = 0xa61282F65e25BDCfbF597b39303CA535DA52859f;
        address _rootPlayer = msg.sender;
        playerTree[_rootPlayer].referalLevel = 1;
        
        //donationVotingDuration = 30;
        playerIndex[1] = msg.sender;
        playerTree[msg.sender].referalLevel = 1;
    }
///////////////////////
//ADMIN_FUNCTION
    event AdminSetDonation(address _donationAddress, uint _votingDuraion);
    function adminSetDonation(address _donationAddress, uint _votingDuraion) public onlyOwner {
        require(isDonationSet == false, "Donation already exists in progress");
        donationAddress = _donationAddress;
        giniDonationContract = giniDonation(donationAddress);

        donationVotingDuration = _votingDuraion;
        isDonationSet = true;
        emit AdminSetDonation(_donationAddress, _votingDuraion);
    }
    event AdminBeginAGame(uint indexed _gameId, uint _gameLotNumberMax, uint _gameLotNumberCounts);
    function adminBeginAGame(uint _gameLotNumberMax, uint _gameLotNumberCounts, uint16[] memory _rwdsLotteryRank1ReferalRate) public onlyOwner {
        require(donationAddress != address(0), "needs giniDonationContract address setting");
        require(25 <= _gameLotNumberMax && _gameLotNumberMax <= 45, "!(25 <= _gameLotNUmberMax <= 45)");
        require(_gameLotNumberMax % 5 == 0, "_gameLotNumberMax can not divided by 5");
        require(gameIndex[gameId].isActive == false, "The game is not over");
        require(gameIndex[gameId].isDistributed == true,"Previous game's rewards should be distributed");
        require(_gameLotNumberCounts == 5 || _gameLotNumberCounts == 6, "check the _gameLotNumberCounts");

        uint _referalTotalRate;
        for (uint _i; _i < _rwdsLotteryRank1ReferalRate.length; _i++){
            _referalTotalRate += _rwdsLotteryRank1ReferalRate[_i];
        }
        require(_referalTotalRate == 2500, "The sum of _rwdsLotteryRank1ReferalRate is not 25%");

        gameLotNumberCounts = _gameLotNumberCounts;
        gameLotNumberMax = _gameLotNumberMax;
        gameId = gameId.add(1);
        gameIndex[gameId].isActive = true;
        gameIndex[gameId].startedTime = now;

        emit AdminBeginAGame(gameId, _gameLotNumberMax, _gameLotNumberCounts);
    }
    function adminEndGame() public onlyOwner {
        require(gameIndex[gameId].isActive == true, "The game is not active");
        require(gameIndex[gameId].klayBlockNumber == 0, "The random generated already");
        
        gameIndex[gameId].klayBlockNumber = block.number + 10;
        gameIndex[gameId].isActive = false;
    }
    event AdminDrawNumber(uint indexed _gameId, uint[]  _ethBlockNumber, bytes32[]  _ethBlockHash);
    function adminDrawNumber(uint[] memory _ethBlockNumber, bytes32[] memory _ethBlockHash) public onlyOwner {
        require(gameIndex[gameId].isLotNumberDrawed == false, "The winning number had been drawed already");
        require(blockhash(gameIndex[gameId].klayBlockNumber) != 0, "rndSourceBlock hasn't been created yet");
        uint _rndSource;
        for (uint _i; _i < _ethBlockNumber.length; _i++){
            require(_ethBlockNumber[_i] * uint(_ethBlockHash[_i]) != 0, "eth block source == 0");
            _rndSource ^= uint(keccak256(abi.encodePacked((blockhash(gameIndex[gameId].klayBlockNumber) ^ _ethBlockHash[_i]))));
        }
        gameIndex[gameId].rndSource = _rndSource;
        emit AdminDrawNumber(gameId, _ethBlockNumber, _ethBlockHash);

        gameInfo storage _gameInfo = gameIndex[gameId];        
        uint _drawedLotNumberBit; //
        for (uint8 i = 0; i < gameLotNumberCounts; i++){ //loop 5 | 6
            uint _tmpNum = ((_rndSource >> (23 * i)) % gameLotNumberMax) + 1; //1 ~ 45
            while (_drawedLotNumberBit & (2 ** _tmpNum) != 0){ //duplicate check
                  _tmpNum = (_tmpNum * (_rndSource >> (23 * i)) % gameLotNumberMax) + 1;
                  }
            _drawedLotNumberBit |= 2 ** _tmpNum;
            _gameInfo.drawedLotNumber.push(_tmpNum);
            ///////////
            //_gameInfo.drawedLotNumber.push(i); // for test
        }
        _gameInfo.drawedLotNumberBit = uint64(62 | (2 ** gameLotNumberCounts)); // for test
        _gameInfo.isLotNumberDrawed = true;
    }
    function adminCalWins() public onlyOwner {
        require(gameIndex[gameId].isLotNumberDrawed == true, "draw The winning number first");
        require(gameIndex[gameId].winnerCalculated < (gameLotNumberMax / 5) - 4, "already calculated");
        gameInfo storage _gameInfo = gameIndex[gameId];

        uint _part = gameLotNumberMax / ((gameLotNumberMax / 5) - 4);
        uint _init = (_gameInfo.winnerCalculated * _part) + 1;
        uint _tgt = (_gameInfo.winnerCalculated + 1) * _part;

        if (_gameInfo.lotNumberIndex[_gameInfo.drawedLotNumberBit].length > 0) {
            _gameInfo.rankIndex[5].winnerCounts = _gameInfo.lotNumberIndex[_gameInfo.drawedLotNumberBit].length; //rank 1 count
        }
        _gameInfo.rankIndex[4].winnerCounts += combination(0, gameLotNumberCounts-1, gameLotNumberCounts-1, 0, _init, _tgt); //rank 2 count
        _gameInfo.rankIndex[3].winnerCounts += combination(0, gameLotNumberCounts-2, gameLotNumberCounts-2, 0, _init, _tgt); //rank 3 count
        gameIndex[gameId].winnerCalculated += 1;
    }
    function adminDistribute() public onlyOwner{
        require(gameIndex[gameId].winnerCalculated == (gameLotNumberMax/5)-4, "calculate the winner");
        require(gameIndex[gameId].isDistributed == false, "Already distributed");

        uint _amountSended;
        for (uint8 _f; _f < 5; _f++){
            uint _amountToSend = SALES_AMOUNT.div(divisor).mul(fundDistributionRaio[_f]);
            address _fundAddress = fundAddressIndex[_f];
            giniTokenContract.transfer(_fundAddress, _amountToSend);
            _amountSended += _amountToSend;
        }
        PRIZE_MONEY = PRIZE_MONEY.add(SALES_AMOUNT.sub(_amountSended));
        SALES_AMOUNT = 0;
        
        gameInfo storage _gameInfo = gameIndex[gameId];
        //calculation for rank 1,2,3 rewrads
        for (uint _r = 5; _r > 2; _r--) {
            if (_gameInfo.rankIndex[_r].winnerCounts > 0){
                _gameInfo.rankIndex[_r].rewards = PRIZE_MONEY.div(divisor).mul(PRIZE_MONEY_RATIO_BY_RANK[5 - _r]);
                PRIZE_MONEY = PRIZE_MONEY.sub(_gameInfo.rankIndex[_r].rewards);
            }
        }

        //distribution to rank 1's referal
        if (_gameInfo.rankIndex[5].winnerCounts > 0){

            uint _rank1Rewards = _gameInfo.rankIndex[5].rewards.div(_gameInfo.rankIndex[5].winnerCounts); //
            uint amountSendedToRef;
            for (uint _i; _i < _gameInfo.rankIndex[5].winnerCounts; _i++){
                address _referalRoot = _gameInfo.lotNumberIndex[_gameInfo.drawedLotNumberBit][_i];
                address _referalAddr = playerTree[_referalRoot].referal;
                for (uint _refCount; _referalAddr != address(0) && _refCount < PRIZE_MONEY_FOR_REFERAL_RATIO.length; _refCount++) {
                    if (gameId == playerTree[_referalAddr].lastPlayedGameId && playerTree[_referalAddr].referalPlayed[gameId] >= _refCount + 1){ //2 conditions for get referal rewards
                            uint _amountToRef = _rank1Rewards.div(divisor).mul(PRIZE_MONEY_FOR_REFERAL_RATIO[_refCount]);
                            playerTree[_referalAddr].referalRewards = playerTree[_referalAddr].referalRewards.add(_amountToRef);
                            amountSendedToRef = amountSendedToRef.add(_amountToRef);
                        }
                    _referalAddr = playerTree[_referalAddr].referal;
                }
            }
            PRIZE_MONEY = PRIZE_MONEY.sub(amountSendedToRef);
        }
        //donation
        if (gameId % donationVotingDuration == 0){
            giniDonationContract.adminGetDonationRank();
        }
        gameIndex[gameId].isDistributed = true;
    }

    //### PERMISSION
    event AdminSetFundAddress(fundId indexed _fundId, address _fromAddress, address _toAddress);
    function adminSetFundAddress(fundId _fundId, address _toAddress) public {
        require(_toAddress != address(0), "address should not be 0");
        require(fundAddressIndex[uint8(_fundId)] == msg.sender, "permission required");
        emit AdminSetFundAddress(_fundId, fundAddressIndex[uint8(_fundId)], _toAddress);
        fundAddressIndex[uint8(_fundId)] = _toAddress;
    }
    modifier onlyOwner() {
        require(giniTokenContract.isThisOwner(msg.sender), "not owner");
        _;
    }
    //### GENERAL
    function fund4Lottery(uint _amount) public{
        giniTokenContract.transferFrom(msg.sender, address(this), _amount);
        PRIZE_MONEY = PRIZE_MONEY.add(_amount);
    }
    event AdminRegisterReferal(address indexed _from, address _referal);
    function adminRegisterReferal(address _from, address _referal) public onlyOwner{
        require(playerTree[_referal].referalLevel > 0, "The referal has not have referalLevel");
        require(playerTree[_from].referalLevel == 0, "Already has a referal");
        require(_from != _referal, "Already has a referal");
        playerTree[_from].referal = _referal;
        playerTree[_from].referalLevel = referalLevel;
        referalLevel = referalLevel.add(1);
        emit AdminRegisterReferal(_from, _referal);
        require(playerTree[_from].referalLevel > playerTree[_referal].referalLevel,
                 "The referal's level is higher than the msg.sender's");
    }
    function withDrawReferalRewards() public {
        require(playerTree[msg.sender].referalRewards > 0, "empty rewards");
        uint _getAmount = playerTree[msg.sender].referalRewards;
        playerTree[msg.sender].referalRewards = 0;
        giniTokenContract.transfer(msg.sender, _getAmount);
    }
    function withdrawRewards(address _recevier, uint _gameId, uint64 _lotNumberBit, uint _donationRate) public{
        require(30 <= _donationRate, "!(30 <= _donationRate");
        require(dropTheBit(_lotNumberBit) == gameLotNumberCounts, "Check the _lotNumberBit");
        gameInfo storage _gameInfo = gameIndex[_gameId];
        uint _rank = dropTheBit(_lotNumberBit & _gameInfo.drawedLotNumberBit);
        require((gameLotNumberCounts - 2) <= _rank, "not the winning number");
        
        //check if Winner or not
        uint _stakeForRewards;
        for (uint _i; _i < _gameInfo.lotNumberIndex[_lotNumberBit].length; _i++){
            if (_gameInfo.lotNumberIndex[_lotNumberBit][_i] == _recevier){
                _stakeForRewards++;
            }
        }
        require(_stakeForRewards > 0, "_recevier is not the winner");
        require(_donationRate <= 10000, "_donationRate exceeds 1000");

        rankInfo storage _rankInfo = _gameInfo.rankIndex[_rank];
        require(_rankInfo.isRewarded[_recevier][_lotNumberBit] == false, "_recevier already got rewards");
        _rankInfo.isRewarded[_recevier][_lotNumberBit] = true;

        //calculate rewards
        uint _amountToGet = _rankInfo.rewards.div(_rankInfo.winnerCounts).mul(_stakeForRewards);
        uint _amountToDonate = _amountToGet.div(divisor).mul(_donationRate);
        _amountToGet = _amountToGet.sub(_amountToDonate);
        giniTokenContract.transfer(donationAddress, _amountToDonate);
        giniTokenContract.transfer(_recevier, _amountToGet);
    }

    event BuyLottery(uint indexed _gameId, address indexed _buyer, uint48[] _lotNumberBit);
    function buyLottery(address _buyer, uint _donationId, uint48[] memory _lotNumberBit ) public {
        require(gameIndex[gameId].isActive == true, "The game is not active");

        if(playerTree[_buyer].lastPlayedGameId < gameId){
            playerTree[_buyer].lastPlayedGameId = gameId;
            if(playerTree[_buyer].referal != address(0)){
                playerTree[playerTree[_buyer].referal].referalPlayed[gameId] += 1;
            }
        }

        uint _ticketToBuy = _lotNumberBit.length;
        giniDonationContract.donationVote(_donationId, _ticketToBuy);

        giniTokenContract.transferFrom(msg.sender, address(this), gtPrice.mul(_ticketToBuy));
        SALES_AMOUNT = SALES_AMOUNT.add(gtPrice.mul(_ticketToBuy));

        gameInfo storage _gameInfo = gameIndex[gameId];
        for (uint tckt = 0; tckt < _ticketToBuy; tckt++)
        {
            require(dropTheBit(_lotNumberBit[tckt] & maskBit[(gameLotNumberMax/5)-5]) == gameLotNumberCounts, "Check The _lotNumberBit");
            _gameInfo.lotNumberIndex[_lotNumberBit[tckt]].push(_buyer);
        }
        _gameInfo.salesAmount += _ticketToBuy;
        emit BuyLottery (gameId, _buyer, _lotNumberBit);
    }
    function multiBuyLottery(address[] memory _buyers, uint[] memory _donationIds,
                            uint[] memory _ticketToBuy, uint48[] memory _lotNumbers) public {
        require(_buyers.length == _donationIds.length, "array's length are not same");
        require(_buyers.length == _ticketToBuy.length, "array's length are not same");
        uint _ticketDelivered;
        for (uint i; i < _buyers.length; i++){
            uint48[] memory _lotNumberArr = new uint48[](_ticketToBuy[i]);
            for (uint _t; _t < _lotNumberArr.length; _t++){
                _lotNumberArr[_t] = _lotNumbers[_ticketDelivered+_t];
            }
            _ticketDelivered += _lotNumberArr.length;
            buyLottery(address(_buyers[i]),_donationIds[i],_lotNumberArr);
        }
    }

    function TestregisterReferal(address _parents, uint _depth, uint _numOfChilds) public {
        address _child;
        for (uint _d ; _d < _depth; _d++){
            for (uint _c = 1; _c <= _numOfChilds; _c++){
                 _child = address(_d * 16 + _c);
                adminRegisterReferal(_child, _parents);
            }
        _parents = _child;
        }
    }
    function multiRegisterReferal(address[] memory _child, address[] memory _parents) public {
        require(_child.length == _parents.length,"child.length != _parents.length");
        for (uint _i ; _i < _child.length; _i++){
            adminRegisterReferal(_child[_i], _parents[_i]);
        }
    }

    function TestGetReferalTree(address _from, uint _depth) public view returns(address[] memory){
        address a = _from;
        address[] memory array1 = new address[](_depth);
        for (uint i; i < _depth; i++){
            if (playerTree[a].referal == address(0)){_depth = i; break;}
            array1[i] = playerTree[a].referal;
            a = playerTree[a].referal;
        }
        address[] memory array2 = new address[](_depth);

        for (uint _a; _a < array1.length; _a++){
            array2[_a] = array1[_a];
        }
        return array2;
        }
}
