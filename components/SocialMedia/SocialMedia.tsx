import styles from './SocialMedia.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'

export const SocialMedia = () => {
  return (
    <>
      <ul className={styles.container}>
        <li>
          <a
            className={styles.instagram}
            href="https://www.instagram.com/alttreble/"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </li>
        <li>
          <a
            className={styles.facebook}
            href="https://www.facebook.com/airfitbg"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </li>
        <li>
          <a className={styles.youtube} href="">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </li>
      </ul>
    </>
  )
}
