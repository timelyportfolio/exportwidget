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

    // add our function to HTMLWidgets
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
      // filter out export_widget htmlwidgets
      elSelect = [].filter.call(
                    document.querySelectorAll(".html-widget-static-bound"),
                    function(e){
                      return [].indexOf.call(e.classList,"export_widget") < 0
                    }
                  )
    }

    [].forEach.call( elSelect, function(e){
        var btn = document.createElement("button")
        btn.innerHTML = "widget as png"
        btn.style.position = "relative"
        btn.style.bottom = "95%"
        btn.style.left = "5%"
        btn.onclick = function() {
          HTMLWidgets.pngify(
            e.tagName === "svg" ? e : e.getElementsByTagName("svg")[0]
          )
        }
        // handle placement
        if ( e.tagName === "svg" ) {
          e.parentNode.appendChild( btn )
        } else {
          e.appendChild( btn )
        }
    })

  },

  resize: function(el, width, height, instance) {

  }

});
