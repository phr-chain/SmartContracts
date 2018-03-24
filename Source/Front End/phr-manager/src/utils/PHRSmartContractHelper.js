import * as EthHelper from './EtherumHelper'

var abi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"fileOwner","type":"address"},{"indexed":false,"name":"fileAddress","type":"string"}],"name":"FileAdded","type":"event"},{"constant":false,"inputs":[{"name":"_fileAddress","type":"string"}],"name":"setACLFileAddress","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"_fileOwner","type":"address"}],"name":"getACLFileAddress","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getMyACLFileAddress","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}]
var address = '0x740b1232ebe21e63d471e58c18a769be87815d87';

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
