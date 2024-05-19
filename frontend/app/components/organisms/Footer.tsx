'use client';

import React from 'react';
import Link from 'next/link';
import './Footer.css';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { CiFacebook, CiLinkedin, CiTwitter } from 'react-icons/ci';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-section">
          <h4>Encontre seu veículo</h4>
          <ul>
            <li><Link href="/encontre-seu-veiculo">Encontre seu veículo</Link></li>
            <li><Link href="/lojas">Lojas</Link></li>
            <li><Link href="/promocoes">Promoções</Link></li>
            <li><Link href="/vantagens">Vantagens</Link></li>
            <li><Link href="/garantia-mais">Garantia Mais</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>A Empresa</h4>
          <ul>
            <li><Link href="/sobre">Sobre</Link></li>
            <li><Link href="/delivery">Delivery</Link></li>
            <li><Link href="/aviso-de-privacidade">Aviso de Privacidade</Link></li>
            <li><Link href="/blog-seminovos">Blog Seminovos</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Atendimento</h4>
          <ul>
            <li><Link href="/perguntas-frequentes">Perguntas Frequentes</Link></li>
            <li><Link href="/fale-conosco">Fale Conosco</Link></li>
            <li><Link href="/pos-vendas">Pós-vendas</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Lojistas</h4>
          <ul>
            <li><Link href="/acesse-seminovos-atacado">Acesse Seminovos Atacado</Link></li>
          </ul>
        </div>
        <div className="footer-section footer-contact">
          <h4>Atendimento ao cliente</h4>
          <div className="contact-button-group">
            <Link href="tel:0800000000" className="contact-button purple-button">0800 000 000</Link>
            <Link href="https://wa.me/phone_number" className="contact-button green-button"><FaWhatsapp /></Link>
          </div>
        </div>
        <div className="footer-section footer-social">
          <h4>Siga a gente</h4>
          <div className="social-icons">
            <Link href="https://facebook.com" className="social-icon"><CiFacebook /></Link>
            <Link href="https://instagram.com" className="social-icon"><FaInstagram /></Link>
            <Link href="https://twitter.com" className="social-icon"><CiTwitter /></Link>
            <Link href="https://linkedin.com" className="social-icon"><CiLinkedin /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
