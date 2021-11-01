/*
    LittleJS - Release build include file
    - This file is used for release builds in place of engineDebug.js
    - Debug functionality will be disabled to lower size and increase performance
*/

'use strict';

const debug = 0;
const showWatermark = 0;
const godMode = 0;
const debugOverlay = 0;
const debugPhysics = 0;
const debugParticles = 0;
const debugRaycast = 0;
const debugGamepads = 0;
const debugMedals = 0;

// debug commands are automatically removed from the final build
const ASSERT          = ()=> {}
const debugInit       = ()=> {}
const debugUpdate     = ()=> {}
const debugRender     = ()=> {}
const debugRect       = ()=> {}
const debugCircle     = ()=> {}
const debugPoint      = ()=> {}
const debugLine       = ()=> {}
const debugAABB       = ()=> {}
const debugClear      = ()=> {}
const debugSaveCanvas = ()=> {}
/**
 *  LittleJS Utility Classes and Functions
 *  <br> - General purpose math library
 *  <br> - Vector2 - fast, simple, easy 2D vector class
 *  <br> - Color - holds a rgba color with some math functions
 *  <br> - Timer - tracks time automatically
 *  @namespace Utilities
 */

'use strict';

/** A shortcut to get Math.PI
 *  @const
 *  @memberof Utilities */
const PI = Math.PI;

/** True if running a Chromium based browser
 *  @const
 *  @memberof Utilities */
const isChrome = window['chrome'];

/** Returns absoulte value of value passed in
 *  @param {Number} value
 *  @return {Number}
 *  @memberof Utilities */
const abs = (a)=> a < 0 ? -a : a;

/** Returns the sign of value passed in
 *  @param {Number} value
 *  @return {Number}
 *  @memberof Utilities */
const sign = (a)=> a < 0 ? -1 : 1;

/** Returns lowest of two values passed in
 *  @param {Number} valueA
 *  @param {Number} valueB
 *  @return {Number}
 *  @memberof Utilities */
const min = (a, b)=> a < b ?  a : b;

/** Returns highest of two values passed in
 *  @param {Number} valueA
 *  @param {Number} valueB
 *  @return {Number}
 *  @memberof Utilities */
const max = (a, b)=> a > b ?  a : b;

/** Returns first parm modulo the second param, but adjusted so negative numbers work as expected
 *  @param {Number} dividend
 *  @param {Number} divisor
 *  @return {Number}
 *  @memberof Utilities */
const mod = (a, b)=> ((a % b) + b) % b;

/** Clamps the value beween max and min
 *  @param {Number} value
 *  @param {Number} [max=1]
 *  @param {Number} [min=0]
 *  @return {Number}
 *  @memberof Utilities */
const clamp = (v, max=1, min=0)=> (ASSERT(max > min), v < min ? min : v > max ? max : v);

/** Returns what percentage the value is between max and min
 *  @param {Number} value
 *  @param {Number} [max=1]
 *  @param {Number} [min=0]
 *  @return {Number}
 *  @memberof Utilities */
const percent = (v, max=1, min=0)=> max-min ? clamp((v-min) / (max-min)) : 0;

/** Linearly interpolates the percent value between max and min
 *  @param {Number} percent
 *  @param {Number} [max=1]
 *  @param {Number} [min=0]
 *  @return {Number}
 *  @memberof Utilities */
const lerp = (p, max=1, min=0)=> min + clamp(p) * (max-min);

/** Formats seconds to 00:00 style for display purposes 
 *  @param {Number} t - time in seconds
 *  @return {String}
 *  @memberof Utilities */
const formatTime = (t)=> (t/60|0)+':'+(t%60<10?'0':'')+(t%60|0);

/** Returns the nearest power of two not less then the value
 *  @param {Number} value
 *  @return {Number}
 *  @memberof Utilities */
const nearestPowerOfTwo = (v)=> 2**Math.ceil(Math.log2(v));

/** Applies smoothstep function to the percentage value
 *  @param {Number} value
 *  @return {Number}
 *  @memberof Utilities */
const smoothStep = (p)=> p * p * (3 - 2 * p);

/** Returns true if two axis aligned bounding boxes are overlapping 
 *  @param {Vector2} pointA - Center of box A
 *  @param {Vector2} sizeA  - Size of box A
 *  @param {Vector2} pointB - Center of box B
 *  @param {Vector2} sizeB  - Size of box B
 *  @return {Boolean}       - True if overlapping
 *  @memberof Utilities */
const isOverlapping = (pA, sA, pB, sB)=> abs(pA.x - pB.x)*2 < sA.x + sB.x & abs(pA.y - pB.y)*2 < sA.y + sB.y;

/** Returns an oscillating wave between 0 and amplitude with frequency of 1 Hz by default
 *  @param {Number} [frequency=1] - Frequency of the wave in Hz
 *  @param {Number} [amplitude=1] - Amplitude (max height) of the wave
 *  @param {Number} [t=time]      - Value to use for time of the wave
 *  @return {Number}              - Value waving between 0 and amplitude
 *  @memberof Utilities */
const wave = (frequency=1, amplitude=1, t=time)=> amplitude/2 * (1 - Math.cos(t*frequency*2*PI));

///////////////////////////////////////////////////////////////////////////////

/** Random global functions
 *  @namespace Random */

/** Returns a random value between the two values passed in
 *  @param {Number} [valueA=1]
 *  @param {Number} [valueB=0]
 *  @return {Number}
 *  @memberof Random */
const rand = (a=1, b=0)=> b + (a-b)*Math.random();

/** Returns a floored random value the two values passed in
 *  @param {Number} [valueA=1]
 *  @param {Number} [valueB=0]
 *  @return {Number}
 *  @memberof Random */
const randInt = (a=1, b=0)=> rand(a,b)|0;

/** Randomly returns either -1 or 1
 *  @return {Number}
 *  @memberof Random */
const randSign = ()=> (rand(2)|0)*2-1;

/** Returns a random Vector2 within a circular shape
 *  @param {Number} [radius=1]
 *  @param {Number} [minRadius=0]
 *  @return {Vector2}
 *  @memberof Random */
const randInCircle = (radius=1, minRadius=0)=> radius > 0 ? randVector(radius * rand(minRadius / radius, 1)**.5) : new Vector2;

/** Returns a random Vector2 with the passed in length
 *  @param {Number} [length=1]
 *  @return {Vector2}
 *  @memberof Random */
const randVector = (length=1)=> new Vector2().setAngle(rand(2*PI), length);

/** Returns a random color between the two passed in colors, combine components if linear
 *  @param {Color}   [colorA=new Color(1,1,1,1)]
 *  @param {Color}   [colorB=new Color(0,0,0,1)]
 *  @param {Boolean} [linear]
 *  @return {Color}
 *  @memberof Random */
const randColor = (cA = new Color, cB = new Color(0,0,0,1), linear)=>
    linear ? cA.lerp(cB, rand()) : new Color(rand(cA.r,cB.r),rand(cA.g,cB.g),rand(cA.b,cB.b),rand(cA.a,cB.a));

/** The seed used by the randSeeded function, should not be 0
 *  @memberof Random */
let randSeed = 1;

/** Returns a seeded random value between the two values passed in using randSeed
 *  @param {Number} [valueA=1]
 *  @param {Number} [valueB=0]
 *  @return {Number}
 *  @memberof Random */
const randSeeded = (a=1, b=0)=>
{
    randSeed ^= randSeed << 13; randSeed ^= randSeed >>> 17; randSeed ^= randSeed << 5; // xorshift
    return b + (a-b)*abs(randSeed % 1e9)/1e9;
}

///////////////////////////////////////////////////////////////////////////////

/** Create a 2d vector, can take another Vector2 to copy, 2 scalars, or 1 scalar
 *  @param {Number} [x=0]
 *  @param {Number} [y=0]
 *  @return {Vector2}
 *  @memberof Utilities */
const vec2 = (x=0, y)=> x.x == undefined ? new Vector2(x, y == undefined? x : y) : new Vector2(x.x, x.y);

/** 2D Vector object with vector math library */
class Vector2
{
    /** Create a 2D vector with the x and y passed in, can also be created with vec2()
     *  @param {Number} [x=0] - x axis position
     *  @param {Number} [y=0] - y axis position */
    constructor(x=0, y=0) { this.x = x; this.y = y; }

    /** Returns a new vector that is a copy of this
     *  @return {Vector2} */
    copy() { return new Vector2(this.x, this.y); }

    /** Returns a copy of this vector plus the vector passed in
     *  @param {Vector2} vector
     *  @return {Vector2} */
    add(v) { ASSERT(v.x!=undefined); return new Vector2(this.x + v.x, this.y + v.y); }

    /** Returns a copy of this vector minus the vector passed in
     *  @param {Vector2} vector
     *  @return {Vector2} */
    subtract(v) { ASSERT(v.x!=undefined); return new Vector2(this.x - v.x, this.y - v.y); }

    /** Returns a copy of this vector times the vector passed in
     *  @param {Vector2} vector
     *  @return {Vector2} */
    multiply(v) { ASSERT(v.x!=undefined); return new Vector2(this.x * v.x, this.y * v.y); }

    /** Returns a copy of this vector divided by the vector passed in
     *  @param {Vector2} vector
     *  @return {Vector2} */
    divide(v) { ASSERT(v.x!=undefined); return new Vector2(this.x / v.x, this.y / v.y); }

    /** Returns a copy of this vector scaled by the vector passed in
     *  @param {Number} scale
     *  @return {Vector2} */
    scale(s) { ASSERT(s.x==undefined); return new Vector2(this.x * s, this.y * s); }

    /** Returns the length of this vector
     * @return {Number} */
    length() { return this.lengthSquared()**.5; }

    /** Returns the length of this vector squared
     * @return {Number} */
    lengthSquared() { return this.x**2 + this.y**2; }

    /** Returns the distance from this vector to vector passed in
     * @param {Vector2} vector
     * @return {Number} */
    distance(v) { return this.distanceSquared(v)**.5; }

    /** Returns the distance squared from this vector to vector passed in
     * @param {Vector2} vector
     * @return {Number} */
    distanceSquared(v) { return (this.x - v.x)**2 + (this.y - v.y)**2; }

    /** Returns a new vector in same direction as this one with the length passed in
     * @param {Number} [length=1]
     * @return {Vector2} */
    normalize(length=1) { const l = this.length(); return l ? this.scale(length/l) : new Vector2(length); }

    /** Returns a new vector clamped to length passed in
     * @param {Number} [length=1]
     * @return {Vector2} */
    clampLength(length=1) { const l = this.length(); return l > length ? this.scale(length/l) : this; }

    /** Returns the dot product of this and the vector passed in
     * @param {Vector2} vector
     * @return {Number} */
    dot(v) { ASSERT(v.x!=undefined); return this.x*v.x + this.y*v.y; }

    /** Returns the cross product of this and the vector passed in
     * @param {Vector2} vector
     * @return {Number} */
    cross(v) { ASSERT(v.x!=undefined); return this.x*v.y - this.y*v.x; }

    /** Returns the angle of this vector, up is angle 0
     * @return {Number} */
    angle() { return Math.atan2(this.x, this.y); }

    /** Sets this vector with angle and length passed in
     * @param {Number} [angle=0]
     * @param {Number} [length=1] */
    setAngle(a=0, length=1) { this.x = length*Math.sin(a); this.y = length*Math.cos(a); return this; }

    /** Returns copy of this vector rotated by the angle passed in
     * @param {Number} angle
     * @return {Vector2} */
    rotate(a) { const c = Math.cos(a), s = Math.sin(a); return new Vector2(this.x*c-this.y*s, this.x*s+this.y*c); }

    /** Returns the integer direction of this vector, corrosponding to multiples of 90 degree rotation (0-3)
     * @return {Number} */
    direction() { return abs(this.x) > abs(this.y) ? this.x < 0 ? 3 : 1 : this.y < 0 ? 2 : 0; }

    /** Returns a copy of this vector that has been inverted
     * @return {Vector2} */
    invert() { return new Vector2(this.y, -this.x); }

    /** Returns a copy of this vector with the axies flipped
     * @return {Vector2} */
    flip() { return new Vector2(this.y, this.x); }

    /** Returns a copy of this vector with each axis floored
     * @return {Vector2} */
    floor() { return new Vector2(Math.floor(this.x), Math.floor(this.y)); }

    /** Returns the area this vector covers as a rectangle
     * @return {Number} */
    area() { return this.x * this.y; }

    /** Returns a new vector that is p percent between this and the vector passed in
     * @param {Vector2} vector
     * @param {Number}  percent
     * @return {Vector2} */
    lerp(v, p) { ASSERT(v.x!=undefined); return this.add(v.subtract(this).scale(clamp(p))); }

    /** Returns true if this vector is within the bounds of an array size passed in
     * @param {Vector2} arraySize
     * @return {Boolean} */
    arrayCheck(arraySize) { return this.x >= 0 && this.y >= 0 && this.x < arraySize.x && this.y < arraySize.y; } 
}

///////////////////////////////////////////////////////////////////////////////

/** Color object (red, green, blue, alpha) with some helpful functions */
class Color
{
    /** Create a color with the components passed in, white by default
     *  @param {Number} [r=1] - red
     *  @param {Number} [g=1] - green
     *  @param {Number} [b=1] - blue
     *  @param {Number} [a=1] - alpha */
    constructor(r=1, g=1, b=1, a=1) { this.r=r; this.g=g; this.b=b; this.a=a; }

    /** Returns a new color that is a copy of this
     * @return {Color} */
    copy() { return new Color(this.r, this.g, this.b, this.a); }

    /** Returns a copy of this color plus the color passed in
     * @param {Color} color
     * @return {Color} */
    add(c) { return new Color(this.r+c.r, this.g+c.g, this.b+c.b, this.a+c.a); }

    /** Returns a copy of this color minus the color passed in
     * @param {Color} color
     * @return {Color} */
    subtract(c) { return new Color(this.r-c.r, this.g-c.g, this.b-c.b, this.a-c.a); }

    /** Returns a copy of this color times the color passed in
     * @param {Color} color
     * @return {Color} */
    multiply(c) { return new Color(this.r*c.r, this.g*c.g, this.b*c.b, this.a*c.a); }

    /** Returns a copy of this color divided by the color passed in
     * @param {Color} color
     * @return {Color} */
    divide(c) { return new Color(this.r/c.r, this.g/c.g, this.b/c.b, this.a/c.a); }

    /** Returns a copy of this color scaled by the value passed in, alpha can be scaled separately
     * @param {Number} scale
     * @param {Number} [alphaScale=scale]
     * @return {Color} */
    scale(s, a=s) { return new Color(this.r*s, this.g*s, this.b*s, this.a*a); }

    /** Returns a copy of this color clamped to the valid range between 0 and 1
     * @return {Color} */
    clamp() { return new Color(clamp(this.r), clamp(this.g), clamp(this.b), clamp(this.a)); }

    /** Returns a new color that is p percent between this and the color passed in
     * @param {Color}  color
     * @param {Number} percent
     * @return {Color} */
    lerp(c, p) { return this.add(c.subtract(this).scale(clamp(p))); }

    /** Sets this color given a hue, saturation, lightness , and alpha
     * @param {Number} [hue=0]
     * @param {Number} [saturation=0]
     * @param {Number} [lightness=1]
     * @param {Number} [alpha=1]
     * @return {Color} */
    setHSLA(h=0, s=0, l=1, a=1)
    {
        const q = l < .5 ? l*(1+s) : l+s-l*s, p = 2*l-q,
            f = (p, q, t)=>
                (t = ((t%1)+1)%1) < 1/6 ? p+(q-p)*6*t :
                t < 1/2 ? q :
                t < 2/3 ? p+(q-p)*(2/3-t)*6 : p;
                
        this.r = f(p, q, h + 1/3);
        this.g = f(p, q, h);
        this.b = f(p, q, h - 1/3);
        this.a = a;
        return this;
    }

    /** Returns a new color that has each component randomly adjusted
     * @param {Number} [amount=.05]
     * @param {Number} [alphaAmount=0]
     * @return {Color} */
    mutate(amount=.05, alphaAmount=0) 
    {
        return new Color
        (
            this.r + rand(amount, -amount),
            this.g + rand(amount, -amount),
            this.b + rand(amount, -amount),
            this.a + rand(alphaAmount, -alphaAmount)
        ).clamp();
    }

    /** Returns this color expressed as an rgba string
     * @return {String} */
    rgba()      
    { 
        ASSERT(this.r>=0 && this.r<=1 && this.g>=0 && this.g<=1 && this.b>=0 && this.b<=1 && this.a>=0 && this.a<=1);
        return `rgb(${this.r*255|0},${this.g*255|0},${this.b*255|0},${this.a})`; 
    }
    
    /** Returns this color expressed as 32 bit integer value
     * @return {Number} */
    rgbaInt()  
    {
        ASSERT(this.r>=0 && this.r<=1 && this.g>=0 && this.g<=1 && this.b>=0 && this.b<=1 && this.a>=0 && this.a<=1);
        return (this.r*255|0) + (this.g*255<<8) + (this.b*255<<16) + (this.a*255<<24); 
    }
}

///////////////////////////////////////////////////////////////////////////////

/** Timer object tracks how long has passed since it was set */
class Timer
{
    /** Create a timer object set time passed in
     *  @param {Number} [timeLeft] - How much time left before the timer elapses in seconds */
    constructor(timeLeft) { this.time = timeLeft == undefined ? undefined : time + timeLeft; this.setTime = timeLeft; }

    /** Set the timer with seconds passed in
     *  @param {Number} [timeLeft=0] - How much time left before the timer is elapsed in seconds */
    set(timeLeft=0) { this.time = time + timeLeft; this.setTime = timeLeft; }

    /** Unset the timer */
    unset() { this.time = undefined; }

    /** Returns true if set
     * @return {Boolean} */
    isSet() { return this.time != undefined; }

    /** Returns true if set and has not elapsed
     * @return {Boolean} */
    active() { return time <= this.time; }

    /** Returns true if set and elapsed
     * @return {Boolean} */
    elapsed() { return time >  this.time; }

    /** Get how long since elapsed, returns 0 if not set
     * @return {Number} */
    get() { return this.isSet()? time - this.time : 0; }

    /** Get percentage elapsed based on time it was set to, returns 0 if not set
     * @return {Number} */
    getPercent() { return this.isSet()? percent(this.time - time, 0, this.setTime) : 0; }
}
/**
 *  LittleJS Engine Settings
 *  @namespace Settings
 */

'use strict';

///////////////////////////////////////////////////////////////////////////////
// Display settings

/** The max width of the canvas, centered if window is larger
 *  @default
 *  @memberof Settings */
const maxWidth = 1920;

/** The max height of the canvas, centered if window is larger
 *  @default
 *  @memberof Settings */
const maxHeight = 1200; // up to 1080p and 16:10

/** Fixed witdh, if enabled cavnvas size never changes
 *  @default
 *  @memberof Settings */
let fixedWidth = 0;

/** Fixed height, if enabled cavnvas size never changes
 *  @default
 *  @memberof Settings */
let fixedHeight = 0;

/** Fit to canvas to window by adding space on top or bottom if necessary
 *  @default
 *  @memberof Settings */
let fixedFitToWindow = 1;

/** Default font used for text rendering
 *  @default
 *  @memberof Settings */
let defaultFont = 'arial';

///////////////////////////////////////////////////////////////////////////////
// Tile sheet settings

/** Default size of tiles in pixels
 *  @type {Vector2} 
 *  @default
 *  @memberof Settings */
const defaultTileSize = vec2(16);

/** Prevent tile bleeding from neighbors in pixels
 *  @default
 *  @memberof Settings */
const tileBleedShrinkFix = .3;

/** Use crisp pixels for pixel art if true
 *  @default
 *  @memberof Settings */
let pixelated = 1;

///////////////////////////////////////////////////////////////////////////////
// Object settings

/** Default size of objects
 *  @type {Vector2} 
 *  @default
 *  @memberof Settings */
const defaultObjectSize = vec2(1);

/** Default object mass for collison calcuations (how heavy objects are)
 *  @default
 *  @memberof Settings */
const defaultObjectMass = 1;

/** How much to slow velocity by each frame (0-1)
 *  @default
 *  @memberof Settings */
const defaultObjectDamping = .99;

/** How much to slow angular velocity each frame (0-1)
 *  @default
 *  @memberof Settings */
const defaultObjectAngleDamping = .99;

/** How much to bounce when a collision occurs (0-1)
 *  @default
 *  @memberof Settings */
const defaultObjectElasticity = 0;

/** How much to slow when touching (0-1)
 *  @default
 *  @memberof Settings */
const defaultObjectFriction = .8;

/** Clamp max speed to avoid fast objects missing collisions
 *  @default
 *  @memberof Settings */
const maxObjectSpeed = 1;

/** How much gravity to apply to objects along the Y axis, negative is down
 *  @default
 *  @memberof Settings */
let gravity = 0;

///////////////////////////////////////////////////////////////////////////////
// Camera settings

/** Position of camera in world space
 *  @type {Vector2}
 *  @default
 *  @memberof Settings */
let cameraPos = vec2();

/** Scale of camera in world space
 *  @default
 *  @memberof Settings */
let cameraScale = max(defaultTileSize.x, defaultTileSize.y);

///////////////////////////////////////////////////////////////////////////////
// WebGL settings

/** Enable webgl rendering, webgl can be disabled and removed from build (with some features disabled)
 *  @default
 *  @memberof Settings */
const glEnable = 1;

/** Fixes slow rendering in some browsers by not compositing the WebGL canvas
 *  @default
 *  @memberof Settings */
let glOverlay = 1;

///////////////////////////////////////////////////////////////////////////////
// Input settings

/** Should gamepads be allowed
 *  @default
 *  @memberof Settings */
const gamepadsEnable = 1;

/** If true touch input is routed to mouse functions
 *  @default
 *  @memberof Settings */
const touchInputEnable = 1;

/** Allow players to use dpad as analog stick
 *  @default
 *  @memberof Settings */
const copyGamepadDirectionToStick = 1;

/** allow players to use WASD as direction keys
 *  @default
 *  @memberof Settings */
const copyWASDToDpad = 1;

///////////////////////////////////////////////////////////////////////////////
// Audio settings

/** All audio code can be disabled and removed from build
 *  @default
 *  @memberof Settings */
const soundEnable = 1;

/** Volume scale to apply to all sound, music and speech
 *  @default
 *  @memberof Settings */
let audioVolume = .5;

/** Default range where sound no longer plays
 *  @default
 *  @memberof Settings */
const defaultSoundRange = 30;

/** Default range percent to start tapering off sound (0-1)
 *  @default
 *  @memberof Settings */
const defaultSoundTaper = .7;

///////////////////////////////////////////////////////////////////////////////
// Medals settings

/** How long to show medals for in seconds
 *  @default
 *  @memberof Settings */
const medalDisplayTime = 5;

/** How quickly to slide on/off medals in seconds
 *  @default
 *  @memberof Settings */
const medalDisplaySlideTime = .5;

/** Width of medal display
 *  @default
 *  @memberof Settings */
const medalDisplayWidth = 640;

/** Height of medal display
 *  @default
 *  @memberof Settings */
const medalDisplayHeight = 99;

/** Size of icon in medal display
 *  @default
 *  @memberof Settings */
const medalDisplayIconSize = 80;
/*
    LittleJS - The Tiny JavaScript Game Engine That Can!
    MIT License - Copyright 2021 Frank Force

    Engine Features
    - Object oriented system with base class engine object
    - Base class object handles update, physics, collision, rendering, etc
    - Engine helper classes and functions like Vector2, Color, and Timer
    - Super fast rendering system for tile sheets
    - Sound effects audio with zzfx and music with zzfxm
    - Input processing system with gamepad and touchscreen support
    - Tile layer rendering and collision system
    - Particle effect system
    - Medal system tracks and displays achievements
    - Debug tools and debug rendering system
    - Call engineInit() to start it up!
*/

'use strict';

/** Name of engine */
const engineName = 'LittleJS';

/** Version of engine */
const engineVersion = '1.1.2';

/** Frames per second to update objects
 *  @default */
const FPS = 60;

/** How many seconds each frame lasts, engine uses a fixed time step
 *  @default 1/60 */
const timeDelta = 1/FPS;

/** Array containing all engine objects */
let engineObjects = [];

/** Array containing only objects that are set to collide with other objects (for optimization) */
let engineCollideObjects = [];

/** Current update frame, used to calculate time */
let frame = 0;

/** Current engine time since start in seconds, derived from frame */
let time = 0;

/** Actual clock time since start in seconds (not affected by pause or frame rate clamping) */
let timeReal = 0;

/** Is the game paused? Causes time and objects to not be updated. */
let paused = 0;

// Engine internal variables not exposed to documentation
let frameTimeLastMS = 0, frameTimeBufferMS = 0, debugFPS = 0, 
    shrinkTilesX, shrinkTilesY, drawCount, tileImageSize, tileImageSizeInverse;

///////////////////////////////////////////////////////////////////////////////

/** Start up LittleJS engine with your callback functions
 *  @param {Function} gameInit       - Called once after the engine starts up, setup the game
 *  @param {Function} gameUpdate     - Called every frame at 60 frames per second, handle input and update the game state
 *  @param {Function} gameUpdatePost - Called after physics and objects are updated, setup camera and prepare for render
 *  @param {Function} gameRender     - Called before objects are rendered, draw any background effects that appear behind objects
 *  @param {Function} gameRenderPost - Called after objects are rendered, draw effects or hud that appear above all objects
 *  @param {String} tileImageSource  - Tile image to use, everything starts when the image is finished loading
 */
function engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, tileImageSource)
{
    // init engine when tiles load
    tileImage.onload = ()=>
    {
        // save tile image info
        tileImageSizeInverse = vec2(1).divide(tileImageSize = vec2(tileImage.width, tileImage.height));
        debug && (tileImage.onload=()=>ASSERT(1)); // tile sheet can not reloaded
        shrinkTilesX = tileBleedShrinkFix/tileImageSize.x;
        shrinkTilesY = tileBleedShrinkFix/tileImageSize.y;

        // setup html
        document.body.appendChild(mainCanvas = document.createElement('canvas'));
        document.body.style = 'margin:0;overflow:hidden;background:#000';
        mainCanvas.style = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)' +
            (pixelated ? ';image-rendering:crisp-edges;image-rendering:pixelated' : ''); // pixelated rendering
        mainContext = mainCanvas.getContext('2d');

        // init stuff and start engine
        debugInit();
        glInit();

        // create overlay canvas for hud to appear above gl canvas
        document.body.appendChild(overlayCanvas = document.createElement('canvas'));
        overlayCanvas.style = 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)';
        overlayContext = overlayCanvas.getContext('2d');

        gameInit();
        engineUpdate();
    };

    // main update loop
    const engineUpdate = (frameTimeMS=0)=>
    {
        requestAnimationFrame(engineUpdate);

        // update time keeping
        let frameTimeDeltaMS = frameTimeMS - frameTimeLastMS;
        frameTimeLastMS = frameTimeMS;
        if (debug || showWatermark)
            debugFPS = lerp(.05, 1e3/(frameTimeDeltaMS||1), debugFPS);
        if (debug)
            frameTimeDeltaMS *= keyIsDown(107) ? 5 : keyIsDown(109) ? .2 : 1; // +/- to speed/slow time
        timeReal += frameTimeDeltaMS / 1e3;
        frameTimeBufferMS = min(frameTimeBufferMS + !paused * frameTimeDeltaMS, 50); // clamp incase of slow framerate

        if (paused)
        {
            // do post update even when paused
            inputUpdate();
            debugUpdate();
            gameUpdatePost();
            inputUpdatePost();
        }
        else
        {
            // apply time delta smoothing, improves smoothness of framerate in some browsers
            let deltaSmooth = 0;
            if (frameTimeBufferMS < 0 && frameTimeBufferMS > -9)
            {
                // force an update each frame if time is close enough (not just a fast refresh rate)
                deltaSmooth = frameTimeBufferMS;
                frameTimeBufferMS = 0;
            }
            
            // update multiple frames if necessary in case of slow framerate
            for (;frameTimeBufferMS >= 0; frameTimeBufferMS -= 1e3 / FPS)
            {
                // update game and objects
                inputUpdate();
                gameUpdate();
                engineObjectsUpdate();

                // do post update
                debugUpdate();
                gameUpdatePost();
                inputUpdatePost();
            }

            // add the time smoothing back in
            frameTimeBufferMS += deltaSmooth;
        }

        if (fixedWidth)
        {
            // clear set fixed size
            mainCanvas.width  = fixedWidth;
            mainCanvas.height = fixedHeight;
            
            if (fixedFitToWindow)
            {
                // fit to window by adding space on top or bottom if necessary
                const aspect = innerWidth / innerHeight;
                const fixedAspect = fixedWidth / fixedHeight;
                mainCanvas.style.width  = overlayCanvas.style.width  = aspect < fixedAspect ? '100%' : '';
                mainCanvas.style.height = overlayCanvas.style.height = aspect < fixedAspect ? '' : '100%';
                if (glCanvas)
                {
                    glCanvas.style.width  = mainCanvas.style.width;
                    glCanvas.style.height = mainCanvas.style.height;
                }
            }
        }
        else
        {
            // clear and set size to same as window
            mainCanvas.width  = min(innerWidth,  maxWidth);
            mainCanvas.height = min(innerHeight, maxHeight);
        }
        
        // save canvas size and clear overlay canvas
        mainCanvasSize = vec2(overlayCanvas.width = mainCanvas.width, overlayCanvas.height = mainCanvas.height);
        mainContext.imageSmoothingEnabled = !pixelated; // disable smoothing for pixel art

        // render sort then render while removing destroyed objects
        glPreRender(mainCanvas.width, mainCanvas.height);
        gameRender();
        engineObjects.sort((a,b)=> a.renderOrder - b.renderOrder);
        for (const o of engineObjects)
            o.destroyed || o.render();
        gameRenderPost();
        medalsRender();
        debugRender();
        glCopyToContext(mainContext);

        if (showWatermark)
        {
            // update fps
            overlayContext.textAlign = 'right';
            overlayContext.textBaseline = 'top';
            overlayContext.font = '1em monospace';
            overlayContext.fillStyle = '#000';
            const text = engineName + ' ' + 'v' + engineVersion + ' / ' 
                + drawCount + ' / ' + engineObjects.length + ' / ' + debugFPS.toFixed(1);
            overlayContext.fillText(text, mainCanvas.width-3, 3);
            overlayContext.fillStyle = '#fff';
            overlayContext.fillText(text, mainCanvas.width-2, 2);
            drawCount = 0;
        }
    }

    // set tile image source to load the image and start the engine
    tileImageSource ? tileImage.src = tileImageSource : tileImage.onload();
}


///////////////////////////////////////////////////////////////////////////////

/** Calls update on each engine object (recursively if child), removes destroyed objects, and updated time */
function engineObjectsUpdate()
{
    // recursive object update
    const updateObject = (o)=>
    {
        if (!o.destroyed)
        {
            o.update();
            for (const child of o.children)
                updateObject(child);
        }
    }
    for (const o of engineObjects)
        o.parent || updateObject(o);

    // remove destroyed objects
    engineObjects = engineObjects.filter(o=>!o.destroyed);
    engineCollideObjects = engineCollideObjects.filter(o=>!o.destroyed);

    // increment frame and update time
    time = ++frame / FPS;
}

/** Detroy and remove all objects that are not persistent or descendants of a persistent object */
function engineObjectsDestroy()
{
    for (const o of engineObjects)
        o.persistent || o.parent || o.destroy();
    engineObjects = engineObjects.filter(o=>!o.destroyed);
}

/** Triggers a callback for each object within a given area
 *  @param {Vector2} [pos] - Center of test area
 *  @param {Number} [size] - Radius of circle if float, rectangle size if Vector2
 *  @param {Function} [callbackFunction] - Calls this function on every object that passes the test
 *  @param {Array} [objects=engineObjects] - List of objects to check */
function engineObjectsCallback(pos, size, callbackFunction, objects=engineObjects)
{
    if (!pos)
    {
        // all objects
        for (const o of objects)
            callbackFunction(o);
    }
    else if (size.x != undefined)
    {
        // aabb test
        for (const o of objects)
            isOverlapping(pos, size, o.pos, o.size) && callbackFunction(o);
    }
    else
    {
        // circle test
        const sizeSquared = size*size;
        for (const o of objects)
            pos.distanceSquared(o.pos) < sizeSquared && callbackFunction(o);
    }
}
/*
    LittleJS Object System
*/

'use strict';

/** 
 *  LittleJS Object Base Object Class
 *  <br> - Base object class used by the engine
 *  <br> - Automatically adds self to object list
 *  <br> - Will be updated and rendered each frame
 *  <br> - Renders as a sprite from a tilesheet by default
 *  <br> - Can have color and addtive color applied
 *  <br> - 2d Physics and collision system
 *  <br> - Sorted by renderOrder
 *  <br> - Objects can have children attached
 *  <br> - Parents are updated before children, and set child transform
 *  <br> - Call destroy() to get rid of objects
 */
class EngineObject
{
    /**
     * Create an engine object and adds it to the list of objects
     * @param {Vector2} [position=new Vector2(0,0)] - World space position of the object
     * @param {Vector2} [size=defaultObjectSize] - World space size of the object
     * @param {Number}  [tileIndex=-1] - Tile to use to render object, untextured if -1
     * @param {Vector2} [tileSize=defaultTileSize] - Size of tile in source pixels
     * @param {Number}  [angle=0] - Angle to rotate the object
     * @param {Color}   [color] - Color to apply to tile when rendered
     */
    constructor(pos=vec2(), size=defaultObjectSize, tileIndex=-1, tileSize=defaultTileSize, angle=0, color)
    {
        // set passed in params
        ASSERT(pos && pos.x != undefined && size.x != undefined); // ensure pos and size are vec2s
        this.pos = pos.copy();
        this.size = size;
        this.tileIndex = tileIndex;
        this.tileSize = tileSize;
        this.angle = angle;
        this.color = color;

        // set physics defaults
        this.mass         = defaultObjectMass;
        this.damping      = defaultObjectDamping;
        this.angleDamping = defaultObjectAngleDamping;
        this.elasticity   = defaultObjectElasticity;
        this.friction     = defaultObjectFriction;

        // init other object stuff
        this.spawnTime = time;
        this.velocity = vec2(this.collideSolidObjects = this.renderOrder = this.angleVelocity = 0);
        this.collideTiles = this.gravityScale = 1;
        this.children = [];

        // add to list of objects
        engineObjects.push(this);
    }
    
    /** Update the object transform and physics, called automatically by engine once each frame */
    update()
    {
        const parent = this.parent;
        if (parent)
        {
            // copy parent pos/angle
            this.pos = this.localPos.multiply(vec2(parent.getMirrorSign(),1)).rotate(-parent.angle).add(parent.pos);
            this.angle = parent.getMirrorSign()*this.localAngle + parent.angle;
            return;
        }

        // limit max speed to prevent missing collisions
        this.velocity.x = clamp(this.velocity.x, maxObjectSpeed, -maxObjectSpeed);
        this.velocity.y = clamp(this.velocity.y, maxObjectSpeed, -maxObjectSpeed);

        // apply physics
        const oldPos = this.pos.copy();
        this.pos.x += this.velocity.x = this.damping * this.velocity.x;
        this.pos.y += this.velocity.y = this.damping * this.velocity.y + gravity * this.gravityScale;
        this.angle += this.angleVelocity *= this.angleDamping;

        // physics sanity checks
        ASSERT(this.angleDamping >= 0 && this.angleDamping <= 1);
        ASSERT(this.damping >= 0 && this.damping <= 1);

        if (!this.mass) // do not update collision for fixed objects
            return;

        const wasMovingDown = this.velocity.y < 0;
        if (this.groundObject)
        {
            // apply friction in local space of ground object
            const groundSpeed = this.groundObject.velocity ? this.groundObject.velocity.x : 0;
            this.velocity.x = groundSpeed + (this.velocity.x - groundSpeed) * this.friction;
            this.groundObject = 0;
            //debugPhysics && debugPoint(this.pos.subtract(vec2(0,this.size.y/2)), '#0f0');
        }

        if (this.collideSolidObjects)
        {
            // check collisions against solid objects
            const epsilon = 1e-3; // necessary to push slightly outside of the collision
            for (const o of engineCollideObjects)
            {
                // non solid objects don't collide with eachother
                if (!this.isSolid & !o.isSolid || o.destroyed || o.parent)
                    continue;

                // check collision
                if (!isOverlapping(this.pos, this.size, o.pos, o.size) || o == this)
                    continue;

                // pass collision to objects
                if (!this.collideWithObject(o) | !o.collideWithObject(this))
                    continue;

                if (isOverlapping(oldPos, this.size, o.pos, o.size))
                {
                    // if already was touching, try to push away
                    const deltaPos = oldPos.subtract(o.pos);
                    const length = deltaPos.length();
                    const pushAwayAccel = .001; // push away if alread overlapping
                    const velocity = length < .01 ? randVector(pushAwayAccel) : deltaPos.scale(pushAwayAccel/length);
                    this.velocity = this.velocity.add(velocity);
                    if (o.mass) // push away if not fixed
                        o.velocity = o.velocity.subtract(velocity);
                        
                    debugPhysics && debugAABB(this.pos, this.size, o.pos, o.size, '#f00');
                    continue;
                }

                // check for collision
                const sx = this.size.x + o.size.x;
                const sy = this.size.y + o.size.y;
                const smallStepUp = (oldPos.y - o.pos.y)*2 > sy + gravity; // prefer to push up if small delta
                const isBlockedX = abs(oldPos.y - o.pos.y)*2 < sy;
                const isBlockedY = abs(oldPos.x - o.pos.x)*2 < sx;
                
                if (smallStepUp || isBlockedY || !isBlockedX) // resolve y collision
                {
                    // push outside object collision
                    this.pos.y = o.pos.y + (sy/2 + epsilon) * sign(oldPos.y - o.pos.y);
                    if (o.groundObject && wasMovingDown || !o.mass)
                    {
                        // set ground object if landed on something
                        if (wasMovingDown)
                            this.groundObject = o;

                        // bounce if other object is fixed or grounded
                        this.velocity.y *= -this.elasticity;
                    }
                    else if (o.mass)
                    {
                        // inelastic collision
                        const inelastic = (this.mass * this.velocity.y + o.mass * o.velocity.y) / (this.mass + o.mass);

                        // elastic collision
                        const elastic0 = this.velocity.y * (this.mass - o.mass) / (this.mass + o.mass)
                            + o.velocity.y * 2 * o.mass / (this.mass + o.mass);
                        const elastic1 = o.velocity.y * (o.mass - this.mass) / (this.mass + o.mass)
                            + this.velocity.y * 2 * this.mass / (this.mass + o.mass);

                        // lerp betwen elastic or inelastic based on elasticity
                        const elasticity = max(this.elasticity, o.elasticity);
                        this.velocity.y = lerp(elasticity, elastic0, inelastic);
                        o.velocity.y = lerp(elasticity, elastic1, inelastic);
                    }
                    debugPhysics && smallStepUp && (abs(oldPos.x - o.pos.x)*2 > sx) && console.log('stepUp', oldPos.y - o.pos.y);
                }
                if (!smallStepUp && (isBlockedX || !isBlockedY)) // resolve x collision
                {
                    // push outside collision
                    this.pos.x = o.pos.x + (sx/2 + epsilon) * sign(oldPos.x - o.pos.x);
                    if (o.mass)
                    {
                        // inelastic collision
                        const inelastic = (this.mass * this.velocity.x + o.mass * o.velocity.x) / (this.mass + o.mass);

                        // elastic collision
                        const elastic0 = this.velocity.x * (this.mass - o.mass) / (this.mass + o.mass)
                            + o.velocity.x * 2 * o.mass / (this.mass + o.mass);
                        const elastic1 = o.velocity.x * (o.mass - this.mass) / (this.mass + o.mass)
                            + this.velocity.x * 2 * this.mass / (this.mass + o.mass);

                        // lerp betwen elastic or inelastic based on elasticity
                        const elasticity = max(this.elasticity, o.elasticity);
                        this.velocity.x = lerp(elasticity, elastic0, inelastic);
                        o.velocity.x = lerp(elasticity, elastic1, inelastic);
                    }
                    else // bounce if other object is fixed
                        this.velocity.x *= -this.elasticity;
                }

                debugPhysics && debugAABB(this.pos, this.size, o.pos, o.size, '#f0f');
            }
        }
        if (this.collideTiles)
        {
            // check collision against tiles
            if (tileCollisionTest(this.pos, this.size, this))
            {
                //debugPhysics && debugRect(this.pos, this.size, '#ff0');

                // if already was stuck in collision, don't do anything
                // this should not happen unless something starts in collision
                if (!tileCollisionTest(oldPos, this.size, this))
                {
                    // test which side we bounced off (or both if a corner)
                    const isBlockedY = tileCollisionTest(new Vector2(oldPos.x, this.pos.y), this.size, this);
                    const isBlockedX = tileCollisionTest(new Vector2(this.pos.x, oldPos.y), this.size, this);
                    if (isBlockedY || !isBlockedX)
                    {
                        // set if landed on ground
                        this.groundObject = wasMovingDown;

                        // bounce velocity
                        this.velocity.y *= -this.elasticity;

                        // adjust next velocity to settle on ground
                        const o = (oldPos.y - this.size.y/2|0) - (oldPos.y - this.size.y/2);
                        if (o < 0 && o > -1 && o > this.damping * this.velocity.y + gravity * this.gravityScale) 
                            this.velocity.y = this.damping ? (o - gravity * this.gravityScale) / this.damping : 0;

                        // move to previous position
                        this.pos.y = oldPos.y;
                    }
                    if (isBlockedX)
                    {
                        // move to previous position and bounce
                        this.pos.x = oldPos.x;
                        this.velocity.x *= -this.elasticity;
                    }
                }
            }
        }
    }
       
    /** Render the object, draws a tile by default, automatically called each frame, sorted by renderOrder */
    render()
    {
        // default object render
        drawTile(this.pos, this.drawSize || this.size, this.tileIndex, this.tileSize, this.color, this.angle, this.mirror, this.additiveColor);
    }
    
    /** Destroy this object, destroy it's children, detach it's parent, and mark it for removal */
    destroy()             
    { 
        if (this.destroyed)
            return;
        
        // disconnect from parent and destroy chidren
        this.destroyed = 1;
        this.parent && this.parent.removeChild(this);
        for (const child of this.children)
            child.destroy(child.parent = 0);
    }
    
    /** Called to check if a tile collision should be resolved
     *  @param {Number}  tileData - the value of the tile at the position
     *  @param {Vector2} pos - tile where the collision occured
     *  @return {Boolean} true if the collision should be resolved */
    collideWithTile(tileData, pos)        { return tileData > 0; }
    
    /** Called to check if a tile raycast hit
     *  @param {Number}  tileData - the value of the tile at the position
     *  @param {Vector2} pos - tile where the raycast is
     *  @return {Boolean} true if the raycast should hit */
    collideWithTileRaycast(tileData, pos) { return tileData > 0; }

    /** Called to check if a tile raycast hit
     *  @param {EngineObject} object - the object to test against
     *  @return {Boolean} true if the collision should be resolved
     */
    collideWithObject(o)              { return 1; }

    /** How long since the object was created
     *  @return {Number} */
    getAliveTime()                    { return time - this.spawnTime; }

    /** Apply acceleration to this object (adjust velocity, not affected by mass)
     *  @param {Vector2} acceleration */
    applyAcceleration(a)              { if (this.mass) this.velocity = this.velocity.add(a); }

    /** Apply force to this object (adjust velocity, affected by mass)
     *  @param {Vector2} force */
    applyForce(force)	              { this.applyAcceleration(force.scale(1/this.mass)); }
    
    /** Get the direction of the mirror
     *  @return {Number} -1 if this.mirror is true, or 1 if not mirrored */
    getMirrorSign() { return this.mirror ? -1 : 1; }

    /** Attaches a child to this with a given local transform
     *  @param {EngineObject} child
     *  @param {Vector2}      [localPos=new Vector2]
     *  @param {Number}       [localAngle=0] */
    addChild(child, localPos=vec2(), localAngle=0)
    {
        ASSERT(!child.parent && !this.children.includes(child));
        this.children.push(child);
        child.parent = this;
        child.localPos = localPos.copy();
        child.localAngle = localAngle;
    }

    /** Removes a child from this one
     *  @param {EngineObject} child */
    removeChild(child)
    {
        ASSERT(child.parent == this && this.children.includes(child));
        this.children.splice(this.children.indexOf(child), 1);
        child.parent = 0;
    }

    /** Set how this object collides
     *  @param {boolean} [collideSolidObjects=0] - Does it collide with solid objects
     *  @param {boolean} [isSolid=0] - Does it collide with and block other objects (expensive in large numbers)
     *  @param {boolean} [collideTiles=1] - Does it collide with the tile collision */
    setCollision(collideSolidObjects=0, isSolid=0, collideTiles=1)
    {
        ASSERT(collideSolidObjects || !isSolid); // solid objects must be set to collide

        // track collidable objects in separate list
        if (collideSolidObjects && !this.collideSolidObjects)
        {
            ASSERT(!engineCollideObjects.includes(this));
            engineCollideObjects.push(this);
        }
        else if (!collideSolidObjects && this.collideSolidObjects)
        {
            ASSERT(engineCollideObjects.includes(this))
            engineCollideObjects.splice(engineCollideObjects.indexOf(this), 1);
        }

        this.collideSolidObjects = collideSolidObjects;
        this.isSolid = isSolid;
        this.collideTiles = collideTiles;
    }
}
/** 
 *  LittleJS Drawing System
 *  <br> - Hybrid with both Canvas2D and WebGL available
 *  <br> - Super fast tile sheet rendering with WebGL
 *  <br> - Can apply rotation, mirror, color and additive color
 *  <br> - Many useful utility functions
 *  @namespace Draw
 */

'use strict';

/** Main tilesheet to use for batch rendering system
 *  @type {Image}
 *  @memberof Draw */
const tileImage = new Image();

/** The primary 2D canvas visible to the user
 *  @type {HTMLCanvasElement}
 *  @memberof Draw */
let mainCanvas;

/** 2d context for mainCanvas
 *  @type {CanvasRenderingContext2D}
 *  @memberof Draw */
let mainContext;

/** A canvas that appears on top of everything the same size as mainCanvas
 *  @type {HTMLCanvasElement}
 *  @memberof Draw */
let overlayCanvas;

/** 2d context for overlayCanvas
 *  @type {CanvasRenderingContext2D}
 *  @memberof Draw */
let overlayContext;

/** The size of the main canvas (and other secondary canvases: overlayCanvas and glCanvas) 
 *  @type {Vector2}
 *  @memberof Draw */
let mainCanvasSize = vec2();

/** Convert from screen to world space coordinates
 *  @param {Vector2} screenPos
 *  @return {Vector2}
 *  @memberof Draw */
const screenToWorld = (screenPos)=>
    screenPos.add(vec2(.5)).subtract(mainCanvasSize.scale(.5)).multiply(vec2(1/cameraScale,-1/cameraScale)).add(cameraPos);

/** Convert from world to screen space coordinates
 *  @param {Vector2} worldPos
 *  @return {Vector2}
 *  @memberof Draw */
const worldToScreen = (worldPos)=>
    worldPos.subtract(cameraPos).multiply(vec2(cameraScale,-cameraScale)).add(mainCanvasSize.scale(.5)).subtract(vec2(.5));

/** Draw textured tile centered on pos
 *  @param {Vector2} pos - Center of the tile
 *  @param {Vector2} [size=new Vector2(1,1)] - Size of the tile
 *  @param {Number}  [tileIndex=-1] - Tile index to use, negative is untextured
 *  @param {Vector2} [tileSize=defaultTileSize] - Tile size in source pixels
 *  @param {Color}   [color=new Color(1,1,1)]
 *  @param {Number}  [angle=0]
 *  @param {Boolean} [mirror=0]
 *  @param {Color}   [additiveColor=new Color(0,0,0,0)]
 *  @memberof Draw */
function drawTile(pos, size=vec2(1), tileIndex=-1, tileSize=defaultTileSize, color=new Color, angle=0, mirror, 
    additiveColor=new Color(0,0,0,0))
{
    showWatermark && ++drawCount;
    if (glEnable)
    {
        if (tileIndex < 0)
        {
            // if negative tile index, force untextured
            glDraw(pos.x, pos.y, size.x, size.y, angle, 0, 0, 0, 0, 0, color.rgbaInt()); 
        }
        else
        {
            // calculate uvs and render
            const cols = tileImage.width / tileSize.x |0;
            const uvSizeX = tileSize.x * tileImageSizeInverse.x;
            const uvSizeY = tileSize.y * tileImageSizeInverse.y;
            const uvX = (tileIndex%cols)*uvSizeX, uvY = (tileIndex/cols|0)*uvSizeY;

            // shrink uvs to prevent bleeding
            const shrinkTilesX = tileBleedShrinkFix * tileImageSizeInverse.x;
            const shrinkTilesY = tileBleedShrinkFix * tileImageSizeInverse.y;
            
            glDraw(pos.x, pos.y, mirror ? -size.x : size.x, size.y, angle, 
                uvX + shrinkTilesX, uvY + shrinkTilesY, 
                uvX - shrinkTilesX + uvSizeX, uvY - shrinkTilesX + uvSizeY, 
                color.rgbaInt(), additiveColor.rgbaInt()); 
        }
    }
    else
    {
        // normal canvas 2D rendering method (slower)
        drawCanvas2D(pos, size, angle, mirror, (context)=>
        {
            if (tileIndex < 0)
            {
                // if negative tile index, force untextured
                context.fillStyle = color.rgba();
                context.fillRect(-.5, -.5, 1, 1);
            }
            else
            {
                // calculate uvs and render
                const cols = tileImage.width / tileSize.x |0;
                const sX = (tileIndex%cols)*tileSize.x   + tileBleedShrinkFix;
                const sY = (tileIndex/cols|0)*tileSize.y + tileBleedShrinkFix;
                const sWidth  = tileSize.x - 2*tileBleedShrinkFix;
                const sHeight = tileSize.y - 2*tileBleedShrinkFix;
                context.globalAlpha = color.a; // only alpha is supported
                context.drawImage(tileImage, sX, sY, sWidth, sHeight, -.5, -.5, 1, 1);
            }
        });
    }
}

/** Draw colored untextured rect centered on pos
 *  @param {Vector2} pos
 *  @param {Vector2} [size=new Vector2(1,1)]
 *  @param {Color}   [color=new Color(1,1,1)]
 *  @param {Number}  [angle=0]
 *  @memberof Draw */
function drawRect(pos, size, color, angle)
{
    drawTile(pos, size, -1, defaultTileSize, color, angle);
}

/** Draw textured tile centered on pos in screen space
 *  @param {Vector2} pos - Center of the tile
 *  @param {Vector2} [size=new Vector2(1,1)] - Size of the tile
 *  @param {Number}  [tileIndex=-1] - Tile index to use, negative is untextured
 *  @param {Vector2} [tileSize=defaultTileSize] - Tile size in source pixels
 *  @param {Color}   [color=new Color]
 *  @param {Number}  [angle=0]
 *  @param {Boolean} [mirror=0]
 *  @param {Color}   [additiveColor=new Color(0,0,0,0)]
 *  @memberof Draw */
function drawTileScreenSpace(pos, size=vec2(1), tileIndex, tileSize, color, angle, mirror, additiveColor)
{
    drawTile(screenToWorld(pos), size.scale(1/cameraScale), tileIndex, tileSize, color, angle, mirror, additiveColor);
}

/** Draw colored untextured rectangle in screen space
 *  @param {Vector2} pos
 *  @param {Vector2} [size=new Vector2(1,1)]
 *  @param {Color}   [color=new Color(1,1,1)]
 *  @param {Number}  [angle=0]
 *  @memberof Draw */
function drawRectScreenSpace(pos, size, color, angle)
{
    drawTileScreenSpace(pos, size, -1, defaultTileSize, color, angle);
}

/** Draw colored line between two points
 *  @param {Vector2} posA
 *  @param {Vector2} posB
 *  @param {Number}  [thickness=.1]
 *  @param {Color}   [color=new Color(1,1,1)]
 *  @memberof Draw */
function drawLine(posA, posB, thickness=.1, color)
{
    const halfDelta = vec2((posB.x - posA.x)/2, (posB.y - posA.y)/2);
    const size = vec2(thickness, halfDelta.length()*2);
    drawRect(posA.add(halfDelta), size, color, halfDelta.angle());
}

/** Draw directly to a 2d canvas context in world space (bipass webgl)
 *  @param {Vector2}  pos
 *  @param {Vector2}  size
 *  @param {Number}   angle
 *  @param {Boolean}  mirror
 *  @param {Function} drawFunction
 *  @param {CanvasRenderingContext2D} [context=mainContext]
 *  @memberof Draw */
function drawCanvas2D(pos, size, angle, mirror, drawFunction, context = mainContext)
{
    // create canvas transform from world space to screen space
    pos = worldToScreen(pos);
    size = size.scale(cameraScale);
    context.save();
    context.translate(pos.x+.5|0, pos.y-.5|0);
    context.rotate(angle);
    context.scale(mirror?-size.x:size.x, size.y);
    drawFunction(context);
    context.restore();
}

/** Draw text on overlay canvas in world space
 *  @param {String}  text
 *  @param {Vector2} pos
 *  @param {Number}  [size=1]
 *  @param {Color}   [color=new Color(1,1,1)]
 *  @param {Number}  [lineWidth=0]
 *  @param {Color}   [lineColor=new Color(0,0,0)]
 *  @param {String}  [textAlign='center']
 *  @memberof Draw */
function drawText(text, pos, size=1, color=new Color, lineWidth=0, lineColor=new Color(0,0,0), textAlign='center', font=defaultFont)
{
    pos = worldToScreen(pos);
    overlayContext.font = size*cameraScale + 'px '+ font;
    overlayContext.textAlign = textAlign;
    overlayContext.textBaseline = 'middle';
    if (lineWidth)
    {
        overlayContext.lineWidth = lineWidth*cameraScale;
        overlayContext.strokeStyle = lineColor.rgba();
        overlayContext.strokeText(text, pos.x, pos.y);
    }
    overlayContext.fillStyle = color.rgba();
    overlayContext.fillText(text, pos.x, pos.y);
}

/** Enable additive or regular blend mode
 *  @param {Boolean} [additive=0]
 *  @memberof Draw */
function setBlendMode(additive)
{
    if (glEnable)
        glSetBlendMode(additive);
    else
        mainContext.globalCompositeOperation = additive ? 'lighter' : 'source-over';
}

///////////////////////////////////////////////////////////////////////////////
// Fullscreen mode

/** Returns true if fullscreen mode is active
 *  @return {Boolean}
 *  @memberof Draw */
const isFullscreen =()=> document.fullscreenElement;

/** Toggle fullsceen mode
 *  @memberof Draw */
function toggleFullscreen()
{
    if (isFullscreen())
    {
        if (document.exitFullscreen)
            document.exitFullscreen();
        else if (document.mozCancelFullScreen)
            document.mozCancelFullScreen();
    }
    else
    {
        if (document.body.webkitRequestFullScreen)
            document.body.webkitRequestFullScreen();
        else if (document.body.mozRequestFullScreen)
            document.body.mozRequestFullScreen();
    }
}
/** 
 *  LittleJS Input System
 *  <br> - Tracks key down, pressed, and released
 *  <br> - Also tracks mouse buttons, position, and wheel
 *  <br> - Supports multiple gamepads
 *  @namespace Input
 */

'use strict';

/** Returns true if device key is down
 *  @param {Number} key
 *  @param {Number} [device=0]
 *  @return {Boolean}
 *  @memberof Input */
const keyIsDown = (key, device=0)=> inputData[device] && inputData[device][key] & 1 ? 1 : 0;

/** Returns true if device key was pressed this frame
 *  @param {Number} key
 *  @param {Number} [device=0]
 *  @return {Boolean}
 *  @memberof Input */
const keyWasPressed = (key, device=0)=> inputData[device] && inputData[device][key] & 2 ? 1 : 0;

/** Returns true if device key was released this frame
 *  @param {Number} key
 *  @param {Number} [device=0]
 *  @return {Boolean}
 *  @memberof Input */
const keyWasReleased = (key, device=0)=> inputData[device] && inputData[device][key] & 4 ? 1 : 0;

/** Clears all input
 *  @memberof Input */
const clearInput = ()=> inputData[0] = [];

/** Returns true if mouse button is down
 *  @param {Number} button
 *  @return {Boolean}
 *  @memberof Input */
const mouseIsDown = keyIsDown;

/** Returns true if mouse button was pressed
 *  @param {Number} button
 *  @return {Boolean}
 *  @memberof Input */
const mouseWasPressed = keyWasPressed;

/** Returns true if mouse button was released
 *  @param {Number} button
 *  @return {Boolean}
 *  @memberof Input */
const mouseWasReleased = keyWasReleased;

/** Mouse pos in world space
 *  @type {Vector2}
 *  @memberof Input */
let mousePos = vec2();

/** Mouse pos in screen space
 *  @type {Vector2}
 *  @memberof Input */
let mousePosScreen = vec2();

/** Mouse wheel delta this frame
 *  @memberof Input */
let mouseWheel = 0;

/** Returns true if user is using gamepad (has more recently pressed a gamepad button)
 *  @memberof Input */
let usingGamepad = 0;

/** Returns true if gamepad button is down
 *  @param {Number} button
 *  @param {Number} [gamepad=0]
 *  @return {Boolean}
 *  @memberof Input */
const gamepadIsDown = (button, gamepad=0)=> keyIsDown(button, gamepad+1);

/** Returns true if gamepad button was pressed
 *  @param {Number} button
 *  @param {Number} [gamepad=0]
 *  @return {Boolean}
 *  @memberof Input */
const gamepadWasPressed = (button, gamepad=0)=> keyWasPressed(button, gamepad+1);

/** Returns true if gamepad button was released
 *  @param {Number} button
 *  @param {Number} [gamepad=0]
 *  @return {Boolean}
 *  @memberof Input */
const gamepadWasReleased = (button, gamepad=0)=> keyWasReleased(button, gamepad+1);

/** Returns gamepad stick value
 *  @param {Number} stick
 *  @param {Number} [gamepad=0]
 *  @return {Vector2}
 *  @memberof Input */
const gamepadStick = (stick,  gamepad=0)=> stickData[gamepad] ? stickData[gamepad][stick] || vec2() : vec2();

///////////////////////////////////////////////////////////////////////////////
// Input update called by engine

const inputData = [[]];

function inputUpdate()
{
    // clear input when lost focus (prevent stuck keys)
    document.hasFocus() || clearInput();

    // update mouse world space position
    mousePos = screenToWorld(mousePosScreen);

    // update gamepads if enabled
    gamepadsUpdate();
}

function inputUpdatePost()
{
    // clear input to prepare for next frame
    for (const deviceInputData of inputData)
    for (const i in deviceInputData)
        deviceInputData[i] &= 1;
    mouseWheel = 0;
}

///////////////////////////////////////////////////////////////////////////////
// Keyboard event handlers

onkeydown = e=>
{
    if (debug && e.target != document.body) return;
    e.repeat || (inputData[usingGamepad = 0][remapKeyCode(e.keyCode)] = 3);
    debug || e.preventDefault();
}
onkeyup = e=>
{
    if (debug && e.target != document.body) return;
    inputData[0][remapKeyCode(e.keyCode)] = 4;
}
const remapKeyCode = c=> copyWASDToDpad ? c==87?38 : c==83?40 : c==65?37 : c==68?39 : c : c;

///////////////////////////////////////////////////////////////////////////////
// Mouse event handlers

onmousedown = e=> {inputData[usingGamepad = 0][e.button] = 3; onmousemove(e); e.button && e.preventDefault();}
onmouseup   = e=> inputData[0][e.button] = inputData[0][e.button] & 2 | 4;
onmousemove = e=>
{
    // convert mouse pos to canvas space
    if (!mainCanvas) return;
    const rect = mainCanvas.getBoundingClientRect();
    mousePosScreen.x = mainCanvasSize.x * percent(e.x, rect.right, rect.left);
    mousePosScreen.y = mainCanvasSize.y * percent(e.y, rect.bottom, rect.top);
}
onwheel = e=> e.ctrlKey || (mouseWheel = sign(e.deltaY));
oncontextmenu = e=> !1; // prevent right click menu

///////////////////////////////////////////////////////////////////////////////
// Gamepad input

const stickData = [];
function gamepadsUpdate()
{
    if (!gamepadsEnable || !navigator.getGamepads || !document.hasFocus() && !debug)
        return;

    // poll gamepads
    const gamepads = navigator.getGamepads();
    for (let i = gamepads.length; i--;)
    {
        // get or create gamepad data
        const gamepad = gamepads[i];
        const data = inputData[i+1] || (inputData[i+1] = []);
        const sticks = stickData[i] || (stickData[i] = []);

        if (gamepad)
        {
            // read clamp dead zone of analog sticks
            const deadZone = .3, deadZoneMax = .8;
            const applyDeadZone = (v)=> 
                v >  deadZone ?  percent( v, deadZoneMax, deadZone) : 
                v < -deadZone ? -percent(-v, deadZoneMax, deadZone) : 0;

            // read analog sticks
            for (let j = 0; j < gamepad.axes.length-1; j+=2)
                sticks[j>>1] = vec2(applyDeadZone(gamepad.axes[j]), applyDeadZone(-gamepad.axes[j+1])).clampLength();
            
            // read buttons
            for (let j = gamepad.buttons.length; j--;)
            {
                const button = gamepad.buttons[j];
                data[j] = button.pressed ? 1 + 2*!gamepadIsDown(j,i) : 4*gamepadIsDown(j,i);
                usingGamepad |= !i && button.pressed;
            }
            
            if (copyGamepadDirectionToStick)
            {
                // copy dpad to left analog stick when pressed
                const dpad = vec2(gamepadIsDown(15,i) - gamepadIsDown(14,i), gamepadIsDown(12,i) - gamepadIsDown(13,i));
                if (dpad.lengthSquared())
                    sticks[0] = dpad.clampLength();
            }
        }
    }
}

///////////////////////////////////////////////////////////////////////////////
// Touch input

/** True if a touch device has been detected
 *  @const {boolean}
 *  @memberof Input */
const isTouchDevice = touchInputEnable && window.ontouchstart !== undefined;
if (isTouchDevice)
{
    // handle all touch events the same way
    let wasTouching, hadTouchInput;
    ontouchstart = ontouchmove = ontouchend = e=>
    {
        e.button = 0; // all touches are left click

        // check if touching and pass to mouse events
        const touching = e.touches.length;
        if (touching)
        {
            hadTouchInput || zzfx(0, hadTouchInput=1) ; // fix mobile audio, force it to play a sound the first time

            // set event pos and pass it along
            e.x = e.touches[0].clientX;
            e.y = e.touches[0].clientY;
            wasTouching ? onmousemove(e) : onmousedown(e);
        }
        else if (wasTouching)
            onmouseup(e);

        // set was touching
        wasTouching = touching;

        // prevent normal mouse events from being called
        return !e.cancelable;
    }
}
/** 
 *  LittleJS Audio System
 *  <br> - ZzFX Sound Effects and ZzFXM Music
 *  <br> - Caches sounds and music for fast playback
 *  <br> - Can attenuate and apply stereo panning to sounds
 *  <br> - Ability to play mp3, ogg, and wave files
 *  <br> - Speech synthesis wrapper functions
 *  @namespace Audio
 */

'use strict';

/** Sound Object - Stores a zzfx sound for later use and can be played positionally */
class Sound
{
    /** Create a sound object and cache the zzfx samples for later use
     *  @param {Array}  zzfxSound - Array of zzfx parameters, ex. [.5,.5]
     *  @param {Number} [range=defaultSoundRange] - World space max range of sound, will not play if camera is farther away
     *  @param {Number} [taper=defaultSoundTaper] - At what percentage of range should it start tapering off
     */
    constructor(zzfxSound, range=defaultSoundRange, taper=defaultSoundTaper)
    {
        if (!soundEnable) return;

        this.range = range;
        this.taper = taper;

        // get randomness from sound parameters
        this.randomness = zzfxSound[1] || 0;
        zzfxSound[1] = 0;

        // generate sound now for fast playback
        this.cachedSamples = zzfxG(...zzfxSound);
    }

    /** Play the sound
     *  @param {Vector2} [pos] - World space position to play the sound, sound is not attenuated if null
     *  @param {Number}  [volume=1] - How much to scale volume by (in addition to range fade)
     *  @param {Number}  [pitch=1] - How much to scale pitch by (also adjusted by this.randomness)
     *  @param {Number}  [randomnessScale=1] - How much to scale randomness
     *  @return {AudioBufferSourceNode} - The audio, can be used to stop sound later
     */
    play(pos, volume=1, pitch=1, randomnessScale=1)
    {
        if (!soundEnable) return;

        let pan = 0;
        if (pos)
        {
            const range = this.range;
            if (range)
            {
                // apply range based fade
                const lengthSquared = cameraPos.distanceSquared(pos);
                if (lengthSquared > range*range)
                    return; // out of range

                // attenuate volume by distance
                volume *= percent(lengthSquared**.5, range*this.taper, range);
            }

            // get pan from screen space coords
            pan = worldToScreen(pos).x * 2/mainCanvas.width - 1;
        }

        // play the sound
        const playbackRate = pitch + pitch * this.randomness*randomnessScale*rand(-1,1);
        return playSamples([this.cachedSamples], volume, playbackRate, pan);
    }

    /** Play the sound as a note with a semitone offset
     *  @param {Number}  semitoneOffset - How many semitones to offset pitch
     *  @param {Vector2} [pos] - World space position to play the sound, sound is not attenuated if null
     *  @param {Number}  [volume=1] - How much to scale volume by (in addition to range fade)
     *  @return {AudioBufferSourceNode} - The audio, can be used to stop sound later
     */
    playNote(semitoneOffset, pos, volume=1)
    {
        if (!soundEnable) return;

        return this.play(pos, volume, 2**(semitoneOffset/12), 0);
    }
}

/** Music Object - Stores a zzfx music track for later use */
class Music
{
    /** Create a music object and cache the zzfx music samples for later use
     *  @param {Array} zzfxMusic - Array of zzfx music parameters
     */
    constructor(zzfxMusic)
    {
        if (!soundEnable) return;

        this.cachedSamples = zzfxM(...zzfxMusic);
    }

    /** Play the music
     *  @param {Number}  [volume=1] - How much to scale volume by
     *  @param {Boolean} [loop=1] - True if the music should loop when it reaches the end
     *  @return {AudioBufferSourceNode} - The audio node, can be used to stop sound later
     */
    play(volume = 1, loop = 1)
    {
        if (!soundEnable) return;

        return playSamples(this.cachedSamples, volume, 1, 0, loop);
    }
}

/** Play an mp3 or wav audio from a local file or url
 *  @param {String}  url - Location of sound file to play
 *  @param {Number}  [volume=1] - How much to scale volume by
 *  @param {Boolean} [loop=1] - True if the music should loop when it reaches the end
 *  @return {HTMLAudioElement} - The audio element for this sound
 *  @memberof Audio */
function playAudioFile(url, volume=1, loop=1)
{
    if (!soundEnable) return;

    const audio = new Audio(url);
    audio.volume = audioVolume * volume;
    audio.loop = loop;
    audio.play();
    return audio;
}

/** Speak text with passed in settings
 *  @param {String} text - The text to speak
 *  @param {String} [language] - The language/accent to use (examples: en, it, ru, ja, zh)
 *  @param {Number} [volume=1] - How much to scale volume by
 *  @param {Number} [rate=1] - How quickly to speak
 *  @param {Number} [pitch=1] - How much to change the pitch by
 *  @return {SpeechSynthesisUtterance} - The utterance that was spoken
 *  @memberof Audio */
function speak(text, language='', volume=1, rate=1, pitch=1)
{
    if (!soundEnable || !speechSynthesis) return;

    // common languages (not supported by all browsers)
    // en - english,  it - italian, fr - french,  de - german, es - spanish
    // ja - japanese, ru - russian, zh - chinese, hi - hindi,  ko - korean

    // build utterance and speak
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.volume = 2*volume*audioVolume;
    utterance.rate = rate;
    utterance.pitch = pitch;
    speechSynthesis.speak(utterance);
    return utterance;
}

/** Stop all queued speech
 *  @memberof Audio */
const stopSpeech = ()=> speechSynthesis && speechSynthesis.cancel();

/** Get frequency of a note on a musical scale
 *  @param {Number} semitoneOffset - How many semitones away from the root note
 *  @param {Number} [rootNoteFrequency=220] - Frequency at semitone offset 0
 *  @return {Number} - The frequency of the note
 *  @memberof Audio */
const getNoteFrequency = (semitoneOffset, rootFrequency=220)=> rootFrequency * 2**(semitoneOffset/12); 

///////////////////////////////////////////////////////////////////////////////

/** Audio context used by the engine
 *  @memberof Audio */
let audioContext;

/** Play cached audio samples with given settings
 *  @param {Array}   sampleChannels - Array of arrays of samples to play (for stereo playback)
 *  @param {Number}  [volume=1] - How much to scale volume by
 *  @param {Number}  [rate=1] - The playback rate to use
 *  @param {Number}  [pan=0] - How much to apply stereo panning
 *  @param {Boolean} [loop=0] - True if the sound should loop when it reaches the end
 *  @return {AudioBufferSourceNode} - The audio node of the sound played
 *  @memberof Audio */
function playSamples(sampleChannels, volume=1, rate=1, pan=0, loop=0) 
{
    if (!soundEnable) return;

    // create audio context
    if (!audioContext)
        audioContext = new (window.AudioContext||webkitAudioContext);

    // create buffer and source
    const buffer = audioContext.createBuffer(sampleChannels.length, sampleChannels[0].length, zzfxR), 
        source = audioContext.createBufferSource();

    // copy samples to buffer and setup source
    sampleChannels.forEach((c,i)=> buffer.getChannelData(i).set(c));
    source.buffer = buffer;
    source.playbackRate.value = rate;
    source.loop = loop;

    // create pan and gain nodes
    source
        .connect(new StereoPannerNode(audioContext, {'pan':clamp(pan, 1, -1)}))
        .connect(new GainNode(audioContext, {'gain':audioVolume*volume}))
        .connect(audioContext.destination);

    // play and return sound
    source.start();
    return source;
}

///////////////////////////////////////////////////////////////////////////////
// ZzFXMicro - Zuper Zmall Zound Zynth - v1.1.8 by Frank Force

/** Generate and play a ZzFX sound
 *  @param {Array} zzfxSound - Array of ZzFX parameters, ex. [.5,.5]
 *  @return {Array} - Array of audio samples
 *  @memberof Audio */
const zzfx = (...zzfxSound) => playSamples([zzfxG(...zzfxSound)]);

/** Sample rate used for all ZzFX sounds
 *  @default 44100
 *  @memberof Audio */
const zzfxR = 44100; 

/** Generate samples for a ZzFX sound
 *  @memberof Audio */
function zzfxG
(
    // parameters
    volume = 1, randomness = .05, frequency = 220, attack = 0, sustain = 0,
    release = .1, shape = 0, shapeCurve = 1, slide = 0, deltaSlide = 0,
    pitchJump = 0, pitchJumpTime = 0, repeatTime = 0, noise = 0, modulation = 0,
    bitCrush = 0, delay = 0, sustainVolume = 1, decay = 0, tremolo = 0
)
{
    // init parameters
    let PI2 = PI*2, sign = v => v>0?1:-1,
        startSlide = slide *= 500 * PI2 / zzfxR / zzfxR, b=[],
        startFrequency = frequency *= (1 + randomness*rand(-1,1)) * PI2 / zzfxR,
        t=0, tm=0, i=0, j=1, r=0, c=0, s=0, f, length;
        
    // scale by sample rate
    attack = attack * zzfxR + 9; // minimum attack to prevent pop
    decay *= zzfxR;
    sustain *= zzfxR;
    release *= zzfxR;
    delay *= zzfxR;
    deltaSlide *= 500 * PI2 / zzfxR**3;
    modulation *= PI2 / zzfxR;
    pitchJump *= PI2 / zzfxR;
    pitchJumpTime *= zzfxR;
    repeatTime = repeatTime * zzfxR | 0;

    // generate waveform
    for (length = attack + decay + sustain + release + delay | 0;
        i < length; b[i++] = s)
    {
        if (!(++c%(bitCrush*100|0)))                      // bit crush
        {
            s = shape? shape>1? shape>2? shape>3?         // wave shape
                Math.sin((t%PI2)**3) :                    // 4 noise
                Math.max(Math.min(Math.tan(t),1),-1):     // 3 tan
                1-(2*t/PI2%2+2)%2:                        // 2 saw
                1-4*abs(Math.round(t/PI2)-t/PI2):    // 1 triangle
                Math.sin(t);                              // 0 sin
                
            s = (repeatTime ?
                    1 - tremolo + tremolo*Math.sin(PI2*i/repeatTime) // tremolo
                    : 1) *
                sign(s)*(abs(s)**shapeCurve) *       // curve 0=square, 2=pointy
                volume * audioVolume * (                  // envelope
                i < attack ? i/attack :                   // attack
                i < attack + decay ?                      // decay
                1-((i-attack)/decay)*(1-sustainVolume) :  // decay falloff
                i < attack  + decay + sustain ?           // sustain
                sustainVolume :                           // sustain volume
                i < length - delay ?                      // release
                (length - i - delay)/release *            // release falloff
                sustainVolume :                           // release volume
                0);                                       // post release
 
            s = delay ? s/2 + (delay > i ? 0 :            // delay
                (i<length-delay? 1 : (length-i)/delay) *  // release delay 
                b[i-delay|0]/2) : s;                      // sample delay
        }

        f = (frequency += slide += deltaSlide) *          // frequency
            Math.cos(modulation*tm++);                    // modulation
        t += f - f*noise*(1 - (Math.sin(i)+1)*1e9%2);     // noise

        if (j && ++j > pitchJumpTime)       // pitch jump
        {
            frequency += pitchJump;         // apply pitch jump
            startFrequency += pitchJump;    // also apply to start
            j = 0;                          // reset pitch jump time
        }

        if (repeatTime && !(++r % repeatTime)) // repeat
        {
            frequency = startFrequency;     // reset frequency
            slide = startSlide;             // reset slide
            j = j || 1;                     // reset pitch jump time
        }
    }
    
    return b;
}

///////////////////////////////////////////////////////////////////////////////
// ZzFX Music Renderer v2.0.3 by Keith Clark and Frank Force

/** Generate samples for a ZzFM song with given parameters
 *  @param {Array} instruments - Array of ZzFX sound paramaters
 *  @param {Array} patterns - Array of pattern data
 *  @param {Array} sequence - Array of pattern indexes
 *  @param {Number} [BPM=125] - Playback speed of the song in BPM
 *  @returns {Array} - Left and right channel sample data
 *  @memberof Audio */
function zzfxM(instruments, patterns, sequence, BPM = 125) 
{
  let instrumentParameters;
  let i;
  let j;
  let k;
  let note;
  let sample;
  let patternChannel;
  let notFirstBeat;
  let stop;
  let instrument;
  let pitch;
  let attenuation;
  let outSampleOffset;
  let isSequenceEnd;
  let sampleOffset = 0;
  let nextSampleOffset;
  let sampleBuffer = [];
  let leftChannelBuffer = [];
  let rightChannelBuffer = [];
  let channelIndex = 0;
  let panning = 0;
  let hasMore = 1;
  let sampleCache = {};
  let beatLength = zzfxR / BPM * 60 >> 2;

  // for each channel in order until there are no more
  for (; hasMore; channelIndex++) {

    // reset current values
    sampleBuffer = [hasMore = notFirstBeat = pitch = outSampleOffset = 0];

    // for each pattern in sequence
    sequence.forEach((patternIndex, sequenceIndex) => {
      // get pattern for current channel, use empty 1 note pattern if none found
      patternChannel = patterns[patternIndex][channelIndex] || [0, 0, 0];

      // check if there are more channels
      hasMore |= !!patterns[patternIndex][channelIndex];

      // get next offset, use the length of first channel
      nextSampleOffset = outSampleOffset + (patterns[patternIndex][0].length - 2 - !notFirstBeat) * beatLength;
      // for each beat in pattern, plus one extra if end of sequence
      isSequenceEnd = sequenceIndex == sequence.length - 1;
      for (i = 2, k = outSampleOffset; i < patternChannel.length + isSequenceEnd; notFirstBeat = ++i) {

        // <channel-note>
        note = patternChannel[i];

        // stop if end, different instrument or new note
        stop = i == patternChannel.length + isSequenceEnd - 1 && isSequenceEnd ||
            instrument != (patternChannel[0] || 0) | note | 0;

        // fill buffer with samples for previous beat, most cpu intensive part
        for (j = 0; j < beatLength && notFirstBeat;

            // fade off attenuation at end of beat if stopping note, prevents clicking
            j++ > beatLength - 99 && stop ? attenuation += (attenuation < 1) / 99 : 0
        ) {
          // copy sample to stereo buffers with panning
          sample = (1 - attenuation) * sampleBuffer[sampleOffset++] / 2 || 0;
          leftChannelBuffer[k] = (leftChannelBuffer[k] || 0) - sample * panning + sample;
          rightChannelBuffer[k] = (rightChannelBuffer[k++] || 0) + sample * panning + sample;
        }

        // set up for next note
        if (note) {
          // set attenuation
          attenuation = note % 1;
          panning = patternChannel[1] || 0;
          if (note |= 0) {
            // get cached sample
            sampleBuffer = sampleCache[
              [
                instrument = patternChannel[sampleOffset = 0] || 0,
                note
              ]
            ] = sampleCache[[instrument, note]] || (
                // add sample to cache
                instrumentParameters = [...instruments[instrument]],
                instrumentParameters[2] *= 2 ** ((note - 12) / 12),

                // allow negative values to stop notes
                note > 0 ? zzfxG(...instrumentParameters) : []
            );
          }
        }
      }

      // update the sample offset
      outSampleOffset = nextSampleOffset;
    });
  }

  return [leftChannelBuffer, rightChannelBuffer];
}
/** 
 *  LittleJS Tile Layer System
 *  <br> - Caches arrays of tiles to offscreen canvas for fast rendering
 *  <br> - Unlimted numbers of layers, allocates canvases as needed
 *  <br> - Interfaces with EngineObject for collision
 *  <br> - Collision layer is separate from visible layers
 *  <br> - Tile layers can be drawn to using their context with canvas2d
 *  <br> - It is recommended to have a visible layer that matches the collision
 *  @namespace TileLayer
 */

'use strict';

///////////////////////////////////////////////////////////////////////////////
// Tile Collision

// Internal variables not exposed to documentation
let tileCollision = [], tileCollisionSize = vec2();

/** Clear and initialize tile collision
 *  @param {Vector2} size
 *  @memberof TileLayer */
function initTileCollision(size)
{
    tileCollisionSize = size;
    tileCollision = [];
    for (let i=tileCollision.length = tileCollisionSize.area(); i--;)
        tileCollision[i] = 0;
}

/** Set tile collision data
 *  @param {Vector2} pos
 *  @param {Number}  [data=0]
 *  @memberof TileLayer */
const setTileCollisionData = (pos, data=0)=>
    pos.arrayCheck(tileCollisionSize) && (tileCollision[(pos.y|0)*tileCollisionSize.x+pos.x|0] = data);

/** Get tile collision data
 *  @param {Vector2} pos
 *  @return {Number}
 *  @memberof TileLayer */
const getTileCollisionData = (pos)=>
    pos.arrayCheck(tileCollisionSize) ? tileCollision[(pos.y|0)*tileCollisionSize.x+pos.x|0] : 0;

/** Check if collision with another object should occur
 *  @param {Vector2}      pos
 *  @param {Vector2}      [size=new Vector2(1,1)]
 *  @param {EngineObject} [object]
 *  @return {Boolean}
 *  @memberof TileLayer */
function tileCollisionTest(pos, size=vec2(), object)
{
    const minX = max(Math.floor(pos.x - size.x/2), 0);
    const minY = max(Math.floor(pos.y - size.y/2), 0);
    const maxX = min(pos.x + size.x/2, tileCollisionSize.x-1);
    const maxY = min(pos.y + size.y/2, tileCollisionSize.y-1);
    for (let y = minY; y < maxY; ++y)
    for (let x = minX; x < maxX; ++x)
    {
        const tileData = tileCollision[y*tileCollisionSize.x+x];
        if (tileData && (!object || object.collideWithTile(tileData, new Vector2(x, y))))
            return 1;
    }
}

/** Return the center of tile if any that is hit (this does not return the exact hit point)
 *  @param {Vector2}      posStart
 *  @param {Vector2}      posEnd
 *  @param {EngineObject} [object]
 *  @return {Vector2}
 *  @memberof TileLayer */
function tileCollisionRaycast(posStart, posEnd, object)
{
    // test if a ray collides with tiles from start to end
    // todo: a way to get the exact hit point, it must still register as inside the hit tile
    posStart = posStart.floor();
    posEnd = posEnd.floor();
    const posDelta = posEnd.subtract(posStart);
    const dx = abs(posDelta.x),  dy = -abs(posDelta.y);
    const sx = sign(posDelta.x), sy = sign(posDelta.y);
    let e = dx + dy;

    for (let x = posStart.x, y = posStart.y;;)
    {
        const tileData = getTileCollisionData(vec2(x,y));
        if (tileData && (object ? object.collideWithTileRaycast(tileData, new Vector2(x, y)) : tileData > 0))
        {
            debugRaycast && debugLine(posStart, posEnd, '#f00',.02, 1);
            debugRaycast && debugPoint(new Vector2(x+.5, y+.5), '#ff0', 1);
            return new Vector2(x+.5, y+.5);
        }

        // update Bresenham line drawing algorithm
        if (x == posEnd.x & y == posEnd.y) break;
        const e2 = 2*e;
        if (e2 >= dy) e += dy, x += sx;
        if (e2 <= dx) e += dx, y += sy;
    }
    debugRaycast && debugLine(posStart, posEnd, '#00f',.02, 1);
}

///////////////////////////////////////////////////////////////////////////////
// Tile Layer Rendering System

// Reuse canvas autmatically when destroyed
const tileLayerCanvasCache = [];

/** Tile layer data object stores info about how to render a tile */
class TileLayerData
{
    /** Create a tile layer data object
     *  @param {Number}  [tile] - The tile to use, untextured if undefined
     *  @param {Number}  [direction=0] - Integer direction of tile, in 90 degree increments
     *  @param {Boolean} [mirror=0] - If the tile should be mirrored along the x axis
     *  @param {Color}   [color=new Color(1,1,1)] - Color of the tile
     */
    constructor(tile, direction=0, mirror=0, color=new Color)
    {
        this.tile      = tile;
        this.direction = direction;
        this.mirror    = mirror;
        this.color     = color;
    }

    /** Set this tile to clear, it will not be rendered */
    clear() { this.tile = this.direction = this.mirror = 0; color = new Color; }
}

/** Tile layer object - cached rendering system for tile layers */
class TileLayer extends EngineObject
{
    /** Create a tile layer data object
     *  @param {Vector2} [position=new Vector2(0,0)] - World space position
     *  @param {Vector2} [size=defaultObjectSize] - World space size
     *  @param {Vector2} [scale=new Vector2(1,1)] - How much to scale this in world space
     *  @param {Number}  [renderOrder=0] - Objects sorted by renderOrder before being rendered
     */
    constructor(pos, size, scale=vec2(1), renderOrder=0)
    {
        super(pos, size);

        // create new canvas if necessary
        this.canvas = tileLayerCanvasCache.length ? tileLayerCanvasCache.pop() : document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.scale = scale;
        this.tileSize = defaultTileSize.copy();
        this.renderOrder = renderOrder;
        this.flushGLBeforeRender = 1;

        // init tile data
        this.data = [];
        for (let j = this.size.area(); j--;)
            this.data.push(new TileLayerData());
    }

    /** Destroy this tile layer */
    destroy()
    {
        // add canvas back to the cache
        tileLayerCanvasCache.push(this.canvas);
        super.destroy();
    }
    
    /** Set data at a given position in the array 
     *  @param {Vector2}       position - Local position in array
     *  @param {TileLayerData} data - Data to set
     *  @param {Boolean}       [redraw=0] - Force the tile to redraw if true */
    setData(layerPos, data, redraw)
    {
        if (layerPos.arrayCheck(this.size))
        {
            this.data[(layerPos.y|0)*this.size.x+layerPos.x|0] = data;
            redraw && this.drawTileData(layerPos);
        }
    }
    
    /** Get data at a given position in the array 
     *  @param {Vector2} layerPos - Local position in array
     *  @return {TileLayerData} */
    getData(layerPos)
    { return layerPos.arrayCheck(this.size) && this.data[(layerPos.y|0)*this.size.x+layerPos.x|0]; }
    
    // Tile layers are not updated
    update() {}

    // Render the tile layer, called automatically by the engine
    render()
    {
        ASSERT(mainContext != this.context); // must call redrawEnd() after drawing tiles

        // flush and copy gl canvas because tile canvas does not use gl
        this.flushGLBeforeRender && glEnable && glCopyToContext(mainContext);
        
        // draw the entire cached level onto the main canvas
        const pos = worldToScreen(this.pos.add(vec2(0,this.size.y*this.scale.y)));
        mainContext.drawImage
        (
            this.canvas, pos.x, pos.y,
            cameraScale*this.size.x*this.scale.x, cameraScale*this.size.y*this.scale.y
        );
    }

    /** Draw all the tile data to an offscreen canvas using webgl if possible */
    redraw()
    {
        this.redrawStart();
        this.drawAllTileData();
        this.redrawEnd();
    }

    /** Call to start the redraw process
     *  @param {Boolean} [clear=1] - Should it clear the canvas before drawing */
    redrawStart(clear = 1)
    {
        // clear and set size
        const width  = this.size.x * this.tileSize.x;
        const height = this.size.y * this.tileSize.y;
        if (clear)
        {
            this.canvas.width  = width;
            this.canvas.height = height;
        }

        // save current render settings
        this.savedRenderSettings = [mainCanvasSize, mainCanvas, mainContext, cameraScale, cameraPos];

        // set camera transform for renering
        cameraScale = this.tileSize.x;
        cameraPos = this.size.scale(.5);
        mainCanvas = this.canvas;
        mainContext = this.context;
        mainContext.imageSmoothingEnabled = !pixelated; // disable smoothing for pixel art
        mainCanvasSize = vec2(width, height);
        glPreRender(width, height);
    }

    /** Call to end the redraw process */
    redrawEnd()
    {
        ASSERT(mainContext == this.context); // must call redrawStart() before drawing tiles
        glCopyToContext(mainContext, 1);
        //debugSaveCanvas(this.canvas);

        // set stuff back to normal
        [mainCanvasSize, mainCanvas, mainContext, cameraScale, cameraPos] = this.savedRenderSettings;
    }

    /** Draw the tile at a given position
     *  @param {Vector2} layerPos */
    drawTileData(layerPos)
    {
        // first clear out where the tile was
        const pos = layerPos.floor().add(this.pos).add(vec2(.5));
        this.drawCanvas2D(pos, vec2(1), 0, 0, (context)=>context.clearRect(-.5, -.5, 1, 1));

        // draw the tile if not undefined
        const d = this.getData(layerPos);
        if (d.tile != undefined)
        {
            ASSERT(mainContext == this.context); // must call redrawStart() before drawing tiles
            drawTile(pos, vec2(1), d.tile, this.tileSize, d.color, d.direction*PI/2, d.mirror);
        }
    }

    /** Draw all the tiles in this layer */
    drawAllTileData()
    {
        for (let x = this.size.x; x--;)
        for (let y = this.size.y; y--;)
             this.drawTileData(vec2(x,y));
    }

    /** Draw directly to the 2d canvas in world space (bipass webgl)
     *  @param {Vector2}  pos
     *  @param {Vector2}  size
     *  @param {Number}   angle
     *  @param {Boolean}  mirror
     *  @param {Function} drawFunction */
    drawCanvas2D(pos, size, angle, mirror, drawFunction)
    {
        const context = this.context;
        context.save();
        pos = pos.subtract(this.pos).multiply(this.tileSize);
        size = size.multiply(this.tileSize);
        context.translate(pos.x, this.canvas.height - pos.y);
        context.rotate(angle);
        context.scale(mirror?-size.x:size.x, size.y);
        drawFunction(context);
        context.restore();
    }

    /** Draw a tile directly onto the layer canvas
     *  @param {Vector2} pos
     *  @param {Vector2} [size=new Vector2(1,1)]
     *  @param {Number}  [tileIndex=-1]
     *  @param {Vector2} [tileSize=defaultTileSize]
     *  @param {Color}   [color=new Color(1,1,1)]
     *  @param {Number}  [angle=0]
     *  @param {Boolean} [mirror=0] */
    drawTile(pos, size=vec2(1), tileIndex=-1, tileSize=defaultTileSize, color=new Color, angle=0, mirror)
    {
        this.drawCanvas2D(pos, size, angle, mirror, (context)=>
        {
            if (tileIndex < 0)
            {
                // untextured
                context.fillStyle = color.rgba();
                context.fillRect(-.5, -.5, 1, 1);
            }
            else
            {
                const cols = tileImage.width/tileSize.x;
                context.globalAlpha = color.a; // full color not supported in this mode
                context.drawImage(tileImage, 
                    (tileIndex%cols)*tileSize.x, (tileIndex/cols|0)*tileSize.x, 
                    tileSize.x, tileSize.y, -.5, -.5, 1, 1);
            }
        });
    }

    /** Draw a rectangle directly onto the layer canvas
     *  @param {Vector2} pos
     *  @param {Vector2} [size=new Vector2(1,1)]
     *  @param {Color}   [color=new Color(1,1,1)]
     *  @param {Number}  [angle=0] */
    drawRect(pos, size, color, angle) { this.drawTile(pos, size, -1, 0, color, angle, 0); }
}
/*
    LittleJS Particle System
    - Spawns particles with randomness from parameters
    - Updates particle physics
    - Fast particle rendering
*/

'use strict';

/**
 * Particle Emitter - Spawns particles with the given settings
 */
class ParticleEmitter extends EngineObject
{
    /**
     * Create a particle system with the given settings
     * @param {Vector2} position          - World space position of the emitter
     * @param {Number}  [emitSize=0]       - World space size of the emitter (float for circle diameter, vec2 for rect)
     * @param {Number}  [emitTime=0]       - How long to stay alive (0 is forever)
     * @param {Number}  [emitRate=100]     - How many particles per second to spawn
     * @param {Number}  [emitConeAngle=PI] - Local angle to apply velocity to particles from emitter
     * @param {Number}  [tileIndex=-1]     - Index into tile sheet, if <0 no texture is applied
     * @param {Number}  [tileSize=defaultTileSize]    - Tile size for particles
     * @param {Color}   [colorStartA=new Color(1,1,1)] - Color at start of life 1, randomized between start colors
     * @param {Color}   [colorStartB=new Color(1,1,1)] - Color at start of life 2, randomized between start colors
     * @param {Color}   [colorEndA=new Color(1,1,1,0)] - Color at end of life 1, randomized between end colors
     * @param {Color}   [colorEndB=new Color(1,1,1,0)] - Color at end of life 2, randomized between end colors
     * @param {Number}  [particleTime=.5]      - How long particles live
     * @param {Number}  [sizeStart=.1]         - How big are particles at start
     * @param {Number}  [sizeEnd=1]            - How big are particles at end
     * @param {Number}  [speed=.1]             - How fast are particles when spawned
     * @param {Number}  [angleSpeed=.05]       - How fast are particles rotating
     * @param {Number}  [damping=1]            - How much to dampen particle speed
     * @param {Number}  [angleDamping=1]       - How much to dampen particle angular speed
     * @param {Number}  [gravityScale=0]       - How much does gravity effect particles
     * @param {Number}  [particleConeAngle=PI] - Cone for start particle angle
     * @param {Number}  [fadeRate=.1]          - How quick to fade in particles at start/end in percent of life
     * @param {Number}  [randomness=.2]        - Apply extra randomness percent
     * @param {Boolean} [collideTiles=0]      - Do particles collide against tiles
     * @param {Boolean} [additive=0]          - Should particles use addtive blend
     * @param {Boolean} [randomColorLinear=0] - Should color be randomized linearly or across each component
     * @param {Number}  [renderOrder=0]        - Render order for particles (additive is above other stuff by default)
     */
    constructor
    ( 
        pos,
        emitSize = 0,
        emitTime = 0,
        emitRate = 100,
        emitConeAngle = PI,
        tileIndex = -1,
        tileSize = defaultTileSize,
        colorStartA = new Color,
        colorStartB = new Color,
        colorEndA = new Color(1,1,1,0),
        colorEndB = new Color(1,1,1,0),
        particleTime = .5,
        sizeStart = .1,
        sizeEnd = 1,
        speed = .1,
        angleSpeed = .05,
        damping = 1,
        angleDamping = 1,
        gravityScale = 0,
        particleConeAngle = PI,
        fadeRate = .1,
        randomness = .2, 
        collideTiles,
        additive,
        randomColorLinear = 1,
        renderOrder = additive ? 1e9 : 0
    )
    {
        super(pos, new Vector2, tileIndex, tileSize);

        // emitter settings
        this.emitSize = emitSize
        this.emitTime = emitTime;
        this.emitRate = emitRate;
        this.emitConeAngle = emitConeAngle;

        // color settings
        this.colorStartA = colorStartA;
        this.colorStartB = colorStartB;
        this.colorEndA   = colorEndA;
        this.colorEndB   = colorEndB;
        this.randomColorLinear = randomColorLinear;

        // particle settings
        this.particleTime      = particleTime;
        this.sizeStart         = sizeStart;
        this.sizeEnd           = sizeEnd;
        this.speed             = speed;
        this.angleSpeed        = angleSpeed;
        this.damping           = damping;
        this.angleDamping      = angleDamping;
        this.gravityScale      = gravityScale;
        this.particleConeAngle = particleConeAngle;
        this.fadeRate          = fadeRate;
        this.randomness        = randomness;
        this.collideTiles      = collideTiles;
        this.additive          = additive;
        this.renderOrder       = renderOrder;
        this.trailScale        =  
        this.emitTimeBuffer    = 0;
    }
    
    /** Update the emitter to spawn particles, called automatically by engine once each frame */
    update()
    {
        // only do default update to apply parent transforms
        this.parent && super.update();

        // update emitter
        if (!this.emitTime || this.getAliveTime() <= this.emitTime)
        {
            // emit particles
            if (this.emitRate)
            {
                const rate = 1/this.emitRate;
                for (this.emitTimeBuffer += timeDelta; this.emitTimeBuffer > 0; this.emitTimeBuffer -= rate)
                    this.emitParticle();
            }
        }
        else
            this.destroy();

        debugParticles && debugRect(this.pos, vec2(this.emitSize), '#0f0', 0, this.angle);
    }

    /** Spawn one particle
     *  @return {Particle} */
    emitParticle()
    {
        // spawn a particle
        const pos = this.emitSize.x != undefined ? // check if vec2 was used for size
            (new Vector2(rand(-.5,.5), rand(-.5,.5))).multiply(this.emitSize).rotate(this.angle) // box emitter
            : randInCircle(this.emitSize * .5);                                                  // circle emitter
        const particle = new Particle(this.pos.add(pos), this.tileIndex, this.tileSize, 
            this.angle + rand(this.particleConeAngle, -this.particleConeAngle));

        // randomness scales each paremeter by a percentage
        const randomness = this.randomness;
        const randomizeScale = (v)=> v + v*rand(randomness, -randomness);

        // randomize particle settings
        const particleTime  = randomizeScale(this.particleTime);
        const sizeStart     = randomizeScale(this.sizeStart);
        const sizeEnd       = randomizeScale(this.sizeEnd);
        const speed         = randomizeScale(this.speed);
        const angleSpeed    = randomizeScale(this.angleSpeed) * randSign();
        const coneAngle     = rand(this.emitConeAngle, -this.emitConeAngle);
        const colorStart    = randColor(this.colorStartA, this.colorStartB, this.randomColorLinear);
        const colorEnd      = randColor(this.colorEndA,   this.colorEndB, this.randomColorLinear);

        // build particle settings
        particle.colorStart      = colorStart;
        particle.colorEndDelta   = colorEnd.subtract(colorStart);
        particle.velocity        = (new Vector2).setAngle(this.angle + coneAngle, speed);
        particle.angleVelocity   = angleSpeed;
        particle.lifeTime        = particleTime;
        particle.sizeStart       = sizeStart;
        particle.sizeEndDelta    = sizeEnd - sizeStart;
        particle.fadeRate        = this.fadeRate;
        particle.damping         = this.damping;
        particle.angleDamping    = this.angleDamping;
        particle.elasticity      = this.elasticity;
        particle.friction        = this.friction;
        particle.gravityScale    = this.gravityScale;
        particle.collideTiles    = this.collideTiles;
        particle.additive        = this.additive;
        particle.renderOrder     = this.renderOrder;
        particle.trailScale      = this.trailScale;
        particle.mirror          = rand()<.5;

        // setup callbacks for particles
        particle.destroyCallback = this.particleDestroyCallback;
        this.particleCreateCallback && this.particleCreateCallback(particle);

        // return the newly created particle
        return particle;
    }

    // Particle emitters are not rendered, only the particles are
    render() {}
}

///////////////////////////////////////////////////////////////////////////////
/**
 * Particle Object - Created automatically by Particle Emitters
 */
class Particle extends EngineObject
{
    /**
     * Create a particle with the given settings
     * @param {Vector2} position                   - World space position of the particle
     * @param {Number}  [tileIndex=-1]              - Tile to use to render, untextured if -1
     * @param {Vector2} [tileSize=defaultTileSize] - Size of tile in source pixels
     * @param {Number}  [angle=0]                   - Angle to rotate the particle
     */
    constructor(pos, tileIndex, tileSize, angle) { super(pos, new Vector2, tileIndex, tileSize, angle); }

    /** Render the particle, automatically called each frame, sorted by renderOrder */
    render()
    {
        // modulate size and color
        const p = min((time - this.spawnTime) / this.lifeTime, 1);
        const radius = this.sizeStart + p * this.sizeEndDelta;
        const size = new Vector2(radius, radius);
        const fadeRate = this.fadeRate/2;
        const color = new Color(
            this.colorStart.r + p * this.colorEndDelta.r,
            this.colorStart.g + p * this.colorEndDelta.g,
            this.colorStart.b + p * this.colorEndDelta.b,
            (this.colorStart.a + p * this.colorEndDelta.a) * 
             (p < fadeRate ? p/fadeRate : p > 1-fadeRate ? (1-p)/fadeRate : 1)); // fade alpha

        // draw the particle
        this.additive && setBlendMode(1);
        if (this.trailScale)
        {
            // trail style particles
            const speed = this.velocity.length();
            const direction = this.velocity.scale(1/speed);
            const trailLength = speed * this.trailScale;
            size.y = max(size.x, trailLength);
            this.angle = direction.angle();
            drawTile(this.pos.add(direction.multiply(vec2(0,-trailLength/2))), size, this.tileIndex, this.tileSize, color, this.angle, this.mirror);
        }
        else
            drawTile(this.pos, size, this.tileIndex, this.tileSize, color, this.angle, this.mirror);
        this.additive && setBlendMode();
        debugParticles && debugRect(this.pos, size, '#f005', 0, this.angle);

        if (p == 1)
        {
            // destroy particle when it's time runs out
            this.color = color;
            this.size = size;
            this.destroyCallback && this.destroyCallback(this);
            this.destroyed = 1;
        }
    }
}
/** 
 *  LittleJS Medal System
 *  <br> - Tracks and displays medals
 *  <br> - Saves medals to local storage
 *  <br> - Newgrounds and OS13k integration
 *  @namespace Medals
 */

'use strict';

/** List of all medals
 *  @memberof Medals */
const medals = [];

/** Set to stop medals from being unlockable (like if cheats are enabled)
 *  @memberof Medals */
let medalsPreventUnlock;

/** This can used to enable Newgrounds functionality
 *  @type {Newgrounds}
 *  @memberof Medals */
let newgrounds;

// Engine internal variables not exposed to documentation
let medalsDisplayQueue = [], medalsSaveName, medalsDisplayTimer;

///////////////////////////////////////////////////////////////////////////////

/** Initialize medals with a save name used for storage
 *  <br> - Checks if medals are unlocked
 *  <br> - Call this after creating all medals
 *  @param {String} saveName
 *  @memberof Medals */
function medalsInit(saveName)
{
    // check if medals are unlocked
    medalsSaveName = saveName;
    debugMedals || medals.forEach(medal=> medal.unlocked = localStorage[medal.storageKey()]);
}

/** Medal Object - Tracks an unlockable medal */
class Medal
{
    /**
     * Create an medal object and adds it to the list of medals
     * @param {Number} id - The unique identifier of the medal
     * @param {String} name - Name of the medal
     * @param {String} [description] - Description of the medal
     * @param {String} [icon='🏆'] - Icon for the medal
     * @param {String} [src] - Image location for the medal
     */
    constructor(id, name, description='', icon='🏆', src)
    {
        ASSERT(id >= 0 && !medals[id]);

        // save attributes and add to list of medals
        medals[this.id = id] = this;
        this.name = name;
        this.description = description;
        this.icon = icon;

        if (src)
        {
            // load image
            this.image = new Image();
            this.image.src = src;
        }
    }

    /** Unlocks a medal if not already unlocked */
    unlock()
    {
        if (medalsPreventUnlock || this.unlocked)
            return;

        // save the medal
        ASSERT(medalsSaveName); // game name must be set
        localStorage[this.storageKey()] = this.unlocked = 1;
        medalsDisplayQueue.push(this);

        // save for newgrounds and OS13K
        newgrounds && newgrounds.unlockMedal(this.id);
        localStorage['OS13kTrophy,' + this.icon + ',' + medalsSaveName + ',' + this.name] = this.description;
    }

    /** Render a medal
     *  @param {Number} [hidePercent=0] - How much to slide the medal off screen
     */
    render(hidePercent=0)
    {
        const context = overlayContext;
        const x = overlayCanvas.width - medalDisplayWidth;
        const y = -medalDisplayHeight*hidePercent;

        // draw containing rect and clip to that region
        context.save();
        context.beginPath();
        context.fillStyle = '#ddd'
        context.fill(context.rect(x, y, medalDisplayWidth, medalDisplayHeight));
        context.strokeStyle = context.fillStyle = '#000';
        context.lineWidth = 2; 
        context.stroke();
        context.clip();

        this.renderIcon(x+15+medalDisplayIconSize/2, y+medalDisplayHeight/2);

        // draw the text
        context.textAlign = 'left';
        context.font = '3em '+ defaultFont;
        context.fillText(this.name, x+medalDisplayIconSize+25, y+35);
        context.font = '1.5em '+ defaultFont;
        context.restore(context.fillText(this.description, x+medalDisplayIconSize+25, y+70));
    }

    /** Render the icon for a medal
     *  @param {Number} x - Screen space X position
     *  @param {Number} y - Screen space Y position
     *  @param {Number} [size=medalDisplayIconSize] - Screen space size
     */
    renderIcon(x, y, size=medalDisplayIconSize)
    {
        // draw the image or icon
        const context = overlayContext;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = size*.6 + 'px '+ defaultFont;
        context.fillStyle = '#000';
        if (this.image)
            context.drawImage(this.image, x-size/2, y-size/2, size, size);
        else
            context.fillText(this.icon, x, y); // show icon if there is no image
    }
 
    // Get local storage key used by the medal
    storageKey()
    {
        return medalsSaveName + '_medal_' + this.id;
    }
}

// engine automatically renders medals
function medalsRender()
{
    if (!medalsDisplayQueue.length)
        return;
    
    // update first medal in queue
    const medal = medalsDisplayQueue[0];
    const time = timeReal - medalsDisplayTimer;
    if (!medalsDisplayTimer)
        medalsDisplayTimer = timeReal;
    else if (time > medalDisplayTime)
        medalsDisplayQueue.shift(medalsDisplayTimer = 0);
    else
    {
        // slide on/off medals
        const slideOffTime = medalDisplayTime - medalDisplaySlideTime;
        const hidePercent = 
            time < medalDisplaySlideTime ? 1 - time / medalDisplaySlideTime :
            time > slideOffTime ? (time - slideOffTime) / medalDisplaySlideTime : 0;
        medal.render(hidePercent);
    }
}

///////////////////////////////////////////////////////////////////////////////

/** Newgrounds API wrapper object */
class Newgrounds
{
    /**
     * Create a newgrounds object
     * @param {Number} app_id - The newgrounds App ID
     * @param {String} [cipher] - The encryption Key (AES-128/Base64)
     */
    constructor(app_id, cipher)
    {
        ASSERT(!newgrounds && app_id);
        this.app_id = app_id;
        this.cipher = cipher;
        this.host = location ? location.hostname : '';

        // create an instance of CryptoJS for encrypted calls
        cipher && (this.cryptoJS = CryptoJS());

        // get session id from url search params
        const url = new URL(window.location.href);
        this.session_id = url.searchParams.get('ngio_session_id') || 0;

        if (this.session_id == 0)
            return; // only use newgrounds when logged in

        // get medals
        const medalsResult = this.call('Medal.getList');
        this.medals = medalsResult ? medalsResult.result.data['medals'] : [];
        debugMedals && console.log(this.medals);
        for (const newgroundsMedal of this.medals)
        {
            const medal = medals[newgroundsMedal['id']];
            if (medal)
            {
                // copy newgrounds medal data
                medal.image =       new Image();
                medal.image.src =   newgroundsMedal['icon'];
                medal.name =        newgroundsMedal['name'];
                medal.description = newgroundsMedal['description'];
                medal.unlocked =    newgroundsMedal['unlocked'];
                medal.difficulty =  newgroundsMedal['difficulty'];
                medal.value =       newgroundsMedal['value'];

                if (medal.value)
                    medal.description = medal.description + ' (' + medal.value + ')';
            }
        }
    
        // get scoreboards
        const scoreboardResult = this.call('ScoreBoard.getBoards');
        this.scoreboards = scoreboardResult ? scoreboardResult.result.data.scoreboards : [];
        debugMedals && console.log(this.scoreboards);
    }

    /** Send message to unlock a medal by id
     * @param {Number} id - The medal id */
    unlockMedal(id) { return this.call('Medal.unlock', {'id':id}, 1); }

    /** Send message to post score
     * @param {Number} id - The scoreboard id
     * @param {Number} value - The score value */
    postScore(id, value) { return this.call('ScoreBoard.postScore', {'id':id, 'value':value}, 1); }

    /** Send message to log a view */
    logView() { return this.call('App.logView', {'host':this.host}, 1); }

    /** Get scores from a scoreboard
     * @param {Number} id - The scoreboard id
     * @param {String} [user=0] - A user's id or name
     * @param {Number} [social=0] - If true, only social scores will be loaded
     * @param {Number} [skip=0] - Number of scores to skip before start
     * @param {Number} [limit=10] - Number of scores to include in the list
     * @return {Object} - The response JSON object
     */
    getScores(id, user=0, social=0, skip=0, limit=10)
    { return this.call('ScoreBoard.getScores', {'id':id, 'user':user, 'social':social, 'skip':skip, 'limit':limit}); }

    /** Send a message to call a component of the Newgrounds API
     * @param {String}  component - Name of the component
     * @param {Object}  [parameters=0] - Parameters to use for call
     * @param {Boolean} [async=0] - If true, wait for response before continuing (will cause stall)
     * @return {Object} - The response JSON object
     */
    call(component, parameters=0, async=0)
    {
        const call = {'component':component, 'parameters':parameters};
        if (this.cipher)
        {
            // encrypt using AES-128 Base64 with cryptoJS
            const cryptoJS = this.cryptoJS;
            const aesKey = cryptoJS['enc']['Base64']['parse'](this.cipher);
            const iv = cryptoJS['lib']['WordArray']['random'](16);
            const encrypted = cryptoJS['AES']['encrypt'](JSON.stringify(call), aesKey, {'iv':iv});
            call['secure'] = cryptoJS['enc']['Base64']['stringify'](iv.concat(encrypted['ciphertext']));
            call['parameters'] = 0;
        }

        // build the input object
        const input = 
        {
            'app_id':     this.app_id,
            'session_id': this.session_id,
            'call':       call
        };

        // build post data
        const formData = new FormData();
        formData.append('input', JSON.stringify(input));
        
        // send post data
        const xmlHttp = new XMLHttpRequest();
        const url = 'https://newgrounds.io/gateway_v3.php';
        xmlHttp.open('POST', url, !debugMedals && async);
        xmlHttp.send(formData);
        debugMedals && console.log(xmlHttp.responseText);
        return xmlHttp.responseText && JSON.parse(xmlHttp.responseText);
    }
}

///////////////////////////////////////////////////////////////////////////////
// Crypto-JS - https://github.com/brix/crypto-js [The MIT License (MIT)]
// Copyright (c) 2009-2013 Jeff Mott  Copyright (c) 2013-2016 Evan Vosberg

const CryptoJS=()=>eval(Function("[M='GBMGXz^oVYPPKKbB`agTXU|LxPc_ZBcMrZvCr~wyGfWrwk@ATqlqeTp^N?p{we}jIpEnB_sEr`l?YDkDhWhprc|Er|XETG?pTl`e}dIc[_N~}fzRycIfpW{HTolvoPB_FMe_eH~BTMx]yyOhv?biWPCGc]kABencBhgERHGf{OL`Dj`c^sh@canhy[secghiyotcdOWgO{tJIE^JtdGQRNSCrwKYciZOa]Y@tcRATYKzv|sXpboHcbCBf`}SKeXPFM|RiJsSNaIb]QPc[D]Jy_O^XkOVTZep`ONmntLL`Qz~UupHBX_Ia~WX]yTRJIxG`ioZ{fefLJFhdyYoyLPvqgH?b`[TMnTwwfzDXhfM?rKs^aFr|nyBdPmVHTtAjXoYUloEziWDCw_suyYT~lSMksI~ZNCS[Bex~j]Vz?kx`gdYSEMCsHpjbyxQvw|XxX_^nQYue{sBzVWQKYndtYQMWRef{bOHSfQhiNdtR{o?cUAHQAABThwHPT}F{VvFmgN`E@FiFYS`UJmpQNM`X|tPKHlccT}z}k{sACHL?Rt@MkWplxO`ASgh?hBsuuP|xD~LSH~KBlRs]t|l|_tQAroDRqWS^SEr[sYdPB}TAROtW{mIkE|dWOuLgLmJrucGLpebrAFKWjikTUzS|j}M}szasKOmrjy[?hpwnEfX[jGpLt@^v_eNwSQHNwtOtDgWD{rk|UgASs@mziIXrsHN_|hZuxXlPJOsA^^?QY^yGoCBx{ekLuZzRqQZdsNSx@ezDAn{XNj@fRXIwrDX?{ZQHwTEfu@GhxDOykqts|n{jOeZ@c`dvTY?e^]ATvWpb?SVyg]GC?SlzteilZJAL]mlhLjYZazY__qcVFYvt@|bIQnSno@OXyt]OulzkWqH`rYFWrwGs`v|~XeTsIssLrbmHZCYHiJrX}eEzSssH}]l]IhPQhPoQ}rCXLyhFIT[clhzYOvyHqigxmjz`phKUU^TPf[GRAIhNqSOdayFP@FmKmuIzMOeoqdpxyCOwCthcLq?n`L`tLIBboNn~uXeFcPE{C~mC`h]jUUUQe^`UqvzCutYCgct|SBrAeiYQW?X~KzCz}guXbsUw?pLsg@hDArw?KeJD[BN?GD@wgFWCiHq@Ypp_QKFixEKWqRp]oJFuVIEvjDcTFu~Zz]a{IcXhWuIdMQjJ]lwmGQ|]g~c]Hl]pl`Pd^?loIcsoNir_kikBYyg?NarXZEGYspt_vLBIoj}LI[uBFvm}tbqvC|xyR~a{kob|HlctZslTGtPDhBKsNsoZPuH`U`Fqg{gKnGSHVLJ^O`zmNgMn~{rsQuoymw^JY?iUBvw_~mMr|GrPHTERS[MiNpY[Mm{ggHpzRaJaoFomtdaQ_?xuTRm}@KjU~RtPsAdxa|uHmy}n^i||FVL[eQAPrWfLm^ndczgF~Nk~aplQvTUpHvnTya]kOenZlLAQIm{lPl@CCTchvCF[fI{^zPkeYZTiamoEcKmBMfZhk_j_~Fjp|wPVZlkh_nHu]@tP|hS@^G^PdsQ~f[RqgTDqezxNFcaO}HZhb|MMiNSYSAnQWCDJukT~e|OTgc}sf[cnr?fyzTa|EwEtRG|I~|IO}O]S|rp]CQ}}DWhSjC_|z|oY|FYl@WkCOoPuWuqr{fJu?Brs^_EBI[@_OCKs}?]O`jnDiXBvaIWhhMAQDNb{U`bqVR}oqVAvR@AZHEBY@depD]OLh`kf^UsHhzKT}CS}HQKy}Q~AeMydXPQztWSSzDnghULQgMAmbWIZ|lWWeEXrE^EeNoZApooEmrXe{NAnoDf`m}UNlRdqQ@jOc~HLOMWs]IDqJHYoMziEedGBPOxOb?[X`KxkFRg@`mgFYnP{hSaxwZfBQqTm}_?RSEaQga]w[vxc]hMne}VfSlqUeMo_iqmd`ilnJXnhdj^EEFifvZyxYFRf^VaqBhLyrGlk~qowqzHOBlOwtx?i{m~`n^G?Yxzxux}b{LSlx]dS~thO^lYE}bzKmUEzwW^{rPGhbEov[Plv??xtyKJshbG`KuO?hjBdS@Ru}iGpvFXJRrvOlrKN?`I_n_tplk}kgwSXuKylXbRQ]]?a|{xiT[li?k]CJpwy^o@ebyGQrPfF`aszGKp]baIx~H?ElETtFh]dz[OjGl@C?]VDhr}OE@V]wLTc[WErXacM{We`F|utKKjgllAxvsVYBZ@HcuMgLboFHVZmi}eIXAIFhS@A@FGRbjeoJWZ_NKd^oEH`qgy`q[Tq{x?LRP|GfBFFJV|fgZs`MLbpPYUdIV^]mD@FG]pYAT^A^RNCcXVrPsgk{jTrAIQPs_`mD}rOqAZA[}RETFz]WkXFTz_m{N@{W@_fPKZLT`@aIqf|L^Mb|crNqZ{BVsijzpGPEKQQZGlApDn`ruH}cvF|iXcNqK}cxe_U~HRnKV}sCYb`D~oGvwG[Ca|UaybXea~DdD~LiIbGRxJ_VGheI{ika}KC[OZJLn^IBkPrQj_EuoFwZ}DpoBRcK]Q}?EmTv~i_Tul{bky?Iit~tgS|o}JL_VYcCQdjeJ_MfaA`FgCgc[Ii|CBHwq~nbJeYTK{e`CNstKfTKPzw{jdhp|qsZyP_FcugxCFNpKitlR~vUrx^NrSVsSTaEgnxZTmKc`R|lGJeX}ccKLsQZQhsFkeFd|ckHIVTlGMg`~uPwuHRJS_CPuN_ogXe{Ba}dO_UBhuNXby|h?JlgBIqMKx^_u{molgL[W_iavNQuOq?ap]PGB`clAicnl@k~pA?MWHEZ{HuTLsCpOxxrKlBh]FyMjLdFl|nMIvTHyGAlPogqfZ?PlvlFJvYnDQd}R@uAhtJmDfe|iJqdkYr}r@mEjjIetDl_I`TELfoR|qTBu@Tic[BaXjP?dCS~MUK[HPRI}OUOwAaf|_}HZzrwXvbnNgltjTwkBE~MztTQhtRSWoQHajMoVyBBA`kdgK~h`o[J`dm~pm]tk@i`[F~F]DBlJKklrkR]SNw@{aG~Vhl`KINsQkOy?WhcqUMTGDOM_]bUjVd|Yh_KUCCgIJ|LDIGZCPls{RzbVWVLEhHvWBzKq|^N?DyJB|__aCUjoEgsARki}j@DQXS`RNU|DJ^a~d{sh_Iu{ONcUtSrGWW@cvUjefHHi}eSSGrNtO?cTPBShLqzwMVjWQQCCFB^culBjZHEK_{dO~Q`YhJYFn]jq~XSnG@[lQr]eKrjXpG~L^h~tDgEma^AUFThlaR{xyuP@[^VFwXSeUbVetufa@dX]CLyAnDV@Bs[DnpeghJw^?UIana}r_CKGDySoRudklbgio}kIDpA@McDoPK?iYcG?_zOmnWfJp}a[JLR[stXMo?_^Ng[whQlrDbrawZeSZ~SJstIObdDSfAA{MV}?gNunLOnbMv_~KFQUAjIMj^GkoGxuYtYbGDImEYiwEMyTpMxN_LSnSMdl{bg@dtAnAMvhDTBR_FxoQgANniRqxd`pWv@rFJ|mWNWmh[GMJz_Nq`BIN@KsjMPASXORcdHjf~rJfgZYe_uulzqM_KdPlMsuvU^YJuLtofPhGonVOQxCMuXliNvJIaoC?hSxcxKVVxWlNs^ENDvCtSmO~WxI[itnjs^RDvI@KqG}YekaSbTaB]ki]XM@[ZnDAP~@|BzLRgOzmjmPkRE@_sobkT|SszXK[rZN?F]Z_u}Yue^[BZgLtR}FHzWyxWEX^wXC]MJmiVbQuBzkgRcKGUhOvUc_bga|Tx`KEM`JWEgTpFYVeXLCm|mctZR@uKTDeUONPozBeIkrY`cz]]~WPGMUf`MNUGHDbxZuO{gmsKYkAGRPqjc|_FtblEOwy}dnwCHo]PJhN~JoteaJ?dmYZeB^Xd?X^pOKDbOMF@Ugg^hETLdhwlA}PL@_ur|o{VZosP?ntJ_kG][g{Zq`Tu]dzQlSWiKfnxDnk}KOzp~tdFstMobmy[oPYjyOtUzMWdjcNSUAjRuqhLS@AwB^{BFnqjCmmlk?jpn}TksS{KcKkDboXiwK]qMVjm~V`LgWhjS^nLGwfhAYrjDSBL_{cRus~{?xar_xqPlArrYFd?pHKdMEZzzjJpfC?Hv}mAuIDkyBxFpxhstTx`IO{rp}XGuQ]VtbHerlRc_LFGWK[XluFcNGUtDYMZny[M^nVKVeMllQI[xtvwQnXFlWYqxZZFp_|]^oWX[{pOMpxXxvkbyJA[DrPzwD|LW|QcV{Nw~U^dgguSpG]ClmO@j_TENIGjPWwgdVbHganhM?ema|dBaqla|WBd`poj~klxaasKxGG^xbWquAl~_lKWxUkDFagMnE{zHug{b`A~IYcQYBF_E}wiA}K@yxWHrZ{[d~|ARsYsjeNWzkMs~IOqqp[yzDE|WFrivsidTcnbHFRoW@XpAV`lv_zj?B~tPCppRjgbbDTALeFaOf?VcjnKTQMLyp{NwdylHCqmo?oelhjWuXj~}{fpuX`fra?GNkDiChYgVSh{R[BgF~eQa^WVz}ATI_CpY?g_diae]|ijH`TyNIF}|D_xpmBq_JpKih{Ba|sWzhnAoyraiDvk`h{qbBfsylBGmRH}DRPdryEsSaKS~tIaeF[s]I~xxHVrcNe@Jjxa@jlhZueLQqHh_]twVMqG_EGuwyab{nxOF?`HCle}nBZzlTQjkLmoXbXhOtBglFoMz?eqre`HiE@vNwBulglmQjj]DB@pPkPUgA^sjOAUNdSu_`oAzar?n?eMnw{{hYmslYi[TnlJD'",...']charCodeAtUinyxpf',"for(;e<10359;c[e++]=p-=128,A=A?p-A&&A:p==34&&p)for(p=1;p<128;y=f.map((n,x)=>(U=r[n]*2+1,U=Math.log(U/(h-U)),t-=a[x]*U,U/500)),t=~-h/(1+Math.exp(t))|1,i=o%h<t,o=o%h+(i?t:h-t)*(o>>17)-!i*t,f.map((n,x)=>(U=r[n]+=(i*h/2-r[n]<<13)/((C[n]+=C[n]<5)+1/20)>>13,a[x]+=y[x]*(i-t/h))),p=p*2+i)for(f='010202103203210431053105410642065206541'.split(t=0).map((n,x)=>(U=0,[...n].map((n,x)=>(U=U*997+(c[e-n]|0)|0)),h*32-1&U*997+p+!!A*129)*12+x);o<h*32;o=o*64|M.charCodeAt(d++)&63);for(C=String.fromCharCode(...c);r=/[\0-#?@\\\\~]/.exec(C);)with(C.split(r))C=join(shift());return C")([],[],1<<17,[0,0,0,0,0,0,0,0,0,0,0,0],new Uint16Array(51e6).fill(1<<15),new Uint8Array(51e6),0,0,0,0));
/** 
 *  LittleJS WebGL Interface
 *  <br> - All webgl used by the engine is wrapped up here
 *  <br> - Can be disabled with glEnable to revert to 2D canvas rendering
 *  <br> - Batches sprite rendering on GPU for incredibly fast performance
 *  <br> - Sprite transform math is done in the shader where possible
 *  <br> - For normal stuff you won't need to call any functions in this file
 *  <br> - For advanced stuff there are helper functions to create shaders, textures, etc
 *  @namespace WebGL
 */

'use strict';

/** The WebGL canvas which appears above the main canvas and below the overlay canvas
 *  @type {HTMLCanvasElement}
 *  @memberof WebGL */
let glCanvas;

/** 2d context for glCanvas 
 *  @type {WebGLRenderingContext}
 *  @memberof WebGL */
let glContext;

/** Main tile sheet texture automatically loaded by engine
 *  @type {WebGLTexture}
 *  @memberof WebGL */
let glTileTexture;

// WebGL internal variables not exposed to documentation
let glActiveTexture, glShader, glPositionData, glColorData, glBatchCount, glDirty, glAdditive;

///////////////////////////////////////////////////////////////////////////////

// Init WebGL, called automatically by the engine
function glInit()
{
    if (!glEnable) return;

    // create the canvas and tile texture
    glCanvas = document.createElement('canvas');
    glContext = glCanvas.getContext('webgl',  {antialias:!pixelated});
    glTileTexture = glCreateTexture(tileImage);

    if (glOverlay)
    {
        // firefox is much faster without copying the gl buffer so we just overlay it with some tradeoffs
        document.body.appendChild(glCanvas);
        glCanvas.style = mainCanvas.style.cssText;
    }

    // setup vertex and fragment shaders
    glShader = glCreateProgram(
        'precision lowp float;'+    // use lowp for better performance
        'uniform mat4 m;'+          // transform matrix
        'attribute float a;'+       // angle
        'attribute vec2 p,s,t;'+    // position, size, uv
        'attribute vec4 c,b;'+      // color, additiveColor
        'varying vec2 v;'+          // return uv
        'varying vec4 d,e;'+        // return color, additiveColor
        'void main(){'+             // shader entry point
        'gl_Position=m*vec4((s*cos(a)-vec2(-s.y,s)*sin(a))*.5+p,1,1);'+// transform position
        'v=t;d=c;e=b;'+             // pass stuff to fragment shader
        '}'                         // end of shader
        ,
        'precision lowp float;'+             // use lowp for better performance
        'varying vec2 v;'+                   // uv
        'varying vec4 d,e;'+                 // color, additiveColor
        'uniform sampler2D j;'+              // texture
        'void main(){'+                      // shader entry point
        'gl_FragColor=texture2D(j,v)*d+e;'+  // modulate texture by color plus additive
        '}'                                  // end of shader
    );

    // init buffers
    const glVertexData = new ArrayBuffer(gl_MAX_BATCH * gl_VERTICES_PER_QUAD * gl_VERTEX_BYTE_STRIDE);
    glCreateBuffer(gl_ARRAY_BUFFER, glVertexData.byteLength, gl_DYNAMIC_DRAW);
    glPositionData = new Float32Array(glVertexData);
    glColorData = new Uint32Array(glVertexData);

    // setup the vertex data array
    const initVertexAttribArray = (name, type, typeSize, size, normalize=0)=>
    {
        const location = glContext.getAttribLocation(glShader, name);
        glContext.enableVertexAttribArray(location);
        glContext.vertexAttribPointer(location, size, type, normalize, gl_VERTEX_BYTE_STRIDE, offset);
        offset += size*typeSize;
    }
    let offset = glDirty = glBatchCount = 0;
    initVertexAttribArray('a', gl_FLOAT, 4, 1);            // angle
    initVertexAttribArray('p', gl_FLOAT, 4, 2);            // position
    initVertexAttribArray('s', gl_FLOAT, 4, 2);            // size
    initVertexAttribArray('t', gl_FLOAT, 4, 2);            // texture coords
    initVertexAttribArray('c', gl_UNSIGNED_BYTE, 1, 4, 1); // color
    initVertexAttribArray('b', gl_UNSIGNED_BYTE, 1, 4, 1); // additiveColor
}

/** Set the WebGl blend mode, normally you should call setBlendMode instead
 *  @param {Boolean} [additive=0]
 *  @memberof WebGL */
function glSetBlendMode(additive)
{
    if (!glEnable) return;
        
    if (additive != glAdditive)
        glFlush();

    // setup blending
    glAdditive = additive;
    const destBlend = additive ? gl_ONE : gl_ONE_MINUS_SRC_ALPHA;
    glContext.blendFuncSeparate(gl_SRC_ALPHA, destBlend, gl_ONE, destBlend);
    glContext.enable(gl_BLEND);
}

/** Set the WebGl texture, not normally necessary unless multiple tile sheets are used
 *  <br> - This may also flush the gl buffer resulting in more draw calls and worse performance
 *  @param {WebGLTexture} [texture=glTileTexture]
 *  @memberof WebGL */
function glSetTexture(texture=glTileTexture)
{
    if (!glEnable) return;
        
    if (texture != glActiveTexture)
        glFlush();

    glContext.bindTexture(gl_TEXTURE_2D, glActiveTexture = texture);
}

/** Compile WebGL shader of the given type, will throw errors if in debug mode
 *  @param {String} source
 *  @param          type
 *  @return {WebGLShader}
 *  @memberof WebGL */
function glCompileShader(source, type)
{
    if (!glEnable) return;

    // build the shader
    const shader = glContext.createShader(type);
    glContext.shaderSource(shader, source);
    glContext.compileShader(shader);

    // check for errors
    if (debug && !glContext.getShaderParameter(shader, gl_COMPILE_STATUS))
        throw glContext.getShaderInfoLog(shader);
    return shader;
}

/** Create WebGL program with given shaders
 *  @param {WebGLShader} vsSource
 *  @param {WebGLShader} fsSource
 *  @return {WebGLProgram}
 *  @memberof WebGL */
function glCreateProgram(vsSource, fsSource)
{
    if (!glEnable) return;

    // build the program
    const program = glContext.createProgram();
    glContext.attachShader(program, glCompileShader(vsSource, gl_VERTEX_SHADER));
    glContext.attachShader(program, glCompileShader(fsSource, gl_FRAGMENT_SHADER));
    glContext.linkProgram(program);

    // check for errors
    if (debug && !glContext.getProgramParameter(program, gl_LINK_STATUS))
        throw glContext.getProgramInfoLog(program);
    return program;
}

/** Create WebGL buffer
 *  @param bufferType
 *  @param size
 *  @param usage
 *  @return {WebGLBuffer}
 *  @memberof WebGL */
function glCreateBuffer(bufferType, size, usage)
{
    if (!glEnable) return;

    // build the buffer
    const buffer = glContext.createBuffer();
    glContext.bindBuffer(bufferType, buffer);
    glContext.bufferData(bufferType, size, usage);
    return buffer;
}

/** Create WebGL texture from an image
 *  @param {Image} image
 *  @return {WebGLTexture}
 *  @memberof WebGL */
function glCreateTexture(image)
{
    if (!glEnable) return;

    // build the texture
    const texture = glContext.createTexture();
    glContext.bindTexture(gl_TEXTURE_2D, texture);
    glContext.texImage2D(gl_TEXTURE_2D, 0, gl_RGBA, gl_RGBA, gl_UNSIGNED_BYTE, image);

    // use point filtering for pixelated rendering
    glContext.texParameteri(gl_TEXTURE_2D, gl_TEXTURE_MIN_FILTER, pixelated ? gl_NEAREST : gl_LINEAR);
    glContext.texParameteri(gl_TEXTURE_2D, gl_TEXTURE_MAG_FILTER, pixelated ? gl_NEAREST : gl_LINEAR);
    glContext.texParameteri(gl_TEXTURE_2D, gl_TEXTURE_WRAP_S, gl_CLAMP_TO_EDGE);
    glContext.texParameteri(gl_TEXTURE_2D, gl_TEXTURE_WRAP_T, gl_CLAMP_TO_EDGE);
    return texture;
}

// called automatically by engine before render
function glPreRender(width, height)
{
    if (!glEnable) return;

    // clear and set to same size as main canvas
    glCanvas.width = width;
    glCanvas.height = height;
    glContext.viewport(0, 0, width, height);

    // set up the shader
    glContext.bindTexture(gl_TEXTURE_2D, glActiveTexture = glTileTexture);
    glContext.useProgram(glShader);
    glSetBlendMode();

    // build the transform matrix
    const sx = 2 * cameraScale / width;
    const sy = 2 * cameraScale / height;
    glContext.uniformMatrix4fv(glContext.getUniformLocation(glShader, 'm'), 0,
        new Float32Array([
            sx, 0, 0, 0,
            0, sy, 0, 0,
            1, 1, -1, 1,
            -1-sx*cameraPos.x, -1-sy*cameraPos.y, 0, 0
        ])
    );
}

/** Draw all sprites and clear out the buffer, called automatically by the system whenever necessary
 *  @memberof WebGL */
function glFlush()
{
    if (!glEnable || !glBatchCount) return;

    // draw all the sprites in the batch and reset the buffer
    glContext.bufferSubData(gl_ARRAY_BUFFER, 0, 
        glPositionData.subarray(0, glBatchCount * gl_VERTICES_PER_QUAD * gl_INDICIES_PER_VERT));
    glContext.drawArrays(gl_TRIANGLES, 0, glBatchCount * gl_VERTICES_PER_QUAD);
    glBatchCount = 0;
}

/** Draw any sprites still in the buffer, copy to main canvas and clear
 *  @param {CanvasRenderingContext2D} context
 *  @param {Boolean} [forceDraw=0]
 *  @memberof WebGL */
function glCopyToContext(context, forceDraw)
{
    if (!glEnable || !glDirty)  return;
    
    glFlush();
    if (!glOverlay || forceDraw)
    {
        // do not draw/clear in overlay mode because the canvas is visible
        context.drawImage(glCanvas, 0, glAdditive = glDirty = 0);
        glContext.clear(gl_COLOR_BUFFER_BIT);
    }
}

// Draw a sprite with the given parameters, used internally by draw functions
function glDraw(x, y, sizeX, sizeY, angle=0, uv0X=0, uv0Y=0, uv1X=1, uv1Y=1, rgba=0xffffffff, rgbaAdditive=0x00000000)
{
    if (!glEnable) return;
    
    // flush if there is no room for more verts
    if (glBatchCount == gl_MAX_BATCH)
        glFlush();
        
    // setup 2 triangles to form a quad
    let offset = glBatchCount++ * gl_VERTICES_PER_QUAD * gl_INDICIES_PER_VERT;
    glDirty = 1;

    // vertex 0
    glPositionData[offset++] = angle;
    glPositionData[offset++] = x;      glPositionData[offset++] = y;
    glPositionData[offset++] = -sizeX; glPositionData[offset++] = -sizeY;
    glPositionData[offset++] = uv0X;   glPositionData[offset++] = uv1Y;
    glColorData[offset++]    = rgba;   glColorData[offset++]    = rgbaAdditive;
    
    // vertex 1
    glPositionData[offset++] = angle;
    glPositionData[offset++] = x;      glPositionData[offset++] = y;
    glPositionData[offset++] = sizeX;  glPositionData[offset++] = sizeY;
    glPositionData[offset++] = uv1X;   glPositionData[offset++] = uv0Y;
    glColorData[offset++]    = rgba;   glColorData[offset++]    = rgbaAdditive;
    
    // vertex 2
    glPositionData[offset++] = angle;
    glPositionData[offset++] = x;      glPositionData[offset++] = y;
    glPositionData[offset++] = -sizeX; glPositionData[offset++] = sizeY;
    glPositionData[offset++] = uv0X;   glPositionData[offset++] = uv0Y;
    glColorData[offset++]    = rgba;   glColorData[offset++]    = rgbaAdditive;
    
    // vertex 0
    glPositionData[offset++] = angle;
    glPositionData[offset++] = x;      glPositionData[offset++] = y;
    glPositionData[offset++] = -sizeX; glPositionData[offset++] = -sizeY;
    glPositionData[offset++] = uv0X;   glPositionData[offset++] = uv1Y;
    glColorData[offset++]    = rgba;   glColorData[offset++]    = rgbaAdditive;

    // vertex 3
    glPositionData[offset++] = angle;
    glPositionData[offset++] = x;      glPositionData[offset++] = y;
    glPositionData[offset++] = sizeX;  glPositionData[offset++] = -sizeY;
    glPositionData[offset++] = uv1X;   glPositionData[offset++] = uv1Y;
    glColorData[offset++]    = rgba;   glColorData[offset++]    = rgbaAdditive;

    // vertex 1
    glPositionData[offset++] = angle;
    glPositionData[offset++] = x;      glPositionData[offset++] = y;
    glPositionData[offset++] = sizeX;  glPositionData[offset++] = sizeY;
    glPositionData[offset++] = uv1X;   glPositionData[offset++] = uv0Y;
    glColorData[offset++]    = rgba;   glColorData[offset++]    = rgbaAdditive;
}

///////////////////////////////////////////////////////////////////////////////
// store gl constants as integers so their name doesn't use space in minifed
const 
gl_ONE = 1,
gl_TRIANGLES = 4,
gl_SRC_ALPHA = 770,
gl_ONE_MINUS_SRC_ALPHA = 771,
gl_BLEND = 3042,
gl_TEXTURE_2D = 3553,
gl_UNSIGNED_BYTE = 5121,
gl_FLOAT = 5126,
gl_RGBA = 6408,
gl_NEAREST = 9728,
gl_LINEAR = 9729,
gl_TEXTURE_MAG_FILTER = 10240,
gl_TEXTURE_MIN_FILTER = 10241,
gl_TEXTURE_WRAP_S = 10242,
gl_TEXTURE_WRAP_T = 10243,
gl_COLOR_BUFFER_BIT = 16384,
gl_CLAMP_TO_EDGE = 33071,
gl_ARRAY_BUFFER = 34962,
gl_DYNAMIC_DRAW = 35048,
gl_FRAGMENT_SHADER = 35632, 
gl_VERTEX_SHADER = 35633,
gl_COMPILE_STATUS = 35713,
gl_LINK_STATUS = 35714,

// constants for batch rendering
gl_VERTICES_PER_QUAD = 6,
gl_INDICIES_PER_VERT = 9,
gl_MAX_BATCH = 1<<16,
gl_VERTEX_BYTE_STRIDE = 4 + (4 * 2) * 3 + (4) * 2; // float + vec2 * 3 + (char * 4) * 2