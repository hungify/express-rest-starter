import UserModel, { UserDocument } from '~/api/v1/models/user.model';
import { User } from '~/interfaces/user.interface';

const userService = {
  async getUsers() {
    const users = [
      {
        email: 'abc@gmail.com',
      },
      {
        email: 'def@gmail.com',
      },
    ];
    return users;
  },

  async getUserByEmail(email: string) {
    const foundUser = await UserModel.findOne({ email });
    return foundUser;
  },
  async saveUser(user: Omit<User, 'role'>): Promise<UserDocument> {
    const newUser = new UserModel(user);
    const savedUser = await newUser.save();
    return savedUser;
  },
};

export default userService;
