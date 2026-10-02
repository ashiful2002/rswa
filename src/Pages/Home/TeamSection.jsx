import React, { useEffect, useState } from "react";
import axios from "axios";
import Section from "../../Components/shared/Section";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { Mail } from "lucide-react";
import { FaFacebook, FaPhoneAlt } from "react-icons/fa";
import { API_ENDPOINTS } from "../../config/api";

const initialTeamMembers = [
  {
    name: "Al Farazi Maruf",
    role: "President",
    bio: "2026-27 Executive committee",
    initials: "MARUF",
    img: "https://i.ibb.co.com/1YxjsrTL/maruf.jpg",
    email: "alfarazi.me@gmail.com",
    phone: "+880 18 2412 2969",
    facebook: "https://www.facebook.com/alfarazi01",
  },
  {
    name: "Mehedi Hasan Pollob",
    role: "General Secretary",
    bio: "2026-27 Executive committee",
    initials: "POLLOB",
    img: "https://i.ibb.co.com/M5kT9WqL/pollob.jpg",
    email: "",
    phone: "+880 1703-369290",
    facebook: "https://www.facebook.com/mehedihasanpollob11",
  },
  {
    name: "Rokon Ahmed",
    role: "Senior Vice President",
    bio: "2026-27 Executive committee",
    initials: "ROKON",
    img: "https://i.ibb.co.com/9kpHrjhL/rokon.jpg",
    email: "",
    phone: "018 4955 4744",
    facebook: "https://www.facebook.com/rokonurjaman.rokon.10",
  },
  {
    name: "Nahid Iqbal Likhon",
    role: "Joint General Secretary",
    bio: "2026-27 Executive committee",
    initials: "NIL",
    img: "https://i.ibb.co.com/Fk4YQvZ8/nahid.jpg",
    email: "",
    phone: "+880 15 6828 0698",
    facebook: "https://www.facebook.com/nahidiqballikhon",
  },
  {
    name: "Ashiful Islam Mukto",
    role: "Organizing Secretary",
    bio: "2026-27 Executive committee",
    initials: "MUKTO",
    img: "https://i.ibb.co.com/Y71y12yq/ADB58506-F4-DC-4-D18-852-E-3828-ABE49-ABE.png",
    email: "ashifulislam2002@gmail.com",
    phone: "01759-907907",
    facebook: "https://www.facebook.com/ashifulislam.mukto/",
  },
];

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

  useEffect(() => {
    let isMounted = true;

    const fetchTeam = async () => {
      try {
        const res = await axios.get(`${API_ENDPOINTS.COMMITTEE}?isActive=true`);
        if (isMounted && res.data?.data && res.data.data.length > 0) {
          const mapped = res.data.data.map((m) => {
            const names = (m.name || "Member").trim().split(" ");
            const initials =
              names.length > 1
                ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
                : names[0].slice(0, 5).toUpperCase();

            return {
              id: m._id,
              name: m.name,
              role: m.title || "Executive Member",
              bio: m.says || `${m.session || " "} Executive committee`,
              initials,
              img: m.image || m.url,
              email: m.social?.email || "",
              phone: m.social?.phone || "",
              facebook: m.social?.facebook || "",
            };
          });
          setTeamMembers(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch committee for team section:", err);
      }
    };

    fetchTeam();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Section
      className="-mt-12"
      title="Meet Our Team"
      subtitle="Dedicated professionals committed to making a difference in our communities"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
        {teamMembers.map((member, index) => (
          <Card
            key={member.id || index}
            className="stagger-item flex h-full flex-col justify-between overflow-hidden border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 dark:border-0 dark:bg-slate-900"
          >
            <div className="flex bg-gradient-to-br from-emerald-500/5 to-teal-500/5 p-6">
              <Avatar className="h-20 w-20 shadow-md">
                <AvatarImage
                  src={member.img}
                  alt={member.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-emerald-600 text-lg font-bold text-white">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardHeader className="p-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {member.name}
              </h3>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                {member.role}
              </p>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between p-4 pt-0">
              <p className="mb-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                {member.bio}
              </p>
              <div className="flex items-center gap-2">
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-emerald-600 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-emerald-600 dark:hover:text-white"
                    title={`Email ${member.name}`}
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                )}
                {member.phone && (
                  <a
                    href={`tel:${member.phone.replace(/[\s-]/g, "")}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-emerald-600 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-emerald-600 dark:hover:text-white"
                    title={`Call ${member.phone}`}
                  >
                    <FaPhoneAlt className="h-3.5 w-3.5" />
                  </a>
                )}
                {member.facebook && (
                  <a
                    href={member.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-emerald-600 hover:text-white dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-emerald-600 dark:hover:text-white"
                    title={`Facebook profile of ${member.name}`}
                  >
                    <FaFacebook className="h-4 w-4" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default TeamSection;
