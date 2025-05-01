1. Functional Requirement
   a. User Sign-Up/Login Functionality
   b. User verification with OPT/SMS
   c. User can become seller/ buyer
   d. Seller can create/update/delete products
   e. Seller can advertise products
   f. Buyer can purchase products using online payment (Card/Online Banking/MFS etc)
   g. Seller can receive payout
   h. Shareable Invoice Generate
   i. Email/Message Notification
   j. Online char between Seller & Buyer is needed

2. No Functional Requirement
   a. System should be highly avaiable in cloud with multiple region - C2C portal
   b. System should maintain best practices to able to scale horizontally at any level (k8s)
   c. System should design the way can be break down to microservices
   d. Loosely coupled services and communications
   e. It Should have mechanism for logging and monitoring to inspect services health and availability
   f. System should design with documentation for better scope of usability to understand ther architecture and business logic of the API usages.
   g. Should follow CQRS( if possible)

3. Data Storage requirements
   a. Should consistent or eventually consistent
   b. Distributed database system and high availability
   c. High availability of Object Storage for multiple regions.