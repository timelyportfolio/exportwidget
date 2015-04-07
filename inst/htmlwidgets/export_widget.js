HTMLWidgets.widget({

  name: 'export_widget',

  type: 'output',

  // our function to export as png
  pngify: function( svg ){
    var cvs = document.createElement("canvas")
    cvs.width = svg.getBoundingClientRect().width
    cvs.height = svg.getBoundingClientRect().height

    svgCopy = svg.cloneNode()
    svgCopy.innerHTML = svg.innerHTML

    //check for percentage height and width
    //  if so explicitly set height and width on svg as attributes
    if(svgCopy.style.width) {
      svgCopy.style.width = null
      svgCopy.style.height = null
      svgCopy.setAttribute("width",cvs.width)
      svgCopy.setAttribute("height", cvs.height)
    }

    var ctx = cvs.getContext("2d")

    var datUrl

    try {
      ctx.drawSvg( svgCopy.outerHTML, 0, 0 )
      datUrl = cvs.toDataURL()
      downloadFile( datUrl )
    } catch(e) {
      console.log(["failed with error", e].join(' '));
    }

  },

  initialize: function(el, width, height) {

    if(typeof window.HTMLWidgets.pngify === "undefined")  window.HTMLWidgets.pngify = this.pngify

    return { };

  },

  renderValue: function(el, x, instance) {
    var elSelect;

    // if a string assume it is a selector
    if( typeof x.selector === "string" ){
      elSelect = document.querySelectorAll( x.selector )
    }

    // if nothing get all htmlwidgets
    if( typeof x.selector === "undefined" || x.selector === null ){
      elSelect = document.querySelectorAll(".html-widget-static-bound")
    }

    [].forEach.call( elSelect, function(e){
        //don't do this for export_widget htmlwidgets
        if( [].indexOf.call(e.classList,"export_widget") < 0 ) {

          var btn = document.createElement("button")
          btn.innerHTML = "widget as png"
          btn.onclick = function() {
            HTMLWidgets.pngify(
              e.tagName === "svg" ? e : e.getElementsByTagName("svg")[0]
            )
          }
          // handle placement
          e.parentNode.insertBefore( btn, e )
        }
    })

  },

  resize: function(el, width, height, instance) {

  }

});
