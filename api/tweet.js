// api/tweet.js

const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const tweetUrl = req.query.url;
  if (!tweetUrl) {
    return res.status(400).send('Missing tweet URL');
  }

  try {
    const apiUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(tweetUrl)}&omit_script=true&align=center&hide_thread=true`;
    const response = await fetch(apiUrl);
    const json = await response.json();

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ html: json.html });
  } catch (err) {
    res.status(500).send('Failed to fetch tweet');
  }
};
