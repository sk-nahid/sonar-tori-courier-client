export default function Footer({navLinks}) {
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8  text-center">
        
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-2">Sonar Tori</h2>
          <p className="text-sm">
            Delivering trust across Bangladesh.  
            Fast, secure, and affordable courier services since 2025.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
           {navLinks}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <p className="text-sm">Dhaka, Bangladesh</p>
          <p className="text-sm">Email: support@sonartori.com</p>
          <p className="text-sm">Phone: +880 1234 567 890</p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center py-4 border-t border-base-300 text-sm">
        © {new Date().getFullYear()} Sonar Tori. All rights reserved.
      </div>
    </footer>
  );
}
