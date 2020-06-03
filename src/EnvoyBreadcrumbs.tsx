import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import React from "react";

export type EnvoyBreadcrumb = {
  title: string,
  onClick: () => void
}

type EnvoyBreadcrumbsProps = {
  breadcrumbs: EnvoyBreadcrumb[]
}

export const EnvoyBreadcrumbs = (props: EnvoyBreadcrumbsProps) => {
  const {breadcrumbs} = props
  const breadcrumbsWithoutLast = breadcrumbs.slice(0, breadcrumbs.length - 1)
  const lastBreadcrumbs = breadcrumbs[breadcrumbs.length - 1]
  return (<Breadcrumbs aria-label="breadcrumb">
    {breadcrumbsWithoutLast.map(breadcrumb =>
      <Link color="inherit" href="/" onClick={breadcrumb.onClick}>
       {breadcrumb.title}
      </Link>
    )}
    <Typography color="textPrimary">{lastBreadcrumbs.title}</Typography>
  </Breadcrumbs>)
}
