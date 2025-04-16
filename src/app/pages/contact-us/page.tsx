"use client";
import { Mail, Phone, Clock, MapPin } from "lucide-react";

export default function ContactUS() {
  return (
    <div className="px-6 py-10 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
        <p className="text-gray-600 mb-8">
          We'd love to hear from you! Reach out to us through the details below and we'll respond as soon as possible.
        </p>

        <div className="text-left space-y-6">
          <div className="flex items-start gap-3">
            <Mail className="text-blue-600 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Email</h2>
              <p className="text-gray-700">support@example.com</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="text-green-600 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Phone</h2>
              <p className="text-gray-700">+91 12345 12345</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="text-red-500 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Address</h2>
              <p className="text-gray-700">
                4th Floor, Business Park,<br />
                Sector 62, Noida, UP – 201301
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="text-yellow-500 mt-1" />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Working Hours</h2>
              <p className="text-gray-700">Mon – Fri: 10:00 AM – 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}