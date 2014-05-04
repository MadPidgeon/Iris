<!--

function byteToHex( variable ) {
    var hex = variable.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex( color ) {
    return "#" + byteToHex( color.r ) + byteToHex( color.g ) + byteToHex( color.b );
}

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

function hsvToRgb( h, s, v ) {
    var r, g, b, i, f, p, q, t;
    if (h && s === undefined && v === undefined) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.floor( r * 255 ),
        g: Math.floor( g * 255 ),
        b: Math.floor( b * 255 )
    }
}

function rgbToHsv( red, green, blue ) {
    var rr, gg, bb,
        r = red / 255,
        g = green / 255,
        b = blue / 255,
        h, s,
        v = Math.max(r, g, b),
        diff = v - Math.min(r, g, b),
        diffc = function(c){
            return (v - c) / 6 / diff + 1 / 2;
        };

    if (diff == 0) {
        h = s = 0;
    } else {
        s = diff / v;
        rr = diffc(r);
        gg = diffc(g);
        bb = diffc(b);

        if (r === v) {
            h = bb - gg;
        }else if (g === v) {
            h = (1 / 3) + rr - bb;
        }else if (b === v) {
            h = (2 / 3) + gg - rr;
        }
        if (h < 0) {
            h += 1;
        }else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: h,
        s: s,
        v: v
    };
}

var globalLightColor = "#444";
var globalDarkColor = "#222";
var globalCategoryColor = [ 
    { l: '#C0C0C0', d: '#A0A0A0' },  
    { l: '#C00000', d: '#A00000' },
    { l: '#C0C000', d: '#A0A000' },
    { l: '#00C000', d: '#00A000' },
    { l: '#00C0C0', d: '#00A0A0' },
    { l: '#0000C0', d: '#0000A0' },
    { l: '#C000C0', d: '#A000A0' },
    { l: '#C06060', d: '#A03030' },
    { l: '#60C060', d: '#30A030' },
    { l: '#6060C0', d: '#3030A0' },
    { l: '#C0C060', d: '#A0A030' },
    { l: '#60C0C0', d: '#30A0A0' },
    { l: '#C060C0', d: '#A030A0' }
];

var tempColor = [
    "#303030",
    "#344980",
    "#e67e22",
    "#1E824C",
    "#e74c3c",
    "#A14B17",
    "#2ecc71",
    "#1abc9c",
    "#C9218A",
    "#E08283",
    "#9b59b6",
    "#f1c40f",
    "#3498db"
];

function setColors( index ) {
	globalLightColor = tempColor[ index ];
    var hsv = rgbToHsv( hexToR( globalLightColor ), hexToG( globalLightColor ), hexToB( globalLightColor ) );
    console.log( hsv );
    globalDarkColor = rgbToHex( hsvToRgb( hsv.h, hsv.s, hsv.v-.3 ) );
    //globalLightColor = globalCategoryColor[ index ].l;
    //globalDarkColor = globalCategoryColor[ index ].d;
    $(".txcolor2 a").css({ 'color' : globalLightColor });
    $(".txcolor1 a").css({ 'color' : globalDarkColor });
}

var portalName;
var portalIndex;

var Colorcache = function() {
    var history;

    Object.defineProperty(this, 'history', {
      value: [],
      writable: true
    });

  }

Colorcache.prototype.add = function(topic, portalNameLocal, portalIndexLocal) {
    if(this.search(topic) === false) {
      var item = {
        'topic' : topic,
        'portalName' : portalNameLocal,
        'portalIndex' : portalIndexLocal
      };
      this.history.push(item);
    }
    
  }

Colorcache.prototype.search = function(topic){
    for (var i = 0; i < this.history.length; i++) {
      if(this.history[i].topic == topic)
        return this.history[i];
    };
    return false;
}

CC = new Colorcache();

function updateColors( topic ) {

    var term = CC.search(topic);
    if( term === false){
        var fetchUrl1 = "sigmajs/getCategory.php?q=" + encodeURIComponent( topic );
        portalName = "Unknown";
        portalIndex = 0;
        $.getJSON( fetchUrl1, function( data1 ) {
            var stop = false;
            for( var i = 0; i < data1.length; i++ ) {
                var fetchUrl2 = "wikipedia/portalFetch.php?category=" + encodeURIComponent( data1[ i ] ); 
                $.ajax({
                    url: fetchUrl2,
                    dataType: 'json',
                    async : false,
                    success : function( data2 ) {
                        if( data2.index != -1 ) {
                            portalName = data2.name;
                            portalIndex = data2.index;
                            setColors( portalIndex );
                            stop = true;
                        } 
                    }
                });
                if( stop )
                    break;   
            }
            if( stop == false )
                setColors( 0 );
            $('#portalName a').html(portalName);    
            $('#portalName a').attr({
                href: 'http://en.wikipedia.org/wiki/Portal:Contents/'+portalName.replace(' ', '_')
            });
            CC.add( topic, portalName, portalIndex);
        }).fail(function(jqXHR, status, error) {
            setColors( 0 );
        });

    }
    else {
        portalName = term.portalName;
        portalIndex = term.portalIndex;
        setColors( portalIndex );
        $('#portalName a').html(portalName); 
        $('#portalName a').attr({
            href: 'http://en.wikipedia.org/wiki/Portal:Contents/'+portalName.replace(' ', '_')
        });
    }


    
}

-->