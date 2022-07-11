const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  { timestamps: true }
);

// we need to compare the password and confirm password and fail validation
//  if they do not match
// we will get the confirm password in the request body and we need to
//  create a 'virtual space' to hold that value while we compare things
//  but not save them to the database

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate(
      "confirmPassword",
      "Passwords do not match. Please try again."
    );
  }
  // if the passwords match we can successfully continue on to the "normal" validate steps
  next();
});

// we must encrypt the password BEFORE we save to the database to make sure
//  that no one had access to the user's real password

UserSchema.pre("save", function (next) {
  bcrypt
    .hash(this.password, 10)
    .then((hashedPassword) => {
      this.password = hashedPassword;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = mongoose.model("User", UserSchema);
