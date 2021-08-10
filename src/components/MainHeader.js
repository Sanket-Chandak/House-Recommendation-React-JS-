import {NavLink} from 'react-router-dom';
import styles from './MainHeader.module.css';

const MainHeader = () => {
    return <header className={styles.header}>
        <nav>
            <ul>
                <li>
                    <NavLink to='/home' activeClassName={styles.active}>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/about' activeClassName={styles.active}>About</NavLink>
                </li>
                <li>
                    <NavLink to='/map' activeClassName={styles.active}>City</NavLink>
                </li>
            </ul>
        </nav>
    </header>
}

export default MainHeader;