var colorPicker = document.getElementById("colorPicker");
        var coloredDiv = document.getElementById("coloredDiv");
        var hexValue = document.getElementById("hexValue");
        var rgbValue = document.getElementById("rgbValue");
        var hslValue = document.getElementById("hslValue");
        var hslaValue = document.getElementById("hslaValue");
        var hwbValue = document.getElementById("hwbValue");
        var cmykValue = document.getElementById("cmykValue");
        var rybValue = document.getElementById("rybValue");

        function updateColorValues() {
            var selectedColor = colorPicker.value;
            coloredDiv.style.backgroundColor = selectedColor;

            var rgbColor = hexToRgb(selectedColor);
            var hslColor = rgbToHsl(rgbColor.r, rgbColor.g, rgbColor.b);
            var hslaColor = "hsla(" + hslColor.h + "," + hslColor.s + "%," + hslColor.l + "%,1)";
            var hwbColor = rgbToHwb(rgbColor.r, rgbColor.g, rgbColor.b);
            var cmykColor = rgbToCmyk(rgbColor.r, rgbColor.g, rgbColor.b);
            var rybColor = rgbToRyb(rgbColor.r, rgbColor.g, rgbColor.b);

            hexValue.value = selectedColor;
            rgbValue.value = "rgb(" + rgbColor.r + "," + rgbColor.g + "," + rgbColor.b + ")";
            hslValue.value = "hsl(" + hslColor.h + "," + hslColor.s + "%," + hslColor.l + "%)";
            hslaValue.value = hslaColor;
            hwbValue.value = "hwb(" + hwbColor.h + "," + hwbColor.w + "%," + hwbColor.b + "%)";
            cmykValue.value = "cmyk(" + cmykColor.c + "%," + cmykColor.m + "%," + cmykColor.y + "%," + cmykColor.k + "%)";
            rybValue.value = "ryb(" + rybColor.r + "," + rybColor.y + "," + rybColor.b + ")";
        }

        colorPicker.addEventListener("input", updateColorValues);

        function hexToRgb(hex) {
            hex = hex.replace(/^#/, '');
            var bigint = parseInt(hex, 16);
            var r = (bigint >> 16) & 255;
            var g = (bigint >> 8) & 255;
            var b = bigint & 255;
            return { r: r, g: g, b: b };
        }

        function rgbToHsl(r, g, b) {
            r /= 255, g /= 255, b /= 255;

            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;

            if (max == min) {
                h = s = 0;
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }

            h = Math.round(h * 360);
            s = Math.round(s * 100);
            l = Math.round(l * 100);

            return { h: h, s: s, l: l };
        }

        function rgbToHwb(r, g, b) {
            r /= 255, g /= 255, b /= 255;

            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, w, wb;

            w = 1 - (max - min);
            wb = 1 - max;
            
            h = rgbToHsl(r, g, b).h;

            h = Math.round(h * 360);
            w = Math.round(w * 100);
            wb = Math.round(wb * 100);

            return { h: h, w: w, b: wb };
        }

        function rgbToCmyk(r, g, b) {
            r /= 255, g /= 255, b /= 255;

            var k = 1 - Math.max(r, g, b);
            var c = (1 - r - k) / (1 - k);
            var m = (1 - g - k) / (1 - k);
            var y = (1 - b - k) / (1 - k);

            c = Math.round(c * 100);
            m = Math.round(m * 100);
            y = Math.round(y * 100);
            k = Math.round(k * 100);

            return { c: c, m: m, y: y, k: k };
        }

        function rgbToRyb(r, g, b) {
            r /= 255, g /= 255, b /= 255;

            var w = Math.min(r, g, b);
            r -= w;
            g -= w;
            b -= w;
            var max = Math.max(r, g, b);

            var v = max;
            if (v == 0) {
                return { r: 0, y: 0, b: 0 };
            }

            var n = Math.min(r, g, b);
            var s = (v - n) / v;
            r = (r - n) / (v - n);
            g = (g - n) / (v - n);
            b = (b - n) / (v - n);

            if (r == 1) {
                r = 255;
            }
            if (g == 1) {
                g = 255;
            }
            if (b == 1) {
                b = 255;
            }

            r = Math.round(r * 255);
            g = Math.round(g * 255);
            b = Math.round(b * 255);

            return { r: r, y: g, b: b };
        }
        
        updateColorValues();