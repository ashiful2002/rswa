import React from "react";
import { FaFacebook, FaPhone, FaWhatsapp, FaEnvelope } from "react-icons/fa";

const CommitteeSocial = ({ social }) => {
  if (!social) return null;

  // Support array format for backwards compatibility
  if (Array.isArray(social)) {
    return (
      <div className="my-2">
        <div className="flex items-center gap-4 text-xl">
          {social.map(({ id, url, icon: Icon }) => (
            <div key={id}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 transition-colors hover:text-emerald-700 dark:text-emerald-400"
              >
                {Icon && <Icon />}
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Support object format: { phone, whatsapp, facebook, email }
  const { phone, whatsapp, facebook, email } = social;
  if (!phone && !whatsapp && !facebook && !email) return null;

  return (
    <div className="my-2">
      <div className="flex items-center gap-4 text-xl">
        {phone && (
          <a
            href={`tel:${phone.replace(/[\s-]/g, "")}`}
            title={`Call: ${phone}`}
            className="text-emerald-600 transition-transform hover:scale-110 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            <FaPhone />
          </a>
        )}
        {whatsapp && (
          <a
            href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            className="text-emerald-600 transition-transform hover:scale-110 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            <FaWhatsapp />
          </a>
        )}
        {facebook && (
          <a
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook Profile"
            className="text-emerald-600 transition-transform hover:scale-110 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            <FaFacebook />
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            title={`Email: ${email}`}
            className="text-emerald-600 transition-transform hover:scale-110 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            <FaEnvelope />
          </a>
        )}
      </div>
    </div>
  );
};

export default CommitteeSocial;
