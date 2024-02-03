const User = require("../models/User");

class UserService{

    checkUserData = async(username, password)=>{
      try {
        const user = await User.findOne({ username, password });
        return user;
      } catch (error) {
        throw new Error('Tài khoản không tồn tại. Vui lòng đăng kí tài khoản !')
    }
  }
    create = async (dataUser) =>{
        try {
            //Goi den tang model
            const user = new User(dataUser);
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    }
    update = async (id,data) =>{
        try {
            //Goi den tang model
            const result = await User.updateOne({_id:id},{username: data.username});
            return true
        } catch (error) {
            throw error;
        }
    }

    detele = async (id) =>{
        try {
            //Goi den tang model
            const user = await User.findById(id);
            console.log(user)
            await user.deleteOne();    
            return true
        } catch (error) {
            throw error;
        }
    }

    getAll = async() =>{
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw error;
        }
    } 

}
module.exports  = new UserService();