const express = require ('express');
const router = express.Router();
const CardController = require('../../controller/CardController')
// const {uploadcardcover,uploadattachments} = require('../../middlewares/upload');
const {uploadcard} = require('../../middlewares/upload');
const Joi = require('joi')
const cardValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  members: Joi.array().items(Joi.string()), // Chú ý kiểu dữ liệu của members, ở đây giả sử là string
  dueDate: Joi.date(),
  cover: Joi.string(), // URL của hình ảnh cover
  attachments: Joi.array().items(Joi.string()), // Mảng các URL của tệp đính kèm
  listId: Joi.string().required(), // Chú ý kiểu dữ liệu của listId, ở đây giả sử là string
});

// Middleware kiểm tra và xác thực dữ liệu
const validateCardData = (req, res, next) => {
    const { error, value } = cardValidationSchema.validate(req.body, {abortEarly: false});
    console.log(error)
    if (error) {
    const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({ errors: errorMessages });
    }

    // Dữ liệu hợp lệ, gán lại vào req.body và chuyển đến middleware tiếp theo hoặc xử lý logic
    req.body = value;
    next();
};

router.post('/', validateCardData, uploadcard.fields([{ name: 'cover' }, { name: 'attachments' }]), CardController.createCard);
router.put('/:cardId', validateCardData, uploadcard.fields([{ name: 'cover' }, { name: 'attachments' }]), CardController.updateCard);
router.delete('/:cardId',CardController.deleteCard)
router.get('/:listId', CardController.getCard)
router.get('/:cardId', CardController.getCardById);
module.exports=router;