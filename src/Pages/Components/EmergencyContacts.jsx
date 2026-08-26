import React from "react";
import { emergencyNumbers } from "../../constants";
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

const EmergencyContacts = () => {
  return (
    <div className="py-6">
      <Card className="shadow-xs border-slate-200 dark:border-slate-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Rowmari Emergency Contact Numbers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-200">
                  Service / Department
                </TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-200">
                  Contact Person / Details
                </TableHead>
                <TableHead className="font-semibold text-slate-800 dark:text-slate-200">
                  Phone Number
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emergencyNumbers?.map((item) => (
                <TableRow key={item.id} className="capitalize">
                  <TableCell className="font-semibold text-slate-900 dark:text-slate-100">
                    {item.service}
                  </TableCell>
                  <TableCell className="text-slate-700 dark:text-slate-300">
                    {item.contact}
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
    </div>
  );
};

export default EmergencyContacts;
