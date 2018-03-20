import * as EthHelper from './EtherumHelper'

var abi = [
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
        "name": "_fileOwner",
        "type": "address"
      },
      {
        "name": "_fileAddress",
        "type": "address"
      }
    ],
    "name": "addACLFileAddress",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
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
  }
];
var address = '0x';
var phrContract = EthHelper.getContract(abi, address);


function addACLFileAddress(fileOwner, fileAddress, callBack) {
  var fees = window.web3.toWei(0.05, 'ether');
  phrContract.addACLFileAddress(fileOwner, fileAddress, { value: fees, gas: 500000 }, callBack);
}

function getACLFileAddress(fileOwner, callBack) {
  phrContract.getACLFileAddress(fileOwner, callBack);
}
