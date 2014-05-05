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

  d = Math.sqrt(Math.pow(t[p + 'x'] - s[p + 'x'], 2) + Math.pow(t[p + 'y'] - s[p + 'y'], 2)) * 2;
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

sigma.settings.maxNodeSize = 20;
sigma.settings.labelSize = "proportional";
sigma.settings.labelSizeRatio = 0.2;
sigma.settings.defaultLabelSize = 12;
sigma.settings.nodesPowRatio = 1;
sigma.settings.edgesPowRatio = 1;    
//sigma.settings.autoRescale = false;
sigma.settings.mouseEnabled = false;
sigma.settings.touchEnabled = false;
sigma.settings.zoomMin = .5;
sigma.settings.zoomMax = 1;
sigma.settings.font = 'Source Sans Pro';
sigma.settings.animationsTime = 500;
sigma.settings.sideMargin = .20;

$(document).ready(function($) {

  // Let's first initialize sigma:
  s = new sigma({
    renderer: {
      container: document.getElementById('logo'),
      type: 'canvas'
    },
  });

  var terms = [];

  terms.push({x: 2, y: 6, c: '#1abc9c' }); //0 Turqoise
  terms.push({x: 2, y: 2, c: '#2ecc71' }); //1 Lichtgroen
  terms.push({x: 4, y: 6, c: '#3498db' }); //2 Lichtblauw
  terms.push({x: 4, y: 4, c: '#9b59b6' }); //3 Paars
  terms.push({x: 4, y: 2, c: '#344980' }); //4 Donkerblauw
  terms.push({x: 6, y: 6, c: '#C9218A' }); //5 Magenta
  terms.push({x: 6, y: 2, c: '#e67e22' }); //6 Oranje
  terms.push({x: 8, y: 6, c: '#e74c3c' }); //7 Rood
  terms.push({x: 8, y: 2, c: '#E08283' }); //8 Roze
  terms.push({x: 12, y: 2, c: '#1E824C' }); //9 Donkergroen
  terms.push({x: 10, y: 3.5, c: '#f1c40f' }); //10 Geel
  terms.push({x: 12, y: 4.5, c: '#333' }); //11 Zwart
  terms.push({x: 10, y: 6, c: '#A14B17' }); //12 Bruin

  var edges = [];

  edges.push({s: 0, t: 1});
  edges.push({s: 2, t: 3});
  edges.push({s: 3, t: 4});
  edges.push({s: 3, t: 5});
  edges.push({s: 3, t: 6});
  edges.push({s: 4, t: 6});
  edges.push({s: 7, t: 8});
  edges.push({s: 9, t: 10});
  edges.push({s: 10, t: 11});
  edges.push({s: 11, t: 12});



  for( var i = 0; i < terms.length ; ++i ){
    s.graph.addNode({
      id: 'n'+i,
      label: terms[i].title,
      x: 5,
      y: 5,
      normal_x: terms[i].x,
      normal_y: terms[i].y,
      size: .5,
      color: terms[i].c,
      type: 'rel',
      center_x : terms[i].x,
      center_y : 5,
      point_x : 5,
      point_y : 5,
    });

  }

  for (var i = 0; i < edges.length; ++i) {
    s.graph.addEdge({
      id: 'e'+i,
      source: 'n'+edges[i].s,
      target: 'n'+edges[i].t,
      color: '#000',
      type: 'goo'
    })
  };

    // Finally, let's ask our sigma instance to refresh:
    s.refresh(); 

    step1();

});

function step1() {
  s.settings('animationsTime', 1000);
  sigma.plugins.animate(
    s,
      {
        x: 'center_x',
        y: 'center_y'
      }
    );
  window.setTimeout(step2, 700);
}

function step2() {
  s.settings('animationsTime', 500);
  sigma.plugins.animate(
    s,
      {
        x: 'normal_x',
        y: 'normal_y'
      }
    );

  s.refresh(); 
}