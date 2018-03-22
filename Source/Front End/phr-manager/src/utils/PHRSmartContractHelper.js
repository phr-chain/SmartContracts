import * as EthHelper from './EtherumHelper'

var abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "fileOwner",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "fileAddress",
				"type": "address"
			}
		],
		"name": "FileAdded",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_fileAddress",
				"type": "address"
			}
		],
		"name": "setACLFileAddress",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_fileOwner",
				"type": "address"
			}
		],
		"name": "getACLFileAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getMyACLFileAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
var address = '0x770e62cab50f942447b7ed04f75a9a4be98ea4e6';

var phrContract = EthHelper.getContract(abi, address);


export function setACLFileAddress(fileAddress, callBack) {
  var fees = window.web3.toWei(0.06, 'ether');
  phrContract.setACLFileAddress(fileAddress, { value: fees, gas: 500000 }, callBack);
}

export function getACLFileAddress(fileOwner, callBack) {
  phrContract.getACLFileAddress(fileOwner, callBack);
}

export function getMyACLFileAddress(callBack) {
  phrContract.getMyACLFileAddress(callBack);
}
