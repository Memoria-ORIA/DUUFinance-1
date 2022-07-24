import { Button, Link, Typography, TableRow, TableCell, SvgIcon, } from "@material-ui/core";
import "./analytics.css";
import { Skeleton } from "@material-ui/lab";



export function History({object}) {
    // Use BondPrice as indicator of loading.

    return (
      <TableRow >
        <TableCell align="center" className="bond-name-cell">
          <div className="bond-name">
            {object.txhash}
          </div>
        </TableCell>
        <TableCell align="center">{object.txamount}
        </TableCell>
        <TableCell align="center">dsfd</TableCell>
        <TableCell align="center">
          sdfdsf
        </TableCell>
        <TableCell>
          sdfdsfds
        </TableCell>
      </TableRow>
    );
  }