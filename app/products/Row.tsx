import React from "react";
import { TableCell, TableRow } from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { Badge, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TableRowComponent = ({ product }: { product: any }) => {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={product.productimageurl || "/placeholder.svg"}
          width="64"
        />
      </TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell>
        <Badge variant="secondary">{product.status}</Badge>
      </TableCell>
      <TableCell>{`${product.pricevalue} PLN`}</TableCell>
      <TableCell className="hidden md:table-cell">{product.quantity}</TableCell>
      <TableCell className="hidden md:table-cell">
        {product.expiryDate}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={product.producturl}>Go side</Link>
            </DropdownMenuItem>

            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default TableRowComponent;
