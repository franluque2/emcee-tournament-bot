"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classify = void 0;
/**
 * Helper for setCodeClassifer. Copied from ygo-data's CardData.isSetcode.
 * Note: despite outward appearances, because JavaScript numbers are 64-bit floats,
 * JavaScript bitwise operations only work on 32-bit integers, and the setcode bit
 * array is a 64-bit integer, only the first two setcodes are actually checked.
 * @param card
 * @param searchSet The specific 16-bit setcode to check for in the card's setcode bit array
 * @returns
 */
function hasSetcode(card, searchSet) {
    let cardSet = card?.setcode || 0;
    const searchBase = searchSet & 0xfff; // the base bytes of the set we're searching for, ignoring sub-archetypes
    while (cardSet > 0) {
        const cardBase = cardSet & 0xfff;
        if (cardBase === searchBase && // same base archetype
            (cardSet & searchSet) === searchSet // since we know the base is the same, this only checks the first digit, for sub-archetypes
        ) {
            return true;
        }
        cardSet >>= 16;
    }
    return false;
}
function setCodeClassifier(setCode, mainThreshold, extraThreshold) {
    return function (deck, _, data) {
        // if no extraThreshold, assume mainThreshold applies to whole deck. Set extraThreshold to 0 to suppress this behaviour
        // we ignore the side deck, fairly safe assumption that it's usually staples
        // or a smokescreen strategy that isn't part of what the deck is pre-side
        let main;
        if (extraThreshold === undefined) {
            main = [...deck.main, ...deck.extra];
        }
        else {
            main = [...deck.main];
        }
        const mainCards = main.map(c => data.get(c));
        let out = mainCards.filter(c => hasSetcode(c, setCode)).length >= mainThreshold;
        if (extraThreshold !== undefined) {
            const extraCards = [...deck.extra].map(c => data.get(c));
            out = out && extraCards.filter(c => c && hasSetcode(c, setCode)).length >= extraThreshold;
        }
        return out;
    };
}
function cardCodeClassifier(requirements) {
    // possibly allow ORs? e.g mystic mine is mine AND (dd guide OR wobby OR cannon OR countdown)
    return function (_, deckVector) {
        // We're actually computing the vector difference here, but we only care about
        // whether the requirements multiset is a subset of the deck multiset
        for (const password in requirements) {
            if (requirements[password] > (deckVector.get(Number(password)) || 0)) {
                return false;
            }
        }
        return true;
    };
}
const mekkKnight = setCodeClassifier(0x10c, 5);
const mysticMine = cardCodeClassifier({
    76375976: 3,
    7153114: 1 // Field Barrier
});
const virtualWorld = setCodeClassifier(0x150, 5);
const drytron = cardCodeClassifier({
    22398665: 1 // Meteonis Drytron
});
const infernoble = (deck, vec, data) => {
    // noble knight + charles
    return setCodeClassifier(0x107a, 5)(deck, vec, data) && cardCodeClassifier({ 77656797: 1 })(deck, vec, data);
};
const dlink = cardCodeClassifier({
    5969957: 1 // Rokket Recharger
});
const dino = cardCodeClassifier({
    18940556: 1 // UCT
});
const eldlich = (deck, vec, data) => {
    // eldlich + eldlixir + golden land
    return (setCodeClassifier(0x142, 1)(deck, vec, data) &&
        setCodeClassifier(0x143, 1)(deck, vec, data) &&
        setCodeClassifier(0x144, 1)(deck, vec, data));
};
const zoodiac = setCodeClassifier(0xf1, 5);
const invoked = (deck, vec, data) => {
    // invoked + aleister + invoc
    return (setCodeClassifier(0xf4, 1)(deck, vec, data) &&
        cardCodeClassifier({
            86120751: 1,
            74063034: 1
        })(deck, vec, data));
};
const dogma = (deck, vec, data) => {
    // dogma + nadir servant
    return setCodeClassifier(0x146, 2)(deck, vec, data) && cardCodeClassifier({ 1984618: 1 })(deck, vec, data);
};
const pk = cardCodeClassifier({
    26692769: 1 // The Phantom Knights of Rusty Bardiche
});
const pranks = setCodeClassifier(0x120, 5);
const blader = cardCodeClassifier({
    11790356: 1,
    86240887: 1,
    32104431: 1,
    33280639: 1 // Synchro trap
});
const striker = cardCodeClassifier({
    26077387: 1 // Sky Striker Ace - Raye
});
const geist = setCodeClassifier(0x103, 5);
const dolls = setCodeClassifier(0x9d, 5);
const tribe = setCodeClassifier(0x14f, 5);
const lyrilusc = setCodeClassifier(0xf7, 5);
const maju = cardCodeClassifier({
    36584821: 1 // Gren Maju
});
const ba = setCodeClassifier(0xb1, 5);
const salad = setCodeClassifier(0x119, 5);
const guru = setCodeClassifier(0xed, 5);
const adam = setCodeClassifier(0x140, 5);
const dolche = setCodeClassifier(0x71, 5);
const numer = setCodeClassifier(0x14b, 5);
const amazement = cardCodeClassifier({
    94821366: 1 // Amazement Administrator Arlekino
});
const plant = cardCodeClassifier({
    21200905: 1 // Aromaseraphy Jasmine
});
const paleo = setCodeClassifier(0xd4, 5);
const fluffal = cardCodeClassifier({
    70245411: 1 // Toy Vendor
});
const plunder = cardCodeClassifier({
    31374201: 1 // Whitebeard, the Plunder Patroll Helm
});
const orcust = cardCodeClassifier({
    30741503: 1 // Galatea, the Orcust Automaton
});
const swordsoul = cardCodeClassifier({
    14821890: 1 // Swordsoul Blackout
});
const flunder = cardCodeClassifier({
    18940725: 1 // Floowandereeze & Robina
});
const twins = cardCodeClassifier({
    36609518: 1,
    9205573: 1 // Evil★Twin Ki-sikil
});
const peng = cardCodeClassifier({
    14761450: 1 // Penguin Squire
});
const branded = cardCodeClassifier({
    44362883: 1 // Branded Fusion
});
const despia = cardCodeClassifier({
    62962630: 1 // Aluber the Jester of Despia
});
const therion = cardCodeClassifier({
    10604644: 1 // Therion "King" Regulus
});
const sunavalon = cardCodeClassifier({
    27520594: 1 // Sunseed Genius Loci
});
const brave = cardCodeClassifier({
    3285551: 1 // Rite of Aramesir
});
const punk = cardCodeClassifier({
    55920742: 1 // Noh-P.U.N.K. Foxy Tune
});
const predap = cardCodeClassifier({
    44932065: 1 // Predaplant Byblisp
});
const spright = cardCodeClassifier({
    76145933: 1 // Spright Blue
});
const tearlaments = cardCodeClassifier({
    37961969: 1 // Tearlaments Havnis
});
const ghoti = cardCodeClassifier({
    46037983: 1 // Paces, Light of the Ghoti
});
const vernusylph = cardCodeClassifier({
    62133026: 1 // Vernusylph of the Flowering Fields
});
const exosister = cardCodeClassifier({
    37343995: 1 // Exosister Martha
});
const mathmech = cardCodeClassifier({
    36521307: 1 // Mathmech
});
const labrynth = cardCodeClassifier({
    5380979: 1 // Welcome Labrynth
});
const runick = cardCodeClassifier({
    55990317: 1 // Hugin the Runick Wings
});
const vaylantz = setCodeClassifier(0x17e, 5);
const ishizu = cardCodeClassifier({
    63542003: 1 // Keldo the Sacred Protector
});
const bystial = cardCodeClassifier({
    32731036: 1 // The Bystial Lubellion
});
const dracoslayer = cardCodeClassifier({
    92332424: 1 // Majesty Pegasus, the Dracoslayer
});
const naturia = cardCodeClassifier({
    29942771: 1 // Naturia Camellia
});
const darkworld = cardCodeClassifier({
    33017655: 1 // The Gates of Dark World
});
const yummy = cardCodeClassifier({
    31425736: 1 // Cupsy☆Yummy
});
const vsoul = cardCodeClassifier({
    29302858: 1 // Vanquish Soul Razen
});
const dracotail = cardCodeClassifier({
    75003700: 1 // Dracotail Lukias
});
const crystron = cardCodeClassifier({
    99471856: 1 // Crystron Tristaros
});
const k9 = cardCodeClassifier({
    92248362: 1, // K9-17 Izuna
    91025875: 1 //K9-ØØ Lupis
});
const mitsu = cardCodeClassifier({
    13332685: 1 // Ame no Habakiri no Mitsurugi
});
const maliss = cardCodeClassifier({
    32061192: 1 // Maliss <P> Dormouse
});
const memento = cardCodeClassifier({
    23288411: 1 // Mementoal Tecuhtlica - Combined Creation
});
const mermail = cardCodeClassifier({
    21565445: 1 // Neptabyss, the Atlantean Prince  
});
const whiteforest = cardCodeClassifier({
    61980241: 1 // Elzette of the White Forest  
});
const azamina = cardCodeClassifier({
    94845588: 1 // The Hallowed Azamina  
});
const gem = cardCodeClassifier({
    25342956: 1 // Gem-Knight Master Diamond Dispersion  
});
const fiendsmith = cardCodeClassifier({
    60764609: 1 // Fiendsmith Engraver  
});
const lunalight = cardCodeClassifier({
    35618217: 1 // Lunalight Kaleido Chick  
});
const onomat = cardCodeClassifier({
    62880279: 1 // Dodododo Warrior  
});
const heraldic = cardCodeClassifier({
    60268386: 1 // Heraldic Beast Gryphon
});
const ryzeal = cardCodeClassifier({
    34909328: 1 // Ryzeal Detonator  
});
const bewd = cardCodeClassifier({
    80326401: 1 // Wishes for Eyes of Blue  
});
const artmage = cardCodeClassifier({
    74733322: 1 // AAAAA
});
const primite = cardCodeClassifier({
    56506740: 1 // Primite Lordly Lode  
});
const regenesis = cardCodeClassifier({
    95718355: 1 // Regenesis Archfiend  
});
const kashtira = cardCodeClassifier({
    68304193: 1 // Kashtira Unicorn  
});
const superheavy = cardCodeClassifier({
    82112494: 1 // Superheavy Samurai Prodigy Wakaushi  
});
const centurion = cardCodeClassifier({
    41371602: 1 // Stand Up Centur-Ion!  
});
const pisstina = cardCodeClassifier({
    12397569: 1 // Divine Domain Baaaaaaaaaaaaaaaaaatistina  
});
const ashened = cardCodeClassifier({
    67660909: 1 // Priestess of the Ashened City  
});
const chimera = cardCodeClassifier({
    63136489: 1 // Chimera Fusion  
});
const ogdo = cardCodeClassifier({
    62405028: 1 // Nauya the Ogdoadic Remnant  
});
const lightsworn = setCodeClassifier(0x38, 5);
const fireking = cardCodeClassifier({
    66431519: 1 // Sacred Fire King Garunix  
});
const onebadday = cardCodeClassifier({
    19403423: 1, // Time-Tearing Morganite
    91800273: 1 // Dimension Shitter
});
const magistus = setCodeClassifier(0x152, 3);
const endymion = cardCodeClassifier({
    92559258: 1 // Servant of Endymion  
});
const supremeking = cardCodeClassifier({
    14513273: 1 // Supreme King Gate Magician  
});
const pendmage = cardCodeClassifier({
    73941492: 1 // Harmonizing Magician  
});
const oddeyes = cardCodeClassifier({
    14105623: 1 // Odd-Eyes Arc Pendulum Dragon  
});
const dragonmaid = cardCodeClassifier({
    41232647: 1 // House Dragonmaid  
});
const ryuge = cardCodeClassifier({
    92487128: 1 // Sosei Ryu-Ge Mistva  
});
const millennium = cardCodeClassifier({
    38775407: 1 // Sengenjin Wakes from a Millennium  
});
const argostars = cardCodeClassifier({
    91438674: 1 // Argostars - Glorious Adra  
});
const race = cardCodeClassifier({
    37617348: 1 // Rescue-ACE Hydrant  
});
const purrely = cardCodeClassifier({
    25550531: 1 // Purrely  
});
const mimighoul = cardCodeClassifier({
    81522098: 1 // Mimighoul Dragon  
});
const voiceless = cardCodeClassifier({
    25801745: 1 // Lo, Prayer of the Voiceless Voice  
});
const mikanko = cardCodeClassifier({
    81260679: 1 // Ohime the Manifested Mikanko  
});
const tenpai = cardCodeClassifier({
    91810826: 1 // Tenpai Dragon Chundra  
});
const gimmickpuppet = cardCodeClassifier({
    36890111: 1 // Mansion of the Dreadful Dolls  
});
const doodlebeast = cardCodeClassifier({
    67725394: 1 // Doodle Beast - Tyranno  
});
const odion = cardCodeClassifier({
    97522863: 1 // The Man with the Mark  
});
const classifiers = {
    "Mekk-Knight": mekkKnight,
    "Mystic Mine": mysticMine,
    "Virtual World": virtualWorld,
    Drytron: drytron,
    "Infernoble Knight": infernoble,
    "Dragon Link": dlink,
    Dinosaur: dino,
    Eldlich: eldlich,
    Zoodiac: zoodiac,
    Invoked: invoked,
    Dogmatika: dogma,
    "Phantom Knight": pk,
    "Prank-Kids": pranks,
    "Buster Blader": blader,
    "Sky Striker": striker,
    Altergeist: geist,
    Shaddoll: dolls,
    "Tri-Brigade": tribe,
    Lyrilusc: lyrilusc,
    "Gren Maju": maju,
    "Burning Abyss": ba,
    Salamangreat: salad,
    Subterror: guru,
    Adamancipator: adam,
    Madolche: dolche,
    Numeron: numer,
    Amazement: amazement,
    Plant: plant,
    Paleozoic: paleo,
    Fluffal: fluffal,
    "Plunder Patroll": plunder,
    Orcust: orcust,
    Swordsoul: swordsoul,
    Floowandereeze: flunder,
    "Evil★Twin": twins,
    Penguin: peng,
    Branded: branded,
    Despia: despia,
    Therion: therion,
    Sunavalon: sunavalon,
    Adventurer: brave,
    "P.U.N.K.": punk,
    Predaplant: predap,
    Spright: spright,
    Tearlaments: tearlaments,
    Ghoti: ghoti,
    Vernusylph: vernusylph,
    Exosister: exosister,
    Mathmech: mathmech,
    Labrynth: labrynth,
    Runick: runick,
    Vaylantz: vaylantz,
    Ishizu: ishizu,
    Bystial: bystial,
    Dracoslayer: dracoslayer,
    Naturia: naturia,
    "Dark World": darkworld,
    Yummy: yummy,
    "Vanquish Soul": vsoul,
    Dracotail: dracotail,
    Crystron: crystron,
    K9: k9,
    Mitsurugi: mitsu,
    Maliss: maliss,
    Memento: memento,
    Mermail: mermail,
    "White Forest": whiteforest,
    Azamina: azamina,
    "Gem-Knight": gem,
    Fiendsmith: fiendsmith,
    Lunalight: lunalight,
    Onomat: onomat,
    Heraldic: heraldic,
    Ryzeal: ryzeal,
    "Blue-eyes": bewd,
    Artmage: artmage,
    Primite: primite,
    Regenesis: regenesis,
    Kashtira: kashtira,
    Superheavy: superheavy,
    "Centur-Ion": centurion,
    Tistina: pisstina,
    Ashened: ashened,
    Chimera: chimera,
    Ogdoadic: ogdo,
    Lightsworn: lightsworn,
    "Fire King": fireking,
    Stun: onebadday,
    Magistus: magistus,
    Endymion: endymion,
    "Supreme King": supremeking,
    "Pendulum Magicians": pendmage,
    "Odd-Eyes": oddeyes,
    Dragonmaid: dragonmaid,
    "Ryu-Ge": ryuge,
    Millennium: millennium,
    "Rescue-ACE": race,
    Purrely: purrely,
    Mimighoul: mimighoul,
    "Voiceless Voice": voiceless,
    Mikanko: mikanko,
    "Tenpai Dragon": tenpai,
    "Gimmick Puppet": gimmickpuppet,
    "Doodle Beast": doodlebeast,
    Argostars: argostars,
    "Assorted retrains of monsters used by Odion in the Duel Monsters Anime based around Temple of the Kings": odion









};
function classify(deck, vector, data) {
    return Object.entries(classifiers)
        .filter(([, match]) => match(deck, vector, data))
        .map(([theme]) => theme);
}
exports.classify = classify;
//# sourceMappingURL=classify.js.map