import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import logo from "../Images/logo2.png";
import { Link } from "react-router-dom";
import { m } from "framer-motion";
import LanguageSwitcher from "./LanguageSwitcher";

const nestedMenuItems = [
  {
    title: "About Us",
    link: "/about-us",
  },
  {
    title: "Our Partners",
    link: "/our-partner",
  },
  {
    title: "Pricing",
    link: "/pricing",
  },
  {
    title: "Our Team",
    link: "/our-team",
  },
  {
    title: "Gallery",
    link: "/gallery",
  },
];

function NavListMenu({ handleData2 }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openNestedMenu, setopenNestedMenu] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = nestedMenuItems.map(({ title, link }, key) => (
    <Link href={link} key={key}>
      <MenuItem>{title}</MenuItem>
    </Link>
  ));
  const [state, setState] = useState(null);
  const handleCancel = (value) => {
    setState(value);
    if (handleData2) {
      handleData2(value);
    }
  };

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-0 pr-4 font-semibold text-gray-900 text-lg"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              About
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden lg:block mt-2 about_us_hover">
          <div className="rounded-md hover:text-white hover:bg-black">
            <Link to="/about-us">
              {" "}
              <MenuItem>About Us</MenuItem>
            </Link>
          </div>
          <div className="rounded-md hover:text-white hover:bg-black">
          <Link to="/our-partner">
            <MenuItem>Our Partners</MenuItem>
          </Link>
          </div>
          <div className="rounded-md hover:text-white hover:bg-black">
          <Link to="/pricing">
            <MenuItem>Pricing</MenuItem>
          </Link>
          </div> <div className="rounded-md hover:text-white hover:bg-black">
          <Link to="/our-team">
            <MenuItem>Our Team</MenuItem>
          </Link>
          </div> <div className="rounded-md hover:text-white hover:bg-black">
          <Link to="/gallery">
            <MenuItem>Gallery</MenuItem>
          </Link>
          </div>
        </MenuList>
      </Menu>
      <div className="block relative z-50 lg:hidden">
        <Collapse open={isMobileMenuOpen}>
          <Menu
            placement="bottom"
            allowHover
            offset={6}
            open={openNestedMenu}
            handler={setopenNestedMenu}
          >
            <MenuHandler className="flex items-center justify-between ">
              <Link to="/about-us">
                <MenuItem onClick={() => handleCancel(false)}>
                  About Us
                </MenuItem>
              </Link>
            </MenuHandler>
          </Menu>

          <Link to="/our-partner">
            <MenuItem onClick={() => handleCancel(false)}>
              Our Partners
            </MenuItem>
          </Link>
          <Link to="/pricing">
            <MenuItem onClick={() => handleCancel(false)}>Pricing</MenuItem>
          </Link>
          <Link to="/our-team">
            <MenuItem onClick={() => handleCancel(false)}>Our Team</MenuItem>
          </Link>
          <Link to="/gallery">
            <MenuItem onClick={() => handleCancel(false)}>Gallery</MenuItem>
          </Link>
        </Collapse>
      </div>
    </React.Fragment>
  );
}
function NavListMenu2({ handleData2 }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [openNestedMenu, setopenNestedMenu] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = nestedMenuItems.map(({ title }, key) => (
    <a href="#" key={key}>
      <MenuItem>{title}</MenuItem>
    </a>
  ));
  const [state, setState] = useState(null);
  const handleCancel = (value) => {
    setState(value);
    if (handleData2) {
      handleData2(value);
    }
  };

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-0 pr-4  text-gray-900 font-bold text-lg"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Contact
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden lg:block mt-2">
        <div className="rounded-md hover:text-white hover:bg-black">
          <Link to="/contact">
            <MenuItem>Contact Us</MenuItem>
          </Link>
          </div> <div className="rounded-md hover:text-white hover:bg-black">
          <Link to="/faq">
            <MenuItem>FAQs</MenuItem>
          </Link>
          </div> <div className="rounded-md hover:text-white hover:bg-black">
          <Link to="/privacy-policy">
            <MenuItem>Privacy Policy</MenuItem>
          </Link></div> <div className="rounded-md hover:text-white hover:bg-black">
          <Link to="/term-of-use">
            <MenuItem>Terms of Use</MenuItem>
          </Link></div> <div className="rounded-md hover:text-white hover:bg-black">
          <Link to="/term-of-services">
            <MenuItem>Term Of Service</MenuItem>
          </Link></div>
        </MenuList>
      </Menu>
      <div id="mobile_menu" className="block relative z-50 lg:hidden">
        <Collapse open={isMobileMenuOpen}>
          <Menu
            placement="bottom"
            allowHover
            offset={6}
            open={openNestedMenu}
            handler={setopenNestedMenu}
          >
            <MenuHandler className="flex items-center justify-between ">
              <Link to="/contact">
                <MenuItem onClick={() => handleCancel(false)}>
                  Contact Us
                </MenuItem>
              </Link>
            </MenuHandler>
          </Menu>

          <Link to="/faq">
            <MenuItem onClick={() => handleCancel(false)}>FAQs</MenuItem>
          </Link>
          <Link to="/privacy-policy">
            <MenuItem onClick={() => handleCancel(false)}>
              {" "}
              Privacy Policy
            </MenuItem>
          </Link>
          <Link to="/term-of-use">
            <MenuItem onClick={() => handleCancel(false)}>
              Terms of Use
            </MenuItem>
          </Link>
          <Link to="/term-of-services">
            <MenuItem onClick={() => handleCancel(false)}>
              Term Of Service
            </MenuItem>
          </Link>
        </Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList({ handleData }) {
  const [state, setState] = useState(null);
  const handleCancel = (value) => {
    setState(value);
    if (handleData) {
      handleData(value);
    }
  };
  const handleNavCancel = (value) => {
    handleData(value);
  };
  return (
    <List className="mb-0 mt-0 p-0 lg:mb-0 lg:mt-0 lg:flex-row lg:p-1 text-gray-900 ">
      <Link to="/">
        <Typography
          as="a"
          variant="small"
          color="blue-gray"
          className="font-medium"
        >
          <ListItem className="flex items-center gap-2 py-0 pr-4 font-semibold text-lg">
            Home
          </ListItem>
        </Typography>
      </Link>

      <NavListMenu handleData2={handleNavCancel} />

      <Link to="/how-it-works">
        <Typography
          as="a"
          href="/"
          variant="small"
          color="blue-gray"
          className="font-medium"
        >
          <ListItem
            className="flex items-center gap-2 py-0 pr-4 font-semibold text-lg"
            onClick={() => handleCancel(false)}
          >
            How It Works
          </ListItem>
        </Typography>
      </Link>
      <Link to="/blogs">
        <Typography
          as="a"
          variant="small"
          color="blue-gray"
          className="font-medium"
        >
          <ListItem
            className="flex items-center gap-2 py-0 pr-4 font-semibold text-lg"
            onClick={() => handleCancel(false)}
          >
            Blogs
          </ListItem>
        </Typography>
      </Link>

      <NavListMenu2 handleData2={handleNavCancel} />
    </List>
  );
}

export function NavbarMain() {
  const [openNav, setOpenNav] = React.useState(false);

  const handleNavCancel = (value) => {
    setOpenNav(value);
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  let token = sessionStorage.getItem("token");
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <Navbar className="px-0 sm:px-2 py-4" id="navbar_main_sticky">
      <div className="flex items-center justify-between text-blue-gray-900 relative sm:px-5 ">
        <Link to="/" onClick={() => setOpenNav(false)}>
          <img
            src={logo}
            alt="logo"
            className="w-[8rem] translate-y-[-1rem] top-0 fixed"
          ></img>
        </Link>

        <div className="hidden lg:block">
          <NavList />
        </div>
        {token ? (
          <div className="hidden gap-2 lg:flex items-center">
            <LanguageSwitcher/>

            <Button
              variant="outlined"
              size="sm"
              className="w-[8rem] bg-black text-white font-semibold"
              onClick={handleLogout}
            >
              Logout{" "}
            </Button>
          </div>
        ) : (
          <>
            <div className="hidden gap-2 lg:flex items-center">
            <LanguageSwitcher/>

              <Link to="/signup">
                <Button
                  variant="outlined"
                  size="sm"
                  className="w-[8rem] bg-black text-white font-semibold"
                >
                  Sign Up{" "}
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outlined"
                  size="sm"
                  className="w-[8rem] bg-black text-white font-semibold"
                >
                  Log In
                </Button>
              </Link>
            </div>
          </>
        )}
        <IconButton
          variant="text"
          className="lg:hidden w-10 h-10 flex justify-center items-center"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="pt-3">
          <NavList handleData={handleNavCancel} />
        </div>
        {token ? (
          <div className="flex flex-col justify-start items-center gap-2 lg:hidden ">
            <LanguageSwitcher/>

            <Button
              variant="outlined"
              size="sm"
              className="text-gray-900"
              onClick={handleLogout}
            >
              Logout{" "}
            </Button>
          </div>
        ) : (
          <div className="flex flex-col w-full pl-4 items-start gap-2 lg:hidden text-gray-900">
            <LanguageSwitcher/>
            <div className="flex items-center gap-2">
            <Link to="/signup">
              {" "}
              <Button
                variant="outlined"
                size="sm"
                fullWidth
                className="text-gray-900"
                onClick={() => setOpenNav(!openNav)}
              >
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outlined"
                size="sm"
                fullWidth
                onClick={() => setOpenNav(!openNav)}
              >
                Log In
              </Button>
            </Link>
            </div>
            
          </div>
        )}
        
      </Collapse>

      
    </Navbar>
  );
}
