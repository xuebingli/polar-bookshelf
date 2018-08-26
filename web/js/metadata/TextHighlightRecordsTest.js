"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestingTime_1 = require("../test/TestingTime");
const TextHighlightRecords_1 = require("./TextHighlightRecords");
const Assertions_1 = require("../test/Assertions");
const Rect_1 = require("../Rect");
TestingTime_1.TestingTime.freeze();
describe('TextHighlightRecords', function () {
    describe('create', function () {
        it("basic", function () {
            let rects = [new Rect_1.Rect({ top: 100, left: 100, right: 200, bottom: 200, width: 100, height: 100 })];
            let textSelections = [{ text: "hello world" }];
            let text = "hello world";
            let textHighlightRecord = TextHighlightRecords_1.TextHighlightRecords.create(rects, textSelections, text);
            let expected = {
                "id": "1Af41QXbBH",
                "value": {
                    "id": "1Af41QXbBH",
                    "created": "2012-03-02T11:38:49.321Z",
                    "lastUpdated": "2012-03-02T11:38:49.321Z",
                    "rects": {
                        "0": {
                            "left": 100,
                            "top": 100,
                            "right": 200,
                            "bottom": 200,
                            "width": 100,
                            "height": 100
                        }
                    },
                    "textSelections": {
                        "0": {
                            "text": "hello world"
                        }
                    },
                    "text": "hello world",
                    "notes": {},
                    "questions": {},
                    "flashcards": {},
                    "images": {}
                }
            };
            Assertions_1.assertJSON(textHighlightRecord, expected);
        });
    });
});
//# sourceMappingURL=TextHighlightRecordsTest.js.map