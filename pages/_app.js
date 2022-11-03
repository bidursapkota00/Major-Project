import Container from '../layout';
import 'antd/dist/antd.css';
import '../styles/globals.css';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return router.pathname == '/login' ? (
    <Component {...pageProps} />
  ) : (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
