# exportwidget - htmlwidget to export htmlwidgets

This is **pre-alpha and experimental** but should work.  **Note, this currently does not work in RStudio Viewer**.  `export_widget` was the widget of the week at [Building Widgets](http://buildingwidgets.com), so you can see it in action in this [blog post](http://www.buildingwidgets.com/blog/2015/4/9/week-14-exporting-widget).

Thanks so much to the following libraries and their authors.

1. [`canvg`](https://github.com/gabelerner/canvg) from Gabe Lerner
2. [`svg-crowbar`](https://github.com/NYTimes/svg-crowbar) from the NY Times
3. [`Download-File-JS`](https://github.com/PixelsCommander/Download-File-JS) from Denis Radin


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
  html_print( viewer = utils::browseURL ) #export not working in RStudio Viewer

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
) %>>% html_print( viewer = utils::browseURL ) #export not working in RStudio Viewer
```


### Example with multiple htmlwidgets

```r
library(pipeR)
library(htmltools)
library(DiagrammeR)
library(rcdimple)
library(networkD3)
library(exportwidget)

tagList(
  grViz(" digraph { a->b; b->c; c->a; }")
  ,dimple(
    mtcars
    , mpg ~ cyl
    , groups = "cyl"
    , type = "bubble"
  )
  ,simpleNetwork(
    data.frame(
      Source = c("A", "A", "A", "A", "B", "B", "C", "C", "D")
      ,Target = c("B", "C", "D", "J", "E", "F", "G", "H", "I")
    )
    ,height = 400
    ,width = 400
  )
  ,export_widget( )
) %>>% html_print( viewer = utils::browseURL ) #export not working in RStudio Viewer
```


```r
library(streamgraph)
library(dplyr)
library(exportwidget)
library(webshot)

ggplot2::movies %>%
    select(year, Action, Animation, Comedy, Drama, Documentary, Romance, Short) %>%
    tidyr::gather(genre, value, -year) %>%
    group_by(year, genre) %>%
    tally(wt=value) %>%
    ungroup %>%
    mutate(year=as.Date(sprintf("%d-01-01", year))) -> dat

html_print(tagList(
  streamgraph(dat, "genre", "n", "year")
  ,export_widget( )
)) %>%
  normalizePath(.,winslash="/") %>%
  gsub(x=.,pattern = ":/",replacement="://") %>%
  paste0("file:///",.) %>%
  webshot( file = "stream_screen.png", delay = 10 )
```
