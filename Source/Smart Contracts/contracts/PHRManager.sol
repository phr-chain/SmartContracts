pragma solidity ^0.4.17;

contract PHRManager {
    
    event FileAdded(address fileOwner, string fileAddress); 
    

    address  contractOwner; 
    mapping(address => string) acls; //[UserPub: his ACL]
    
    function PHRManager() public {
        contractOwner = msg.sender;
    }
    
    function setACLFileAddress( string _fileAddress) public payable {
        uint fees = 0.05 ether;
        require(msg.value > fees);
            
        acls[msg.sender] = _fileAddress;
        
        contractOwner.transfer(fees);
        if (msg.value > fees)
            msg.sender.transfer(msg.value - fees);

        FileAdded(msg.sender,  _fileAddress);            
    }

    function getACLFileAddress(address _fileOwner) public view returns(string) {
        return acls[_fileOwner];
    }
    function getMyACLFileAddress() public view returns(string) {
        return acls[msg.sender];
    }

    function() public payable {
        //Change this action latter
        contractOwner.transfer(msg.value);
    }
}
