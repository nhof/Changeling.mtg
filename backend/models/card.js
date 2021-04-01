const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  artist: {type: string},
  image: {type: String},
  name: {type:string},
  cost: {type: string, required:true},
  manavalue: {type: number},
  color: {type: string},
  colorId: {type: string},
  //Card Type: Planeswalker, Normal, Saga,...
  cardType:{type:[string]},
  Type:{type:[string]},
  supType:{type:[string]},
  subType:{type:[string]},
  setName: {type:string},
  refer: {type: mongoose.Schema.Types.ObjectId, ref:"Card"},
  rules:{type:string},
  flavor: {type: string},
  power: {type:number},
  though: {type:number},
  loyalty: {type: number},
  level:{type:number},
  chapters: {type: number},
  rarity: {type: string},
  date: {type: Date},
  fontsize: {type: number},
  keywords: {type: [mongoose.Schema.Types.name], ref: "Keyword"}
})


module.exports = mongoose.model('Card', cardSchema);

const keyword = mongoose.Schema({
  name: {type: string},
  var: {type: [string]},
  txt: {type: [string]}
})

module.exports = mongoose.model('Keyword', KeywordSchema);
