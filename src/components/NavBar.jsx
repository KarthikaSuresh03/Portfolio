import { Link } from 'react-scroll';

function NavBar({ onContactClick }) {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 p-6">
      <ul className="flex justify-end gap-16 text-lg font-medium pr-10">
        <li>
          <Link to="about" smooth={true} duration={500} className="cursor-pointer">
            About
          </Link>
        </li>
        <li>
          <Link to="works" smooth={true} duration={500} className="cursor-pointer">
            Works
          </Link>
        </li>
        <li>
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="cursor-pointer"
            onClick={onContactClick}  // <--- open modal on click
          >
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
