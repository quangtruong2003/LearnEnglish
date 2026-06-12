import type { WordFormGroup } from "@/lib/content/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type WordFormTableProps = {
  groups: WordFormGroup[];
};

export function WordFormTable({ groups }: WordFormTableProps) {
  return (
    <div className="mt-4 overflow-x-auto">
      <Table className="text-sm">
        <TableHeader>
          <TableRow>
            <TableHead>Động từ</TableHead>
            <TableHead>Danh từ</TableHead>
            <TableHead>Tính từ</TableHead>
            <TableHead>Trạng từ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((g) => (
            <TableRow key={g.id}>
              <TableCell className="font-medium">{g.verb}</TableCell>
              <TableCell>{g.noun ?? "—"}</TableCell>
              <TableCell>{g.adjective ?? "—"}</TableCell>
              <TableCell>{g.adverb ?? "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
