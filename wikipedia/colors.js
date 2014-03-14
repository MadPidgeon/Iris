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

function setColors( index ) {
	if( index == 0 ) {
		color1t = "#000";
        color2t = "#222";
		color1b = "#CCC";
	} else {
		color1t = rgbToHex(hsvToRgb( index / 12, 1.0, 0.1 ));
        color2t = rgbToHex(hsvToRgb( index / 12, 1.0, 0.2 ));
		color1b = rgbToHex(hsvToRgb( index / 12, 0.5, 0.8 ));
	}
	$(".bgcolor1").css({ 'background-color' : color1b });
    $(".txcolor1").css({ 'color' : color1t });
    $(".txcolor2").css({ 'color' : color2t });
}

-->