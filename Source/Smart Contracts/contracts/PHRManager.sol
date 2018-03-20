pragma solidity ^0.4.17;

contract PHRManager {
    
    event FileAdded(address fileOwner, address fileAddress); 
    

    address  contractOwner; 
    mapping(address => address) acls; //[UserPub: his ACL]
    
    function PHRManager() public {
        contractOwner = msg.sender;
    }
    
    function addACLFileAddress(address _fileOwner, address _fileAddress) public payable {
        uint fees = 0.05 ether;
        require(msg.value > fees);
            
        acls[_fileOwner] = _fileAddress;
        
        contractOwner.transfer(fees);
        if (msg.value > fees)
            msg.sender.transfer(msg.value - fees);

        FileAdded(_fileOwner,  _fileAddress);            
    }

    function getACLFileAddress(address _fileOwner) public view returns(address) {
        return acls[_fileOwner];
    }

    function() public payable {
        //Change this action latter
        contractOwner.transfer(msg.value);
    }
}
