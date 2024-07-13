export function getSavedArticles() {
  return new Promise((resolve, reject) => {
    resolve([
      {
        id: '65f7368dfb74bd6a92114c85',
        author: 'Lauren Forristal',
        title:
          "Bye-bye bots: Altera's game-playing AI agents get backing from Eric Schmidt | TechCrunch",
        description:
          'Autonomous, AI-based players are coming to a gaming experience near you, and a new startup, Altera, is joining the fray to build this new guard of AI Research company Altera raised $9 million to build AI agents that can play video games alongside other player…',
        url: 'https://techcrunch.com/2024/05/08/bye-bye-bots-alteras-game-playing-ai-agents-get-backing-from-eric-schmidt/',
        urlToImage:
          'https://techcrunch.com/wp-content/uploads/2024/05/Minecraft-keyart.jpg?resize=1200,720',
        publishedAt: '2024-05-08T15:14:57Z',
        content:
          'Autonomous, AI-based players are coming to a gaming experience near you, and a new startup, Altera, is joining the fray to build this new guard of AI agents.\r\nThe company announced Wednesday that it … [+6416 chars]',
        keyword: 'Tech',
      },
      {
        id: '65f7368dfb74bd6a92114c85',
        author: 'Alex Wilhelm',
        title: 'Watch: When did iPads get as expensive as MacBooks?',
        description:
          'Would you switch out your MacBook for an iPad with an M4 chip and OLED display? With the increase in price, Apple seems to be arguing these are comparable but we’re curious to see if consumers will make the change.',
        url: 'https://techcrunch.com/2024/05/08/techcrunch-minute-when-did-ipads-get-as-expensive-as-macbooks/',
        urlToImage:
          'https://techcrunch.com/wp-content/uploads/2024/05/ipad-noplay.png?resize=1200,675',
        publishedAt: '2024-05-08T14:52:26Z',
        content:
          'Apple’s iPad event had a lot to like. New iPads with new chips and new sizes, a new Apple Pencil, and even some software updates. If you are a big fan of Apple hardware, well, it was probably a good … [+1385 chars]',
        keyword: 'Tech',
      },
      {
        id: '65f7368dfb74bd6a92114c85',
        author: 'Rebecca Bellan',
        title:
          'Uber promises member exclusives as Uber One passes $1B run-rate | TechCrunch',
        description:
          'Uber plans to deliver more perks to Uber One members, like member-exclusive events, in a bid to gain more revenue through subscriptions.  “You will see',
        url: 'https://techcrunch.com/2024/05/08/uber-promises-member-exclusives-as-uber-one-passes-1b-run-rate/',
        urlToImage:
          'https://techcrunch.com/wp-content/uploads/2023/05/GettyImages-1142304853-a.jpg?resize=1200,675',
        publishedAt: '2024-05-08T14:41:36Z',
        content:
          'Uber plans to deliver more perks to Uber One members, like member-exclusive events, in a bid to gain more revenue through subscriptions. \r\nYou will see more member-exclusives coming up where members … [+4676 chars]',
        keyword: 'Tech',
      },
    ]);
  });
}

export function addSavedArticle(newsData, keyword) {
  return new Promise((resolve, reject) => {
    resolve({
      id: '65f7371e7bce9e7d331b11a0',
      title: newsData.title,
      text: newsData.description,
      date: newsData.publishedAt,
      source: newsData.source,
      link: newsData.url,
      image: newsData.urlToImage,
      keyword: keyword,
    });
  });
}

export const removeSavedArticle = () => {
  return new Promise((resolve, reject) => {
    const response = {
      ok: true,
      status: 200,
      statusText: 'OK',
    };
    resolve(response);
  });
};
