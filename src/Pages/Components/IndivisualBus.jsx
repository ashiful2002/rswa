import React from "react";
import { polyInfo, rifatInfo, siamInfo } from "../../constants";
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

const BusTable = ({ title, data }) => {
  return (
    <Card className="shadow-2xs w-full border-slate-200/80 dark:border-slate-800 md:w-[32%]">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
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
                    className="inline-flex items-center gap-1.5 text-emerald-600 no-underline hover:text-emerald-700 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300"
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
            <BusTable title="Rifat Paribahan" data={rifatInfo} />
            <BusTable title="Poly Paribahan" data={polyInfo} />
            <BusTable title="Siam Enterprise" data={siamInfo} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndivisualBus;
