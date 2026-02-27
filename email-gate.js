/**
 * Email Verification Gate
 * =======================
 * Blocks page access until email is entered on first visit.
 * Downloads a .exe file with the encoded email hidden inside.
 *
 * HOW TO DECODE THE PLAYER'S EMAIL:
 * 1. Open the downloaded .exe in any text editor
 * 2. Find the line starting with "DEADC0DE"
 * 3. The NEXT line is the Base64-encoded player email
 * 4. Decode it:
 *    - Browser console: atob('paste_the_line_here')
 *    - Or any online Base64 decoder
 */
(function() {
    'use strict';

    // Skip if already verified
    if (localStorage.getItem('email_verified') === 'true') return;

    // Immediately block page content with black screen (prevents flash)
    var blockStyle = document.createElement('style');
    blockStyle.id = 'eg-block';
    blockStyle.textContent =
        'body::before{content:"";position:fixed;top:0;left:0;width:100%;height:100%;' +
        'background:#000;z-index:999998}body{overflow:hidden!important}';
    (document.head || document.documentElement).appendChild(blockStyle);

    // Build modal once DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // --- Create overlay ---
        var overlay = document.createElement('div');
        overlay.id = 'eg-overlay';
        overlay.style.cssText =
            'position:fixed;top:0;left:0;width:100%;height:100%;' +
            'background:rgba(0,0,0,0.97);z-index:999999;' +
            'display:flex;align-items:center;justify-content:center;' +
            'font-family:"Courier New",Consolas,monospace';

        overlay.innerHTML =
            '<div style="background:#0a0a0a;border:1px solid #222;padding:40px 36px;' +
            'max-width:400px;width:90%;text-align:center;border-radius:4px;">' +

            '<div style="font-size:28px;margin-bottom:10px;">&#128274;</div>' +

            '<h2 style="color:#bbb;font-size:15px;font-weight:600;margin:0 0 6px;' +
            'letter-spacing:1px;">VERIFICATION REQUIRED</h2>' +

            '<p style="color:#666;font-size:12px;margin:0 0 4px;">' +
            'Please enter your email to verify you are not a robot.</p>' +
            '<p style="color:#555;font-size:11px;margin:0 0 28px;">' +
            '\u8BF7\u8F93\u5165\u90AE\u7BB1\u4EE5\u9A8C\u8BC1\u60A8\u4E0D\u662F\u673A\u5668\u4EBA\u3002</p>' +

            '<input type="email" id="eg-input" placeholder="Email / \u90AE\u7BB1" ' +
            'autocomplete="email" style="width:100%;padding:12px 14px;background:#111;' +
            'border:1px solid #2a2a2a;color:#ddd;font-family:inherit;font-size:13px;' +
            'box-sizing:border-box;border-radius:3px;outline:none;">' +

            '<p id="eg-error" style="color:#c0392b;font-size:11px;margin:8px 0 0;' +
            'min-height:16px;"></p>' +

            '<button id="eg-submit" style="width:100%;padding:11px;margin-top:12px;' +
            'background:#1a1a1a;border:1px solid #333;color:#999;font-family:inherit;' +
            'font-size:13px;cursor:pointer;border-radius:3px;transition:all 0.2s;' +
            'letter-spacing:0.5px;">Verify / \u9A8C\u8BC1</button>' +

            '</div>';

        document.body.appendChild(overlay);

        var input = document.getElementById('eg-input');
        var error = document.getElementById('eg-error');
        var submit = document.getElementById('eg-submit');

        // Hover / focus polish
        submit.onmouseenter = function() { this.style.background = '#252525'; this.style.color = '#ccc'; };
        submit.onmouseleave = function() { this.style.background = '#1a1a1a'; this.style.color = '#999'; };
        input.onfocus = function() { this.style.borderColor = '#444'; };
        input.onblur  = function() { this.style.borderColor = '#2a2a2a'; };

        // --- Helpers ---

        function validateEmail(v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        }

        function rHex(n) {
            var c = '0123456789ABCDEF', s = '';
            for (var i = 0; i < n; i++) s += c[Math.floor(Math.random() * 16)];
            return s;
        }

        function hexDumpLine(row) {
            var addr = (row * 16).toString(16).toUpperCase();
            while (addr.length < 8) addr = '0' + addr;
            var b = [];
            for (var i = 0; i < 16; i++) b.push(rHex(2));
            return addr + '  ' + b.join(' ');
        }

        function beaconLine(tag) {
            var b = [];
            for (var i = 0; i < 12; i++) b.push(rHex(2));
            return tag + '  ' + b.join(' ');
        }

        // --- Generate .exe file content ---

        function buildFileContent(email) {
            var encoded = btoa(email);
            var ts = new Date().toISOString();
            var nBefore = 8 + Math.floor(Math.random() * 10);
            var nAfter  = 8 + Math.floor(Math.random() * 10);
            var L = [];

            // Fake MZ / PE header
            L.push('4D 5A 90 00 03 00 00 00 04 00 00 00 FF FF 00 00');
            L.push('B8 00 00 00 00 00 00 00 40 00 00 00 00 00 00 00');
            L.push('00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00');
            L.push('');
            L.push('================================================================');
            L.push('  VERIFICATION COMPLETE');
            L.push('================================================================');
            L.push('');
            L.push('  Thank you for your cooperation.');
            L.push('  More information will be sent to your email shortly.');
            L.push('');
            L.push('  \u611F\u8C22\u60A8\u7684\u914D\u5408\uFF0C\u7A0D\u540E\u66F4\u591A\u8BAF\u606F\u4F1A\u53D1\u9001\u5230\u60A8\u7684\u90AE\u7BB1\u3002');
            L.push('');
            L.push('  Timestamp: ' + ts);
            L.push('');
            L.push('================================================================');
            L.push('  DATA BLOCK');
            L.push('================================================================');
            L.push('');

            // Hex noise — before
            for (var i = 0; i < nBefore; i++) L.push(hexDumpLine(i));

            // === Hidden payload ===
            L.push(beaconLine('DEADC0DE'));   // start marker
            L.push(encoded);                   // Base64 email
            L.push(beaconLine('BEEFC0DE'));   // end marker

            // Hex noise — after
            for (var j = 0; j < nAfter; j++) L.push(hexDumpLine(nBefore + 3 + j));

            L.push('');
            L.push('================================================================');
            L.push('  END');
            L.push('================================================================');

            return L.join('\n');
        }

        // --- Download ---

        function download(content, filename) {
            var blob = new Blob([content], { type: 'application/octet-stream' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        // --- Submit handler ---

        function handleSubmit() {
            var email = input.value.trim();

            if (!email) {
                error.textContent = 'Please enter your email. / \u8BF7\u8F93\u5165\u90AE\u7BB1\u3002';
                return;
            }
            if (!validateEmail(email)) {
                error.textContent = 'Invalid email format. / \u90AE\u7BB1\u683C\u5F0F\u65E0\u6548\u3002';
                input.style.borderColor = '#c0392b';
                return;
            }

            error.textContent = '';
            input.style.borderColor = '#2a2a2a';

            // Generate and trigger download
            var content = buildFileContent(email);
            download(content, 'verification.exe');

            // Persist
            localStorage.setItem('email_verified', 'true');

            // Fade out overlay, remove block
            overlay.style.transition = 'opacity 0.6s ease';
            overlay.style.opacity = '0';
            setTimeout(function() {
                overlay.remove();
                blockStyle.remove();
            }, 650);
        }

        submit.addEventListener('click', handleSubmit);
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') handleSubmit();
        });

        setTimeout(function() { input.focus(); }, 200);
    });
})();
