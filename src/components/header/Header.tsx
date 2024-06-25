'use client';
import React, { FormEvent, useState } from 'react';
import styles from './header.module.css';
import { RxDoubleArrowRight } from 'react-icons/rx';
import { FaBars, FaTimes, FaInstagram, FaTwitter, FaFacebook, FaPinterest, FaMoon, FaSun, FaSearch } from 'react-icons/fa';

export default function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLight, setIsLight] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>('');

  const toggleLight = (): void => {
    setIsLight(!isLight);
  };

  const toggle = (): void => {
    setIsOpen(!isOpen);
  };

  const toggleSearch = (): void => {
    setSearch(!search);
    setSearchInput(''); // Clear search input when closing the search bar
  };

  const handleSearchChange = (event: FormEvent<HTMLInputElement>): void => {
    setSearchInput(event.currentTarget.value);
  };

  const clearSearch = (): void => {
    setSearchInput('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.col1}>
        {isOpen ? (
          <FaTimes onClick={toggle} className={styles.icon} />
        ) : (
          <FaBars onClick={toggle} className={styles.icon} />
        )}
        <h3>Kreesta</h3>
      </div>
      <div className={styles.col2}>
        {search && (
          <div className={`${styles.searchBar} ${search ? styles.searchBarVisible : ''}`}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchChange}
            />
            {searchInput && (
              <FaTimes className={styles.clearIcon} onClick={clearSearch} />
            )}
            <FaSearch className={styles.searchIcon} />
          </div>
        )}
        {search && (
        
          <RxDoubleArrowRight
            className={styles.closeSearchIcon}
            onClick={toggleSearch}
          />
        )}
      </div>
      <div className={styles.col3}>
        <div className={styles.search}>
          <FaSearch
            className={styles.searchIcon}
            onClick={toggleSearch}
            style={!search ? { display: 'block' } : { display: 'none' }}
          />
        </div>
        <div className={styles.socials}>
          <FaInstagram className={styles.social} />
          <FaTwitter className={styles.social} />
          <FaFacebook className={styles.social} />
          <FaPinterest className={styles.social} />
        </div>
        <div className={styles.theme} onClick={toggleLight}>
          {isLight ? (
            <FaMoon className={styles.themeIconM} />
          ) : (
            <FaSun className={styles.themeIconS} />
          )}
        </div>
      </div>
    </div>
  );
}
