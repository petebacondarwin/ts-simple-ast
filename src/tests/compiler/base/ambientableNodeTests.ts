﻿import {expect} from "chai";
import {Node, AmbientableNode, ClassDeclaration, InterfaceDeclaration, TypeAliasDeclaration, NamespaceDeclaration, PropertyDeclaration} from "./../../../compiler";
import {AmbientableNodeStructure} from "./../../../structures";
import {getInfoFromText} from "./../testHelpers";

describe(nameof(AmbientableNode), () => {
    describe("navigation", () => {
        const {sourceFile: mainSourceFile} = getInfoFromText("declare var ambientedVar; var myExplicitVar: string;");
        const statements = mainSourceFile.getVariableStatements();
        const ambientedStatement = statements[0];
        const notAmbientedStatement = statements[1];

        describe(nameof<AmbientableNode>(n => n.hasDeclareKeyword), () => {
            it("should have a declare keyword when it has one", () => {
                expect(ambientedStatement.hasDeclareKeyword()).to.be.true;
            });

            it("should not have an declare keyword when it doesn't have one", () => {
                expect(notAmbientedStatement.hasDeclareKeyword()).to.be.false;
            });
        });

        describe(nameof<AmbientableNode>(n => n.getDeclareKeyword), () => {
            it("should have an declare keyword when it has one", () => {
                expect(ambientedStatement.getDeclareKeyword()!.getText()).to.equal("declare");
            });

            it("should not have an declare keyword when it doesn't have one", () => {
                expect(notAmbientedStatement.getDeclareKeyword()).to.be.undefined;
            });
        });

        describe(nameof<AmbientableNode>(n => n.getDeclareKeywordOrThrow), () => {
            it("should have an declare keyword when it has one", () => {
                expect(ambientedStatement.getDeclareKeywordOrThrow().getText()).to.equal("declare");
            });

            it("should not have an declare keyword when it doesn't have one", () => {
                expect(() => notAmbientedStatement.getDeclareKeywordOrThrow()).to.throw();
            });
        });

        describe(nameof<AmbientableNode>(n => n.isAmbient), () => {
            function doTest(text: string, expectedValue: boolean) {
                const {firstChild} = getInfoFromText<AmbientableNode & Node>(text);
                expect(firstChild.isAmbient()).to.equal(expectedValue);
            }
            it("should not be ambient when not", () => {
                doTest("class Identifier {}", false);
            });

            it("should be ambient when it has a declare keyword", () => {
                doTest("declare class Identifier {}", true);
            });

            it("should be ambient when it's in a definition file", () => {
                const {firstChild} = getInfoFromText<ClassDeclaration>("class Identifier {}", { isDefinitionFile: true });
                expect(firstChild.isAmbient()).to.be.true;
            });

            it("should be ambient when it's parent is ambient", () => {
                const {firstChild} = getInfoFromText<NamespaceDeclaration>("declare namespace Identifier { class Identifier {} }");
                const innerClass = firstChild.getClasses()[0];
                expect(innerClass.isAmbient()).to.be.true;
            });

            it("should always be ambient for interfaces", () => {
                doTest("interface Identifier {}", true);
            });

            it("should always be ambient for type aliases", () => {
                doTest("type Identifier = string;", true);
            });
        });
    });

    describe(nameof<AmbientableNode>(n => n.toggleDeclareKeyword), () => {
        function doTest(text: string, value: boolean | undefined, expected: string) {
            const {firstChild, sourceFile} = getInfoFromText<ClassDeclaration>(text);
            if (value !== undefined)
                firstChild.toggleDeclareKeyword(value);
            else
                firstChild.toggleDeclareKeyword();
            expect(sourceFile.getText()).to.equal(expected);
        }

        it("should add declare keyword when doesn't have one", () => {
            doTest("class MyClass { }", undefined, "declare class MyClass { }");
        });

        it("should remove declare keyword when it has one", () => {
            doTest("declare class MyClass { }", undefined, "class MyClass { }");
        });

        it("should add declare keyword when explicitly toggling it", () => {
            doTest("class MyClass { }", true, "declare class MyClass { }");
        });

        it("should remove declare keyword when explicitly toggling it", () => {
            doTest("declare class MyClass { }", false, "class MyClass { }");
        });
    });

    describe(nameof<ClassDeclaration>(n => n.fill), () => {
        function doTest(startingCode: string, structure: AmbientableNodeStructure, expectedCode: string) {
            const {firstChild, sourceFile} = getInfoFromText<ClassDeclaration>(startingCode);
            firstChild.fill(structure);
            expect(firstChild.getText()).to.equal(expectedCode);
        }

        it("should not modify when not set and structure empty", () => {
            doTest("class MyClass {}", {}, "class MyClass {}");
        });

        it("should not modify when set and structure empty", () => {
            doTest("declare class MyClass {}", {}, "declare class MyClass {}");
        });

        it("should modify when setting true", () => {
            doTest("class MyClass {}", { hasDeclareKeyword: true }, "declare class MyClass {}");
        });
    });
});
