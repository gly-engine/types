library gly_std;

import 'dart:js_interop';

@JS()
@staticInterop
class GlyStd {}

@JS()
@staticInterop
class GlyStdApp {}

@JS()
@staticInterop
class GlyStdDraw {}

@JS()
@staticInterop
class GlyStdText {}

@JS()
@staticInterop
class GlyStdImage {}

extension StdExtension on GlyStd {
  external int dt;
  external int milis;
  external GlyStdApp get app;
  external GlyStdDraw get draw;
  external GlyStdText get text;
  external GlyStdImage get image;
}

extension GlyStdAppExtension on GlyStdApp {
  external void reset();
  external int width;
  external int height;
}

extension GlyStdDrawExtension on GlyStdDraw {
  external void clear(int color);
  external void color(int color);
  external void line(num x1, num y1, num x2, num y2);
  external void rect(num mode, num x, num y, num w, num h);
}

extension GlyStdTextExtension on GlyStdText {
  external num print_ex(num x, num y, String text, num align);
  external void print(num x, num y, String text);
  external void put(num x, num y, String text, num sizec);
  external num mensure(String text);
  external void font_size(num size);
  external void font_name(String name);
  external void font_default(num id);
  external void font_previous();
}

extension GlyStdImageExtension on GlyStdImage {
  external void draw(num x, num y, String src);
  external void load(String src);
}
