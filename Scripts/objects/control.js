/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotation, y, scaY, cube, cube1, cube2, cube3, cube4, tX, tZ) {
            this.rotate = rotation;
            this.rotateY = y;
            this.scaleY = scaY;
            this.cube = 0;
            this.cube1 = 0;
            this.cube2 = 0;
            this.cube3 = 0;
            this.cube4 = 0;
            this.towerX = tX;
            this.towerZ = tZ;
        }
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
        Control.prototype.changeColors = function () {
            this.tower = true;
        };
        Control.prototype.buildTower = function () {
            this.build = true;
        };
        return Control;
    }());
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map