# font-style-matcher

If you're using a web font, you're bound to see a flash of unstyled text (or FOUC),
between the initial render of your websafe font and the webfont that you've chosen.

This usually results in a jarring shift in layout, due to
sizing discrepancies between the two fonts. To minimize this
discrepancy, you can try to match the fallback font and the intended webfont’s
x-heights and widths [[1]](http://helenvholmes.com/writing/type-is-your-right).


This tool helps you do _exactly_ that.

![fouc](https://cloud.githubusercontent.com/assets/1369170/20506300/ed61ebac-b007-11e6-8324-df0a90604acd.gif)
