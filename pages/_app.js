import Container from '../layout';
import 'antd/dist/antd.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Component {...pageProps} />
    </Container>
  );
}

export default MyApp;
