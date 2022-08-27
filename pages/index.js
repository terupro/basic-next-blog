import Link from "next/link";
import Layout from "../components/Layout";
import utilStyle from "../styles/utils.module.css";
import styles from "../styles/Home.module.css";
import { getPostsData } from "../lib/post";

// SSGの場合 (ビルド時にデータを取得する)
export async function getStaticProps() {
  const allPostsData = getPostsData(); // id, title, date, thumbnail
  return {
    props: {
      allPostsData,
    },
  };
}

// SSRの場合 (クライアントからのアクセス時にデータを取得する)
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // コンポーネントに渡すためのprops
//     },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <section className={utilStyle.headingMd}>
        <p>
          私はフロントエンドエンジニアです。React/Next.js/TypeScriptを学んでいます。
        </p>
      </section>
      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`}>
                <a className={utilStyle.boldText}>{title}</a>
              </Link>
              <br />
              <small className={utilStyle.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
