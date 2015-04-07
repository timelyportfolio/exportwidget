# exportwidget - htmlwidget to export htmlwidgets

This is **pre-alpha and experimental** but should work.


### Install

```r
devtools::install_github("timelyportfolio/exportwidget")
```

### Example with SVG and custom font

```r
library(pipeR)
library(htmltools)
library(exportwidget)

tagList(
  '<svg id = "svg_to_export" width="400" height="400">
    <text x="50" y="100" text-anchor="start" dy="14" style="font-family:\'Indie Flower\';font-size:36pt;font-weight:300;">Custom Fonts</text>
  </svg>' %>>%
    HTML
  ,export_widget( "svg" )
) %>>%
  attachDependencies(list(
    htmlDependency(
      name = "IndieFlower"
      ,version = "0.1"
      ,src = c(href='http://fonts.googleapis.com/css?family=Indie+Flower')
      #,src = c(href = "http://fonts.googleapis.com/css?family=Open+Sans:400italic,400,300,600")
      ,stylesheet = ""
    )
  )) %>>%
  html_print
```

### Example with an htmlwidget | DiagrammeR

```r
library(pipeR)
library(htmltools)
library(DiagrammeR)
library(exportwidget)

tagList(
  grViz(" digraph { a->b; b->c; c->a; }")
  ,export_widget( )
) %>>% html_print
```


### Example with multiple htmlwidgets

```r
library(pipeR)
library(htmltools)
library(DiagrammeR)
library(rcdimple)
library(exportwidget)

tagList(
  grViz(" digraph { a->b; b->c; c->a; }")
  ,dimple(
    mtcars
    , mpg ~ cyl
    , groups = "cyl"
    , type = "bubble"
  )
  ,export_widget( )
) %>>% html_print
```
