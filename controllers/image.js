const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'f11c025528214a10b06bb7b89f60e0fd'
});

const handleApiCall = (req, res, db) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(error => res.status(400).json('unable to work with api'))
};

const handleImage = (req, res, db) => {
  const {id} = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(error => res.status(400).json('unable to get entries'))
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}