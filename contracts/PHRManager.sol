pragma solidity ^0.4.17;

contract PHRManager {
    
    event FileAdded(string fileOwner, string fileAddress); 
    

    address  contractOwner; 
    mapping(string => string) acls; //[UserPub: his ACL]
    
    function PHRManager() public {
        contractOwner = msg.sender;
    }
    
    function setACLFileAddress(string _fileOwner, string _fileAddress) public payable {
        uint fees = 0.001 ether;
        require(msg.value >= fees);
            
        acls[_fileOwner] = _fileAddress;
        
        contractOwner.transfer(fees);
        if (msg.value > fees)
            msg.sender.transfer(msg.value - fees);

        FileAdded(_fileOwner,  _fileAddress);            
    }

    function getACLFileAddress(string _fileOwner) public view returns(string) {
        return acls[_fileOwner];
    }
    function() public payable {
        //Change this action latter
        contractOwner.transfer(msg.value);
    }
}
