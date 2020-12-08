pragma solidity ^0.5.10; //+commit.5a6ea5b1.Emscripten.clang
import "./0.giniLotto.sol";
import "./giniToken.sol";

contract giniDonation {
    giniToken giniTokenContract;
    address public giniLottoAddress;
    address public giniTokenAddress;

    uint   public donationVotingId;
    mapping (uint =>  donationvoting) public donationVotingIndex;
    uint16[3] public rwdsDonationRankRate = [500, 300, 200];
    
    struct donationRankInfo {
        uint donatedAmount;
        address[] donationAddress;
    }
    struct donationvoting {
        uint donationId;
        mapping (uint => donationRankInfo) donationRankIndex;
        mapping (uint => donation) donationIndex;
        bool donated;
    }
    struct donation {
        uint hopeFundAmount;
        uint numberOfVotes;
        string name;
        string usage;
        string SNS;
        address donationOwner;
    }
    modifier onlyOwner() {
        require(giniTokenContract.isThisOwner(msg.sender), "not owner");
        _;
    }
    constructor (address _lottoAddress, address _giniTokenAddress) public {
        giniLottoAddress = _lottoAddress;
        giniTokenAddress = _giniTokenAddress;
        giniTokenContract = giniToken(giniTokenAddress);

    }
    modifier onlyGini() {
        require(msg.sender == giniLottoAddress, "msg.sender must be giniLotto");
        _;
    }
    function donate(uint _amountToDonate, uint _donationId) public {
        require(giniTokenContract.allowance(msg.sender, address(this)) >= _amountToDonate,
            "is not allowed from giniTokenContract");
        giniTokenContract.transferFrom(msg.sender, address(this), _amountToDonate);
        uint _numberOfVotes = _amountToDonate / (10 ** giniTokenContract.decimals());
        donation storage _donation = donationVotingIndex[donationVotingId].donationIndex[_donationId];
        _donation.numberOfVotes += _numberOfVotes;
    }
    function adminGetDonationRank () public onlyGini {
        donationvoting storage _donationVoting = donationVotingIndex[donationVotingId];
        require(_donationVoting.donated == false,"already donated");
        
        uint[3] memory _votesOfRanks;
        uint _prvNum;
        for (uint _r = 0; _r < 3; _r++){

            for (uint _i = 0; _i < _donationVoting.donationId; _i++){
                if(_votesOfRanks[_r] < _donationVoting.donationIndex[_i].numberOfVotes &&
                    _donationVoting.donationIndex[_i].numberOfVotes <= (_prvNum - 1)){
                    _votesOfRanks[_r] = _donationVoting.donationIndex[_i].numberOfVotes;
                }
            }
            _prvNum = _votesOfRanks[_r];
            for (uint _i = 0; _i < _donationVoting.donationId; _i++){
                if(_prvNum == _donationVoting.donationIndex[_i].numberOfVotes){
                    _donationVoting.donationRankIndex[_r].donationAddress.push(
                        _donationVoting.donationIndex[_i].donationOwner);
                }
            }
        }
        uint _donatedAmount = giniTokenContract.balanceOf(address(this));

        for (uint _r = 0; _r < 3; _r++){
            _donationVoting.donationRankIndex[_r].donatedAmount =
            (_donatedAmount / 1000) * rwdsDonationRankRate[_r];
            uint _cnt = _donationVoting.donationRankIndex[_r].donationAddress.length;
            for (uint _i; _i < _cnt; _i++){
                address _toAddress = _donationVoting.donationRankIndex[_r].donationAddress[_i];
                uint _amountToSend = _donationVoting.donationRankIndex[_r].donatedAmount / _cnt;
                giniTokenContract.transfer(_toAddress, _amountToSend);
            }
        }
        _donationVoting.donated = true;
        donationVotingId += 1;
    }
    function getDonationRank(uint _donationVotingId, uint _rank) public view returns(uint _donatedAmount, address[] memory _donationAddress){
        donationvoting storage _donationVoting = donationVotingIndex[_donationVotingId];

        _donatedAmount = _donationVoting.donationRankIndex[_rank].donatedAmount;
        _donationAddress = _donationVoting.donationRankIndex[_rank].donationAddress;
    }

    function donationVote(uint _donationId, uint _numberOfVotes) public onlyGini{
        donation storage _donation = donationVotingIndex[donationVotingId].donationIndex[_donationId];
        _donation.numberOfVotes += _numberOfVotes;
    }
    event AdminRegisterDonation(string _name, address _donationOwner);
    function adminRegisterDonation(string memory _name, string memory _usage, string memory _SNS,
                                    uint _hopeFundAmount, address _donationOwner) public onlyOwner{
        uint _donationId = donationVotingIndex[donationVotingId].donationId;
        donation storage _donation = donationVotingIndex[donationVotingId].donationIndex[_donationId];
        _donation.name = _name;
        _donation.usage = _usage;
        _donation.SNS = _SNS;
        _donation.hopeFundAmount = _hopeFundAmount;
        _donation.donationOwner = _donationOwner;

        donationVotingIndex[donationVotingId].donationId += 1;
        emit AdminRegisterDonation(_name, _donationOwner);
    }

    function getDonationId(uint _donationVotingId)public view returns (uint){
        return(donationVotingIndex[_donationVotingId].donationId);
    }
    function getDonation(uint _donationVotingId, uint _donationId)public view returns (string memory, string memory, string memory, uint, uint, address){
        donation storage _donation = donationVotingIndex[_donationVotingId].donationIndex[_donationId];
        return(_donation.name, _donation.usage, _donation.SNS,
               _donation.hopeFundAmount, _donation.numberOfVotes, _donation.donationOwner);
    }
}