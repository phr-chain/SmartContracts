**ACL structure**

Patient1:

 - My Files: [
    - Address(EncreptedFile1)     Pub(SymmetricKey1)
    - Address(EncreptedFile2)     Pub(SymmetricKey2) ]
 - Shares: 	[
    - PubDoctor1    Address(EncreptedFile1)     PubDoctor1(SymmetricKey1)
    - PubDoctor1    Address(EncreptedFile2)     PubDoctor1(SymmetricKey2)
    - PubDoctor2    Address(EncreptedFile2)    PubDoctor2 (SymmetricKey2) 	]

Patient2:

 - My Files: 	[
              ... 	] 
 - Shares: 	[
                 ... 	]
