import PageTitle from "../Components/PageTitle";
import { FaFacebookF } from "react-icons/fa6";
import Businfo from "./Components/BsBusInfo";
import IndivisualBus from "./Components/IndivisualBus";
import EmergencyContacts from "./Components/EmergencyContacts";
import Section from "../Components/shared/Section";
import SEO from "../Components/shared/SEO";
import { Button } from "../components/ui/button";

const OtherLinks = () => {
  return (
    <Section animate={false} className="-mt-12">
      <SEO
        title="Rowmari Emergency Numbers & Bus Schedules | RSWA"
        description="Find essential Rowmari emergency contact numbers (Hospital, Police, Ambulance, Fire Service) and Rowmari bus schedules (Rifat, Poly, Siam Paribahan counters) provided by RSWA."
        keywords="Rowmari emergency numbers, Rowmari hospital phone number, Rowmari police station contact, Rowmari bus counter number, Rifat Paribahan Rowmari, Poly Paribahan, Siam Enterprise, RSWA emergency contacts"
      />

      <PageTitle title="Important & Emergency Numbers" />

      <div>
        <EmergencyContacts />
        <IndivisualBus />
        <Businfo />

        <div className="mt-8 text-center">
          <a
            href="https://facebook.com/groups/519447679364602/"
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline"
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-emerald-500/30 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-400 dark:hover:bg-emerald-900/60 dark:hover:text-emerald-300"
            >
              <span>Join Rowmari Bus Zone</span>
              <FaFacebookF className="ml-2 text-blue-600 dark:text-blue-400" />
              <span>Group</span>
            </Button>
          </a>
        </div>
      </div>
    </Section>
  );
};

export default OtherLinks;
