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
          "name": "fileAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "fileSecret",
          "type": "string"
        }
      ],
      "name": "FileAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "fileAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "fileSecret",
          "type": "string"
        }
      ],
      "name": "AccessAdded",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_fileAddress",
          "type": "string"
        },
        {
          "name": "_encryptedsharedkey",
          "type": "string"
        }
      ],
      "name": "addFileAccess",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_fileAddress",
          "type": "string"
        }
      ],
      "name": "getMyFileAccess",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_reciever",
          "type": "address"
        },
        {
          "name": "_fileAddress",
          "type": "string"
        },
        {
          "name": "_encryptedsharedkey",
          "type": "string"
        }
      ],
      "name": "giveAccess",
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
        },
        {
          "name": "_fileAddress",
          "type": "string"
        }
      ],
      "name": "getFileAccess",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
var address = '0x';
var phrContract = EthHelper.getContract(abi, address);

export function addFileAccess(fileAddress, encryptedsharedkey) {
}

export function getMyFileAccess(fileAddress) {
    return "string";
}

export function giveAccess(reciever, fileAddress, encryptedsharedkey) {
    var fees = web3.toWei(0.5)
    phrContract.giveAccess(reciever, fileAddress, encryptedsharedkey,{ value: fees , gas: 300000 }, (error, res) => {
        if(error)
            throw error;
      });
}

export function getFileAccess(fileOwner, fileAddress) {
    ratingContract.balanceOf((add), (error, res) => {
        if(error)
            throw error;

        return res;
      });
}