(function() {
  'use strict';

  var mouseMoved = false;
  var startX = 0;
  var startY = 0;

  var numResults = 24;
    // Read a page's GET URL variables and return them as an associative array.
    function getUrlVars()
    {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = decodeURIComponent(hash[1]);
        }
        return vars;
    }

    function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var cars = text.split("\n");

        for (var ii = 0; ii < cars.length; ii++) {

            var line = "";
            var words = cars[ii].split(" ");

            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + " ";
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;

                if (testWidth > maxWidth) {
                    context.fillText(line, x, y);
                    line = words[n] + " ";
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }

            context.fillText(line, x, y);
            y += lineHeight;
        }
    }

    function wrapText2(context, text, x, y, maxWidth, lineHeight) {
      var lines = [];
      var line = "";
      var words = text.split(" ");

      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;

        if (testWidth > maxWidth && line != "") {
          lines.push(line);
          line = words[n] + " ";
        }
        else {
          line = testLine;
        }
      }

      lines.push(line);

      y += lineHeight/4;
      y -= (lines.length-1)/2 * lineHeight;

      for(var i = 0; i < lines.length; i++){
        context.fillText(lines[i], x, y);
        y += lineHeight;
      }

    }

    sigma.classes.camera.prototype.returnPosition = function(){
      return {'x' : this.x, 'y' : this.y};
    }
    sigma.canvas.hovers.goo = function(node, context, settings) {

    }

    sigma.canvas.hovers.rel = function(node, context, settings) {
    }

    sigma.canvas.labels.goo = function(node, context, settings) {
      var fontSize,
          prefix = settings('prefix') || '',
          size = node[prefix + 'size'];

      context.textAlign = 'center';

      if (size < settings('labelThreshold'))
        return;

      if (typeof node.label !== 'string')
        return;

      var screenSizeFactor = (1/1600)* $( window ).width();
      
      fontSize = (settings('labelSize') === 'fixed') ?
        settings('defaultLabelSize') :
        settings('labelSizeRatio') * size / 1.5 * screenSizeFactor;

      context.font = (settings('fontStyle') ? settings('fontStyle') + ' ' : '') +
        (fontSize*2) + 'px ' + settings('font');
      context.fillStyle = '#ffffff';

      /*(settings('labelColor') === 'node') ?
        (node.color || settings('defaultNodeColor')) :
        settings('defaultLabelColor');*/

        wrapText(context, node.label, Math.round(node[prefix + 'x']), Math.round(node[prefix + 'y'] + fontSize / 3), 2*size, fontSize*2);
      context.textAlign = 'left';

    };

    sigma.canvas.labels.rel = function(node, context, settings) {
      var fontSize,
          prefix = settings('prefix') || '',
          size = node[prefix + 'size'];

      context.textAlign = 'center';

      if (size < settings('labelThreshold'))
        return;

      if (typeof node.label !== 'string')
        return;

      fontSize = (settings('labelSize') === 'fixed') ?
        settings('defaultLabelSize') :
        settings('labelSizeRatio') * size;

      context.font = (settings('fontStyle') ? settings('fontStyle') + ' ' : '') +
        (fontSize*1.8) + 'px ' + settings('font');
      context.fillStyle = '#000';

      /*(settings('labelColor') === 'node') ?
        (node.color || settings('defaultNodeColor')) :
        settings('defaultLabelColor');*/

        wrapText2(context, node.label, Math.round(node[prefix + 'x']), Math.round(node[prefix + 'y'] + fontSize / 3), 2*size, fontSize*2);
      context.textAlign = 'left';

    };


    sigma.canvas.edges.goo = function(e, s, t, ctx, settings) {
      var color = e.color,
          p = settings('prefix') || '',
          edgeColor = settings('edgeColor'),
          defaultNodeColor = settings('defaultNodeColor'),
          defaultEdgeColor = settings('defaultEdgeColor'),
          v,
          d,
          p1 = 5 / 6,
          p2 = 1 / 6;

      if (!color)
        switch (edgeColor) {
          case 'source':
            color = s.color || defaultNodeColor;
            break;
          case 'target':
            color = t.color || defaultNodeColor;
            break;
          default:
            color = defaultEdgeColor;
            break;
        }

      d = Math.sqrt(Math.pow(t[p + 'x'] - s[p + 'x'], 2) + Math.pow(t[p + 'y'] - s[p + 'y'], 2)) * 10;
      v = {
        x: (t[p + 'x'] - s[p + 'x']) / d,
        y: (t[p + 'y'] - s[p + 'y']) / d
      };

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(
        s[p + 'x'] + v.y * s[p + 'size'],
        s[p + 'y'] - v.x * s[p + 'size']
      );
      ctx.bezierCurveTo(
        s[p + 'x'] * p1 + t[p + 'x'] * p2 + v.y * e[p + 'size'],
        s[p + 'y'] * p1 + t[p + 'y'] * p2 - v.x * e[p + 'size'],
        t[p + 'x'] * p1 + s[p + 'x'] * p2 + v.y * e[p + 'size'],
        t[p + 'y'] * p1 + s[p + 'y'] * p2 - v.x * e[p + 'size'],
        t[p + 'x'] + v.y * t[p + 'size'],
        t[p + 'y'] - v.x * t[p + 'size']
      );
      ctx.lineTo(
        t[p + 'x'] - v.y * t[p + 'size'],
        t[p + 'y'] + v.x * t[p + 'size']
      );
      ctx.bezierCurveTo(
        t[p + 'x'] * p1 + s[p + 'x'] * p2 - v.y * e[p + 'size'],
        t[p + 'y'] * p1 + s[p + 'y'] * p2 + v.x * e[p + 'size'],
        s[p + 'x'] * p1 + t[p + 'x'] * p2 - v.y * e[p + 'size'],
        s[p + 'y'] * p1 + t[p + 'y'] * p2 + v.x * e[p + 'size'],
        s[p + 'x'] - v.y * s[p + 'size'],
        s[p + 'y'] + v.x * s[p + 'size']
      );
      ctx.closePath();
      ctx.fill();
    };

    sigma.canvas.nodes.goo = function(node, ctx, settings) {
      var prefix = settings('prefix') || '';


      /* Blue Eye Gradient
      var grd=ctx.createRadialGradient(node[prefix + 'x'],node[prefix + 'y'],0,node[prefix + 'x'],node[prefix + 'y'],3*node[prefix + 'size']);
      grd.addColorStop(0,"blue");
      grd.addColorStop(1,"transparent");

      // Fill with gradient
      ctx.fillStyle=grd;

      ctx.beginPath();
      ctx.arc(
        node[prefix + 'x'],
        node[prefix + 'y'],
        3*node[prefix + 'size'],
        0,
        Math.PI * 2,
        true
      );
      ctx.closePath();
      ctx.fill();
      */

      var screenSizeFactor = (1/1600)* $( window ).width();

      ctx.fillStyle = node.color || settings('defaultNodeColor');
      ctx.beginPath();
      ctx.arc(
        node[prefix + 'x'],
        node[prefix + 'y'],
        node[prefix + 'size'] * screenSizeFactor,
        0,
        Math.PI * 2,
        true
      );
      ctx.closePath();
      ctx.fill();

      /*
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(
        node[prefix + 'x'],
        node[prefix + 'y'],
        node[prefix + 'size'] * 0.5,
        0,
        Math.PI * 2,
        true
      );
      ctx.closePath();
      ctx.fill();
      */

    };

  sigma.settings.maxNodeSize = 100;
  sigma.settings.labelSize = "proportional";
  sigma.settings.labelSizeRatio = 0.2;
  sigma.settings.defaultLabelSize = 12;
  sigma.settings.nodesPowRatio = 1;
  sigma.settings.edgesPowRatio = 1;    
  //sigma.settings.autoRescale = false;
  sigma.settings.mouseEnabled = true;
  sigma.settings.touchEnabled = true;
  sigma.settings.zoomMin = .5;
  sigma.settings.zoomMax = 1;
  sigma.settings.font = 'Source Sans Pro';
  console.log(sigma.settings);

  var breadcrumbs = function() {
    var crumbs, ul;

    Object.defineProperty(this, 'crumbs', {
      value: [],
      writable: true
    });

    Object.defineProperty(this, 'ul', {
      value: $('.crumbs')[0]
    });

  }

  breadcrumbs.prototype.add = function(topic) {
    this.crumbs.push(topic);
  };

  breadcrumbs.prototype.removeTillFit = function() {
    var elements = $('.crumbs li a');
    var i = $('.crumbs li a').length - 1;
    console.log(elements);
    var maximumwidth = $(window).width() * .68 * .55;
    var width = 0;
    while( i >= 0 && width < maximumwidth ) {
      width += $(elements[i]).width() + 42;
      console.log(width, maximumwidth, i);
      --i;
    }
    if(width >= maximumwidth) {
      this.crumbs.splice(0, i + 2);
    }
    
    /*
    for( var j = i; j >= 0; --j){
      $(elements[i]).remove();
    }
    */

  }

  breadcrumbs.prototype.removeFrom = function(from) {
    this.crumbs = this.crumbs.slice(0, from+1);
  };

  breadcrumbs.prototype.clear = function(from) {
    this.crumbs = [];
  };

  breadcrumbs.prototype.refresh = function() {
    var _self = this;
    var a = this.crumbs.length;
    $(this.ul).children().remove();
    if( a > 0 ){
      $(this.ul).append(function() {
        var $new = $('<li class="first"><a href="#" style="z-index:100;"><span></span>'+_self.crumbs[0]+'</a></li>');
        $new.click({'index': 0, '_self' : _self }, _self.click);
        return $new;
      });
      for( var i = 1; i < a; i++){
        $(this.ul).append(function(){
          return $('<li><a href="#" style="z-index:'+(100-i)+';"><span></span>'+_self.crumbs[i]+'</a></li>').click({'index': i, '_self' : _self }, _self.click);
        });
      }
    }
  }

  breadcrumbs.prototype.getTopic = function(index){
    if(typeof this.crumbs[index] != 'undefined' ) 
      return this.crumbs[index];
    else
      return false;
  }

  breadcrumbs.prototype.click = function(event) {
    var index = event.data.index;
    var _self = event.data._self;
    console.log(index);
    var value = _self.getTopic(index);
    if(value !== false) {
      _self.removeFrom( index );
      drawGraph( value );
      _self.refresh();
    }
  }

  var cache = function() {
    var history;

    Object.defineProperty(this, 'history', {
      value: [],
      writable: true
    });

  }

  cache.prototype.add = function(nodes) {
    if(this.search(nodes[0].label) === false) {
        var item = {
        'topic' : nodes[0].label,
        'nodes' : []
      };
      for(var i = 1; i < nodes.length; i++){
        var node = nodes[i];
        item.nodes.push({
          'id' : node.id.replace('n', ''),
          'title' : node.label,
          'weight' : node.size
        });
      }
      this.history.push(item);
    }
    
  }

  cache.prototype.search = function(topic){
    for (var i = 0; i < this.history.length; i++) {
      if(this.history[i].topic == topic)
        return this.history[i].nodes;
    };
    return false;
  }

  function drawResults(terms) {
    var screenSizeFactor = (1/1600)* $( window ).width();
    var results = Math.min(terms.length, numResults);
    for( var i = 0; i < results ; ++i ){
      s.graph.addNode({
        id: 'n'+terms[i].id,
        label: terms[i].title,
        x: (1/screenSizeFactor)*(.55*((i+1)%2)+.2*(i%4==1)+.6) * Math.sin( 2 * Math.PI / results * i ),
        y: (1/screenSizeFactor)*(.55*((i+1)%2)+.2*(i%4==1)+.6) * Math.cos( 2 * Math.PI / results * i ),
        size: Math.max(terms[i].weight, 0.56),
        color: '#BBB',
        type: 'rel'
      })
      .addEdge({
        id: 'e'+i,
        source: 'm',
        target: 'n'+terms[i].id,
        color: '#00f',
        type: 'goo'
      });

    }

    // Finally, let's ask our sigma instance to refresh:
    s.refresh(); 

    s.unbind('overNodes');
    s.bind('overNodes', function(e) {
      $('#container').css('cursor','pointer');
    });

    s.unbind('outNodes');
    s.bind('outNodes', function(e) {
      if(e.data.nodes.length <= 1 ){
        $('#container').css('cursor','auto');
      }
    });
    
    

    s.unbind('clickNode');

    // Bind the events:
    s.bind('clickNode', function(e) {
      if(!mouseMoved) {
        if(e.data.node.type == 'rel'){
          console.log(e);
          c.add(e.data.node.label);
          c.refresh();
          c.removeTillFit();
          c.refresh();
          drawGraph(e.data.node.label);
        }
        else
          window.open('http://en.wikipedia.org/wiki/'+e.data.node.label.replace(/\ /g,'_'));
      }
      mouseMoved = false;
    });


    
    h.add(s.graph.nodes());

    //console.log(s.graph.nodes());

    $('#container').removeClass('csspinner').removeClass('traditional');
  }

  var s;
  function drawGraph(topic) {

    searchAction( topic );

    $('#container').addClass('csspinner').addClass('traditional');

    s.graph.clear();
    s.graph.addNode({
      // Main attributes:
      id: 'm',
      label: topic.replace(/\_/g,' '),
      // Display attributes:
      x: 0,
      y: 0,
      size: 2,
      color: '#000',
      type: 'goo'
    });

    // Finally, let's ask our sigma instance to refresh:
    s.refresh();

    console.log('search', h.search(topic));
    var terms = h.search(topic);
    if(terms !== false) {
      drawResults(terms);
    }
    else {
      var terms = [];
      $.getJSON('sigmajs/wikiMinerApiProxy.php?q='+topic, function(terms, textStatus) {
        if(terms.errorCode == 1) {
          message('Geen resultaten voor deze zoekterm gevonden');
          $('#container').removeClass('csspinner').removeClass('traditional');
        }
        else
          drawResults(terms);
      });
    }

    

  }

  function submitSearch() {
    var value = $('#searchInput').val();

    if(value != ''){
      c.clear();
      c.add(value);
      c.refresh();
      c.removeTillFit();
      c.refresh();
      drawGraph(value);
    }
      
  }

  var fxque;
  var messageFadeTime;
  function message(msg, type){

    clearTimeout(messageFadeTime);
    $("#message").stop(true, true).show();
    $("#message").text(msg);

    messageFadeTime = setTimeout(function() {
          $("#message").stop(true, true).fadeOut(1500);
      }, 2000);

  }

  function updatePlacement() {
    var myWidth = $(window).width();
    var messageWindow = 0.25*myWidth + (0.6*myWidth / 2 - 300);
    $('#message').css('left', messageWindow);
  }

  window.onresize = updatePlacement;

  var c;
  var h;
  $(document).ready(function($) {

    h = new cache();

    c = new breadcrumbs();
    c.refresh();

    

    // Let's first initialize sigma:
    s = new sigma({
      renderer: {
        container: document.getElementById('container'),
        type: 'canvas'
      },
    });

    $('#container').bind('mousedown', function(e) {
      mouseMoved = false;
      startX = e.pageX;
      startY = e.pageY;

    });

    $('#container').bind('mouseup', function(e) {
      mouseMoved = false;
      if(e.pageX > startX + 5 || e.pageX < startX - 5 || e.pageY > startY + 5 || e.pageY < startY - 5) {
        mouseMoved = true;
      }
    });


    if(typeof getUrlVars().q != 'undefined'){
      c.add(getUrlVars().q);
      c.refresh();
      c.removeTillFit();
      c.refresh();
      drawGraph(getUrlVars().q);
    }
    
    $('#searchInput').keyup(function (e) {
        if (e.keyCode == 13) {
          submitSearch();
        }
    });



    $('#searchSubmit').click(submitSearch);

    updatePlacement();
  });

})();