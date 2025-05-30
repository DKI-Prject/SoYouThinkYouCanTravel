const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const AnswerSchema = new mongoose.Schema({
  text: String,
  photoUrl: String,
  isCorrect: Boolean,
});

const QuestionSchema = new mongoose.Schema({
  category: String,
  questionText: String,
  answers: [AnswerSchema],
});

const CategorySchema = new mongoose.Schema({
  name: String,
});

const Question = mongoose.model('Question', QuestionSchema);
const Category = mongoose.model('Category', CategorySchema);


app.get('/categories', async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

app.get('/questions/:category', async (req, res) => {
  const questions = await Question.find({ category: req.params.category });
  res.json(questions);
});

app.post('/addQuestion', async (req, res) => {
  const q = new Question(req.body);
  await q.save();
  res.json({ message: 'Question added' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));