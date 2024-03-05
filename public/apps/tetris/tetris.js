/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Configuration: () => (/* binding */ Configuration)\n/* harmony export */ });\n/* harmony import */ var _src_class_markup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/class-markup */ \"./src/class-markup.js\");\n/* harmony import */ var _src_part_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./src/part-factory */ \"./src/part-factory.js\");\n\r\n\r\n\r\n\r\nconst Configuration = {\r\n    pixelSize: 32,      // the pixel size, in pixels =)\r\n    gridSize: [21, 12], // rows, cols - the grid size include the left/bottom/right borders, that are filled with 1s to detect part border collisions\r\n    frequency: 3,       // determines the game refresh rate, by the number of requestAnimationFrame() events elapsed. each event calls the #frame method\r\n    keyframes: 5,       // determines the part motion rate, by the number of #frame events elapsed\r\n    minFrameTime: 40    // the minimum ammount of time that must ellapse between each consecutive frame(in milliseconds). This can be calculated based on a desired framerate: minFrameTime = 1000mS / FramesPerSecond. eg: minFrameTime = 1000mS / 25fps <=> 40 mS\r\n};\r\n\r\n\r\nclass Tetris {\r\n\r\n    // Blueprint:\r\n    #state;         // INT: indicating the program current state: 0=intro, 1=game play, 2=game over.\r\n    #play;          // BOOL: indicating the game running state. True=game is running. False=the game is paused (only valid for #state==1).\r\n    #model;         // bit[][]: the grid, a pixel matrix containing 0s and 1s.\r\n    #part;          // PART: placeholder for the current part instance.\r\n    #frameCount;    // INT: a frame counter. decremented every animation frame. when ellappsed, a keyframe method is called and the counter is restored\r\n    #keyframeCount; // INT: a keyframe counter.\r\n    #lastFrame;     // INT: to store the epoch of the last frame, to aid ensuring a minimum amount of time betwen frames.\r\n    #frameId;       // STRING: to hold the id of the requestAnimationFrame, so we can cancel it when required.\r\n    #keyLock;       // BOOL: to lock part instance swap action, and prevent key auto repeat.\r\n    \r\n    #board;         // HTMLReference: to the element that holds the game UI.\r\n    #intro;         // HTMLReference: to the start screen element. This contains game instructions.\r\n    #outro;         // HTMLReference: to the 'game over' screen element.\r\n\r\n    #keysPressed = {        // keeps track of the keys pressed on the keyboard\r\n        Enter: false,       // 13 - pause/resume game play\r\n        Escape: false,      // 27 - pause/resume game play\r\n        Space: false,       // 32 - rotates the part\r\n        ArrowLeft: false,   // 37 - moves the current part to the left\r\n        ArrowUp: false,     // 38 - rotates the part\r\n        ArrowRight: false,  // 39 - moves the current part to the right\r\n        ArrowDown: false,   // 40 - moves the current part downwards\r\n    };\r\n\r\n    constructor () {\r\n        this.#board = _src_class_markup__WEBPACK_IMPORTED_MODULE_0__.Markup.board();\r\n        this.#intro = _src_class_markup__WEBPACK_IMPORTED_MODULE_0__.Markup.intro();\r\n        this.#outro = _src_class_markup__WEBPACK_IMPORTED_MODULE_0__.Markup.outro();\r\n        document.getElementById('component-emulator').innerHTML='';document.getElementById('component-emulator').appendChild(this.#board);\r\n        document.addEventListener('keydown', this.#keydown.bind(this));\r\n        document.addEventListener('keyup', this.#keyup.bind(this));\r\n        this.#init();\r\n    }\r\n\r\n    #keydown(e) {\r\n        let keyCode = null;\r\n        if (e.code) {\r\n            if (this.#keysPressed[e.code] || (this.#keysPressed[e.code] === false)) {\r\n                this.#keysPressed[e.code] = true;\r\n                keyCode = e.code;\r\n            }\r\n        } \r\n        else if (e.key) {\r\n            if (this.#keysPressed[e.key] || (this.#keysPressed[e.key] === false)) {\r\n                this.#keysPressed[e.key] = true;\r\n                keyCode = e.key;\r\n            }\r\n        }\r\n        if (this.#state == 0 || this.#state == 2) {\r\n            if (keyCode == 'Enter' || keyCode == 'Space') {\r\n                this.#initGame();\r\n            }\r\n        } \r\n        else if (this.#state == 1) {\r\n            if (keyCode == 'Enter' || keyCode == 'Escape') {\r\n                this.#play = !this.#play;\r\n                if (this.#play) this.#frameId = window.requestAnimationFrame(this.#frame.bind(this));\r\n            }\r\n        }\r\n        e.preventDefault();\r\n        e.stopPropagation();\r\n    }\r\n\r\n    #keyup(e) {\r\n        let keyCode = null;\r\n        if (e.code) {\r\n            if (this.#keysPressed[e.code]) {\r\n                this.#keysPressed[e.code] = false;\r\n                keyCode = e.code;\r\n            }\r\n        } \r\n        else if (e.key) {\r\n            if (this.#keysPressed[e.key]) {\r\n                this.#keysPressed[e.key] = false;\r\n                keyCode = e.key;\r\n            }\r\n        }\r\n        if (this.#state == 1) {\r\n            if (keyCode == 'Space' || keyCode == 'ArrowUp') {\r\n                this.#keyLock = false;\r\n            }\r\n        }\r\n        e.preventDefault();\r\n        e.stopPropagation();\r\n    }\r\n\r\n    #initModel() {\r\n        this.#model = [];\r\n        for (let row=0; row<Configuration.gridSize[0]; row++) \r\n            this.#model[row] = this.#initRow(row == Configuration.gridSize[0] - 1);\r\n    }\r\n\r\n    #initRow(fill) {\r\n        let newRow = [];\r\n        for (let col=0; col<Configuration.gridSize[1]; col++)\r\n            newRow[col] = +(col == 0 || col == Configuration.gridSize[1] - 1 || fill);\r\n        return newRow;\r\n    }\r\n\r\n    #init() {\r\n        this.#state = 0;\r\n        this.#play = false;\r\n        this.#board.appendChild(this.#intro);\r\n    }\r\n\r\n    #initGame() {\r\n        this.#state = 1;\r\n        this.#keyLock = false;\r\n        this.#play = true;\r\n        this.#frameCount = Configuration.frequency;\r\n        this.#keyframeCount = Configuration.keyframes;\r\n        this.#part = null;\r\n        if (this.#board.contains(this.#intro)) this.#board.removeChild(this.#intro);\r\n        if (this.#board.contains(this.#outro))this.#board.removeChild(this.#outro);\r\n        this.#initModel();\r\n        this.#renderModel();\r\n        this.#frameId = window.requestAnimationFrame(this.#frame.bind(this));\r\n    }\r\n\r\n    #endGame() {\r\n        this.#state = 2;\r\n        this.#play = false;\r\n        window.cancelAnimationFrame(this.#frameId);\r\n        this.#board.appendChild(this.#outro);\r\n    }\r\n\r\n    #frame() {\r\n        // ensure that at least minFrameTime mS have ellapsed since the last call to this method. if not, return to escape the action\r\n        let now = new Date().getTime();\r\n        if (this.#lastFrame && (now - this.#lastFrame < Configuration.minFrameTime)) {\r\n            this.#frameId = window.requestAnimationFrame(this.#frame.bind(this));\r\n            return;\r\n        }\r\n        this.#lastFrame = now;\r\n        // decrement the frame counters and call frame methods when counters ellapse\r\n        this.#frameCount--;\r\n        if (!this.#frameCount) {\r\n            this.#frameCount = Configuration.frequency;\r\n            // call the keyframe method\r\n            this.#keyframe();\r\n            this.#keyframeCount--;\r\n            if (!this.#keyframeCount) {\r\n                this.#keyframeCount = Configuration.keyframes;\r\n                // call the main frame method. if returns true(finish game flag), escape the routine here, to prevent further model rendering and animationFrame requests;\r\n                if (this.#mainframe()) return;\r\n            }\r\n            this.#renderModel();\r\n        }\r\n        if (this.#play) this.#frameId = window.requestAnimationFrame(this.#frame.bind(this));\r\n    }\r\n\r\n    #keyframe() {\r\n        if (!this.#part) {\r\n            this.#part = _src_part_factory__WEBPACK_IMPORTED_MODULE_1__.PartFactory.create();\r\n        } else {\r\n            if (this.#part.y >= 0) {\r\n                // rotate part\r\n                if (this.#keysPressed.ArrowUp || this.#keysPressed.Space) {\r\n                    if (!this.#keyLock) {\r\n                        this.#keyLock = true;\r\n                        if (this.#part) this.#part.swapInstance();\r\n                        if (this.#testPartCollision()) this.#part.swapInstance(true);\r\n                    }\r\n                }\r\n                // move part to the LEFT\r\n                if (this.#keysPressed.ArrowLeft) {\r\n                    this.#part.x--;\r\n                    if (this.#testPartCollision()) this.#part.x++;\r\n                }\r\n                // move part to the RIGHT\r\n                if (this.#keysPressed.ArrowRight) {\r\n                    this.#part.x++;\r\n                    if (this.#testPartCollision()) this.#part.x--;\r\n                }\r\n            }\r\n            // move part DOWN\r\n            if (this.#keysPressed.ArrowDown) {\r\n                this.#part.y++;\r\n                if (this.#testPartCollision()) this.#part.y--;\r\n            }\r\n        }\r\n    }\r\n\r\n    #mainframe() {\r\n        let finish = false;\r\n        this.#part.y++;\r\n        if (this.#testPartCollision()) {\r\n            this.#part.y--;\r\n            if (this.#part.y < 0) finish = true;\r\n            this.#aggregatePart();\r\n            this.#removeCompleteRows();\r\n            if (finish) this.#endGame();\r\n        }\r\n        return finish;\r\n    }\r\n\r\n    #testPartCollision() {\r\n        for (let row=0; row<4; row++) {\r\n            let y = this.#part.y + row;\r\n            if (y < 0 || y > Configuration.gridSize[0] - 1) continue;\r\n            for (let col=0; col<4; col++) {\r\n                let x = this.#part.x + col;\r\n                if (x < 0 || x > Configuration.gridSize[1] - 1) continue;\r\n                if (this.#model[y][x] & this.#part.model[row][col]) return true;\r\n            }\r\n        }\r\n        return false;\r\n    }\r\n\r\n    #aggregatePart() {\r\n        for (let row=0; row<4; row++) {\r\n            let y = this.#part.y + row;\r\n            if (y < 0 || y > Configuration.gridSize[0] - 1) continue;\r\n            for (let col=0; col<4; col++) {\r\n                let x = this.#part.x + col;\r\n                if (x < 0 || x > Configuration.gridSize[1] - 1) continue;\r\n                this.#model[y][x] = this.#model[y][x] | this.#part.model[row][col];\r\n            }\r\n        }\r\n        this.#part = null;\r\n    }\r\n\r\n    #removeCompleteRows() {\r\n        var completeRows = [];\r\n        for (let row=this.#model.length-2; row>=0; row--) { // skip verifing the last row, as this works as a border\r\n            let complete = true;\r\n            for (let col=0; col<this.#model[row].length; col++) {\r\n                if (!this.#model[row][col]) {\r\n                    complete = false;\r\n                    break;\r\n                }\r\n            }\r\n            if (complete) completeRows.push(row);\r\n        }\r\n        for (let i=0; i<completeRows.length; i++) \r\n            this.#model.splice(completeRows[i], 1);\r\n        for (let i=0; i<completeRows.length; i++)\r\n            this.#model.unshift(this.#initRow());\r\n    }\r\n\r\n    #renderModel() {\r\n        this.#board.innerHTML = '';\r\n        for (let row=0; row<this.#model.length; row++) {\r\n            for (let col=0; col<this.#model[row].length; col++) {\r\n                if (this.#model[row][col]) {\r\n                    this.#board.appendChild(_src_class_markup__WEBPACK_IMPORTED_MODULE_0__.Markup.pixel(col, row));\r\n                }\r\n            }\r\n        }\r\n        if (!this.#part) return;\r\n        for (let row=0; row<4; row++) {\r\n            for (let col=0; col<4; col++) {\r\n                if (this.#part.model[row][col]) {\r\n                    this.#board.appendChild(_src_class_markup__WEBPACK_IMPORTED_MODULE_0__.Markup.pixel(this.#part.x + col, this.#part.y + row)); \r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n}\r\n\r\n\r\n// instantiate the Tetris class to start\r\nconst tetris = new Tetris();\r\n\r\n\n\n//# sourceURL=webpack://tetris/./main.js?");

/***/ }),

/***/ "./src/class-markup.js":
/*!*****************************!*\
  !*** ./src/class-markup.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Markup: () => (/* binding */ Markup)\n/* harmony export */ });\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../main */ \"./main.js\");\n\r\n\r\nclass Markup {\r\n\r\n    static board() {\r\n        let board = document.createElement('div');\r\n        board.className = 'tetris';\r\n        board.style.cssText = `\r\n            box-sizing: content-box; \r\n            position: relative; \r\n            width: ${_main__WEBPACK_IMPORTED_MODULE_0__.Configuration.gridSize[1] * _main__WEBPACK_IMPORTED_MODULE_0__.Configuration.pixelSize}px; \r\n            height: ${_main__WEBPACK_IMPORTED_MODULE_0__.Configuration.gridSize[0] * _main__WEBPACK_IMPORTED_MODULE_0__.Configuration.pixelSize}px; \r\n            border: 1px solid #fff;\r\n            margin: 0 auto;`\r\n        return board;\r\n    }\r\n\r\n    static pixel(x, y) {\r\n        let pixel = document.createElement('div');\r\n        pixel.style.cssText = `\r\n            position: absolute; \r\n            width: ${_main__WEBPACK_IMPORTED_MODULE_0__.Configuration.pixelSize}px; \r\n            height: ${_main__WEBPACK_IMPORTED_MODULE_0__.Configuration.pixelSize}px; \r\n            top: ${y * _main__WEBPACK_IMPORTED_MODULE_0__.Configuration.pixelSize}px; \r\n            left: ${x * _main__WEBPACK_IMPORTED_MODULE_0__.Configuration.pixelSize}px; \r\n            background-color: #999999;`;\r\n        return pixel;\r\n    }\r\n\r\n    static intro() {\r\n        let intro = document.createElement('section');\r\n        intro.className = 'intro';\r\n        intro.innerHTML = `\r\n            <div>\r\n                <h1>TETRIS</h1>\r\n            </div>\r\n            <div>\r\n                <span>press the Space key to start</span>\r\n            </div>\r\n            <div>\r\n                <ul>\r\n                    <li>\r\n                        <strong>Left Arrow</strong>\r\n                        <span>move pieces towards the left</span>\r\n                    </li>\r\n                    <li>\r\n                        <strong>Right Arrow</strong>\r\n                        <span>move pieces towards the right</span>\r\n                    </li>\r\n                    <li>\r\n                        <strong>Down Arrow</strong>\r\n                        <span>accelerate pieces downwards descent</span>\r\n                    </li>\r\n                    <li>\r\n                        <strong>Up Arrow / Space bar</strong>\r\n                        <span>rotate pieces</span>\r\n                    </li>\r\n                    <li>\r\n                        <strong>Enter key / Escape</strong>\r\n                        <span>Pause / Resume game</span>\r\n                    </li>\r\n            </div>\r\n        `;\r\n        return intro;\r\n    }\r\n\r\n    static outro() {\r\n        let outro = document.createElement('section');\r\n        outro.className = 'outro';\r\n        outro.innerHTML = `\r\n            <div>\r\n                <h2>GAME OVER</h2>\r\n            </div>\r\n            <div>\r\n                <strong>press the Space key to restart</strong>\r\n            </div>\r\n        `;\r\n        return outro;\r\n    }\r\n}\r\n\r\n\r\n \n\n//# sourceURL=webpack://tetris/./src/class-markup.js?");

/***/ }),

/***/ "./src/class-part.js":
/*!***************************!*\
  !*** ./src/class-part.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Part: () => (/* binding */ Part)\n/* harmony export */ });\nclass Part {\r\n\r\n    #instances;\r\n    #instanceIndex;\r\n\r\n    constructor(instances) {\r\n        this.#instances = instances;\r\n        this.#instanceIndex = Math.floor(Math.random() * this.#instances.length);\r\n        this.model = this.#instances[this.#instanceIndex];\r\n        this.x = 4 + Math.floor(Math.random() * 2);\r\n        this.y = -4;\r\n    }\r\n\r\n    swapInstance(reverseDirection) {\r\n        if (reverseDirection) {\r\n            this.#instanceIndex--;\r\n            if (this.#instanceIndex < 0) this.#instanceIndex = this.#instances.length - 1;\r\n        }\r\n        else {\r\n            this.#instanceIndex = (this.#instanceIndex + 1) % this.#instances.length;\r\n        }\r\n        this.model = this.#instances[this.#instanceIndex];\r\n    }\r\n\r\n}\r\n\r\n\n\n//# sourceURL=webpack://tetris/./src/class-part.js?");

/***/ }),

/***/ "./src/part-factory.js":
/*!*****************************!*\
  !*** ./src/part-factory.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PartFactory: () => (/* binding */ PartFactory)\n/* harmony export */ });\n/* harmony import */ var _class_part__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class-part */ \"./src/class-part.js\");\n\r\n\r\n\r\nconst partTemplates = [\r\n    // 0: SQUARE \r\n    [\r\n        // 0: \r\n        [\r\n            [1, 1, 0, 0],\r\n            [1, 1, 0, 0],\r\n            [0, 0, 0, 0],\r\n            [0, 0, 0, 0]\r\n        ],\r\n    ],\r\n    // 1: BAR\r\n    [\r\n        // 0: \r\n        [\r\n            [0, 1, 0, 0],\r\n            [0, 1, 0, 0],\r\n            [0, 1, 0, 0],\r\n            [0, 1, 0, 0]\r\n        ],\r\n        // 1: \r\n        [\r\n            [0, 0, 0, 0],\r\n            [1, 1, 1, 1],\r\n            [0, 0, 0, 0],\r\n            [0, 0, 0, 0]\r\n        ],\r\n    ],\r\n    // 2: Z \r\n    [\r\n        // 0: \r\n        [\r\n            [1, 1, 0, 0],\r\n            [0, 1, 1, 0],\r\n            [0, 0, 0, 0],\r\n            [0, 0, 0, 0]\r\n        ],\r\n        // 0: \r\n        [\r\n            [0, 0, 1, 0],\r\n            [0, 1, 1, 0],\r\n            [0, 1, 0, 0],\r\n            [0, 0, 0, 0]\r\n        ],\r\n    ],\r\n    // 3: S\r\n    [\r\n        // 0: \r\n        [\r\n            [0, 1, 1, 0],\r\n            [1, 1, 0, 0],\r\n            [0, 0, 0, 0],\r\n            [0, 0, 0, 0]\r\n        ],\r\n        // 0: \r\n        [\r\n            [0, 1, 0, 0],\r\n            [0, 1, 1, 0],\r\n            [0, 0, 1, 0],\r\n            [0, 0, 0, 0]\r\n        ],\r\n    ],\r\n    // 4: PYRAMID \r\n    [\r\n        // 0: \r\n        [\r\n            [0, 0, 0, 0],\r\n            [0, 1, 0, 0],\r\n            [1, 1, 1, 0],\r\n            [0, 0, 0, 0]\r\n        ],\r\n        // 1: \r\n        [\r\n            [1, 0, 0, 0],\r\n            [1, 1, 0, 0],\r\n            [1, 0, 0, 0],\r\n            [0, 0, 0, 0]\r\n        ],\r\n        // 2: \r\n        [\r\n            [1, 1, 1, 0],\r\n            [0, 1, 0, 0],\r\n            [0, 0, 0, 0],\r\n            [0, 0, 0, 0]\r\n        ],\r\n        // 3: \r\n        [\r\n            [0, 0, 1, 0],\r\n            [0, 1, 1, 0],\r\n            [0, 0, 1, 0],\r\n            [0, 0, 0, 0]\r\n        ],\r\n    ],\r\n    // 5: L\r\n    [\r\n        // 0: \r\n        [\r\n            [1, 0, 0, 0],\r\n            [1, 0, 0, 0],\r\n            [1, 1, 0, 0],\r\n            [0, 0, 0, 0]\r\n        ],\r\n        // 1: \r\n        [\r\n            [0, 0, 0, 0],\r\n            [1, 1, 1, 0],\r\n            [1, 0, 0, 0],\r\n            [0, 0, 0, 0]\r\n        ],\r\n        // 2: \r\n        [\r\n            [1, 1, 0, 0],\r\n            [0, 1, 0, 0],\r\n            [0, 1, 0, 0],\r\n            [0, 0, 0, 0]\r\n        ],\r\n        // 3: \r\n        [\r\n            [0, 0, 0, 0],\r\n            [0, 0, 1, 0],\r\n            [1, 1, 1, 0],\r\n            [0, 0, 0, 0]\r\n        ]\r\n    ],\r\n    // 6: J\r\n    [\r\n        // 0: \r\n        [\r\n            [0, 0, 0, 0],\r\n            [0, 0, 0, 0],\r\n            [0, 0, 0, 0],\r\n            [0, 0, 0, 0]\r\n        ],\r\n        // 1: \r\n        [\r\n            [0, 0, 0, 0],\r\n            [0, 0, 0, 0],\r\n            [0, 0, 0, 0],\r\n            [0, 0, 0, 0]\r\n        ],\r\n        // 2: \r\n        [\r\n            [0, 0, 0, 0],\r\n            [0, 0, 0, 0],\r\n            [0, 0, 0, 0],\r\n            [0, 0, 0, 0]\r\n        ],\r\n        // 3: \r\n        [\r\n            [0, 0, 0, 0],\r\n            [0, 0, 0, 0],\r\n            [0, 0, 0, 0],\r\n            [0, 0, 0, 0]\r\n        ]\r\n    ]\r\n];\r\n\r\n\r\nclass PartFactory {\r\n\r\n    static create(partIndex) {\r\n        if (!partIndex) partIndex = Math.floor(Math.random() * (partTemplates.length - 1));\r\n        return new _class_part__WEBPACK_IMPORTED_MODULE_0__.Part(JSON.parse(JSON.stringify(partTemplates[partIndex])));\r\n    }\r\n\r\n}\r\n\r\n\n\n//# sourceURL=webpack://tetris/./src/part-factory.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;