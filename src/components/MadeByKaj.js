import React from 'react'
import styles from './MadeByKaj.module.css';

const MadeByKaj = () => {
    return (
        <>
            <footer className={styles.love}>
                <div>Made with ❤️ by <a href="https://github.com/kws">Kaj</a></div>
            </footer>
            <span className={styles.forkongithub}>
                <a href="https://github.com/kws/whatsnext">Fork me on GitHub</a>
            </span>
        </>

    )
}

export default MadeByKaj;