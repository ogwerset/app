const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Emoji translator function
function createEmojiTranslator(vocabulary) {
  if (!vocabulary) {
    throw new Error('Please make sure to provide a valid object vocabulary');
  }

  const keys = Object.keys(vocabulary);

  if (!keys.length) {
    throw new Error('Your emoji vocabulary seems to be empty');
  }

  const regex = new RegExp(`${keys.join('|')}`, 'g');

  return function translate(string) {
    return string.replace(regex, match => vocabulary[match]);
  };
}

// Polish-specific vocabulary map (you can customize this)
const vocabulary = {
  // Add Polish word to emoji mappings here
  'jabłko': '\uD83C\uDF4F',
  'cytryna': '\uD83C\uDF4B',
  'banan': '\uD83C\uDF4C'
};
const translate = createEmojiTranslator(vocabulary);

// Endpoint to generate emoji pasta
app.post('/generate-emoji', (req, res) => {
  const text = req.body.text;
  const words = text.split(' ');
  const emojiPasta = words.map(word => translate(word) || word).join(' ');
  res.json({ emojiPasta });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello, @ogwerset!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});