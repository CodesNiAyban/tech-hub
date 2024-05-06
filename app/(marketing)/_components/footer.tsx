import { Button } from "@/components/ui/button";
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
    return (
        <div className="fixed bottom-0 w-full p-4 border-t backdrop-blur-sm duration-300 animate-in slide-in-from-bottom-12 bg-background">
            <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between relative">
                <div className="flex items-center space-x-4 font-medium">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="text-xl hover:text-blue-500" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebook className="text-xl hover:text-blue-500" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-xl hover:text-blue-500" />
                    </a>
                </div>
                <div className="absolute hidden xl:flex text-xs inset-y-0 left-1/2 transform -translate-x-1/2 justify-center items-center">
                    &copy; {new Date().getFullYear()} GlobalTek Trajector. All rights reserved.
                </div>
                <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="sm" className="hover:opacity-75 transition">
                        Privacy Policy
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:opacity-75 transition">
                        Terms of Service
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:opacity-75 transition">
                        Contact Us
                    </Button>
                </div>
            </div>
        </div>
    );
}
