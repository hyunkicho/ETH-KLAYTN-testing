const express = require('express');
const router = express.Router();
const Tx = require('ethereumjs-tx').Transaction;
const Caver = require('caver-js');
const klaytntestpk = require('../public/javascripts/address.js')
const referal = require('../public/javascripts/referal.js')
const Nreferal = referal();
// const address = klaytntestpk();
let giniTokenABI = JSON.parse('[	{		"constant": true,		"inputs": [],		"name": "name",		"outputs": [			{				"name": "",				"type": "string"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "approve",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "totalSupply",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "from",				"type": "address"			},			{				"name": "to",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "transferFrom",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "decimals",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "addedValue",				"type": "uint256"			}		],		"name": "increaseAllowance",		"outputs": [			{				"name": "success",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_address",				"type": "address"			}		],		"name": "isThisOwner",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "unpause",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "value",				"type": "uint256"			}		],		"name": "burn",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "isPauser",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "paused",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "removePauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "renouncePauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_receiver",				"type": "address[]"			},			{				"name": "_value",				"type": "uint256[]"			}		],		"name": "airdropTokens",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "owner",				"type": "address"			}		],		"name": "balanceOf",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "renounceOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "from",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "burnFrom",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "addPauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "pause",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "owner",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "isOwner",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "symbol",		"outputs": [			{				"name": "",				"type": "string"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "subtractedValue",				"type": "uint256"			}		],		"name": "decreaseAllowance",		"outputs": [			{				"name": "success",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "to",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "transfer",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "owner",				"type": "address"			},			{				"name": "spender",				"type": "address"			}		],		"name": "allowance",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "newOwner",				"type": "address"			}		],		"name": "transferOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"inputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "constructor"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "account",				"type": "address"			}		],		"name": "Paused",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "account",				"type": "address"			}		],		"name": "Unpaused",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "account",				"type": "address"			}		],		"name": "PauserAdded",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "account",				"type": "address"			}		],		"name": "PauserRemoved",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "previousOwner",				"type": "address"			},			{				"indexed": true,				"name": "newOwner",				"type": "address"			}		],		"name": "OwnershipTransferred",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "from",				"type": "address"			},			{				"indexed": true,				"name": "to",				"type": "address"			},			{				"indexed": false,				"name": "value",				"type": "uint256"			}		],		"name": "Transfer",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "owner",				"type": "address"			},			{				"indexed": true,				"name": "spender",				"type": "address"			},			{				"indexed": false,				"name": "value",				"type": "uint256"			}		],		"name": "Approval",		"type": "event"	}]');
let giniLottoABI = JSON.parse('[	{		"constant": false,		"inputs": [			{				"name": "_gameLotNumberMax",				"type": "uint256"			},			{				"name": "_gameLotNumberCounts",				"type": "uint256"			},			{				"name": "_rwdsLotteryRank1ReferalRate",				"type": "uint16[]"			}		],		"name": "adminBeginAGame",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "adminCalWins",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "adminDistribute",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_ethBlockNumber",				"type": "uint256[]"			},			{				"name": "_ethBlockHash",				"type": "bytes32[]"			}		],		"name": "adminDrawNumber",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "adminEndGame",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_from",				"type": "address"			},			{				"name": "_referal",				"type": "address"			}		],		"name": "adminRegisterReferal",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_donationAddress",				"type": "address"			},			{				"name": "_votingDuraion",				"type": "uint256"			}		],		"name": "adminSetDonation",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_fundId",				"type": "uint8"			},			{				"name": "_toAddress",				"type": "address"			}		],		"name": "adminSetFundAddress",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_buyer",				"type": "address"			},			{				"name": "_donationId",				"type": "uint256"			},			{				"name": "_lotNumberBit",				"type": "uint48[]"			}		],		"name": "buyLottery",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_amount",				"type": "uint256"			}		],		"name": "fund4Lottery",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_buyers",				"type": "address[]"			},			{				"name": "_donationIds",				"type": "uint256[]"			},			{				"name": "_ticketToBuy",				"type": "uint256[]"			},			{				"name": "_lotNumbers",				"type": "uint48[]"			}		],		"name": "multiBuyLottery",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_child",				"type": "address[]"			},			{				"name": "_parents",				"type": "address[]"			}		],		"name": "multiRegisterReferal",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_parents",				"type": "address"			},			{				"name": "_depth",				"type": "uint256"			},			{				"name": "_numOfChilds",				"type": "uint256"			}		],		"name": "TestregisterReferal",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "withDrawReferalRewards",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_recevier",				"type": "address"			},			{				"name": "_gameId",				"type": "uint256"			},			{				"name": "_lotNumberBit",				"type": "uint64"			},			{				"name": "_donationRate",				"type": "uint256"			}		],		"name": "withdrawRewards",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"inputs": [			{				"name": "_tokenAddress",				"type": "address"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "constructor"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "_donationAddress",				"type": "address"			},			{				"indexed": false,				"name": "_votingDuraion",				"type": "uint256"			}		],		"name": "AdminSetDonation",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "_gameId",				"type": "uint256"			},			{				"indexed": false,				"name": "_gameLotNumberMax",				"type": "uint256"			},			{				"indexed": false,				"name": "_gameLotNumberCounts",				"type": "uint256"			}		],		"name": "AdminBeginAGame",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "_gameId",				"type": "uint256"			},			{				"indexed": false,				"name": "_ethBlockNumber",				"type": "uint256[]"			},			{				"indexed": false,				"name": "_ethBlockHash",				"type": "bytes32[]"			}		],		"name": "AdminDrawNumber",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "_fundId",				"type": "uint8"			},			{				"indexed": false,				"name": "_fromAddress",				"type": "address"			},			{				"indexed": false,				"name": "_toAddress",				"type": "address"			}		],		"name": "AdminSetFundAddress",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "_from",				"type": "address"			},			{				"indexed": false,				"name": "_referal",				"type": "address"			}		],		"name": "AdminRegisterReferal",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "_gameId",				"type": "uint256"			},			{				"indexed": true,				"name": "_buyer",				"type": "address"			},			{				"indexed": false,				"name": "_lotNumberBit",				"type": "uint48[]"			}		],		"name": "BuyLottery",		"type": "event"	},	{		"constant": true,		"inputs": [],		"name": "divisor",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "donationAddress",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "donationVotingDuration",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_x",				"type": "uint64"			}		],		"name": "dropTheBit",		"outputs": [			{				"name": "",				"type": "uint64"			}		],		"payable": false,		"stateMutability": "pure",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint8"			}		],		"name": "fundAddressIndex",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "gameDuration",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "gameId",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint256"			}		],		"name": "gameIndex",		"outputs": [			{				"name": "startedTime",				"type": "uint256"			},			{				"name": "klayBlockNumber",				"type": "uint256"			},			{				"name": "rndSource",				"type": "uint256"			},			{				"name": "drawedLotNumberBit",				"type": "uint64"			},			{				"name": "salesAmount",				"type": "uint256"			},			{				"name": "isActive",				"type": "bool"			},			{				"name": "isLotNumberDrawed",				"type": "bool"			},			{				"name": "winnerCalculated",				"type": "uint256"			},			{				"name": "isDistributed",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "gameLotNumberCounts",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "gameLotNumberMax",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_gameId",				"type": "uint256"			}		],		"name": "getDrawedLotNumber",		"outputs": [			{				"name": "_lotNumber",				"type": "uint256[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_gameId",				"type": "uint256"			},			{				"name": "_lotNumber",				"type": "uint256"			}		],		"name": "getGameLotNumberIndex",		"outputs": [			{				"name": "addr",				"type": "address[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_gameId",				"type": "uint256"			},			{				"name": "_score",				"type": "uint256"			}		],		"name": "getRankInfo",		"outputs": [			{				"name": "rewards",				"type": "uint256"			},			{				"name": "winnerCounts",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "gtAddress",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "gtPrice",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "isDonationSet",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint256"			}		],		"name": "playerIndex",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "address"			}		],		"name": "playerTree",		"outputs": [			{				"name": "referalLevel",				"type": "uint256"			},			{				"name": "referalRewards",				"type": "uint256"			},			{				"name": "lastPlayedGameId",				"type": "uint256"			},			{				"name": "referal",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "PRIZE_MONEY",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "PRIZE_MONEY_FOR_REFERAL",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint256"			}		],		"name": "PRIZE_MONEY_FOR_REFERAL_RATIO",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint256"			}		],		"name": "PRIZE_MONEY_RATIO_BY_RANK",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "SALES_AMOUNT",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_from",				"type": "address"			},			{				"name": "_depth",				"type": "uint256"			}		],		"name": "TestGetReferalTree",		"outputs": [			{				"name": "",				"type": "address[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	}]')
let giniDonationABI = JSON.parse('[	{		"constant": false,		"inputs": [			{				"name": "_amountToDonate",				"type": "uint256"			},			{				"name": "_donationId",				"type": "uint256"			}		],		"name": "donate",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "giniLottoAddress",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_donationId",				"type": "uint256"			},			{				"name": "_numberOfVotes",				"type": "uint256"			}		],		"name": "donationVote",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_name",				"type": "string"			},			{				"name": "_usage",				"type": "string"			},			{				"name": "_SNS",				"type": "string"			},			{				"name": "_hopeFundAmount",				"type": "uint256"			},			{				"name": "_donationOwner",				"type": "address"			}		],		"name": "adminRegisterDonation",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint256"			}		],		"name": "donationVotingIndex",		"outputs": [			{				"name": "donationId",				"type": "uint256"			},			{				"name": "donated",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "donationVotingId",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_donationVotingId",				"type": "uint256"			}		],		"name": "getDonationId",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_donationVotingId",				"type": "uint256"			},			{				"name": "_donationId",				"type": "uint256"			}		],		"name": "getDonation",		"outputs": [			{				"name": "",				"type": "string"			},			{				"name": "",				"type": "string"			},			{				"name": "",				"type": "string"			},			{				"name": "",				"type": "uint256"			},			{				"name": "",				"type": "uint256"			},			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "giniTokenAddress",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "",				"type": "uint256"			}		],		"name": "rwdsDonationRankRate",		"outputs": [			{				"name": "",				"type": "uint16"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "adminGetDonationRank",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "_donationVotingId",				"type": "uint256"			},			{				"name": "_rank",				"type": "uint256"			}		],		"name": "getDonationRank",		"outputs": [			{				"name": "_donatedAmount",				"type": "uint256"			},			{				"name": "_donationAddress",				"type": "address[]"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"inputs": [			{				"name": "_lottoAddress",				"type": "address"			},			{				"name": "_giniTokenAddress",				"type": "address"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "constructor"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "_name",				"type": "string"			},			{				"indexed": false,				"name": "_donationOwner",				"type": "address"			}		],		"name": "AdminRegisterDonation",		"type": "event"	}]')
let contractAddressL = '0x4d955D51CA04c0C5503b4a17b9997563222e3AEd'; // klaytn Lotto
let contractAddressT = '0x93Da4d84d533F58d09d7103F1a88138Bce7441c6'; // klaytn Token
let contractAddressD = '0xd0A3379034e9D09A88E2aeC5bc728D7870596997'; // klaytn Donation
const privateKey = 'PrivateKey';// 싸인하는 privateKey
let votingDuraion = 3 //voting Duration control
let ownerEOA = "0xC4e0d494fAF1986912Ca18e36C7453b242891cEc";

var caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));


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

  
  
  function generateRandomTicket(TicketCount) {

    let _ticket = new Array();
    
    for(var i=0; i<TicketCount; i++){
      gameLotNumberMax = 25;
      var gg=0;
      var Rannum = new Array(generateRandom(1,gameLotNumberMax))

      for(var j=0;j < 5;j++){
        gg = gg | 2 ** Rannum[0][j];
      }
      _ticket = _ticket.concat(gg);
    //Ticket[i]=generateRandom(1, gameLotNumberMax);
    }
    // console.log("generate_Complete")
    return _ticket;
    }

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'index' });
  
});

router.post('/createWallet', function(req, res){
  console.log("작동여부")
    const caver = new Caver('https://api.baobab.klaytn.net:8651/')
  caver.klay.accounts.wallet.create(1000, caver.utils.randomHex(32));
  var arr = [];
  for(i=0;i<1000;i++){
    pubk = caver.klay.accounts.wallet[i]["address"];
    arr.push(pubk)
    // var pubk = caver.klay.accounts.wallet[i]["address"]
    // var prik = caver.klay.accounts.wallet[i]["privateKey"]
    // arr.push({pubk:pubk, prik:prik});
  }
  // console.log(arr); 
  console.log(arr);
  res.send(arr);
  
});

//////////////////////////////////////기본설정 및 테스트 사항///////////////////////////

router.post('/sendGINI', async function(req, res) { //대납 계정으로 보낸 트렌젝션
  const caver = new Caver('https://api.baobab.klaytn.net:8651/')
  var _to = req.body.to;
  var _value = req.body.value;
  
  // contractAddressT = '0x167131728F8381F1D51ed43934477D88fc2da78e'; // klaytn GINITOKEN
  // giniTokenABI = JSON.parse('[	{		"constant": true,		"inputs": [],		"name": "name",		"outputs": [			{				"name": "",				"type": "string"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "approve",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "totalSupply",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "from",				"type": "address"			},			{				"name": "to",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "transferFrom",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "decimals",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "addedValue",				"type": "uint256"			}		],		"name": "increaseAllowance",		"outputs": [			{				"name": "success",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "unpause",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "value",				"type": "uint256"			}		],		"name": "burn",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "isPauser",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "paused",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "removePauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "renouncePauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_receiver",				"type": "address[]"			},			{				"name": "_value",				"type": "uint256[]"			}		],		"name": "airdropTokens",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "owner",				"type": "address"			}		],		"name": "balanceOf",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "renounceOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "from",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "burnFrom",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "addPauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "pause",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "owner",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "isOwner",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "symbol",		"outputs": [			{				"name": "",				"type": "string"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "subtractedValue",				"type": "uint256"			}		],		"name": "decreaseAllowance",		"outputs": [			{				"name": "success",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "to",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "transfer",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "owner",				"type": "address"			},			{				"name": "spender",				"type": "address"			}		],		"name": "allowance",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "newOwner",				"type": "address"			}		],		"name": "transferOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"inputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "constructor"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "account",				"type": "address"			}		],		"name": "Paused",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "account",				"type": "address"			}		],		"name": "Unpaused",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "account",				"type": "address"			}		],		"name": "PauserAdded",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "account",				"type": "address"			}		],		"name": "PauserRemoved",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "previousOwner",				"type": "address"			},			{				"indexed": true,				"name": "newOwner",				"type": "address"			}		],		"name": "OwnershipTransferred",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "from",				"type": "address"			},			{				"indexed": true,				"name": "to",				"type": "address"			},			{				"indexed": false,				"name": "value",				"type": "uint256"			}		],		"name": "Transfer",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "owner",				"type": "address"			},			{				"indexed": true,				"name": "spender",				"type": "address"			},			{				"indexed": false,				"name": "value",				"type": "uint256"			}		],		"name": "Approval",		"type": "event"	}]');
  let contract2 = new caver.klay.Contract(giniTokenABI, contractAddressT);
  var enabi = contract2.methods.transfer(_to,_value).encodeABI();
  // let nonce = 0;
  // console.log(req.body.testEOA);
  await caver.klay.getTransactionCount(req.body.testEOA).then(l => nonce = l);
  
  caver.klay.accounts.wallet.create(1);
  const sender = caver.klay.accounts.wallet[0];
  // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  const payer = caver.klay.accounts.wallet.add(''); //돈을 지불하는 계정
  
  caver.klay.getAccount(sender.address).then(console.log); // should print `null`
  
  // const privateKey = req.body.testpk;
  
  const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: sender.address,
    to: contractAddressT,
    data: enabi,
    gas: '10000000',
    value: 0,
    nonce: nonce
  }, sender.privateKey);
  
  // signed raw transaction
  // console.log("Raw TX:\n", senderRawTransaction);
  caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: payer.address
  })
  .on('transactionHash', function (hash) {
        // console.log(">>> tx_hash for deploy =", hash);
  })
  .on('receipt', function (receipt) {
    // console.log(">>> receipt arrived: ", receipt);
    
    // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
  })
  .on('error', function (err) {
    console.error(">>> error: ", err);
  });
  
  res.send({status: '', msg:"신청했습니다."});

    });

////////////////////////////////////////////////////////////////////BuyLotto Test 용 세팅///////////////////////////////////////
    let LottoCount=10;
    let repeatCount=0;
    // let pubkeynum=0  //실제 주소 넣기
    let Dummynum=0 // 더미 주소 넣기
  
   
    function make10TestAddress(number){ let numberT = Number(number);result = "0x"+numberT.toString(16).padStart(40,"0"); 
    
    return result; }
  
     function makeDummyAddress(depth,child){
      var DummyAddress = [];
      var _donationIds = [];
      var _ticketToBuy  = [];
      var _lotNumbers  = [];
      for (d=0; d< depth; d++){ ///d를 바꾸면 depth 가 바뀜
        for (i=1; i<child+1; i++){ // i를 바꾸면 child가 바뀜
          tempAddr = make10TestAddress(i+(16*d));
          // console.log(tempAddr);
          DummyAddress.push(tempAddr);

           _donationIds.push(1);
           genNum = generateRandomTicket(1);
           _ticketToBuy.push(1);
           _lotNumbers.push(Number(genNum));
        }
      } 
      // console.log([DummyAddress, _donationIds, _ticketToBuy, _lotNumbers]);
    // console.log(DummyAddress);
       return [DummyAddress, _donationIds, _ticketToBuy, _lotNumbers]; 
    }

    //////////////////////////////////////////////////////////multi Buy//////////////////////////////////////////////////////////////////////

    async function multiBuyLottery(depth,child){  //depth는 0 부터 시작 child는 1부터 시작 -> 9,10 이런식으로 해야 10*10으로 나오게 됨.  
      const caver = new Caver('https://api.baobab.klaytn.net:8651/')
   
      inputs = makeDummyAddress(depth,child);
      // console.log(inputs,inputs[0]);
      DummyAddress = inputs[0];
      _donationIds = inputs[1];
      _ticketToBuy = inputs[2];
      _lotNumbers = inputs[3];
      console.log("_buyers : " + DummyAddress);
      // console.log("_donationIds" + _donationIds);
      // console.log("_ticketToBuy" + _ticketToBuy);
      console.log("_lotNumberBit : " + _lotNumbers)
      // console.log('["'+DummyAddress.join('","')+'"]');
      //let strad = '["'+DummyAddress.join('","')+'"]';
      let contract2 = new caver.klay.Contract(giniLottoABI, contractAddressL);
      var enabi = contract2.methods.multiBuyLottery(DummyAddress,_donationIds,_ticketToBuy,_lotNumbers).encodeABI();
      // console.log(_buyer,_donationId,_lotNumberBit);
      await caver.klay.getTransactionCount(ownerEOA).then(l => nonce = l);
      
      caver.klay.accounts.wallet.create(1);
      const sender = caver.klay.accounts.wallet.add(privateKey)
            // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
      const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정
      
      // caver.klay.getAccount(sender.address).then(console.log); // should print `null'
      // console.log('더미 주소 : '   + DummyAddress);
      // console.log('기부 아이디 : ' + _donationIds);
      // console.log('티켓 번호 : ' +_ticketToBuy)
      // console.log('구매할 로또 개수 : ' +_lotNumbers)


      const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
        type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
        from: sender.address,
        to: contractAddressL,
        data: enabi,
        gas: '10000000',
        value: 0
            }, sender.privateKey);

      // signed raw transaction
      // console.log("Raw TX:\n", senderRawTransaction);
      caver.klay.sendTransaction({
        senderRawTransaction: senderRawTransaction,
        feePayer: payer.address
      })
      .on('transactionHash', function (hash) {
        // console.log(">>> tx_hash for deploy =", hash);
      })
      .on('receipt', function (receipt) {
        // console.log(">>> receipt arrived: ", receipt);
        // pubkeynum++;
        console.log("multiBuyLottery confirmed");
        // console.log("repeat time is : " + repeatCount);
        // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
      })
      .on('error', function (err) {
        console.error(">>> error: ", err);
      });

      // res.send({status: '', msg:"신청했습니다."});
  }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // router.post('/buylotto', async function(req, res) { //대납 계정으로 보낸 트렌젝션
    
    // function buyManyLotto(LottoCount){
    // buyLotto()
    // }

    async function buyLotto(){    
      const caver = new Caver('https://api.baobab.klaytn.net:8651/')
      var _buyer = "0xC4e0d494fAF1986912Ca18e36C7453b242891cEc";
      // var _buyer = address[pubkeynum].pubk; //구매 입력자 계정을 어떻게 할지도 생각해야함 - DB변수 입력
      // await makeDummyAddress();
      // var _buyer = DummyAddress[Dummynum];
      // if(Dummynum>100){
      //   Dummynum=0;
      // }
      // console.log(address[0].pubk)
      // console.log(address[0][pubk])


      var _donationId = 1; //투표 누구한테 할지 생각해야함 - DB변수 입력
      var _lotNumberBit = generateRandomTicket(215); //215개까지 성공 
      // var _lotNumberBit = [268576];
     
      // contractAddressT = '0x167131728F8381F1D51ed43934477D88fc2da78e'; // klaytn GINITOKEN
      // giniTokenABI = JSON.parse('[	{		"costant": true,		"inputs": [],		"name": "name",		"outputs": [			{				"name": "",				"type": "string"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "approve",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "totalSupply",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "from",				"type": "address"			},			{				"name": "to",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "transferFrom",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "decimals",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "addedValue",				"type": "uint256"			}		],		"name": "increaseAllowance",		"outputs": [			{				"name": "success",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "unpause",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "value",				"type": "uint256"			}		],		"name": "burn",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "isPauser",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "paused",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "removePauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "renouncePauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_receiver",				"type": "address[]"			},			{				"name": "_value",				"type": "uint256[]"			}		],		"name": "airdropTokens",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "owner",				"type": "address"			}		],		"name": "balanceOf",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "renounceOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "from",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "burnFrom",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "addPauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "pause",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "owner",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "isOwner",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "symbol",		"outputs": [			{				"name": "",				"type": "string"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "subtractedValue",				"type": "uint256"			}		],		"name": "decreaseAllowance",		"outputs": [			{				"name": "success",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "to",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "transfer",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "owner",				"type": "address"			},			{				"name": "spender",				"type": "address"			}		],		"name": "allowance",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "newOwner",				"type": "address"			}		],		"name": "transferOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"inputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "constructor"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "account",				"type": "address"			}		],		"name": "Paused",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "account",				"type": "address"			}		],		"name": "Unpaused",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "account",				"type": "address"			}		],		"name": "PauserAdded",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "account",				"type": "address"			}		],		"name": "PauserRemoved",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "previousOwner",				"type": "address"			},			{				"indexed": true,				"name": "newOwner",				"type": "address"			}		],		"name": "OwnershipTransferred",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "from",				"type": "address"			},			{				"indexed": true,				"name": "to",				"type": "address"			},			{				"indexed": false,				"name": "value",				"type": "uint256"			}		],		"name": "Transfer",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "owner",				"type": "address"			},			{				"indexed": true,				"name": "spender",				"type": "address"			},			{				"indexed": false,				"name": "value",				"type": "uint256"			}		],		"name": "Approval",		"type": "event"	}]');
      let contract2 = new caver.klay.Contract(giniLottoABI, contractAddressL);
      var enabi = contract2.methods.buyLottery(_buyer,_donationId,_lotNumberBit).encodeABI();
      // console.log(_buyer,_donationId,_lotNumberBit);
      await caver.klay.getTransactionCount(ownerEOA).then(l => nonce = l);
      
      caver.klay.accounts.wallet.create(1);
      const sender = caver.klay.accounts.wallet.add(privateKey)
            // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
      const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정
      
      // caver.klay.getAccount(sender.address).then(console.log); // should print `null'
      console.log('_donationId : '   + _donationId);
      console.log('lotNumberBit : ' + _lotNumberBit);
      console.log('_buyer : ' +_buyer)

      const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
        type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
        from: sender.address,
        to: contractAddressL,
        data: enabi,
        gas: '10000000',
        value: 0
            }, sender.privateKey);

      // signed raw transaction
      // console.log("Raw TX:\n", senderRawTransaction);
      caver.klay.sendTransaction({
        senderRawTransaction: senderRawTransaction,
        feePayer: payer.address
      })
      .on('transactionHash', function (hash) {
        // console.log(">>> tx_hash for deploy =", hash);
      })
      .on('receipt', function (receipt) {
        // console.log(">>> receipt arrived: ", receipt);
        // if (LottoCount === 1 ) { return true };
        // LottoCount --;
        // repeatCount ++;
        // // pubkeynum++;
        // Dummynum++; //더미 주소값 증가.
        // buyLotto();

        // console.log("repeat time is : " + repeatCount);
        // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
      })
      .on('error', function (err) {
        // console.error(">>> error: ", err);
      });

      // res.send({status: '', msg:"신청했습니다."});
  }


////////////////////////////////////////////////1등 구매
async function buyLotto1st(){    
  const caver = new Caver('https://api.baobab.klaytn.net:8651/')
  var _buyer = '0x0000000000000000000000000000000000000073'; //1등 당첨자 주소
  var _donationId = 1; //투표 누구한테 할지 생각해야함 - DB변수 입력
  var _lotNumberBit = [62]; //215개까지 성공  
  let contract2 = new caver.klay.Contract(giniLottoABI, contractAddressL);
  var enabi = contract2.methods.buyLottery(_buyer,_donationId,_lotNumberBit).encodeABI();
  await caver.klay.getTransactionCount(ownerEOA).then(l => nonce = l);
  
  caver.klay.accounts.wallet.create(1);
  const sender = caver.klay.accounts.wallet.add(privateKey)
        // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정
  
  // caver.klay.getAccount(sender.address).then(console.log); // should print `null'
  console.log('_donationId 1st: '   + _donationId);
  console.log('_lotNumberBit 1st: ' + _lotNumberBit);
  console.log('_buyer 1st: ' +_buyer)

  const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: sender.address,
    to: contractAddressL,
    data: enabi,
    gas: '10000000',
    value: 0
        }, sender.privateKey);

  // signed raw transaction
  // console.log("Raw TX:\n", senderRawTransaction);
  caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: payer.address
  })
  .on('transactionHash', function (hash) {
    // console.log(">>> tx_hash for deploy =", hash);
  })
  .on('receipt', function (receipt) {
    // console.log(">>> receipt arrived: ", receipt);
   console.log("buyLotto1st confirmed")
   buyLotto2nd();
    // console.log("repeat time is : " + repeatCount);
    // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
  })
  .on('error', function (err) {
    // console.error(">>> error: ", err);
  });

  // res.send({status: '', msg:"신청했습니다."});
}

// /////////////////////////////////////////////////////////2등 구매///////////////////////////////////////////////////////////////////////////
async function buyLotto2nd(){    //Group2의 첫번째 주소
  const caver = new Caver('https://api.baobab.klaytn.net:8651/')
  // var _buyer = req.body.numtoBuy;
  var _buyer = '0x0000000000000000000000000000000000000002'; //2등 당첨자 주소
 
  // if(pubkeynum>100){
  //   pubkeynum=0;
  // }
  // console.log(address[0].pubk)
  // console.log(address[0][pubk])


  var _donationId = 1; //투표 누구한테 할지 생각해야함 - DB변수 입력
  var _lotNumberBit = [158]; //215개까지 성공 
  // var _lotNumberBit = [268576];
 
  // contractAddressT = '0x167131728F8381F1D51ed43934477D88fc2da78e'; // klaytn GINITOKEN
  // giniTokenABI = JSON.parse('[	{		"costant": true,		"inputs": [],		"name": "name",		"outputs": [			{				"name": "",				"type": "string"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "approve",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "totalSupply",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "from",				"type": "address"			},			{				"name": "to",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "transferFrom",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "decimals",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "addedValue",				"type": "uint256"			}		],		"name": "increaseAllowance",		"outputs": [			{				"name": "success",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "unpause",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "value",				"type": "uint256"			}		],		"name": "burn",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "isPauser",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "paused",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "removePauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "renouncePauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_receiver",				"type": "address[]"			},			{				"name": "_value",				"type": "uint256[]"			}		],		"name": "airdropTokens",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "owner",				"type": "address"			}		],		"name": "balanceOf",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "renounceOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "from",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "burnFrom",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "addPauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "pause",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "owner",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "isOwner",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "symbol",		"outputs": [			{				"name": "",				"type": "string"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "subtractedValue",				"type": "uint256"			}		],		"name": "decreaseAllowance",		"outputs": [			{				"name": "success",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "to",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "transfer",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "owner",				"type": "address"			},			{				"name": "spender",				"type": "address"			}		],		"name": "allowance",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "newOwner",				"type": "address"			}		],		"name": "transferOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"inputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "constructor"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "account",				"type": "address"			}		],		"name": "Paused",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "account",				"type": "address"			}		],		"name": "Unpaused",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "account",				"type": "address"			}		],		"name": "PauserAdded",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "account",				"type": "address"			}		],		"name": "PauserRemoved",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "previousOwner",				"type": "address"			},			{				"indexed": true,				"name": "newOwner",				"type": "address"			}		],		"name": "OwnershipTransferred",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "from",				"type": "address"			},			{				"indexed": true,				"name": "to",				"type": "address"			},			{				"indexed": false,				"name": "value",				"type": "uint256"			}		],		"name": "Transfer",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "owner",				"type": "address"			},			{				"indexed": true,				"name": "spender",				"type": "address"			},			{				"indexed": false,				"name": "value",				"type": "uint256"			}		],		"name": "Approval",		"type": "event"	}]');
  let contract2 = new caver.klay.Contract(giniLottoABI, contractAddressL);
  var enabi = contract2.methods.buyLottery(_buyer,_donationId,_lotNumberBit).encodeABI();
  // console.log(_buyer,_donationId,_lotNumberBit);
  await caver.klay.getTransactionCount(ownerEOA).then(l => nonce = l);
  
  caver.klay.accounts.wallet.create(1);
  const sender = caver.klay.accounts.wallet.add(privateKey)
        // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정
  
  // caver.klay.getAccount(sender.address).then(console.log); // should print `null'
  console.log('_donationId 2nd: '   + _donationId);
  console.log('_lotNumberBit 2nd: ' + _lotNumberBit);
  console.log('_buyer 2nd: ' +_buyer)

  const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: sender.address,
    to: contractAddressL,
    data: enabi,
    gas: '10000000',
    value: 0
        }, sender.privateKey);

  // signed raw transaction
  // console.log("Raw TX:\n", senderRawTransaction);
  caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: payer.address
  })
  .on('transactionHash', function (hash) {
    // console.log(">>> tx_hash for deploy =", hash);
  })
  .on('receipt', function (receipt) {
    // console.log(">>> receipt arrived: ", receipt);
   console.log("buyLotto2nd confirmed")
   buyLotto3rd()
    // console.log("repeat time is : " + repeatCount);
    // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
  })
  .on('error', function (err) {
    // console.error(">>> error: ", err);
  });

  // res.send({status: '', msg:"신청했습니다."});
}
////////////////////////////////////////////////////////////

// /////////////////////////////////////////////////////////2등 구매///////////////////////////////////////////////////////////////////////////
async function buyLotto3rd(){    //Group3의 첫번째 주소
  const caver = new Caver('https://api.baobab.klaytn.net:8651/')
  // var _buyer = req.body.numtoBuy;
  var _buyer = '0x0000000000000000000000000000000000000003'; //3등 당첨자 주소
 
  
  // console.log(address[0].pubk)
  // console.log(address[0][pubk])


  var _donationId = 1; //투표 누구한테 할지 생각해야함 - DB변수 입력
  var _lotNumberBit = [206]; //215개까지 성공 
  // var _lotNumberBit = [268576];
 
  // contractAddressT = '0x167131728F8381F1D51ed43934477D88fc2da78e'; // klaytn GINITOKEN
  // giniTokenABI = JSON.parse('[	{		"costant": true,		"inputs": [],		"name": "name",		"outputs": [			{				"name": "",				"type": "string"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "approve",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "totalSupply",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "from",				"type": "address"			},			{				"name": "to",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "transferFrom",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "decimals",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "addedValue",				"type": "uint256"			}		],		"name": "increaseAllowance",		"outputs": [			{				"name": "success",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "unpause",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "value",				"type": "uint256"			}		],		"name": "burn",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "isPauser",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "paused",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "removePauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "renouncePauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "_receiver",				"type": "address[]"			},			{				"name": "_value",				"type": "uint256[]"			}		],		"name": "airdropTokens",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "owner",				"type": "address"			}		],		"name": "balanceOf",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "renounceOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "from",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "burnFrom",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "account",				"type": "address"			}		],		"name": "addPauser",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [],		"name": "pause",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "owner",		"outputs": [			{				"name": "",				"type": "address"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "isOwner",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": true,		"inputs": [],		"name": "symbol",		"outputs": [			{				"name": "",				"type": "string"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "spender",				"type": "address"			},			{				"name": "subtractedValue",				"type": "uint256"			}		],		"name": "decreaseAllowance",		"outputs": [			{				"name": "success",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "to",				"type": "address"			},			{				"name": "value",				"type": "uint256"			}		],		"name": "transfer",		"outputs": [			{				"name": "",				"type": "bool"			}		],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"constant": true,		"inputs": [			{				"name": "owner",				"type": "address"			},			{				"name": "spender",				"type": "address"			}		],		"name": "allowance",		"outputs": [			{				"name": "",				"type": "uint256"			}		],		"payable": false,		"stateMutability": "view",		"type": "function"	},	{		"constant": false,		"inputs": [			{				"name": "newOwner",				"type": "address"			}		],		"name": "transferOwnership",		"outputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "function"	},	{		"inputs": [],		"payable": false,		"stateMutability": "nonpayable",		"type": "constructor"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "account",				"type": "address"			}		],		"name": "Paused",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": false,				"name": "account",				"type": "address"			}		],		"name": "Unpaused",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "account",				"type": "address"			}		],		"name": "PauserAdded",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "account",				"type": "address"			}		],		"name": "PauserRemoved",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "previousOwner",				"type": "address"			},			{				"indexed": true,				"name": "newOwner",				"type": "address"			}		],		"name": "OwnershipTransferred",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "from",				"type": "address"			},			{				"indexed": true,				"name": "to",				"type": "address"			},			{				"indexed": false,				"name": "value",				"type": "uint256"			}		],		"name": "Transfer",		"type": "event"	},	{		"anonymous": false,		"inputs": [			{				"indexed": true,				"name": "owner",				"type": "address"			},			{				"indexed": true,				"name": "spender",				"type": "address"			},			{				"indexed": false,				"name": "value",				"type": "uint256"			}		],		"name": "Approval",		"type": "event"	}]');
  let contract2 = new caver.klay.Contract(giniLottoABI, contractAddressL);
  var enabi = contract2.methods.buyLottery(_buyer,_donationId,_lotNumberBit).encodeABI();
  // console.log(_buyer,_donationId,_lotNumberBit);
  await caver.klay.getTransactionCount(ownerEOA).then(l => nonce = l);
  
  caver.klay.accounts.wallet.create(1);
  const sender = caver.klay.accounts.wallet.add(privateKey)
        // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정
  
  // caver.klay.getAccount(sender.address).then(console.log); // should print `null'
  console.log('_donationId 3rd : '   + _donationId);
  console.log('_lotNumberBit 3rd : ' + _lotNumberBit);
  console.log('_buyer 3rd : ' +_buyer)

  const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: sender.address,
    to: contractAddressL,
    data: enabi,
    gas: '10000000',
    value: 0
        }, sender.privateKey);

  // signed raw transaction
  // console.log("Raw TX:\n", senderRawTransaction);
  caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: payer.address
  })
  .on('transactionHash', function (hash) {
    // console.log(">>> tx_hash for deploy =", hash);
  })
  .on('receipt', function (receipt) {
    // console.log(">>> receipt arrived: ", receipt);
   console.log("buyLotto3rd confirmed")
   multiBuyLottery(8,8);
    // console.log("repeat time is : " + repeatCount);
    // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
  })
  .on('error', function (err) {
    // console.error(">>> error: ", err);
  });

  // res.send({status: '', msg:"신청했습니다."});
}
////////////////////////////////////////////////////////////
router.post('/loginInfo', function(req, res){
  
  caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
  let contract2 = new caver.klay.Contract(giniTokenABI, contractAddressT);
  let methods2 = contract2.methods;
  
  var sendData = {};
  let address = req.body.testEOA;
  let balval = 000;
  let balval2 = 000;
  
  caver.klay.getBalance(address).then(balval => {
    console.log(balval, balval/10);
    console.log("클레이튼 잔액 : " + (balval)/(10**18) + "KLAY");
    sendData.klaytnBalance = (balval)/(10**18);
    methods2.balanceOf(address).call().then(balval2 => {
      sendData.myBalance = balval2; 
      console.log("지니 잔액 : " + (balval2));
      var _ticket = generateRandomTicket(300);
      sendData.generateRandom = _ticket;
      sendData.ca_address1 = contractAddressL;
      sendData.ca_address2 = contractAddressT;
      sendData.ca_address3 = contractAddressD;
      methods2.owner().call().then(ownerEOA => {
        var ownerEOA = ownerEOA; 
        sendData.ownerEOA = ownerEOA; 
        res.send({data:sendData, msg:'잔액조회 성공'});
      })
    });
  });
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////////
// async function approve_Lotto(){ //대납 계정으로 보낸 트렌젝션
  //   caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
  //   // var _spender = req.body.spender;
  //   var _spender = contractAddressL;
  //   // var _value = 9999999999999; //이 값 이상으로 넣을시 에
  //   var BN = caver.utils.BN;
  //   var _value =  new BN('9999999999999999999999999999999999999999999999').toString(); //이 값 이상으로 넣을시 에
  //   initWallet();    
  //   let contract2 = new caver.klay.Contract(giniTokenABI, contractAddressT);
  //   let methods2 = contract2.methods;
  //   let _ownerEOA = ownerEOA; //바꾸는 부분 1 - owner
  //   var sendData = {};
    
    
    
  //   var enabi = methods2.approve(_spender,_value).encodeABI();
    
  //   await caver.klay.getTransactionCount('0xc4e0d494faf1986912ca18e36c7453b242891cec').then(l => nonce = l); //바꾸는 부분 2 - 보내는 사람 PUBLIC
  //   // var nonce =nonce;//처음에 명시해 놓고  nonce사용ㄴ
  //   // caver.klay.accounts.wallet.create(1);
  //   // const sender = caver.klay.accounts.wallet[0];
  //   // const privateKey = 'PrivateKey';//바꾸는 부분 2 - 보내는 사람 PRIVATE
    
    
  //   const sender = caver.klay.accounts.wallet.add(privateKey)
  //   console.log(sender.address);
  //   // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  //   const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정
    
  //   caver.klay.getAccount(sender.address).then(console.log); // should print `null`
    

  //   const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
  //     type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
  //     from: sender.address,
  //     to: contractAddressT, //전송되는 CA 주소에 따라 바뀝니다.
  //     data: enabi,
  //     gas: '10000000', //limit은 최대로 해두었습니다.
  //     value: 0,
  //     nonce: nonce, //순서대로 미리 지정해둔 후 nonce 배정
  //   }, sender.privateKey);
    
  //   // signed raw transaction
  //   console.log("Raw TX:\n", senderRawTransaction);
  //   await caver.klay.sendTransaction({
  //     senderRawTransaction: senderRawTransaction,
  //     feePayer: payer.address
  //   })
  //   .on('transactionHash', function (hash) {
  //     // console.log(">>> tx_hash for deploy =", hash);
     
  //   })
  //   .on('receipt', async function (receipt) {
  //     // console.log(">>> receipt arrived: ", receipt);
  //     console.log('approve confirmed');
  //     await adminRegisterDonation1("number1","abc","abc","123123123123",'0x6fe810Ce966d4005B643208334d82D505aC33443')
  //     // await adminRegisterDonation("number2","abc","abc","123123123123",0x6fe810Ce966d4005B643208334d82D505aC33443)
  //     // await adminRegisterDonation("number3","abc","abc","123123123123",0x6fe810Ce966d4005B643208334d82D505aC33443)
  //     // await adminRegisterDonation("number4","abc","abc","123123123123",0x6fe810Ce966d4005B643208334d82D505aC33443)

  //     caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
  //     console.log('approve_Lotto');      
  //   })
  //   .on('error', async function (err) {
  //     console.error(">>> error: ", err);
  //     await sleep(30000);
  //     approve_Lotto();
  //   });

    
  //   methods2.allowance('0xc4e0d494faf1986912ca18e36c7453b242891cec',contractAddressL).call().then(balval => { //
  //     console.log("approve 잔액 : " + (balval));
  //   })
  // }
  async function approve_Lotto(){ //대납 계정으로 보낸 트렌젝션
    caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
    // var _spender = req.body.spender;
    var _spender = contractAddressL;
    // var _value = 9999999999999; //이 값 이상으로 넣을시 에
    var BN = caver.utils.BN;
    var _value =  new BN('9999999999999999999999999999999999999999999999').toString(); //이 값 이상으로 넣을시 에
    // initWallet();    
    let contract2 = new caver.klay.Contract(giniTokenABI, contractAddressT);
    let methods2 = contract2.methods;
    let _ownerEOA = ownerEOA; //바꾸는 부분 1 - owner
    var sendData = {};
    
    
    
    var enabi = methods2.approve(_spender,_value).encodeABI();
    
    await caver.klay.getTransactionCount('0xc4e0d494faf1986912ca18e36c7453b242891cec').then(l => nonce = l); //바꾸는 부분 2 - 보내는 사람 PUBLIC
    const sender = caver.klay.accounts.wallet.add(privateKey)
    console.log(sender.address);
    // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
    const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정
    
    caver.klay.getAccount(sender.address).then(console.log); // should print `null`
    
    console.log("_spender : " +_spender +"approve amount : " +_value);
    const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
      type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
      from: sender.address,
      to: contractAddressT, //전송되는 CA 주소에 따라 바뀝니다.
      data: enabi,
      gas: '10000000', //limit은 최대로 해두었습니다.
      value: 0,
      nonce: nonce, //순서대로 미리 지정해둔 후 nonce 배정
    }, sender.privateKey);
    
    // signed raw transaction
    //console.log("Raw TX:\n", senderRawTransaction);
    await caver.klay.sendTransaction({
      senderRawTransaction: senderRawTransaction,
      feePayer: payer.address
    })
    .on('transactionHash', function (hash) {
      // console.log(">>> tx_hash for deploy =", hash);
     
    })
    .on('receipt', async function (receipt) {
      // console.log(">>> receipt arrived: ", receipt);
      console.log('approve confirmed');
      adminRegisterDonation1();
      // await adminRegisterDonation("number2","abc","abc","123123123123",0x6fe810Ce966d4005B643208334d82D505aC33443)
      // await adminRegisterDonation("number3","abc","abc","123123123123",0x6fe810Ce966d4005B643208334d82D505aC33443)
      // await adminRegisterDonation("number4","abc","abc","123123123123",0x6fe810Ce966d4005B643208334d82D505aC33443)

      // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
    })
    .on('error', async function (err) {
      console.error(">>> error: ", err);
      // await sleep(30000);
      // approve_Lotto();
    });

    
    methods2.allowance('0xc4e0d494faf1986912ca18e36c7453b242891cec',contractAddressL).call().then(balval => { //
      console.log("approve 잔액 : " + (balval));
    })
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // async function adminSetDonation(){
  //   setDefault(giniLottoABI,contractAddressL,adminSetDonation(contractAddressL,2),adminBeginAGame(25));
  // }


  async function adminSetDonation() { //대납 계정으로 보낸 트렌젝션
    caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
    var _donationAddress = contractAddressD;
    var _votingDuration = votingDuraion;
    let contract = new caver.klay.Contract(giniLottoABI, contractAddressL);
    let methods = contract.methods;

    var enabi = methods.adminSetDonation(_donationAddress,_votingDuration).encodeABI();//함수명,파라미터 바꾸는곳
    let nonce = 0;
    await caver.klay.getTransactionCount(ownerEOA).then(l => nonce = l);

    const sender = caver.klay.accounts.wallet.add(privateKey)
    // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
    const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정

    caver.klay.getAccount(sender.address).then(console.log); // should print `null`


    const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
      type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
      from: sender.address,
      to: contractAddressL, //전송되는 CA 주소에 따라 바뀝니다.
      data: enabi,
      gas: '10000000', //limit은 최대로 해두었습니다.
      value: 0,
      nonce: nonce
    }, sender.privateKey);
    console.log("_donationAddress :"+_donationAddress+"_votingDuration :"+_votingDuration)
    // signed raw transaction
    //console.log("Raw TX:\n", senderRawTransaction);
    await caver.klay.sendTransaction({
      senderRawTransaction: senderRawTransaction,
      feePayer: payer.address
    })
    .on('transactionHash', function (hash) {
      // console.log(">>> tx_hash for deploy =", hash);
    })
    .on('receipt', async function (receipt) {
      // console.log(">>> receipt arrived: ", receipt);
      // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
      console.log('adminSetDonation confirmed');
      adminBeginAGame(25,5,[500,500,500,200,200,200,200,100,100]);      ; // 여기서 당첨번호 조정
    })
    .on('error', async function (err) {
    console.error(">>> error: ", err);
    //  await sleep(30000);
    //  await adminSetDonation();
  });
  }
    //////////////////////////////////////////////////////////////////////////////////////////////////////

  async function TestregisterReferal() { //대납 계정으로 보낸 트렌젝션
    caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
    var _parents = "0xc4e0d494faf1986912ca18e36c7453b242891cec" //부모 주소 
    var _depth = 8; //레퍼럴 등록 예시
    var _numOfChilds = 8; //레처럴 등록 예시2
    await initWallet()
    let contract = new caver.klay.Contract(giniLottoABI, contractAddressL);
    let methods = contract.methods;

    var enabi = methods.TestregisterReferal(_parents,_depth,_numOfChilds).encodeABI();//함수명,파라미터 바꾸는곳
    let nonce = 0;
    await caver.klay.getTransactionCount(ownerEOA).then(l => nonce = l);
    const sender = caver.klay.accounts.wallet.add(privateKey)
    // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
    const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정

    caver.klay.getAccount(sender.address).then(console.log); // should print `null`


    const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
      type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
      from: sender.address,
      to: contractAddressL, //전송되는 CA 주소에 따라 바뀝니다.
      data: enabi,
      gas: '10000000', //limit은 최대로 해두었습니다.
      value: 0,
      nonce: nonce
    }, sender.privateKey);
    console.log(_depth+" 만큼의 depth , "+_numOfChilds+"만큼의 child(leveL)을 가진 test레퍼럴 생성"); //test용 데이터

    // signed raw transaction
    //console.log("Raw TX:\n", senderRawTransaction);
    await caver.klay.sendTransaction({
      senderRawTransaction: senderRawTransaction,
      feePayer: payer.address
    })
    .on('transactionHash', function (hash) {
      // console.log(">>> tx_hash for deploy =", hash);
    })
    .on('receipt', async function (receipt) {
      // console.log(">>> receipt arrived: ", receipt);
      // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
      console.log('TestregisterReferal confirmed');
      adminSetDonation(); // 여기서 당첨번호 조정
    })
    .on('error', async function (err) {
    console.error(">>> error: ", err);
    //  await sleep(30000);
    //  await TestregisterReferal();
  });
  }

    
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


      function adminRegisterDonation1() { //대납 계정으로 보낸 트렌젝션
        setDefault_register(giniDonationABI,contractAddressD,adminRegisterDonation2)
        // signed raw transaction
      
      }
      function adminRegisterDonation2() { //대납 계정으로 보낸 트렌젝션
        setDefault_register(giniDonationABI,contractAddressD,adminRegisterDonation3);
        // signed raw transaction
      
      }
      function adminRegisterDonation3() { //대납 계정으로 보낸 트렌젝션
        setDefault_register(giniDonationABI,contractAddressD,adminRegisterDonation4);
        // signed raw transaction
      
      }
      function adminRegisterDonation4() { //대납 계정으로 보낸 트렌젝션
        setDefault_register(giniDonationABI,contractAddressD,TestregisterReferal);
        // signed raw transaction
      
      }
      
      ///파라미터가 없는 경우 setDefault 사용하면 트렌젝션 생성 가능
      async function setDefault_register(selectedABI,contractAddressN,NextFunc){
        await initWallet();
        caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
        let contract = new caver.klay.Contract(selectedABI, contractAddressN);
        let methods = contract.methods;
        
        const sender = caver.klay.accounts.wallet.add(privateKey)
        // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
        const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정
    
        caver.klay.getAccount(sender.address).then(console.log); // should print `null`

        var enabi = methods.adminRegisterDonation("number4","abc","abc","123123123123","0xA56a4c4d8A79c157916c711F5A0f1253B88DDEc7").encodeABI();//함수명,파라미터 바꾸는곳
        let nonce = 0;
        await caver.klay.getTransactionCount(ownerEOA).then(l => nonce = l);

        const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
          type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
          from: sender.address,
          to: contractAddressN, //전송되는 CA 주소에 따라 바뀝니다.
          data: enabi,
          gas: '10000000', //limit은 최대로 해두었습니다.
          value: 0,
          nonce: nonce
        }, sender.privateKey);
        
        //console.log("Raw TX:\n", senderRawTransaction);
        await caver.klay.sendTransaction({
          senderRawTransaction: senderRawTransaction,
          feePayer: payer.address
        })
        .on('transactionHash', function (hash) {
          // console.log(">>> tx_hash for deploy =", hash);
        })
        .on('receipt', async function (receipt) {
          // console.log(">>> receipt arrived: ", receipt);
          // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
          console.log( 'register_complete');
          NextFunc(); // 여기서 당첨번호 조정
        })
        .on('error', async function (err) {
        console.error(">>> error: ", err);
         await sleep(30000);
         await NextFunc();
      });
       }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    router.post('/balanceOf', function(req, res){
      
      caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
      let contract2 = new caver.klay.Contract(giniTokenABI, contractAddressT);
      let methods2 = contract2.methods;
      
      var sendData = {};
      let address = req.body.checking_address;
      let balval = 000;
      
      caver.klay.getBalance(address).then(balval => {
        methods2.balanceOf(address).call().then(balval2 => {
          sendData.myBalance = balval2; 
          console.log("balance of " +address +" : " + (balval));
          res.send({data:sendData, msg:'잔액조회 성공'});
        })
      });
    });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function adminEndGame() { //대납 계정으로 보낸 트렌젝션
  caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
  
  let contract = new caver.klay.Contract(giniLottoABI, contractAddressL);
  let methods = contract.methods;

  var enabi = methods.adminEndGame().encodeABI();//함수명,파라미터 바꾸는곳
  let nonce = 0;
  await caver.klay.getTransactionCount(ownerEOA).then(l => nonce = l);

  // caver.klay.accounts.wallet.create(1);
  // const sender = caver.klay.accounts.wallet[0];
  // const privateKey = req.body.testpk;

  const sender = caver.klay.accounts.wallet.add(privateKey)
  // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정

  caver.klay.getAccount(sender.address).then(console.log); // should print `null`


  const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: sender.address,
    to: contractAddressL, //전송되는 CA 주소에 따라 바뀝니다.
    data: enabi,
    gas: '10000000', //limit은 최대로 해두었습니다.
    value: 0,
    nonce: nonce
  }, sender.privateKey);

  // signed raw transaction
  //console.log("Raw TX:\n", senderRawTransaction);
  await caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: payer.address
  })
  .on('transactionHash', function (hash) {
    // console.log(">>> tx_hash for deploy =", hash);
  })
  .on('receipt', async function (receipt) {
    console.log(">>> receipt arrived: ", receipt);
    console.log('adminEndGame confirmed');
    TestregisterReferal();
    // await(200000);
    // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
    //  adminDrawNumber([9008002,9008003],["0xa6e2c9c5430697c1d3d9b2d5e5266e0cd9af17ce9671ddf58b1aee71d71afef2","0xd57736e096ea0ce05b6b2f89b2003426cea7adf37d9921c4f7e76839ed75249a"]);//https://etherscan.io/block/9008002 임의로 넣음
  })
  .on('error', async function (err) {
  console.error(">>> error: ", err);
  // await sleep(30000);
  // await adminEndGame();

  });
  };
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function adminDrawNumber(_ethBlockNumber,_ethBlockHash) { //대납 계정으로 보낸 트렌젝션
 
  caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
  
  let contract = new caver.klay.Contract(giniLottoABI, contractAddressL);
  let methods = contract.methods;

  var enabi = methods.adminDrawNumber(_ethBlockNumber,_ethBlockHash).encodeABI();//함수명,파라미터 바꾸는곳
  let nonce = 0;
  await caver.klay.getTransactionCount(ownerEOA).then(l => nonce = l);

  // caver.klay.accounts.wallet.create(1);
  // const sender = caver.klay.accounts.wallet[0];
  // const privateKey = req.body.testpk;

  const sender = caver.klay.accounts.wallet.add(privateKey)
  // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정

  caver.klay.getAccount(sender.address).then(console.log); // should print `null`


  const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: sender.address,
    to: contractAddressL, //전송되는 CA 주소에 따라 바뀝니다.
    data: enabi,
    gas: '10000000', //limit은 최대로 해두었습니다.
    value: 0,
    nonce: nonce
  }, sender.privateKey);

  // signed raw transaction
  //console.log("Raw TX:\n", senderRawTransaction);
  await caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: payer.address
  })
  .on('transactionHash', function (hash) {
    console.log(">>> tx_hash for deploy =", hash);
  })
  .on('receipt', function (receipt) {
    // let j = caver.klay.getBlockNumber();
    // while(j2===(j+10)){
    //   let j2 = caver.klay.getBlockNumber();
    //   console.log(i)
    // }
    // console.log("10th block Number :" + i)

    console.log('adminDrawNumber confirmed');
    // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
    adminCalWins();
  })
  .on('error', async function (err) {
  console.error(">>> error: ", err);
  // await sleep(30000);
  // await adminDrawNumber();
  });
  };
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function adminCalWins() { //대납 계정으로 보낸 트렌젝션
  caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
  
  let contract = new caver.klay.Contract(giniLottoABI, contractAddressL);
  let methods = contract.methods;

  var enabi = methods.adminCalWins().encodeABI();//함수명,파라미터 바꾸는곳
  let nonce = 0;
  await caver.klay.getTransactionCount(ownerEOA).then(l => nonce = l);

  // caver.klay.accounts.wallet.create(1);
  // const sender = caver.klay.accounts.wallet[0];
  // const privateKey = req.body.testpk;

  const sender = caver.klay.accounts.wallet.add(privateKey)
  // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정

  caver.klay.getAccount(sender.address).then(console.log); // should print `null`


  const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: sender.address,
    to: contractAddressL, //전송되는 CA 주소에 따라 바뀝니다.
    data: enabi,
    gas: '10000000', //limit은 최대로 해두었습니다.
    value: 0,
    nonce: nonce
  }, sender.privateKey);

  // signed raw transaction
  //console.log("Raw TX:\n", senderRawTransaction);
  await caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: payer.address
  })
  .on('transactionHash', function (hash) {
    // console.log(">>> tx_hash for deploy =", hash);
  })
  .on('receipt', async function (receipt) {
    // console.log(">>> receipt arrived: ", receipt);
    console.log('adminCalWins confirmed');
    // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
    await sleep(3000);
    await adminDistribute();
  })
  .on('error', async function (err) {
  console.error(">>> error: ", err);
  // await sleep(30000);
  // await adminCalWins();
  });
  };
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function adminDistribute() { //대납 계정으로 보낸 트렌젝션
  caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
  
  let contract = new caver.klay.Contract(giniLottoABI, contractAddressL);
  let methods = contract.methods;

  var enabi = methods.adminDistribute().encodeABI();//함수명,파라미터 바꾸는곳
  let nonce = 0;
  await caver.klay.getTransactionCount(ownerEOA).then(l => nonce = l);

  // caver.klay.accounts.wallet.create(1);
  // const sender = caver.klay.accounts.wallet[0];
  // const privateKey = req.body.testpk;

  const sender = caver.klay.accounts.wallet.add(privateKey)
  // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정

  caver.klay.getAccount(sender.address).then(console.log); // should print `null`


  const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: sender.address,
    to: contractAddressL, //전송되는 CA 주소에 따라 바뀝니다.
    data: enabi,
    gas: '10000000', //limit은 최대로 해두었습니다.
    value: 0,
    nonce: nonce
  }, sender.privateKey);

  // signed raw transaction
  //console.log("Raw TX:\n", senderRawTransaction);
  await caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: payer.address
  })
  .on('transactionHash', function (hash) {
    // console.log(">>> tx_hash for deploy =", hash);
  })
  .on('receipt', function (receipt) {
    // console.log(">>> receipt arrived: ", receipt);
    showresult();
    console.log('adminDistribute confirmed');
    console.log('Game finished')
    // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
    
  })
  .on('error', function (err) {
  console.error(">>> error: ", err);
  });
  };
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    function GiniTokenSetting(){
      caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
      let contract = new caver.klay.Contract(giniTokenABI, contractAddressT);
      let methods = contract.methods;
    }

    function GiniLottoSetting(){
      caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
      let contract = new caver.klay.Contract(giniLottoABI, contractAddressT);
      let methods = contract.methods;
    }

    function GiniDonationSetting(){
      caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
      let contract = new caver.klay.Contract(giniTokenABI, contractAddressT);
      let methods = contract.methods;
    }


    async function DontaionInfo(){
      await GiniDonationSetting()
      await methods.isDonationSet().call().then(l => {
        // sendData.isDonationSet = l; 
        console.log('Dontiaion Set is :' + l);
        })

      await methods.gameId().call().then(gameId => {
        // sendData.gameId = gameId; 
        var gameId = gameId;
        console.log('gameId is : '+l);
        })

      await methods.gameDutation().call().then(l => {
        // sendData.gameDutation = l; 
        console.log('gameDutation is : ' +l);
        })

      // methods.getDrawedLotNumber(gameId).call().then(l => {
      //   // sendData.getDrawedLotNumber = l; 
      //   console.log(l);
      //   })

      // methods.getGameLotNumberindex().call().then(l => {
      //   // sendData.getGameLotNumberindex = l; 
      //   console.log(l);
      //   })

      methods.gameIndex(gameId).call().then(l => {
        // sendData.gameIndex = l; 
        console.log('start time is ' +l[0] );
        })  

    }

  

    
    
   
    
    
    //////////////////////////////////////////////////로또 관련 함수///////////////////////////
    // router.post('/adminBeginAGame', async function(req, res) { //대납 계정으로 보낸 트렌젝션
    async function adminBeginAGame(gameLotNumberMax,gameLotNumberCounts,_rwdsLotteryRank1ReferalRate) {
      console.log('Game start');
      console.log('gameLotNumber Max:'+gameLotNumberMax );
      console.log('gameLotNumber Counts:'+gameLotNumberCounts );
      console.log('gameLotNumber Counts:'+_rwdsLotteryRank1ReferalRate );




      caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
   
  
      await initWallet()
      let contract = new caver.klay.Contract(giniLottoABI, contractAddressL);
      let methods = contract.methods;
  
      var enabi = methods.adminBeginAGame(gameLotNumberMax,gameLotNumberCounts,_rwdsLotteryRank1ReferalRate).encodeABI();//함수명,파라미터 바꾸는곳
      let nonce = 0;
      await caver.klay.getTransactionCount('0xc4e0d494faf1986912ca18e36c7453b242891cec').then(l => nonce = l); //바꾸는 부분 2 - 보내는 사람 PUBLIC
  
      const sender = caver.klay.accounts.wallet.add(privateKey)
      // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
      const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정
  
      caver.klay.getAccount(sender.address).then(console.log); // should print `null`
  
  
      const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
        type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
        from: sender.address,
        to: contractAddressL, //전송되는 CA 주소에 따라 바뀝니다.
        data: enabi,
        gas: '10000000', //limit은 최대로 해두었습니다.
        value: 0,
        nonce: nonce
      }, sender.privateKey);
  
      // signed raw transaction
      //console.log("Raw TX:\n", senderRawTransaction);
      await caver.klay.sendTransaction({
        senderRawTransaction: senderRawTransaction,
        feePayer: payer.address
      })
      .on('transactionHash', function (hash) {
        // console.log(">>> tx_hash for deploy =", hash);
      })
      .on('receipt', async function (receipt) {
        // console.log(">>> receipt arrived: ", receipt);
        // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
        console.log('BeginnigGame confirmed')
        return;
      })
      .on('error', async function (err) {
      console.error(">>> error: ", err);
      //  await sleep(30000);
      //  await adminBeginAGame(25);
    });
    }
      // res.send({msg:'로또 구매 가능'});    


///////////////////////////////////////인출하는 함수///////////////////////////////////////////////
async function withdrawRewards(_recevier,_gameId,_lotNumberBit,_donationRate) {
  caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));

  await initWallet()
  let contract = new caver.klay.Contract(giniLottoABI, contractAddressL);
  let methods = contract.methods;

  var enabi = methods.withdrawRewards(_recevier,_gameId,_lotNumberBit,_donationRate).encodeABI();//함수명,파라미터 바꾸는곳
  let nonce = 0;
  await caver.klay.getTransactionCount('0xc4e0d494faf1986912ca18e36c7453b242891cec').then(l => nonce = l); //바꾸는 부분 2 - 보내는 사람 PUBLIC

  const sender = caver.klay.accounts.wallet.add(privateKey)
  // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정

  caver.klay.getAccount(sender.address).then(console.log); // should print `null`


  const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: sender.address,
    to: contractAddressL, //전송되는 CA 주소에 따라 바뀝니다.
    data: enabi,
    gas: '10000000', //limit은 최대로 해두었습니다.
    value: 0,
    nonce: nonce
  }, sender.privateKey);

  // signed raw transaction
  //console.log("Raw TX:\n", senderRawTransaction);
  await caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: payer.address
  })
  .on('transactionHash', function (hash) {
    // console.log(">>> tx_hash for deploy =", hash);
  })
  .on('receipt', async function (receipt) {
    // console.log(">>> receipt arrived: ", receipt);
    // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
    console.log('withdrawRewards of :' +_recevier+ 'gameId number : ' +_gameId+'Lotteryticket :'+_lotNumberBit+' Donation rate '+(_donationRate)/(1000)+'%' );
    return;
  })
  .on('error', async function (err) {
  console.error(">>> error: ", err);
  //  await sleep(30000);
  //  await withdrawRewards(_recevier,_gameId,_lotNumberBit,_donationRate);
});
}
  // res.send({msg:'로또 구매 가능'});    



///////////////////////////////////////////////////////////////반복 줄이기 //////////////////////////////////

function initWallet(){
  console.log("init");
  caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
  caver.klay.accounts.wallet.remove(privateKey);
  // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  caver.klay.accounts.wallet.remove('PrivateKey'); //돈을 지불하는 계정
}
// //selectedABI , contractAddressN 에서 트렌젝셜 보낼 CA 선택, CurrentFunc와 NextFunc에서 현재,다음 실행할 함수의 이름&파라미터 입력
// async function setDefault(selectedABI,contractAddressN,CurrentFunc,NextFunc){ //트렌젝션 사인 후 다음 함수로 넘기는 코드, CurrentFunc에는 함수(파라미터 형식), NextFunc에도 함수(파라미터 형식으로 입력)
//   await initWallet();
//   caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
//   let contract = new caver.klay.Contract(selectedABI, contractAddressN);
//   let methods = contract.methods;
  
//   const sender = caver.klay.accounts.wallet.add(privateKey)
//   // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
//   const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정

//   caver.klay.getAccount(sender.address).then(console.log); // should print `null`

//   var enabi = methods.CurrentFunc.encodeABI();//함수명,파라미터 바꾸는곳
//   let nonce = 0;
//   await caver.klay.getTransactionCount(ownerEOA).then(l => nonce = l);

//   const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
//     type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
//     from: sender.address,
//     to: contractAddressN, //전송되는 CA 주소에 따라 바뀝니다.
//     data: enabi,
//     gas: '10000000', //limit은 최대로 해두었습니다.
//     value: 0,
//     nonce: nonce
//   }, sender.privateKey);
  
//   console.log("Raw TX:\n", senderRawTransaction);
//   await caver.klay.sendTransaction({
//     senderRawTransaction: senderRawTransaction,
//     feePayer: payer.address
//   })
//   .on('transactionHash', function (hash) {
//     console.log(">>> tx_hash for deploy =", hash);
//   })
//   .on('receipt', async function (receipt) {
//     // console.log(">>> receipt arrived: ", receipt);
//     // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
//     console.log('registerComplete');
//     await sleep(30000);
//     await NextFunc; 
//   })
//   .on('error', async function (err) {
//   console.error(">>> error: ", err);
//    await sleep(30000);
//    await CurrentFunc;
// });
//  } =>실패

//////////////////////////////////////////////레퍼럴 등록 기능 ///////////////////////
async function adminCalWins() { //대납 계정으로 보낸 트렌젝션
  caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
  
  let contract = new caver.klay.Contract(giniLottoABI, contractAddressL);
  let methods = contract.methods;

  var enabi = methods.adminCalWins().encodeABI();//함수명,파라미터 바꾸는곳
  let nonce = 0;
  await caver.klay.getTransactionCount(ownerEOA).then(l => nonce = l);

  // caver.klay.accounts.wallet.create(1);
  // const sender = caver.klay.accounts.wallet[0];
  // const privateKey = req.body.testpk;

  const sender = caver.klay.accounts.wallet.add(privateKey)
  // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정

  caver.klay.getAccount(sender.address).then(console.log); // should print `null`


  const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: sender.address,
    to: contractAddressL, //전송되는 CA 주소에 따라 바뀝니다.
    data: enabi,
    gas: '10000000', //limit은 최대로 해두었습니다.
    value: 0,
    nonce: nonce
  }, sender.privateKey);

  // signed raw transaction
  //console.log("Raw TX:\n", senderRawTransaction);
  await caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: payer.address
  })
  .on('transactionHash', function (hash) {
    // console.log(">>> tx_hash for deploy =", hash);
  })
  .on('receipt', async function (receipt) {
    // console.log(">>> receipt arrived: ", receipt);
    console.log('adminCalWins confirmed');
    // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
    await sleep(3000);
    await adminDistribute();
  })
  .on('error', async function (err) {
  console.error(">>> error: ", err);
  // await sleep(30000);
  // await adminCalWins();
  });
  };


/////////////////////////////////////자동 조회 기능////////////////////
function showresult() {
  
};

function getGameLotNumberIndex(_lotNumber) {
 let contract2 = new caver.klay.Contract(giniLottoABI,contractAddressL)
 let methods2 = contract2.methods;
 console.log("실행")
 methods2.gameId().call().then(gameId => {
   console.log(gameId);
   console.log(_lotNumber)
   methods2.getGameLotNumberIndex(gameId,_lotNumber).call().then(BuyerAddress =>{
    console.log(BuyerAddress);
    return BuyerAddress;
   }
  )
 })
}


 ///////////////////////////////////////테스팅/////////////////////////////////////
    
router.post('/testing', async function(req, res){
  console.log('testing_Start')
  approve_Lotto();
  await sleep(20000);
  res.send("testing_finish");
});

router.post('/testing2',async function(req,res){
  console.log('testing2_Start')
 buyLotto(); // 관리자 계정으로 (레퍼럴 꼭대기), 랜덤 215명
 await sleep(20000);
 res.send("testing2_finish");
});

router.post('/testing3',async function(req,res){//레퍼럴 등록 , 1,2,3등 등록 및 여러명 한번에 등록하기 - level,depth입력
  console.log('testing3_Start')
  buyLotto1st();//1,2,3+레퍼럴계정 64 = 총 67개구매
  await sleep(20000);
  res.send("testing3_finish");
});

router.post('/testing4',async function(req,res){//당첨번호 및 당첨금 분배 시작
  console.log('testing4_Start')
  adminEndGame();
  await sleep(20000);
  res.send("testing4_finish");
});

router.post('/calwins',async function(req,res){//당첨번호 및 당첨금 분배 시작
  console.log('calwins_Start')
  adminCalWins();
  res.send("calwins_finish");
});

router.post('/testing5',async function(req,res){//당첨번호 및 당첨금 분배 시작
  console.log('testing5_Start')
  adminDrawNumber([9008002,9008003],["0xa6e2c9c5430697c1d3d9b2d5e5266e0cd9af17ce9671ddf58b1aee71d71afef2","0xd57736e096ea0ce05b6b2f89b2003426cea7adf37d9921c4f7e76839ed75249a"])
  await sleep(20000);
  res.send("testing5_finish");
});
router.post('/doItAgain',async function(req,res){//로또 재시작 - 로또 개수 입력
  console.log('doItAgian_Start')
  // TestregisterReferal();
  approve_Lotto2();
  res.send("doItAgain_finish");
}) 
///////////////////////////////////////////////////////////DoitAgain
async function approve_Lotto2(){ //대납 계정으로 보낸 트렌젝션
  caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
  // var _spender = req.body.spender;
  var _spender = contractAddressL;
  // var _value = 9999999999999; //이 값 이상으로 넣을시 에
  var BN = caver.utils.BN;
  var _value =  new BN('9999999999999999999999999999999999999999999999').toString(); //이 값 이상으로 넣을시 에
  initWallet();    
  let contract2 = new caver.klay.Contract(giniTokenABI, contractAddressT);
  let methods2 = contract2.methods;
  let _ownerEOA = ownerEOA; //바꾸는 부분 1 - owner
  var sendData = {};
  
  
  
  var enabi = methods2.approve(_spender,_value).encodeABI();
  
  await caver.klay.getTransactionCount('0xc4e0d494faf1986912ca18e36c7453b242891cec').then(l => nonce = l); //바꾸는 부분 2 - 보내는 사람 PUBLIC
  // var nonce =nonce;//처음에 명시해 놓고  nonce사용ㄴ
  // caver.klay.accounts.wallet.create(1);
  // const sender = caver.klay.accounts.wallet[0];
  // const privateKey = 'PrivateKey';//바꾸는 부분 2 - 보내는 사람 PRIVATE
  
  
  const sender = caver.klay.accounts.wallet.add(privateKey)
  console.log(sender.address);
  // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  const payer = caver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정
  
  caver.klay.getAccount(sender.address).then(console.log); // should print `null`
  
  console.log("_spender : " +_spender +"approve amount : " +_value);
  const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
    type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
    from: sender.address,
    to: contractAddressT, //전송되는 CA 주소에 따라 바뀝니다.
    data: enabi,
    gas: '10000000', //limit은 최대로 해두었습니다.
    value: 0,
    nonce: nonce, //순서대로 미리 지정해둔 후 nonce 배정
  }, sender.privateKey);
  
  // signed raw transaction
  //console.log("Raw TX:\n", senderRawTransaction);
  await caver.klay.sendTransaction({
    senderRawTransaction: senderRawTransaction,
    feePayer: payer.address
  })
  .on('transactionHash', function (hash) {
    // console.log(">>> tx_hash for deploy =", hash);
   
  })
  .on('receipt', async function (receipt) {
    // console.log(">>> receipt arrived: ", receipt);
    console.log('approve confirmed');
    adminBeginAGame(25,5,[500,500,500,200,200,200,200,100,100]);      // await adminRegisterDonation("number2","abc","abc","123123123123",0x6fe810Ce966d4005B643208334d82D505aC33443)
    // await adminRegisterDonation("number3","abc","abc","123123123123",0x6fe810Ce966d4005B643208334d82D505aC33443)
    // await adminRegisterDonation("number4","abc","abc","123123123123",0x6fe810Ce966d4005B643208334d82D505aC33443)

    // caver.klay.getAccount(sender.address).then(console.log); // should NOT print `null`
  })
  .on('error', async function (err) {
    console.error(">>> error: ", err);
    // await sleep(30000);
    // approve_Lotto();
  });

  
  methods2.allowance('0xc4e0d494faf1986912ca18e36c7453b242891cec',contractAddressL).call().then(balval => { //
    console.log("approve 잔액 : " + (balval));
  })
}

///////////////////////////////////////////////////////////////////////////////////////////////조회 함수들 (테스트 조회용)
router.post('/showresult', async function(req, res){
  console.log("showing showresult");
  // let contract = new caver.klay.Contract(giniTokenABI, contractAddressT);
  // let methods = contract.methods;
  caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
  let contract2 = new caver.klay.Contract(giniLottoABI, contractAddressL);
  let methods2 = contract2.methods;
  let contract = new caver.klay.Contract(giniTokenABI, contractAddressT);
  let methods = contract.methods;
  await methods2.gameId().call().then(gameId => {
    console.log("results__gameId : " +gameId);
     methods2.gameIndex(gameId).call().then(l => {
      // console.log (l);
      console.log("results_Ticket Count : " + l[4]);
      console.log("isActive : " + l[5]);
      console.log("isLotNumberDrawed  : " + l[6]);
      console.log("winnerCalculated : " + l[7]);
      console.log("isDistributed : " + l[8]);
       methods2.getDrawedLotNumber(gameId).call().then(l2=>{
        console.log("results_1st number : " + l2);
           methods2.getRankInfo(gameId,5).call().then(getRankInfo=>{
            console.log("results_1st rewards : " + getRankInfo[0]);
            console.log("results_1st winnerCounts : " + getRankInfo[1]);
          });
           methods2.getRankInfo(gameId,4).call().then(getRankInfo=>{
            console.log("results_2nd rewards : " + getRankInfo[0]);
            console.log("results_2nd winnerCounts : " + getRankInfo[1]);
          });
           methods2.getRankInfo(gameId,3).call().then(getRankInfo=>{
            console.log("results_3rd rewards : " + getRankInfo[0]);
            console.log("results_3rd winnerCounts : " + getRankInfo[1]);
          });
      });
    });
  });
  await sleep(1000);
      await methods2.fundAddressIndex(0).call().then(l=> {
        methods.balanceOf(l).call().then(l2 => {
          console.log("NOT_WINNING_PAYBACK : "+l2);
        });
      });
      await methods2.fundAddressIndex(1).call().then(l=> {
        methods.balanceOf(l).call().then(l2 => {
          console.log("MAINTENANCE_COST : "+l2);
        });
      });
      await methods2.fundAddressIndex(2).call().then(l=> {
        methods.balanceOf(l).call().then(l2 => {
          console.log("LAMP_TOKEN_STAKING_REWARD : : "+l2);
        });
      }); 
      await methods2.fundAddressIndex(3).call().then(l=> {
        methods.balanceOf(l).call().then(l2 => {
          console.log("GINI_STORE_REWARD : "+l2);
        });
      }); 
      await methods2.fundAddressIndex(4).call().then(l=> {
          console.log("PARTICIPATION_REWARD : "+l);
      }); 
      await methods2.SALES_AMOUNT().call().then(l=> {
        console.log("SALES_AMOUNT : "+l);
       }); 

       await methods2.PRIZE_MONEY().call().then(l=> {
        console.log("PRIZE_MONEY : "+l);
       });
    res.send("showresult complete");
    });

  async function showresult(){
    console.log("showing showresult");
  // let contract = new caver.klay.Contract(giniTokenABI, contractAddressT);
  // let methods = contract.methods;
  caver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));
  let contract2 = new caver.klay.Contract(giniLottoABI, contractAddressL);
  let methods2 = contract2.methods;
  let contract = new caver.klay.Contract(giniTokenABI, contractAddressT);
  let methods = contract.methods;
  await methods2.gameId().call().then(gameId => {
    console.log("results__gameId : " +gameId);
     methods2.gameIndex(gameId).call().then(l => {
      // console.log (l);
      console.log("results_Ticket Count : " + l[4]);
      console.log("isActive : " + l[5]);
      console.log("isLotNumberDrawed  : " + l[6]);
      console.log("winnerCalculated : " + l[7]);
      console.log("isDistributed : " + l[8]);
       methods2.getDrawedLotNumber(gameId).call().then(l2=>{
        console.log("results_1st number : " + l2);
           methods2.getRankInfo(gameId,5).call().then(getRankInfo=>{
            console.log("results_1st rewards : " + getRankInfo[0]);
            console.log("results_1st winnerCounts : " + getRankInfo[1]);
          });
           methods2.getRankInfo(gameId,4).call().then(getRankInfo=>{
            console.log("results_2nd rewards : " + getRankInfo[0]);
            console.log("results_2nd winnerCounts : " + getRankInfo[1]);
          });
           methods2.getRankInfo(gameId,3).call().then(getRankInfo=>{
            console.log("results_3rd rewards : " + getRankInfo[0]);
            console.log("results_3rd winnerCounts : " + getRankInfo[1]);
          });
      });
    });
  });
  await sleep(1000);
      await methods2.fundAddressIndex(0).call().then(l=> {
        methods.balanceOf(l).call().then(l2 => {
          console.log("NOT_WINNING_PAYBACK : "+l2);
        });
      });
      await methods2.fundAddressIndex(1).call().then(l=> {
        methods.balanceOf(l).call().then(l2 => {
          console.log("MAINTENANCE_COST : "+l2);
        });
      });
      await methods2.fundAddressIndex(2).call().then(l=> {
        methods.balanceOf(l).call().then(l2 => {
          console.log("LAMP_TOKEN_STAKING_REWARD : : "+l2);
        });
      }); 
      await methods2.fundAddressIndex(3).call().then(l=> {
        methods.balanceOf(l).call().then(l2 => {
          console.log("GINI_STORE_REWARD : "+l2);
        });
      }); 
      await methods2.fundAddressIndex(4).call().then(l=> {
          console.log("PARTICIPATION_REWARD : "+l);
      }); 
      await methods2.SALES_AMOUNT().call().then(l=> {
        console.log("SALES_AMOUNT : "+l);
       }); 

       await methods2.PRIZE_MONEY().call().then(l=> {
        console.log("PRIZE_MONEY : "+l);
       });

  //     console.log("showing playerTree");
  
  // var _address = "0x0000000000000000000000000000000000000073";
  // var _depth = 8;
  // await methods2.TestGetReferalTree(_address,_depth).call().then( async function(WinnerReferal) {
  //   for(i=0;i<WinnerReferal.length;i++){
  //     await sleep(3000)
  //     console.log("referalAddress_" + (_depth-i) + " : "+ WinnerReferal[i]);
  //     methods2.playerTree(WinnerReferal[i]).call().then( async function(l2){ // resultR = 
  //       console.log("refereal index : "+l2[0])
  //       console.log("referalRewards : "+l2[1])
  //       console.log("lastPlayedGameId : " +l2[2])
        // console.log("referalAddress"+"_"+i+" : "+l2[3])
            // resultR += l2[1]*1
            // console.log("su" +resultR);
            // return resultR;
    //     });          
    //   }
    //   // console.log("레퍼럴 총합1" +resultR);
    //   // return resultR;
    // })
  }
  //root player : 0xa61282F65e25BDCfbF597b39303CA535DA52859f
  var repeatNum = Nreferal.length;
  var iNum = 0;
  router.post('/RegisterReferal', async function(req, res){    
    register_referal();
    res.send(console.log("RegisterReferal start"))
});


async function register_referal(){
  let ncaver = new Caver(new Caver.providers.HttpProvider('https://api.baobab.klaytn.net:8651/'));

  let contract = new ncaver.klay.Contract(giniLottoABI, contractAddressL);
  let methods = contract.methods;
  let enabi = methods.adminRegisterReferal(Nreferal[iNum][0],Nreferal[iNum][1]).encodeABI();//함수명,파라미터 바꾸는곳
  let nonce = 0;
  await ncaver.klay.getTransactionCount(ownerEOA).then(l => nonce = l);
  console.log("from :"+Nreferal[iNum][0]+", referal :"+Nreferal[iNum][1]);
  
  const sender = ncaver.klay.accounts.wallet.add(privateKey)
  // if there is only one key bound to an address where last160bits(keccak(key)) === address, then the key can function as payer key
  const payer = ncaver.klay.accounts.wallet.add('PrivateKey'); //돈을 지불하는 계정
  
  ncaver.klay.getAccount(sender.address).then(console.log); // should print `null`
  
  
    const { rawTransaction: senderRawTransaction } = await ncaver.klay.accounts.signTransaction({
      type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
      from: sender.address,
      to: contractAddressL, //전송되는 CA 주소에 따라 바뀝니다.
      data: enabi,
      gas: '10000000', //limit은 최대로 해두었습니다.
      value: 0,
      nonce: nonce
    }, sender.privateKey);
  
    // signed raw transaction
    //console.log("Raw TX:\n", senderRawTransaction);
    await ncaver.klay.sendTransaction({
      senderRawTransaction: senderRawTransaction,
      feePayer: payer.address
    })
    .on('transactionHash', function (hash) {
      // console.log(">>> tx_hash for deploy =", hash);
    })
    .on('receipt', async function (receipt) {
      // console.log(">>> receipt arrived: ", receipt);
      console.log('Referal register confirmed'+iNum);
      console.log(iNum,repeatNum)
      if(iNum < repeatNum){
        iNum++;  
        register_referal();
      }
    })
    .on('error', async function (err) {
    console.error(">>> error: ", err);
    });
  }

router.post('/BuyerAddress', function(req, res){
  let contract2 = new caver.klay.Contract(giniLottoABI,contractAddressL)
  let methods2 = contract2.methods;
  let _lotNumber = req.body._lotNumber;
  methods2.gameId().call().then(gameId => {
      methods2.getGameLotNumberIndex(gameId,_lotNumber).call().then(BuyerAddress =>{
      res.send(BuyerAddress);
      })
  })
});

router.post('/playerTree', async function(req, res){
  console.log("showing playerTree");
  let contract2 = new caver.klay.Contract(giniLottoABI, contractAddressL);
  let methods2 = contract2.methods;
  var _address = "0x0000000000000000000000000000000000000073";
  var _depth = 8;
  await methods2.TestGetReferalTree(_address,_depth).call().then( async function(WinnerReferal) {
    for(i=0;i<WinnerReferal.length;i++){
      await sleep(3000)
      console.log("referalAddress_" + (_depth-i) + " : "+ WinnerReferal[i]);
      methods2.playerTree(WinnerReferal[i]).call().then( async function(l2){ // resultR = 
        console.log("refereal index : "+l2[0])
        console.log("referalRewards : "+l2[1])
        console.log("lastPlayedGameId : " +l2[2])
        // console.log("referalAddress"+"_"+i+" : "+l2[3])
            // resultR += l2[1]*1
            // console.log("su" +resultR);
            // return resultR;
        });          
      }
      // console.log("레퍼럴 총합1" +resultR);
      // return resultR;
    })
    // console.log("레퍼럴 총합2" +result);
  res.send("playerTree complete");
})


router.post('/getEvent', function(req,res){
    let contract2 = new caver.klay.Contract(giniLottoABI, contractAddressL);
    let methods2 = contract2.methods;
    
      methods2.gameId().call().then(gameId => {
        console.log("_gameId : " +gameId);
    
      contract2.getPastEvents('BuyLottery', {
          filter: { _gameId : gameId, //gameId
                    // _buyer :  "0x0000000000000000000000000000000000000068"; 
          },
          fromBlock : 0,
          toBlock : 'latest'
          })
          .then(function(events){
            for (i=0;i<events.length;i++){
              console.log("Event number"+i +" gameId : " + events[i].returnValues._gameId);
              console.log("Event number"+i + " _buyer : " + events[i].returnValues._buyer);
              console.log("Event number"+i + " _lotNumberBit : " + events[i].returnValues._lotNumberBit);
            }
          });
      });
    });

    router.post('/withdrawRewards', function(req,res){
      let contract2 = new caver.klay.Contract(giniLottoABI, contractAddressL);
      let methods2 = contract2.methods;
      
        methods2.gameId().call().then(gameId => {
          console.log("_gameId : " +gameId);
      
        contract2.getPastEvents('BuyLottery', {
            filter: { _gameId : gameId, //gameId
                      // _buyer :  "0x0000000000000000000000000000000000000068"; 
            },
            fromBlock : 0,
            toBlock : 'latest'
            })
            .then(async function(events){
              for (i=0;i<events.length;i++){
                sleep(30000);
                withdrawRewards(events[i].returnValues._buyerr,events[i].returnValues._gameId,events[i].returnValues._lotNumberBit,1000)    //기부 10%          // console.log(events[i].returnValues);
              }
            });
        });
      });

    


function deploy_contract(){
  const sender = caver.klay.accounts.wallet.add('sender_private_key');
  const payer = caver.klay.accounts.wallet.add('fee_payer_key', 'target_address');
  
  // an arbitrary contract is used
  async function run() {
      // make sure `data` starts with 0x
      const { rawTransaction: senderRawTransaction } = await caver.klay.accounts.signTransaction({
          type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY',
          from: sender.address,
          data: "0x60806040526000805534801561001457600080fd5b5060e8806100236000396000f3fe6080604052348015600f57600080fd5b5060043610603c5760003560e01c806306661abd14604157806342cbb15c14605d578063d14e62b8146079575b600080fd5b604760a4565b6040518082815260200191505060405180910390f35b606360aa565b6040518082815260200191505060405180910390f35b60a260048036036020811015608d57600080fd5b810190808035906020019092919050505060b2565b005b60005481565b600043905090565b806000819055505056fea165627a7a7230582087453d981a85f80c5262508e1fe5abe94dc38b1167c49b6e3477b74293e9e7000029",
          gas: '3000000',
          value: 0,
      }, sender.privateKey);
  
      // signed raw transaction
      console.log("Raw TX:\n", senderRawTransaction);
      
      // send fee delegated transaction with fee payer information
      caver.klay.sendTransaction({
          senderRawTransaction: senderRawTransaction,
          feePayer: payer.address
      })
          .on('transactionHash', function (hash) {
              console.log(">>> tx_hash for deploy =", hash);
          })
          .on('receipt', function (receipt) {
              console.log(">>> receipt arrived: ", receipt);
          })
          .on('error', function (err) {
              console.error(">>> error: ", err);
          });
  }
}
module.exports = router;