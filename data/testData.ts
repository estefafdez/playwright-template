export const testData = {
  validUsers: [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      message: "This is a test message for contact form validation."
    },
    {
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      message: "Test message with accented characters: áéíóú ñ ü"
    },
    {
      name: "Test User",
      email: "testuser@qaautomation.com",
      message: "Long message to test text area handling with multiple lines.\nThis is line 2.\nThis is line 3."
    }
  ],
  
  invalidEmails: [
    "invalid-email",
    "@example.com",
    "test@",
    "test.example.com",
    "test@.com",
    ""
  ],
  
  specialCharacters: {
    name: "Jose Maria O'Connor-Smith",
    email: "jose.maria@test-domain.co.uk",
    message: "Testing special chars: äöüßñç @#$%^&*()_+-=[]{}|;':\",./<>?"
  },
  
  longContent: {
    name: "A".repeat(100),
    email: "very.long.email.address.for.testing@very-long-domain-name-for-testing.com",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(20)
  },
  
  searchTerms: [
    "test",
    "automation", 
    "qa",
    "selenium",
    "playwright"
  ]
};

export default testData;
