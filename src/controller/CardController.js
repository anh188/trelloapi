const CardService = require('../services/CardService')
const path = require('path')
const uploadCover = require('../middlewares/upload')
class CardController {
  static async createCard(req, res, next) {
    try {
      const { title, description, members, dueDate, cover, attachments,listId } = req.body;
      // const listId = req.params.listId;

      const data = {
        title,
        description,
        members,
        dueDate,
        cover: req.files['cover'] ? req.files['cover'][0].path : null,
        attachments: req.files['attachments'] ? req.files['attachments'].map(file => file.path) : [],
        listId,
      };

      const card = await CardService.createCard(data);

      res.status(201).json({ card });
    } catch (error) {
      next(error);
    }
  }

  static async updateCard (req, res, next) {
    try {
      const { title, description, members, dueDate, cover, attachments } = req.body;
      const { cardId } = req.params;

      const data = {
        title,
        description,
        members,
        dueDate,
        cover: req.files['cover'] ? req.files['cover'][0].path : null,
        attachments: req.files['attachments'] ? req.files['attachments'].map(file => file.path) : [],
      };

      const updatedCard = await CardService.updateCard(cardId, data);

      res.status(200).json({ card: updatedCard });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCard (req, res, next) {
    try{
      const {cardId} = req.params;
      const result = await CardService.deleteCard(cardId);
      if (result) {
        res.status(200).json({ msg: 'Card deleted' });
      } else {
        throw new Error('Card deletion failed');
      }
    } catch (error) {
      next(error);
    }
  }

  static async getCard(req, res, next){
    try {
      const { listId } = req.params;
      const cards = await CardService.getCard(listId);
  
      res.status(200).json({ cards });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CardController;