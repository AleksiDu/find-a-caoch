const linkKey = 'AIzaSyDFfwbCIyQPHVi1xOxzI8FajbY8FCUFCWo';

export default {
  async login(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${linkKey}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      console.log('responseData', responseData);
      const error = new Error(
        responseData.error.message.replace(/_+/g, ' ').toLowerCase() ||
          'Failed to authenticate. Check your login data.'
      );
      throw error;
    }
    console.log(responseData);
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localID,
      tokenExpiration: responseData.expiresIn,
    });
  },
  async signup(context, payload) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${linkKey}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      console.log('responseData', responseData);
      const error = new Error(
        responseData.error.message.replace(/_+/g, ' ').toLowerCase() ||
          'Failed to authenticate. Check your login data.'
      );
      throw error;
    }
    console.log(responseData);
    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localID,
      tokenExpiration: responseData.expiresIn,
    });
  },
  logout(context) {
    context.commit('setUser', {
      userId: null,
      token: null,
      tokenExpiration: null,
    });
  },
};
