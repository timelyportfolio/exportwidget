#' Export a htmlwidget SVG as PNG
#'
#' Often we want to export a SVG htmlwidget as a static PNG.  This little helper
#' widget will add a button on your widget to perform this export task.
#'
#' @param selector \code{string} a valid CSS selector of the element that we would like to export.
#'            If \code{selector} is \code{NULL}, then \code{export_widget}
#'            will select all \code{htmlwidgets} on the page.
#'
#' @import htmlwidgets
#'
#' @export
export_widget <- function(selector = NULL, width = 0, height = 0) {

  # forward options using x
  x = list(
    selector = selector
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'export_widget',
    x,
    width = width,
    height = height,
    package = 'exportwidget'
  )
}
