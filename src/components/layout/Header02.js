import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import LogoColor from './partials/LogoColor';

const propTypes = {
  active: PropTypes.bool,
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool,
  meetingLink: PropTypes.bool
}

const defaultProps = {
  active: false,
  navPosition: '',
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false
}

class Header extends React.Component {

  state = {
    isActive: false
  };

  nav = React.createRef();
  hamburger = React.createRef();

  componentDidMount() {
    this.props.active && this.openMenu();
    document.addEventListener('keydown', this.keyPress);
    document.addEventListener('click', this.clickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyPress);
    document.addEventListener('click', this.clickOutside);
    this.closeMenu();
  }

  openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    this.nav.current.style.maxHeight = this.nav.current.scrollHeight + 'px';
    this.setState({ isActive: true });
  }

  closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    this.nav.current && (this.nav.current.style.maxHeight = null);
    this.setState({ isActive: false });
  }

  keyPress = (e) => {
    this.state.isActive && e.keyCode === 27 && this.closeMenu();
  }

  clickOutside = (e) => {
    if (!this.nav.current) return
    if (!this.state.isActive || this.nav.current.contains(e.target) || e.target === this.hamburger.current) return;
    this.closeMenu();
  }

  render() {
    const {
      className,
      active,
      navPosition,
      hideNav,
      hideSignin,
      bottomOuterDivider,
      bottomDivider,
      meetingLink,
      ...props
    } = this.props;

    const classes = classNames(
      'site-header',
      bottomOuterDivider && 'has-bottom-divider',
      className
    );

    return (
      <header
        {...props}
        className={classes}
      >
        <div className="container">
          <div className={
            classNames(
              'site-header-inner',
              bottomDivider && 'has-bottom-divider'
            )}>
            <LogoColor />
            {!hideNav &&
              <React.Fragment>
                <button
                  ref={this.hamburger}
                  className="header-nav-toggle"
                  onClick={this.state.isActive ? this.closeMenu : this.openMenu}
                >
                  <span className="screen-reader">Menu</span>
                  <span className="hamburger">
                    <span className="hamburger-inner"></span>
                  </span>
                </button>
                <nav
                  ref={this.nav}
                  className={
                    classNames(
                      'header-nav',
                      this.state.isActive && 'is-active'
                    )}>
                  <div className="header-nav-inner">
                  <ul className={
                      classNames(
                        'list-reset text-xxs',
                        navPosition && `header-nav-${navPosition}`
                      )}>
                      <li>
                        {!meetingLink && <Link to="/contact/" onClick={this.closeMenu}>Talk to Sales</Link>}
                        {meetingLink && <Link to="/meeting/" onClick={this.closeMenu}>Schedule a Meeting</Link>}
                      </li>
                    </ul>
                  </div>
                </nav>
              </React.Fragment>}
          </div>
        </div>
      </header>
    )
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;