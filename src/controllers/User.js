const bcrypt = require('bcrypt');
const createUser = require('../helpers/createUser');
const jwt = require('jsonwebtoken');
const user = require('../models/User');
class User {
  /***
   * @param {object} req
   * @param {object} res
   * @return {object} response data
   * @memberof User class
   */
  static async signUp(req, res) {
    try {
      // your code here
      const { password } = req.body;
      const hashpassword = bcrypt.hashSync(password, 10);

      const addUser = await user.create({
        ...req.body,
        password: hashpassword,
      });
      const { username, email } = addUser;
      const token = jwt.sign(
        {
          data: {
            username,
            email,
          },
        },
        process.env.secret,
        { expiresIn: '7d' }
      );
      return res.status(200).send({
        message: 'sign up successfully',
        data: createUser(addUser),
        token,
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({ message: 'email already exists', error });
      }
      return res.status(400).json({ message: 'an error occurred', error });
    }
  }
  // Add more static async methods
  /***
   * @param {object} req
   * @param {object} res
   * @return {object} response data
   * @memberof User class
   */
  static async login(req, res) {
    try {
      const { password, email } = req.body;
      const registeredUser = await user.findOne({ email });

      if (registeredUser) {
        const isPasswordValid = bcrypt.compareSync(
          password,
          registeredUser.password
        );

        if (isPasswordValid) {
          const { username, email } = registeredUser;
          const token = jwt.sign(
            {
              data: {
                username,
                email,
              },
            },
            process.env.secret,
            {
              expiresIn: '7d',
            }
          );

          return res.status(200).json({
            message: 'successfully signedIn',
            data: createUser(registeredUser),
            token,
          });
        }

        return res.status(400).json({ message: 'incorrect email or password' });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: 'an error occurred', error });
    }
  }
}
module.exports = User;
