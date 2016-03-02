/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        
        public rotate: number;
        public rotateY: number;
        public scaleY: number;
        public cube: number;
        public cube1: number;
        public cube2: number;
        public cube3: number;
        public cube4: number;
        public tower:boolean;
        
        public towerX:number;
        public towerZ:number;
        public build:boolean;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotation:number, y:number, scaY:number, cube:number, cube1:number, cube2:number, cube3:number, cube4:number, tX:number, tZ:number) {
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
       public changeColors(): void {
           this.tower = true;

        }
        
        public buildTower(): void {
            this.build = true;
        }
    }
}
