import { model, Schema } from "mongoose";
import bcryptjs from "bcryptjs";
import config from "../../config";
import { TUser, userModel } from "./auth.interfase";
import { user_role } from "./auth.constant";


const UserSchema = new Schema<TUser, userModel>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        role: { type: String, required: true, enum: Object.keys(user_role) },
        password: {
          type: String,
          required: true,
          select: 0,
        },
        phone: { type: String, required: true },
        address: { type: String, required: true },
      },
      { timestamps: true }   
);

UserSchema.pre("save", async function (next) {
    const user = this;
    user.password = await bcryptjs.hash(
      user.password,
      Number(config.bcrypt_salt_round)
    );
    next();
});

UserSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});

UserSchema.statics.isUserExistsByCustomId = async function (email: string) {
  return await User.findOne({ email }).select("+password");
};

UserSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashTextPassword
) {
  return await bcryptjs.compare(plainTextPassword, hashTextPassword);
};

export const User = model<TUser, userModel>("User", UserSchema);