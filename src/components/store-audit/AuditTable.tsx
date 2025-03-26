
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface AuditIssue {
  location: string;
  issue: string;
  impact: "high" | "medium" | "low";
  status: "open" | "fixed";
}

interface AuditTableProps {
  data: AuditIssue[];
}

const AuditTable: React.FC<AuditTableProps> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Location</TableHead>
          <TableHead>Issue</TableHead>
          <TableHead>Impact</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((issue, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <div className="flex items-center">
                {issue.location}
                <Button variant="ghost" size="icon" className="h-5 w-5 ml-1">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </TableCell>
            <TableCell>{issue.issue}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={cn(
                  issue.impact === "high" && "border-red-200 bg-red-50 text-red-700",
                  issue.impact === "medium" && "border-amber-200 bg-amber-50 text-amber-700",
                  issue.impact === "low" && "border-blue-200 bg-blue-50 text-blue-700"
                )}
              >
                {issue.impact}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={cn(
                  issue.status === "open" && "border-amber-200 bg-amber-50 text-amber-700",
                  issue.status === "fixed" && "border-green-200 bg-green-50 text-green-700"
                )}
              >
                {issue.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              {issue.status === "open" ? (
                <Button size="sm" variant="outline">
                  Fix Issue
                </Button>
              ) : (
                <Button size="sm" variant="ghost" disabled>
                  Fixed
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AuditTable;
