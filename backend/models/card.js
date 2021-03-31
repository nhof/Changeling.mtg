const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  name: {type:string},
  cc: {type: string, required:true},
  colorId: {type: string},
  //Card Type: Planeswalker, Normal, Saga,...
  cType:{type:[string]},
  nType:{type:[string]},
  supType:{type:[string]},
  subType:{type:[string]},
  setName: {type:string},
  ref: {type: mongoose.Schema.Types.ObjectId, ref:"Card"},
  rules:{type:string},
  flavor: {type: string},
  power: {type:number},
  though: {type:number},
  loyalty: {type: number},
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
