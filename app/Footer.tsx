import React from "react";

function Footer() {
  return (
    <footer className="bg-green-700 text-white py-4">
      <div className="text-center">
        Made with ❤️ for Christmas © {new Date().getFullYear()}
      </div>
    </footer>
  );
}

export default Footer;
