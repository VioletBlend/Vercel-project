// ファイル: api/tweet.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const tweetUrl = encodeURIComponent('https://x.com/Malubatu2024/status/1880382341371301908');
  const apiUrl = `https://publish.twitter.com/oembed?url=${tweetUrl}&omit_script=true&align=center&hide_thread=true`;

  try {
    const response = await fetch(apiUrl);
    const json = await response.json();

    // HTMLを返す
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(`
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8">
        <title>埋め込みツイート</title>
      </head>
      <body>
        ${json.html}
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
      </body>
      </html>
    `);
  } catch (error) {
    res.status(500).send('ツイートの取得に失敗しました');
  }
};
