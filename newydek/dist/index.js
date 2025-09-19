"use strict";
/// Copyright (C) 2020–2021 Luna Brand, Kevin Lu
/// SPDX-License-Identifier: GPL-3.0-or-later
/// This is the public interface for the ydeck module. Everything else is considered internal.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ydkToTypedDeck = exports.YDKParseError = exports.typedDeckToYdk = exports.createAllowVector = exports.Deck = void 0;
var deck_1 = require("./deck");
Object.defineProperty(exports, "Deck", { enumerable: true, get: function () { return deck_1.Deck; } });
var vector_1 = require("./vector");
Object.defineProperty(exports, "createAllowVector", { enumerable: true, get: function () { return vector_1.createAllowVector; } });
var ydk_1 = require("./ydk");
Object.defineProperty(exports, "typedDeckToYdk", { enumerable: true, get: function () { return ydk_1.typedDeckToYdk; } });
Object.defineProperty(exports, "YDKParseError", { enumerable: true, get: function () { return ydk_1.YDKParseError; } });
Object.defineProperty(exports, "ydkToTypedDeck", { enumerable: true, get: function () { return ydk_1.ydkToTypedDeck; } });
//# sourceMappingURL=index.js.map