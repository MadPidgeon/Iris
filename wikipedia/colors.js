<!--

function byteToHex( variable ) {
    var hex = variable.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex( color ) {
    return "#" + byteToHex( color.r ) + byteToHex( color.g ) + byteToHex( color.b );
}

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
]

function setColors( index ) {
	globalLightColor = globalCategoryColor[ index ].l;
    globalDarkColor = globalCategoryColor[ index ].d;
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
            CC.add( topic, portalName, portalIndex);
        }).fail(function(jqXHR, status, error) {
            setColors( 0 );
        });

    }
    else {
        portalName = term.portalName;
        portalIndex = term.portalIndex;
        setColors( portalIndex );
    }


    
}

-->