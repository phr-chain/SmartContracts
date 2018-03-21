pragma solidity ^0.4.17;

contract PHRManager {
    
    struct FileInfo {
        string _address;
        string name;
        address owner;
    }
    struct UserACL {
        mapping(string => string) myFiles;  //[file address, MyPub(SharedKey)]
        mapping (string => mapping (address => string))  sharedFiles; //[file address: [RecieverPub, RecieverPub(SharedKey)]]
        mapping (string => string)  sharedWithMe; //[file address: MyPub(SharedKey)]
    }
      
    event FileAdded(address fileAddress, string fileSecret); 
    event AccessAdded(address fileAddress, string fileSecret);
    

    address  contractOwner; 
    mapping(string => FileInfo) filesLookup; // [FileAdd => File name]
    mapping(address => UserACL) acls; //[UserPub: his ACL]
    
    function PHRManager() public {
        contractOwner = msg.sender;
    }
    
    function addFileAccess(string _fileAddress,string _fileName, string _encryptedsharedkey) public payable{
        uint fees = 0.05 ether;
        require(msg.value > fees);
            
        filesLookup[_fileAddress] = FileInfo({_address: _fileAddress, name: _fileName, owner: msg.sender});
        acls[msg.sender].myFiles[_fileAddress] = _encryptedsharedkey;
        
        contractOwner.transfer(fees);
        if (msg.value > fees)
            msg.sender.transfer(msg.value - fees);

        FileAdded(msg.sender,  _fileName);            
    }

    function getMyFileAccess(string _fileAddress) public view returns(string){
        return acls[msg.sender].myFiles[_fileAddress];
    }
    
    function giveAccess(address _reciever, string _fileAddress, string _encryptedsharedkey) public payable{
        uint fees = 0.01 ether;
        require(msg.value > fees);
        

        acls[msg.sender].sharedFiles[_fileAddress][_reciever] = _encryptedsharedkey;
        acls[_reciever].sharedWithMe[_fileAddress] = _encryptedsharedkey;

        contractOwner.transfer(fees);
        if (msg.value > fees)
            msg.sender.transfer(msg.value - fees);
        
        AccessAdded(_reciever, _fileAddress);
    }

    function getSharedWithMeFileAccess( string _fileAddress) public view returns(string) {
        return acls[msg.sender].sharedWithMe[_fileAddress];
    }
    
    
    function() public payable {
        //Change this action latter
        contractOwner.transfer(msg.value);
    }
}
