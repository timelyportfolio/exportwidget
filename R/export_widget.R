#' Export a htmlwidget SVG as PNG
#'
#' Often we want to export a SVG htmlwidget as a static PNG.  This little helper
#' widget will add a button on your widget to do just this.
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
