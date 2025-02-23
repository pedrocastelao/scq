// src/components/Footer/Footer.jsx
import styled from "styled-components";
import { Mail, Phone } from "lucide-react";

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.footer.background};
  padding: 1rem 0;
  margin-top: 2rem;
  width: 100%;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.footer.text};
  font-size: 0.9rem;
`;

const ContactLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Link = styled.a`
  color: ${({ theme }) => theme.footer.link};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.footer.linkHover};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          © {new Date().getFullYear()} - PC Desenvolvimentos. Todos os direitos
          reservados.
        </Copyright>
        <ContactLinks>
          <Link
            href="https://wa.me/5518988220819"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Phone size={16} />
            (18) 98822-0819
          </Link>
          <Link href="mailto:pedro.castelao@outlook.com.br">
            <Mail size={16} />
            pedro.castelao@outlook.com.br
          </Link>
        </ContactLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
