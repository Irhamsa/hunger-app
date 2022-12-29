const NavItemHelper = {
  nonActiveAllNavLinkItem() {
    const navItemElements = document.querySelectorAll('.nav__item a.active');
    navItemElements.forEach((navItem) => {
      navItem.classList.remove('active');
    });
  },

  activeNavlinkItem(navItem) {
    navItem.classList.add('active');
  },
};


export default NavItemHelper;
