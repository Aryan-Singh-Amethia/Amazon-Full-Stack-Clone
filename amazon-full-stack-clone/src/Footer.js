import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {

  const footerSectionTitles = ['Get to Know Us','Make Money with us','Amazon Payment Products'];

  return (
    <div className={styles.footer__background}>
    <div className={styles.footer__links__under}>
        <div className={styles.footer__sublinks}>
            <h2>Get to Know Us</h2>
            <div className={styles.spacer}/>
               <h5>Careers</h5>
               <h5>Newsletters</h5>
               <h5>About Amazon</h5>
        </div>
        <div className={styles.footer__sublinks_v2}>
                <h2>Make Money With Us</h2>
                <div className={styles.spacer}/>
                <h5>Sell Products on Amazon</h5>
                <h5>Supply to Amazon</h5>
        </div>
        <div className={styles.footer__sublinks_v3}>
                <h2>Amazon Payment Products</h2>
                <div className={styles.spacer}/>
                <h5>Amazon Store Card</h5>
                <h5>Amazon Visa</h5>
            </div>
        </div>
        <div className={styles.footer__logos}>
            <div className={styles.footer__logo__container}>
                <img src='/instagram.png'/>
            </div>
            <div className={styles.footer__logo__container}>
                <img src='/facebook.png'/>
            </div>
            <div className={styles.footer__logo__container}>
                <img src='/twitter.png'/>
            </div>
        </div>    
    </div>
  )
}

export default Footer;