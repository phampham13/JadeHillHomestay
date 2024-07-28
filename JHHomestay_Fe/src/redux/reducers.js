const authState = {
  email: "",
  role: "",
  token: "",
  userId: "",
  //expDate: "",
};


const homestayState = [];

export const authReducer = (state = authState, action) => {
  switch (action.type) {
    case "LOGIN":
      const { email, userId, token, role } = action.payload;
      // add expire handle here

      localStorage.setItem(
        "authData",
        JSON.stringify({
          role: role,
          email: email,
          userId: userId,
          token: token,
        })
      );
      return {
        ...authState,
        role,
        userId,
        token,
        email,
      };

    case "LOGOUT":
      localStorage.removeItem("authData");
      return {
        ...authState,
        role: "",
        userId: "",
        token: "",
        email: "",
      };
    default:
      return state;
  }
};

export const homestayReducer = (state = homestayState, action) => {
  switch (action.type) {
    case "SET":
      const { homestays } = action.payload;
      localStorage.setItem("homestayData", JSON.stringify(homestays));
      return homestays;

    case "RESET":
      localStorage.removeItem("homestayData");
      return homestayState;

    default:
      return state;
  }
};
