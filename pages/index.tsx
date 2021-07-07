import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

import { SocialMedia } from '@components/SocialMedia/SocialMedia'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>AirFit - Очаквайте скоро</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <section>
          <h1 className={styles.title}>AIRFIT</h1>
          <p className={styles.subHeading}>Очаквайте скоро</p>
        </section>
        <figure>
          <div className={styles.overlay} />
          <Image
            src="https://images.pexels.com/photos/4753895/pexels-photo-4753895.jpeg?cs=srgb&dl=pexels-cottonbro-4753895.jpg&fm=jpg"
            alt="Banner image"
            width={666}
            height={1000}
          />
        </figure>
      </main>
      <footer className={styles.socialMedia}>
        <SocialMedia />
      </footer>
    </div>
  )
}
