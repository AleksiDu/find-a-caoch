export default {
  login() {},
  async signup(context, payload) {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDFfwbCIyQPHVi1xOxzI8FajbY8FCUFCWo',
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
};
