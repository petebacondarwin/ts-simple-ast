﻿import * as ts from "typescript";
import {expect} from "chai";
import {JsxFragment} from "./../../../compiler";
import {TsVersion} from "./../../../utils";
import {getInfoFromTextWithDescendant} from "./../testHelpers";

function getInfo(text: string) {
    return getInfoFromTextWithDescendant<JsxFragment>(text, ts.SyntaxKind.JsxFragment, { isJsx: true });
}

describe(nameof(JsxFragment), () => {
    if (!TsVersion.greaterThanEqualToVersion(2, 7)) {
        console.log(`Skipping ${nameof(JsxFragment)} tests in ${ts.version}.`);
        return;
    }

    describe(nameof<JsxFragment>(n => n.getOpeningFragment), () => {
        function doTest(text: string, expected: string) {
            const {descendant} = getInfo(text);
            expect(descendant.getOpeningFragment().getText()).to.equal(expected);
        }

        it("should get the opening fragment", () => {
            doTest(`var t = (<></>);`, "<>");
        });
    });

    describe(nameof<JsxFragment>(n => n.getClosingFragment), () => {
        function doTest(text: string, expected: string) {
            const {descendant} = getInfo(text);
            expect(descendant.getClosingFragment().getText()).to.equal(expected);
        }

        it("should get the closing fragment", () => {
            doTest(`var t = (<></>);`, "</>");
        });
    });

    describe(nameof<JsxFragment>(n => n.getJsxChildren), () => {
        function doTest(text: string, expected: string[]) {
            const {descendant} = getInfo(text);
            expect(descendant.getJsxChildren().map(c => c.getText())).to.deep.equal(expected);
        }

        it("should get the children", () => {
            doTest(`var t = (<>\n    <Child1 />\n    <Child2 />\n</>);`, ["", "<Child1 />", "", "<Child2 />", ""]);
        });
    });
});
