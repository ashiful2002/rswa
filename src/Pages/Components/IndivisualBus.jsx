import {
  polyInfo,
  rifatInfo,
  siamInfo,
  rifatLogo,
  polyLogo,
  siamLogo,
} from "../../constants";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../../components/ui/table";
import { Phone } from "lucide-react";

const BusTable = ({ title, logo, data }) => {
  return (
    <Card className="shadow-2xs group relative w-full overflow-hidden border-slate-200/80 transition-all hover:shadow-md dark:border-slate-800 md:w-[32%]">
      {/* Background Watermark in Center */}
      {logo && (
        <div
          className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-center overflow-hidden p-6"
          aria-hidden="true"
        >
          <img
            src={logo}
            alt=""
            className="object-cover p-4 opacity-40 transition-transform duration-500 group-hover:scale-105 dark:opacity-60"
            loading="lazy"
          />
        </div>
      )}

      <CardHeader className="relative z-10 pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
            {title}
          </CardTitle>
          {logo && (
            <div className="shadow-2xs flex h-10 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-50 p-1 ring-1 ring-slate-200/80 dark:bg-slate-800/80 dark:ring-slate-700/60">
              <img
                src={logo}
                alt={`${title} logo`}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="relative z-10 p-2 sm:p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-slate-800 dark:text-slate-200">
                Counter
              </TableHead>
              <TableHead className="font-semibold text-slate-800 dark:text-slate-200">
                Phone Number
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium capitalize text-slate-800 dark:text-slate-200">
                  {item.counter}
                </TableCell>
                <TableCell className="font-mono">
                  <a
                    href={`tel:${item.phoneNumber}`}
                    className="inline-flex items-center gap-1.5 text-white no-underline hover:text-emerald-700 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>{item.phoneNumber}</span>
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const IndivisualBus = () => {
  return (
    <div className="py-6">
      <Card className="shadow-xs border-slate-200 dark:border-slate-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Individual Bus Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:gap-4">
            <BusTable
              title="Rifat Paribahan"
              logo={rifatLogo}
              data={rifatInfo}
            />
            <BusTable title="Poly Paribahan" logo={polyLogo} data={polyInfo} />
            <BusTable title="Siam Enterprise" logo={siamLogo} data={siamInfo} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndivisualBus;
