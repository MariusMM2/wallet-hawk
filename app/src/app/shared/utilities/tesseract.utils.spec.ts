import {TesseractUtils} from './tesseract.utils';
import {BudgetItem} from '../../core/models';

const using = require('jasmine-data-provider');


const textStripData = [
    {
        input: `~ ME.JERI =

ARLA 24 LETMELK 1L
2 x 10,50 21,00
* OVR. FODEVARER =
LAYS CHEESE/ONION 23,95
RABAT 7,95-
LAYS SALT & VINEGAR 23,95
RABAT 7.95-
MARABOU OREQ 9,95
STORCK RIESEN 135G 23,95
VORES SALTSTANGER 8,00
TOTAL 94,90

KONTANT 100, 00

BYTTEPENGE 5,00`,
        outputNoSections: `ARLA 24 LETMELK 1L
2 x 10,50 21,00

LAYS CHEESE/ONION 23,95
RABAT 7,95-
LAYS SALT & VINEGAR 23,95
RABAT 7.95-
MARABOU OREQ 9,95
STORCK RIESEN 135G 23,95
VORES SALTSTANGER 8,00
TOTAL 94,90

KONTANT 100, 00

BYTTEPENGE 5,00`,
        outputNoHeader: `~ ME.JERI =

ARLA 24 LETMELK 1L
2 x 10,50 21,00
* OVR. FODEVARER =
LAYS CHEESE/ONION 23,95
RABAT 7,95-
LAYS SALT & VINEGAR 23,95
RABAT 7.95-
MARABOU OREQ 9,95
STORCK RIESEN 135G 23,95
VORES SALTSTANGER 8,00
TOTAL 94,90

KONTANT 100, 00

BYTTEPENGE 5,00`,
        outputNoFooter: `~ ME.JERI =

ARLA 24 LETMELK 1L
2 x 10,50 21,00
* OVR. FODEVARER =
LAYS CHEESE/ONION 23,95
RABAT 7,95-
LAYS SALT & VINEGAR 23,95
RABAT 7.95-
MARABOU OREQ 9,95
STORCK RIESEN 135G 23,95
VORES SALTSTANGER 8,00`,
        outputTrimmed: `~ ME.JERI =
ARLA 24 LETMELK 1L
2 x 10,50 21,00
* OVR. FODEVARER =
LAYS CHEESE/ONION 23,95
RABAT 7,95-
LAYS SALT & VINEGAR 23,95
RABAT 7.95-
MARABOU OREQ 9,95
STORCK RIESEN 135G 23,95
VORES SALTSTANGER 8,00
TOTAL 94,90
KONTANT 100, 00
BYTTEPENGE 5,00`,
        outputStripped: `ARLA 24 LETMELK 1L
2 x 10,50 21,00
LAYS CHEESE/ONION 23,95
RABAT 7,95-
LAYS SALT & VINEGAR 23,95
RABAT 7.95-
MARABOU OREQ 9,95
STORCK RIESEN 135G 23,95
VORES SALTSTANGER 8,00`,
        inputStripped: `ARLA 24 LETMELK 1L
2 x 10,50 21,00
LAYS CHEESE/ONION 23,95
RABAT 7,95-
LAYS SALT & VINEGAR 23,95
RABAT 7.95-
MARABOU OREQ 9,95
STORCK RIESEN 135G 23,95
VORES SALTSTANGER 8,00`,
        outputItems: [
            {
                name: 'ARLA 24 LETMELK 1L',
                totalPrice: -2100
            },
            {
                name: 'LAYS CHEESE/ONION',
                totalPrice: -(2395 - 795)
            },
            {
                name: 'LAYS SALT & VINEGAR',
                totalPrice: -(2395 - 795)
            },
            {
                name: 'MARABOU OREQ',
                totalPrice: -995
            },
            {
                name: 'STORCK RIESEN 135G',
                totalPrice: -2395
            },
            {
                name: 'VORES SALTSTANGER',
                totalPrice: -800
            }
        ] as Array<Partial<BudgetItem>>
    },
    {
        input: `MAN - SON 07.00 - 21.00 ‘
} * FRUGT & GRONT =«
OKO BANANER, L@CE
6 X 2,50 15,00
~ MICJOERT =
, ARLA 24 LETMELK 1L
‘ < X 10,50 21,00
* OVR. FODEVARER =
VORES CORNFLAKES 10,50
‘ * DRITKKEVARER =
GULD TUB. 6-PAK 45,00
' RABAT 10,00-
‘ * PERSONLIG PLEJE =
NATURE MOMENTS MEN 19,95
RABAT 9,95-
NATURE MOMENTS MEN 19,95
RABAT 9,95-
~ * PANTEBAREPOSER =«
7 PANT
- 6 x 1,00 6,00
l TOTAL 107,50
; BETALINGSKORT 107,50
‘ MOM3 UDGZR 21,50`,
        outputNoSections: `MAN - SON 07.00 - 21.00 ‘

OKO BANANER, L@CE
6 X 2,50 15,00

, ARLA 24 LETMELK 1L
‘ < X 10,50 21,00

VORES CORNFLAKES 10,50

GULD TUB. 6-PAK 45,00
' RABAT 10,00-

NATURE MOMENTS MEN 19,95
RABAT 9,95-
NATURE MOMENTS MEN 19,95
RABAT 9,95-

7 PANT
- 6 x 1,00 6,00
l TOTAL 107,50
; BETALINGSKORT 107,50
‘ MOM3 UDGZR 21,50`,
        outputNoHeader: `} * FRUGT & GRONT =«
OKO BANANER, L@CE
6 X 2,50 15,00
~ MICJOERT =
, ARLA 24 LETMELK 1L
‘ < X 10,50 21,00
* OVR. FODEVARER =
VORES CORNFLAKES 10,50
‘ * DRITKKEVARER =
GULD TUB. 6-PAK 45,00
' RABAT 10,00-
‘ * PERSONLIG PLEJE =
NATURE MOMENTS MEN 19,95
RABAT 9,95-
NATURE MOMENTS MEN 19,95
RABAT 9,95-
~ * PANTEBAREPOSER =«
7 PANT
- 6 x 1,00 6,00
l TOTAL 107,50
; BETALINGSKORT 107,50
‘ MOM3 UDGZR 21,50`,
        outputNoFooter: `MAN - SON 07.00 - 21.00 ‘
} * FRUGT & GRONT =«
OKO BANANER, L@CE
6 X 2,50 15,00
~ MICJOERT =
, ARLA 24 LETMELK 1L
‘ < X 10,50 21,00
* OVR. FODEVARER =
VORES CORNFLAKES 10,50
‘ * DRITKKEVARER =
GULD TUB. 6-PAK 45,00
' RABAT 10,00-
‘ * PERSONLIG PLEJE =
NATURE MOMENTS MEN 19,95
RABAT 9,95-
NATURE MOMENTS MEN 19,95
RABAT 9,95-
~ * PANTEBAREPOSER =«
7 PANT
- 6 x 1,00 6,00`,
        outputTrimmed: `MAN - SON 07.00 - 21.00 ‘
} * FRUGT & GRONT =«
OKO BANANER, L@CE
6 X 2,50 15,00
~ MICJOERT =
, ARLA 24 LETMELK 1L
‘ < X 10,50 21,00
* OVR. FODEVARER =
VORES CORNFLAKES 10,50
‘ * DRITKKEVARER =
GULD TUB. 6-PAK 45,00
' RABAT 10,00-
‘ * PERSONLIG PLEJE =
NATURE MOMENTS MEN 19,95
RABAT 9,95-
NATURE MOMENTS MEN 19,95
RABAT 9,95-
~ * PANTEBAREPOSER =«
7 PANT
- 6 x 1,00 6,00
l TOTAL 107,50
; BETALINGSKORT 107,50
‘ MOM3 UDGZR 21,50`,
        outputStripped: `OKO BANANER, L@CE
6 X 2,50 15,00
, ARLA 24 LETMELK 1L
‘ < X 10,50 21,00
VORES CORNFLAKES 10,50
GULD TUB. 6-PAK 45,00
' RABAT 10,00-
NATURE MOMENTS MEN 19,95
RABAT 9,95-
NATURE MOMENTS MEN 19,95
RABAT 9,95-
7 PANT
- 6 x 1,00 6,00`,
        inputStripped: `OKO BANANER, L@CE
6 X 2,50 15,00
, ARLA 24 LETMELK 1L
‘ < X 10,50 21,00
VORES CORNFLAKES 10,50
GULD TUB. 6-PAK 45,00
' RABAT 10,00-
NATURE MOMENTS MEN 19,95
RABAT 9,95-
NATURE MOMENTS MEN 19,95
RABAT 9,95-
7 PANT
- 6 x 1,00 6,00`,
        outputItems: [
            {
                name: 'OKO BANANER, L@CE',
                totalPrice: -1500
            },
            {
                name: ', ARLA 24 LETMELK 1L',
                totalPrice: -2100
            },
            {
                name: 'VORES CORNFLAKES',
                totalPrice: -1050
            },
            {
                name: 'GULD TUB. 6-PAK',
                totalPrice: -(4500 - 1000)
            },
            {
                name: 'NATURE MOMENTS MEN',
                totalPrice: -(1995 - 995)
            },
            {
                name: 'NATURE MOMENTS MEN',
                totalPrice: -(1995 - 995)
            },
            {
                name: '7 PANT',
                totalPrice: -600
            }
        ] as Array<Partial<BudgetItem>>
    }
];

describe('TesseractUtils', () => {

    beforeEach(() => {
    });

    using(textStripData, (data) => {

        it('should remove section titles', () => {
            expect(TesseractUtils.removeSections(data.input)).toEqual(data.outputNoSections);
        });

        it('should remove header', () => {
            expect(TesseractUtils.removeHeader(data.input)).toEqual(data.outputNoHeader);
        });

        it('should remove footer', () => {
            expect(TesseractUtils.removeFooter(data.input)).toEqual(data.outputNoFooter);
        });

        it('should trim extra whitespace', () => {
            expect(TesseractUtils.trimExtraWhitespace(data.input)).toEqual(data.outputTrimmed);
        });

        it('should strip unused text lines', () => {
            expect(TesseractUtils.stripUnusedLines(data.input)).toEqual(data.outputStripped);
        });

        it('should parse the data into budget items', () => {
            expect(TesseractUtils.parseBudgetItemsList(data.inputStripped)).toEqual(data.outputItems);
        });
    });
});
