import { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const now = new Date();
        const fromDate = new Date(
          now.getTime() - 3 * 24 * 60 * 60 * 1000
        );

        // Qiita記事
        const qiitaRes = await fetch(
          "https://qiita.com/api/v2/items?per_page=10"
        );
        const qiitaData = await qiitaRes.json();

        const qiitaArticles = qiitaData
          .filter((item: any) => new Date(item.created_at) >= fromDate)
          .map((item: any) => ({
            id: item.id,
            title: item.title,
            summary: item.body.slice(0, 75),
            url: item.url,
            date: item.created_at,
          }));

        // Zenn記事
        //const zennRes = await fetch(
        //  "https://zenn.dev/api/articles?order=latest"
        //);
        //const zennData = await zennRes.json();

        //const zennArticles = zennData.articles
         // .filter((item: any) => new Date(item.published_at) >= fromDate)
         // .map((item: any) => ({
          //  id: "zenn-" + item.id,
         //   title: item.title,
         //   summary: item.body_letters_count + "文字の記事",
         //   url: "https://zenn.dev" + item.path,
         //   date: item.published_at,
        //  }));

        const allArticles = [...qiitaArticles]//, ...zennArticles];

        allArticles.sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setArticles(allArticles);
      } catch (error) {
        console.error("エラー:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cocokara</h1>

      {articles.map((article) => (
        <div
          key={article.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
          <p>
            {article.date
              ? new Date(article.date).toLocaleString()
              : "日付不明"}
          </p>
          <a href={article.url} target="_blank">
            記事を見る
          </a>
        </div>
      ))}
    </div>
  );
}

export default App;