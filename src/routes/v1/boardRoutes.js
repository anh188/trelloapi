const express = require('express');
const router = express.Router();
const boardController = require('../../controller/BoardController')
const boardListRouter = require('../v1/boardListRoutes');
const verifyToken = require('../../middlewares/verifyToken')
const {upload} = require('../../middlewares/upload')
const Joi = require('joi');

const boardValidationSchema = Joi.object({
  title: Joi.string(),
  cover: Joi.string(),
});

const validateBoardData = (req, res, next) => {
  const { error, value } = boardValidationSchema.validate(req.body, {abortEarly: false});
  console.log(error)
  if (error) {
  const errorMessages = error.details.map((detail) => detail.message);
    return res.status(400).json({ errors: errorMessages });
  }

  // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
  req.body = value;
  next();
};

router.post('/' , validateBoardData,verifyToken,upload.single('cover'),  boardController.create);
// router.post('/', boardController.create);
router.get('/', boardController.getAll)
router.put('/:id', upload.single('cover'), boardController.update)
router.delete('/:id',boardController.delete)

module.exports = router;