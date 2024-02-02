const UserService = require("../services/UserService");

class UserController{

    create = async(req,res,next) =>{
        try {
            const {username, email, phone, age} = req.body;
            //Goi den service
            let data ={
                username, email, phone, age
            }
            const user = await UserService.create(data)
            
            res.status(200).json({
                user
            })
        } catch (error) {
           throw error;
        }
    } 

    getAll= async (req, res, next) =>{
        try{
            //Goi den service
            const users = await UserService.getAll();
            res.status(200).json({
                users
            })
        } catch (error){
            throw error;
        }
    }

    update= async (req, res, next) =>{
        try {
            const {username, email, phone, age} = req.body;
            const{id} = req.params;
            
            //Goi den service
            let data ={
                username, email, phone, age
            }
            const result = await UserService.update(id,data)
            
            if(result){
                res.status(200).json({
                    'msg' : 'Update'
                })
            }else{
                throw new Error('Update fail')
            }
            
        } catch (error) {
           throw error;
        }
    }

    delete = async (req, res, next) =>{
        try {
            const{id} = req.params;
            //Goi den service
            
            const result = await UserService.detele(id);
            
            if(result){
                res.status(200).json({'msg' : 'Deleted'})
            }else{
                throw new Error('Update fail')
            }
            
        } catch (error) {
           throw error;
        }
    }
}

module.exports = new UserController();