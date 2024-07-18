// Mock server
export const checkToken = () => {
  return new Promise((resolve, reject) => {
    resolve({
      data: { name: 'fake user', email: 'test@example.com', id: 'fake ID' },
    });
  });
};

export const authorize = () => {
  return new Promise((resolve, reject) => {
   if (email === 'test@example.com' && password === 'password') {
       resolve({ token: 'fake token' });
       
   } else {
       reject(new Error('Invalid email or password'));
   }
  });
};

export const register = () => {
  return new Promise((resolve, reject) => {
    resolve({
      data: { name: 'fake user', email: 'test@example.com', id: 'fake ID' },
    });
  });
};
