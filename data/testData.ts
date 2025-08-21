export const testData = {
  validUsers: [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      message: "This is a test message for contact form validation."
    },
    {
      name: "María García",
      email: "maria.garcia@ejemplo.com", 
      message: "Mensaje de prueba con caracteres especiales: áéíóú ñ ü"
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
    name: "José María O'Connor-Smith",
    email: "jose.maria@test-domain.co.uk",
    message: "Testing: äöüßñç @#$%^&*()_+-=[]{}|;':\",./<>?¡¿"
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
