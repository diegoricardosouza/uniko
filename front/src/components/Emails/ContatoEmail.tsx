import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text
} from '@react-email/components';

interface ContatoEmailProps {
  html?: string;
}

export default function ContatoEmail({
  html,
}: ContatoEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Email Contato via site</Preview>
        <Container style={container}>
          <Section style={coverSection}>
            <Section style={imageSection}>
              <Img
                src={`https://unikoimoveis.com.br/wp-content/uploads/2023/03/unikoLogoNova99.png.webp`}
                width="115"
                alt="AWS's Logo"
              />
            </Section>
            <Section style={upperSection}>
              <Text style={mainText} dangerouslySetInnerHTML={{ __html: html! }} />
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#fff',
  color: '#212121',
};

const container = {
  padding: '20px',
  margin: '0 auto',
  backgroundColor: '#eee',
};

const text = {
  color: '#333',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: '14px',
  margin: '24px 0',
};

const imageSection = {
  backgroundColor: '#000',
  display: 'flex',
  padding: '20px 0',
  alignItems: 'center',
  justifyContent: 'center',
};

const coverSection = { backgroundColor: '#fff' };

const upperSection = { padding: '25px 35px' };

const mainText = { ...text, marginBottom: '14px' };
