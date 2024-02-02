const express = require('express');
const router = express.Router();
// const Joi = require('joi');
const Joi = require('joi')

const boardListController = require('../../controller/BoardListController');

const boardListValidationSchema = Joi.object({
  title: Joi.string().required(),
  position: Joi.number(),
  boardId: Joi.string().required()
});


const validateBoardListData = (req,res,next) =>{
  const{error,value} = boardListValidationSchema.validate(req.body, {abortEarly: false});
  console.log(error)
  if (error) {
  const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors: errorMessages });
  }
  req.body = value;
  next();
};

// // Định nghĩa API để tạo mới một danh sách trong bảng
router.post('/:boardId/lists', validateBoardListData, boardListController.create);
router.put('/:boardId/lists/:listId', validateBoardListData, boardListController.update);
router.delete('/:boardId/lists/:listId', validateBoardListData, boardListController.delete);
router.get('/:boardId/lists', validateBoardListData, boardListController.getAll);

module.exports = router;