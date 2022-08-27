import Link from "next/link";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyle from "../../styles/utils.module.css";

// getStaticPropsで静的に生成されるパスのリストを定義する
export async function getStaticPaths() {
  const paths = getAllPostIds(); //pathがオブジェクトとして用意されている
  return {
    paths,
    fallback: false,
  };
}

// params = getStaticPaths()で遷移したパス
export async function getStaticProps({ params }) {
  // 取得したデータ
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <h1 className={utilStyle.headlineX1}>{postData.title}</h1>
      <div className={utilStyle.lightText}> {postData.date} </div>
      <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
      <Link href="/">←ホームへ戻る</Link>
    </Layout>
  );
}
