"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextHighlightModel_1 = require("./TextHighlightModel");
const Assertions_1 = require("../../../test/Assertions");
const DocMetas_1 = require("../../../metadata/DocMetas");
const TextHighlightRecords_1 = require("../../../metadata/TextHighlightRecords");
const Rect_1 = require("../../../Rect");
const TextRect_1 = require("../../../metadata/TextRect");
const TestingTime_1 = require("../../../test/TestingTime");
const { Proxies } = require("../../../proxies/Proxies");
TestingTime_1.TestingTime.freeze();
describe('TextHighlightModel', function () {
    describe('Listen for new highlights', function () {
        it("Initial values", function () {
            let docMeta = createDocMeta();
            let textHighlightModel = new TextHighlightModel_1.TextHighlightModel();
            let mutations = [];
            textHighlightModel.registerListener(docMeta, (textHighlightEvent) => {
                mutations.push(summarize(textHighlightEvent));
            });
            let expected = [
                {
                    "pageNum": 1,
                    "textHighlight": {
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
                                "text": "hello world",
                                "rect": null
                            }
                        },
                        "text": "hello world",
                        "notes": {},
                        "questions": {},
                        "flashcards": {},
                        "images": {}
                    },
                    "mutationType": "INITIAL"
                }
            ];
            Assertions_1.assertJSON(mutations, expected);
        });
        it("New text highlights on new pages", function () {
            let docMeta = createDocMeta();
            let textHighlightModel = new TextHighlightModel_1.TextHighlightModel();
            let mutations = [];
            textHighlightModel.registerListener(docMeta, function (textHighlightEvent) {
                mutations.push(summarize(textHighlightEvent));
            });
            mutations = [];
            let textHighlightRecord = createTextHighlightRecord();
            docMeta.getPageMeta(3).textHighlights[textHighlightRecord.id] = textHighlightRecord.value;
            let expected = [
                {
                    "pageNum": 3,
                    "textHighlight": {
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
                                "text": "hello world",
                                "rect": null
                            }
                        },
                        "text": "hello world",
                        "notes": {},
                        "questions": {},
                        "flashcards": {},
                        "images": {}
                    },
                    "mutationType": "SET"
                }
            ];
            console.log(mutations);
            Assertions_1.assertJSON(mutations, expected);
        });
    });
});
function summarize(textHighlightEvent) {
    return {
        pageNum: textHighlightEvent.pageMeta.pageInfo.num,
        textHighlight: textHighlightEvent.value,
        mutationType: textHighlightEvent.mutationType
    };
}
function createDocMeta() {
    let fingerprint = "110dd61fd57444010b1ab5ff38782f0f";
    let docMeta = DocMetas_1.DocMetas.createWithinInitialPagemarks(fingerprint, 14);
    DocMetas_1.DocMetas.addPagemarks(docMeta, { nrPages: 1, offsetPage: 4, percentage: 50 });
    let textHighlightRecord = createTextHighlightRecord();
    docMeta.getPageMeta(1).textHighlights[textHighlightRecord.id] = textHighlightRecord.value;
    return Proxies.create(docMeta);
}
function createTextHighlightRecord() {
    let rects = [new Rect_1.Rect({ top: 100, left: 100, right: 200, bottom: 200, width: 100, height: 100 })];
    let textSelections = [new TextRect_1.TextRect({ text: "hello world" })];
    let text = "hello world";
    return TextHighlightRecords_1.TextHighlightRecords.create(rects, textSelections, text);
}
//# sourceMappingURL=TextHighlightModelTest.js.map