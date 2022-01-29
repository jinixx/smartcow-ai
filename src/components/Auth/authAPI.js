function login(user, pass) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      if (user === pass) {
        return resolve({
          data: {
            id: 123,
            avatar: './avatars/123.png',
            token: 'dummytokenstring'
          }
        })
      }
      return reject('Invalid username or password');
    }, 500)
  );
}

function logout(token) {
  return new Promise((resolve) =>
    setTimeout(() => {
      return resolve({
        data: {
          id: 123,
        }
      })
    }, 500)
  );
}

export const authAPI = {
  login,
  logout
}