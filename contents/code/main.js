// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

// This code is largely inspired by
// https://github.com/KSmanis/kwin-move-window-to-center/blob/master/contents/code/main.js
// Which moves a window to the center of the screen.
// I used that code and created functions of the same kind to move and resize windows


function CenterWindow() {
  // https://github.com/KSmanis/kwin-move-window-to-center/blob/master/contents/code/main.js
  var client = workspace.activeClient;
  if (client.moveable) {
    var maxArea = workspace.clientArea(KWin.MaximizeArea, client);
    client.geometry = {
      x: maxArea.x + (maxArea.width - client.width) / 2,
      y: maxArea.y + (maxArea.height - client.height) / 2,
      width: client.width,
      height: client.height
    };
  }
}

function ResizeWindowWidthLarger() {
  var client = workspace.activeClient;
  if (client.moveable) {
    var maxArea = workspace.clientArea(KWin.MaximizeArea, client);
    var maxWidthUpdate = maxArea.width - (client.geometry.x + client.geometry.width);
    var winUpdate = 100;
    if (winUpdate > maxWidthUpdate) {
      winUpdate = maxWidthUpdate
    }
    client.geometry = {
      x: client.geometry.x,
      y: client.geometry.y,
      width: client.geometry.width + winUpdate,
      height: client.height
    };
  }
}

function ResizeWindowWidthSmaller() {
  var client = workspace.activeClient;
  if (client.moveable) {
    var winUpdate = 100;
    if (client.geometry.width - winUpdate > 200){
      client.geometry = {
        x: client.geometry.x,
        y: client.geometry.y,
        width: client.geometry.width - winUpdate,
        height: client.height
      };
    }
  }
}

function ResizeWindowHeightLarger() {
  var client = workspace.activeClient;
  if (client.moveable) {
    var maxArea = workspace.clientArea(KWin.MaximizeArea, client);
    var maxWidthUpdate = maxArea.height - (client.geometry.y + client.geometry.height);
    var winUpdate = 100;
    if (winUpdate > maxWidthUpdate) {
      winUpdate = maxWidthUpdate
    }
    client.geometry = {
      x: client.geometry.x,
      y: client.geometry.y,
      width: client.width,
      height: client.geometry.height + winUpdate,
    };
  }
}

function ResizeWindowHeightSmaller () {
  var client = workspace.activeClient;
  if (client.moveable) {
    var winUpdate = 100;
    var downSide = client.geometry.y + client.geometry.height;
    if (downSide - winUpdate > client.geometry.y + 200){
      client.geometry = {
        x: client.geometry.x,
        y: client.geometry.y,
        width: client.geometry.width,
        height: client.geometry.height - winUpdate
      };
    }
  }
}

function MoveWindowRight () {
  var client = workspace.activeClient;
  if (client.moveable) {
    var maxArea = workspace.clientArea(KWin.MaximizeArea, client);
    var winUpdate = 100;
    var rightSide = client.geometry.x + client.geometry.width;
    if (rightSide + winUpdate > maxArea.width){
      winUpdate = maxArea.width - rightSide
    }
    client.geometry = {
      x: client.geometry.x + winUpdate,
      y: client.geometry.y,
      width: client.geometry.width,
      height: client.geometry.height
    };
  }
}

function MoveWindowDown () {
  var client = workspace.activeClient;
  if (client.moveable) {
    var maxArea = workspace.clientArea(KWin.MaximizeArea, client);
    var winUpdate = 100;
    var bottomSide = client.geometry.y + client.geometry.height;
    if (bottomSide + winUpdate > maxArea.height){
      winUpdate = maxArea.height - bottomSide
    }
    client.geometry = {
      x: client.geometry.x,
      y: client.geometry.y + winUpdate,
      width: client.geometry.width,
      height: client.geometry.height
    };
  }
}

function MoveWindowLeft () {
  var client = workspace.activeClient;
  if (client.moveable) {
    var winUpdate = 100;
    var leftSide = client.geometry.x;
    if (leftSide - winUpdate < 0){
      winUpdate = client.geometry.x
    }
    client.geometry = {
      x: client.geometry.x - winUpdate,
      y: client.geometry.y,
      width: client.geometry.width,
      height: client.geometry.height
    };
  }
}

function MoveWindowUp () {
  var client = workspace.activeClient;
  if (client.moveable) {
    var maxArea = workspace.clientArea(KWin.MaximizeArea, client);
    var winUpdate = 100;
    var topSide = client.geometry.y;
    if (topSide - winUpdate < 30){
      winUpdate = topSide - 30
    }
    client.geometry = {
      x: client.geometry.x,
      y: client.geometry.y - winUpdate,
      width: client.geometry.width,
      height: client.geometry.height
    };
  }
}

registerShortcut("MoveCenter", "Center window", "Meta+C", CenterWindow);
registerShortcut("MoveResizeRight", "MoveRight right", "", MoveWindowRight);
registerShortcut("MoveResizeDown", "MoveDown down", "", MoveWindowDown);
registerShortcut("MoveResizeLeft", "MoveLeft left", "", MoveWindowLeft);
registerShortcut("MoveResizeUp", "MoveUp up", "", MoveWindowUp);
registerShortcut("MoveResizeWidthLarger", "Resize width larger", "", ResizeWindowWidthLarger);
registerShortcut("MoveResizeWidthSmaller", "Resize width smaller", "", ResizeWindowWidthSmaller);
registerShortcut("MoveResizeHeightLarger", "Resize height larger", "", ResizeWindowHeightLarger);
registerShortcut("MoveResizeHeightSmaller", "Resize height smaller", "", ResizeWindowHeightSmaller);
