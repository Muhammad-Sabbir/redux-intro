import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withDraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      // to receive more than one argument we added prepare() , that is why this is different than others

      // there is another way to make it possible , we can pass the data as an object write in requestLoadn(), when well call it then.
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose }, // if we have more than two arguments then we have to add all the other argument in this payload
        };
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
  },
});

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;
