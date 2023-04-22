const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

app.get('/ogdata', async (req, res) => {
 
    const id = "1234"

    const post = {
        title: "Hello",  
        productExperience: "demo",
        url:"https://us06st2.zoom.us/static/6.3.12506/image/Zoom_Blue_Logo.png"
     }

  try {
    const ogTags = {
        title: post.title,
        description: post.productExperience,
        image: post.url,
        url: `https://www.mybranz.com/posts/${id}`,
        type: "article"
      };

      const metaTags = [];
      for (const [key, value] of Object.entries(ogTags)) {
        metaTags.push(`<meta property="og:${key}" content="${value}" />`);
      }

      const html = `
        <html>
          <head>
            <title>${post.title}</title>
            ${metaTags.join('\n')}
          </head>
          <body>
            <p>${post.productExperience}</p>
            <img src="${post.url}" />
          </body>
        </html>
      `;

      return res.send(html).status(200);
  } catch (error) {
    console.log("error=>",error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is listening on port ${process.env.PORT || 3000}`);
});
