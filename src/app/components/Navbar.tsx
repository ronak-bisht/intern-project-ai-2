// components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        {/* Left side - Logo or Title */}
        <div className="text-white font-bold text-xl">
          Internship
        </div>

        {/* Right side - Links */}
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/admin" className="text-gray-300 hover:text-white">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
