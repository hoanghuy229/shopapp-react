import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserResponse } from "../../responses/UserResponse";
import { OverlayTrigger, Popover } from 'react-bootstrap';
import styles from '../css/Header.module.css'; // Import file CSS vào đây

export function Header() {
    const userResponseJson = localStorage.getItem("user");
    const userResponse: UserResponse | null = userResponseJson ? JSON.parse(userResponseJson) : null;

    const [showPopover, setShowPopover] = useState(false);

    const togglePopover = () => setShowPopover(!showPopover);

    const handleLogOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setShowPopover(false);
    }

    return (
        <header className={styles.header}> {/* Áp dụng class CSS từ file CSS */}
            <nav className={`navbar navbar-expand-lg navbar-light ${styles.navbar}`}> {/* Áp dụng class CSS từ file CSS */}
                <div className="container">
                    <a className={styles.navbarBrand} href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50">
                            <circle cx="50" cy="50" r="45" fill="rgb(240, 101, 197)" />
                            <circle cx="50" cy="50" r="35" fill="rgb(127, 68, 255)" />
                        </svg>
                    </a>
                    <button className={`navbar-toggler ${styles.navbarToggler}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${styles.navbarCollapse}`} id="navbarNav">
                        <ul className={`navbar-nav ${styles.navbarNav}`}>
                            <li className="nav-item">
                                <Link className={`nav-link ${styles.navLink}`} to="/">Trang chủ</Link>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${styles.navLink}`} href="#">Thông báo</a>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${styles.navLink}`} to="/cart">
                                    <i className="fas fa-shopping-cart icon"></i>
                                    Giỏ hàng
                                </Link>
                            </li>

                            {userResponse ?
                                (
                                    <li className="nav-item">
                                        <OverlayTrigger
                                            trigger="click"
                                            placement="bottom"
                                            show={showPopover}
                                            onToggle={togglePopover}
                                            overlay={
                                                <Popover id="user-popover">
                                                    <Popover.Body>
                                                        <ul className={styles.userMenu}>
                                                            <li>
                                                                <Link to="/profile" className={styles.menuItem}>Profile</Link>
                                                            </li>
                                                            <li>
                                                                <Link to="/orderHistory" className={styles.menuItem}>Order History</Link>
                                                            </li>
                                                            <li>
                                                                <a href="/" onClick={handleLogOut} className={styles.menuItem}>Log Out</a>
                                                            </li>
                                                        </ul>
                                                    </Popover.Body>
                                                </Popover>
                                            }
                                        >
                                            <button className={`nav-link ${styles.userButton}`}>
                                                <i className={`fa-solid fa-user ${styles.userIcon}`}></i>
                                            </button>
                                        </OverlayTrigger>
                                    </li>
                                )
                                :
                                (
                                    <li className="nav-item">
                                        <Link className={`nav-link ${styles.navLink}`} to="/login">Đăng nhập</Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
