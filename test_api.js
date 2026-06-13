const axios = require('axios');

axios.post('http://localhost:8082/api/v1/auth/login', {
  email: 'test@test.com',
  password: 'wrong'
}).then(res => {
  console.log("SUCCESS:", res.data);
}).catch(err => {
  console.log("ERROR STATUS:", err.response?.status);
  console.log("ERROR DATA:", err.response?.data);
  console.log("ERROR MESSAGE:", err.message);
});
