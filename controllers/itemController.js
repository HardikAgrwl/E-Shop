import Item from "../models/item.js";

export const get_items = (req, res) => {
  Item.find()
    .sort({ date_added: -1 })
    .then((items) => res.json(items));
};

export const get_single_item = (req, res) => {
  Item.findById({ _id: req.params.id }).then((item) => res.json(item));
};

export const post_item = (req, res) => {
  Item.find().then((items) => res.json(items));
};

export const update_item = (req, res) => {
  Item.findByIdAndUpdate({ _id: req.params.id }, req.body).then((item) => {
    Item.findOne({ _id: req.params.id }).then((item) => {
      res.json(item);
    });
  });
};

export const delete_item = (req, res) => {
  Item.findByIdAndDelete({ _id: req.params.id }).then(function (item) {
    res.json({ success: true });
  });
};
