class User {
  static async signUp(req, res) {
    try {
      // your code here
      return res.status(200).send({
        message: "sign up successfully",
        data: { name: "fullname" },
      });
    } catch (e) {
      //throw error here
    }
  }
  // Add more static async methods
}
module.exports = User;
