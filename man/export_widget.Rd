% Generated by roxygen2 (4.1.0): do not edit by hand
% Please edit documentation in R/export_widget.R
\name{export_widget}
\alias{export_widget}
\title{Export a htmlwidget SVG as PNG}
\usage{
export_widget(selector = NULL, width = 0, height = 0)
}
\arguments{
\item{selector}{\code{string} a valid CSS selector of the element that we would like to export.
           If \code{selector} is \code{NULL}, then \code{export_widget}
           will select all \code{htmlwidgets} on the page.}
}
\description{
Often we want to export a SVG htmlwidget as a static PNG.  This little helper
widget will add a button on your widget to perform this export task.
}

