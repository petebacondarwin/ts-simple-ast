﻿import * as ts from "typescript";
import CodeBlockWriter from "code-block-writer";
import {expect} from "chai";
import {Node, EnumDeclaration, ClassDeclaration, FunctionDeclaration, InterfaceDeclaration, PropertySignature, PropertyAccessExpression,
    SourceFile, FormatCodeSettings} from "./../../../compiler";
import * as errors from "./../../../errors";
import {TypeGuards} from "./../../../utils";
import {NewLineKind} from "./../../../ManipulationSettings";
import {getInfoFromText} from "./../testHelpers";

describe(nameof(Node), () => {
    describe("constructor", () => {
        it("should throw if constructing a node outside the library", () => {
            const ctor = Node as any;
            expect(() => new ctor()).to.throw(errors.InvalidOperationError);
        });

        it("should throw if constructing a node outside the library with other arguments", () => {
            const ctor = Node as any;
            expect(() => new ctor(1, 2, 3)).to.throw(errors.InvalidOperationError);
        });
    });

    describe(nameof<Node>(n => n.compilerNode), () => {
        it("should get the underlying compiler node", () => {
            const {sourceFile} = getInfoFromText("enum MyEnum {}\n");
            // just compare that the texts are the same
            expect(sourceFile.getFullText()).to.equal(sourceFile.compilerNode.getFullText());
        });

        it("should throw an error when using a removed node", () => {
            const {firstChild} = getInfoFromText<EnumDeclaration>("enum MyEnum { member }\n");
            const member = firstChild.getMembers()[0];
            member.remove();
            expect(() => member.compilerNode).to.throw();
        });
    });

    describe(nameof<Node>(n => n.getKind), () => {
        it("should return the syntax kind", () => {
            const {firstChild} = getInfoFromText("enum MyEnum {}");
            expect(firstChild.getKind()).to.equal(ts.SyntaxKind.EnumDeclaration);
        });
    });

    describe(nameof<Node>(n => n.getKindName), () => {
        it("should return the syntax kind name", () => {
            const {firstChild} = getInfoFromText("enum MyEnum {}");
            expect(firstChild.getKindName()).to.equal("EnumDeclaration");
        });
    });

    describe(nameof<Node>(n => n.containsRange), () => {
        const {firstChild} = getInfoFromText("enum MyEnum {}");
        it("should contain the range when equal to the pos and end", () => {
            expect(firstChild.containsRange(firstChild.getPos(), firstChild.getEnd())).to.be.true;
        });

        it("should contain the range when inside", () => {
            expect(firstChild.containsRange(firstChild.getPos() + 1, firstChild.getEnd() - 1)).to.be.true;
        });

        it("should not contain the range when the position is outside", () => {
            expect(firstChild.containsRange(firstChild.getPos() - 1, firstChild.getEnd())).to.be.false;
        });

        it("should not contain the range when the end is outside", () => {
            expect(firstChild.containsRange(firstChild.getPos(), firstChild.getEnd() + 1)).to.be.false;
        });
    });

    describe(nameof<Node>(n => n.isInStringAtPos), () => {
        function doTest(text: string, isInStringAtPos: boolean[]) {
            expect(text.length + 1).to.equal(isInStringAtPos.length);
            const {sourceFile} = getInfoFromText(text);
            for (let i = 0; i < isInStringAtPos.length; i++) {
                expect(sourceFile.isInStringAtPos(i)).to.equal(isInStringAtPos[i], `should be equal at index ${i}`);
            }
        }

        it("should be within a double quote string when it is", () => {
            doTest(`"t"`, [false, true, false, false]);
        });

        it("should be within a single quote string when it is", () => {
            doTest(`'t'`, [false, true, false, false]);
        });

        it("should be within a tagged template string when it is", () => {
            doTest("`t${v}" + "t${u}t`", [
                false, true, true, false, false, false,
                true, true, false, false, false, true, false, false]);
        });

        it("should throw when specifying a pos less than 0", () => {
            const {sourceFile} = getInfoFromText("");
            expect(() => sourceFile.isInStringAtPos(-1)).to.throw();
        });

        it("should throw when specifying a pos greater than the length of the file", () => {
            const {sourceFile} = getInfoFromText("");
            expect(() => sourceFile.isInStringAtPos(1)).to.throw();
        });

        it("should clear the list of cached nodes after manipulating", () => {
            const {sourceFile} = getInfoFromText(`"t"`);
            expect(sourceFile.isInStringAtPos(3)).to.be.false;
            sourceFile.replaceText([1, 1], "new text");
            expect(sourceFile.isInStringAtPos(3)).to.be.true;
        });
    });

    describe(nameof<Node>(n => n.offsetPositions), () => {
        const {sourceFile} = getInfoFromText("enum MyEnum {}");
        const allNodes = [sourceFile, ...sourceFile.getDescendants()];

        // easiest to just compare the sum of the positions
        const originalStartPosSum = allNodes.map(n => n.getPos()).reduce((a, b) => a + b, 0);
        const originalEndPosSum = allNodes.map(n => n.getEnd()).reduce((a, b) => a + b, 0);
        it("should offset all the positions", () => {
            sourceFile.offsetPositions(5);
            const adjustedStartPosSum = allNodes.map(n => n.getPos() - 5).reduce((a, b) => a + b, 0);
            const adjustedEndPosSum = allNodes.map(n => n.getEnd() - 5).reduce((a, b) => a + b, 0);
            expect(adjustedStartPosSum).to.equal(originalStartPosSum);
            expect(adjustedEndPosSum).to.equal(originalEndPosSum);
        });
    });

    describe(nameof<Node>(n => n.getFirstChildIfKind), () => {
        const {firstChild} = getInfoFromText("enum MyEnum {}");

        it("should return the first node if its the specified syntax kind", () => {
            expect(firstChild.getFirstChildIfKind(ts.SyntaxKind.EnumKeyword)!.getText()).to.equal("enum");
        });

        it("should return undefined when the specified syntax kind isn't the first child", () => {
            expect(firstChild.getFirstChildIfKind(ts.SyntaxKind.AbstractKeyword)).to.be.undefined;
        });
    });

    describe(nameof<Node>(n => n.getFirstChildIfKindOrThrow), () => {
        const {firstChild} = getInfoFromText("enum MyEnum {}");

        it("should return the first node if its the specified syntax kind", () => {
            expect(firstChild.getFirstChildIfKindOrThrow(ts.SyntaxKind.EnumKeyword).getText()).to.equal("enum");
        });

        it("should return undefined when the specified syntax kind isn't the first child", () => {
            expect(() => firstChild.getFirstChildIfKindOrThrow(ts.SyntaxKind.AbstractKeyword)).to.throw();
        });
    });

    describe(nameof<Node>(n => n.getFirstChildByKind), () => {
        const {firstChild} = getInfoFromText("enum MyEnum {}");

        it("should return the first node of the specified syntax kind", () => {
            expect(firstChild.getFirstChildByKind(ts.SyntaxKind.OpenBraceToken)!.getText()).to.equal("{");
        });

        it("should return undefined when the specified syntax kind doesn't exist", () => {
            expect(firstChild.getFirstChildByKind(ts.SyntaxKind.ClassDeclaration)).to.be.undefined;
        });
    });

    describe(nameof<Node>(n => n.getChildAtPos), () => {
        const {firstChild, sourceFile} = getInfoFromText<FunctionDeclaration>("function myFunction() { const v = 5; }");
        const syntaxList = sourceFile.getChildSyntaxList()!;
        const variableStatement = firstChild.getVariableStatements()[0];

        it("should return undefined when providing a value less than the node pos", () => {
            expect(syntaxList.getChildAtPos(sourceFile.getPos() - 1)).to.be.undefined;
        });

        it("should return undefined when providing a value equal to the end", () => {
            expect(syntaxList.getChildAtPos(sourceFile.getEnd())).to.be.undefined;
        });

        it("should return the child at the specified position", () => {
            expect(syntaxList.getChildAtPos(1)!.getKind()).to.equal(ts.SyntaxKind.FunctionDeclaration);
        });

        it("should return only a child and not a descendant", () => {
            expect(syntaxList.getChildAtPos(variableStatement.getPos())!.getKind()).to.equal(ts.SyntaxKind.FunctionDeclaration);
        });
    });

    describe(nameof<Node>(n => n.getChildAtIndex), () => {
        const {sourceFile} = getInfoFromText("class Class { } interface Interface {}");
        const syntaxList = sourceFile.getChildSyntaxListOrThrow();

        it("should throw when specifying a negative index", () => {
            expect(() => syntaxList.getChildAtIndex(-1)).to.throw();
        });

        it("should throw when specifying an index too high", () => {
            expect(() => syntaxList.getChildAtIndex(2)).to.throw();
        });

        it("should get the first child", () => {
            expect(syntaxList.getChildAtIndex(0).getKind()).to.equal(ts.SyntaxKind.ClassDeclaration);
        });

        it("should get the last child", () => {
            expect(syntaxList.getChildAtIndex(1).getKind()).to.equal(ts.SyntaxKind.InterfaceDeclaration);
        });
    });

    describe(nameof<Node>(n => n.getChildAtIndexIfKind), () => {
        const {sourceFile} = getInfoFromText("class Class { }");
        const syntaxList = sourceFile.getChildSyntaxListOrThrow();

        it("should get the child at the specified index when the kind", () => {
            expect(syntaxList.getChildAtIndexIfKind(0, ts.SyntaxKind.ClassDeclaration)!.getKind()).to.equal(ts.SyntaxKind.ClassDeclaration);
        });

        it("should be undefined when specifying the wrong kind", () => {
            expect(syntaxList.getChildAtIndexIfKind(0, ts.SyntaxKind.InterfaceDeclaration)).to.be.undefined;
        });
    });

    describe(nameof<Node>(n => n.getChildAtIndexIfKindOrThrow), () => {
        const {sourceFile} = getInfoFromText("class Class { }");
        const syntaxList = sourceFile.getChildSyntaxListOrThrow();

        it("should get the child at the specified index when the kind", () => {
            expect(syntaxList.getChildAtIndexIfKindOrThrow(0, ts.SyntaxKind.ClassDeclaration).getKind()).to.equal(ts.SyntaxKind.ClassDeclaration);
        });

        it("should be undefined when specifying the wrong kind", () => {
            expect(() => syntaxList.getChildAtIndexIfKindOrThrow(0, ts.SyntaxKind.InterfaceDeclaration)).to.throw();
        });
    });

    describe(nameof<Node>(n => n.getDescendantAtPos), () => {
        const {firstChild, sourceFile} = getInfoFromText<FunctionDeclaration>("function myFunction() { const v = 5; }");
        const variableStatement = firstChild.getVariableStatements()[0];

        it("should return undefined when providing a value less than the pos", () => {
            expect(sourceFile.getDescendantAtPos(sourceFile.getPos() - 1)).to.be.undefined;
        });

        it("should return undefined when providing a value equal to the end", () => {
            expect(sourceFile.getDescendantAtPos(sourceFile.getEnd())).to.be.undefined;
        });

        it("should return the descendant at the specified position", () => {
            expect(sourceFile.getDescendantAtPos(1)!.getKind()).to.equal(ts.SyntaxKind.FunctionKeyword);
        });

        it("should return a very descendant descendant", () => {
            expect(sourceFile.getDescendantAtPos(variableStatement.getPos())!.getKind()).to.equal(ts.SyntaxKind.ConstKeyword);
        });

        it("should return a the node at the specified pos when specifying a space", () => {
            expect(sourceFile.getDescendantAtPos(variableStatement.getPos() - 1)!.getKind()).to.equal(ts.SyntaxKind.FirstPunctuation);
        });
    });

    describe(nameof<Node>(n => n.getIndentationText), () => {
        it("should return a blank string when it's at the start of the file", () => {
            const {firstChild} = getInfoFromText("enum MyEnum {\n}\n");
            expect(firstChild.getIndentationText()).to.equal("");
        });

        it("should return a blank string when it's at the start of a line", () => {
            const {firstChild} = getInfoFromText("\r\n\nenum MyEnum {\n}\n");
            expect(firstChild.getIndentationText()).to.equal("");
        });

        it("should return the indentation text when it's spaces", () => {
            const {firstChild} = getInfoFromText("    enum MyEnum {\n}\n");
            expect(firstChild.getIndentationText()).to.equal("    ");
        });

        it("should return the indentation text when it includes tabs", () => {
            const {firstChild} = getInfoFromText("\n    \tenum MyEnum {\n}\n");
            expect(firstChild.getIndentationText()).to.equal("    \t");
        });

        it("should go up to the comment", () => {
            const {firstChild} = getInfoFromText("\n  /* comment */  \tenum MyEnum {\n}\n");
            expect(firstChild.getIndentationText()).to.equal("  ");
        });
    });

    describe(nameof<Node>(n => n.getStartLinePos), () => {
        function doTest(text: string, expectedPos: number, includeJsDocComment?: boolean) {
            const {firstChild} = getInfoFromText(text);
            expect(firstChild.getStartLinePos(includeJsDocComment)).to.equal(expectedPos);
        }

        it("should return the start of the file when it's on the first line", () => {
            doTest("enum MyEnum {\n}\n", 0);
        });

        it("should return the start of the file when it's on the first line", () => {
            doTest("    enum MyEnum {\n}\n", 0);
        });

        it("should return the start of the line when it's not on the first line", () => {
            const {firstChild} = getInfoFromText<EnumDeclaration>("enum MyEnum {\n    myMember = 1\n}\n");
            const memberDeclaration = firstChild.getMembers()[0];
            expect(memberDeclaration.getStartLinePos()).to.equal(14);
        });

        it("should return the start of the line when the past line is a \\r\\n", () => {
            doTest("\n  \t  \r\nenum MyEnum {\n}\n", 8);
        });

        it("should get the start line position of the JS doc when specified", () => {
            doTest("/**\n * Test\n */\nenum MyEnum {\n}\n", 0, true);
        });

        it("should get the start line position of not the JS doc when not specified", () => {
            doTest("/**\n * Test\n */\nenum MyEnum {\n}\n", 16);
        });
    });

    describe(nameof<Node>(n => n.getStartLineNumber), () => {
        it("should get the start line number of the node", () => {
            const {firstChild} = getInfoFromText<ClassDeclaration>("\n\nclass MyClass {\n\n    prop: string;\n}");
            expect(firstChild.getInstanceProperties()[0].getStartLineNumber()).to.equal(5);
        });
    });

    describe(nameof<Node>(n => n.getEndLineNumber), () => {
        it("should get the end line number of the node", () => {
            const {firstChild} = getInfoFromText<ClassDeclaration>("\n\nclass MyClass {\n\n    prop: string;\n}");
            expect(firstChild.getEndLineNumber()).to.equal(6);
        });
    });

    describe(nameof<Node>(n => n.getStart), () => {
        function doTest(text: string, expectedPos: number, includeJsDocComment?: boolean) {
            const {firstChild} = getInfoFromText(text);
            expect(firstChild.getStart(includeJsDocComment)).to.equal(expectedPos);
        }

        it("should return the pos without trivia", () => {
            doTest("\n  \t  /* comment */ //comment  \r\n  \t enum MyEnum {\n}\n", 37);
        });

        it("should return the pos at the start of the js doc comment if specified", () => {
            doTest("/**\n * Test\n */\nenum MyEnum {\n}\n", 0, true);
        });
    });

    describe(nameof<Node>(n => n.getCombinedModifierFlags), () => {
        const {firstChild} = getInfoFromText<ClassDeclaration>("export class Identifier {}");
        it("should get the combined modifier flags", () => {
            expect(firstChild.getCombinedModifierFlags()).to.equal(ts.ModifierFlags.Export);
        });
    });

    describe(nameof<Node>(n => n.getParentIfKind), () => {
        const {firstChild} = getInfoFromText<ClassDeclaration>("export class Identifier { prop: string; }");
        const child = firstChild.getInstanceProperty("prop")!;

        it("should get the parent when it's the right kind", () => {
            expect(child.getParentIfKind(ts.SyntaxKind.ClassDeclaration)).to.not.be.undefined;
        });

        it("should not get the parent when it's not the right kind", () => {
            expect(child.getParentIfKind(ts.SyntaxKind.InterfaceDeclaration)).to.be.undefined;
        });
    });

    describe(nameof<Node>(n => n.getParentIfKindOrThrow), () => {
        const {firstChild} = getInfoFromText<ClassDeclaration>("export class Identifier { prop: string; }");
        const child = firstChild.getInstanceProperty("prop")!;

        it("should get the parent when it's the right kind", () => {
            expect(child.getParentIfKindOrThrow(ts.SyntaxKind.ClassDeclaration)).to.not.be.undefined;
        });

        it("should throw when it's not the right kind", () => {
            expect(() => child.getParentIfKindOrThrow(ts.SyntaxKind.InterfaceDeclaration)).to.throw();
        });
    });

    describe(nameof<Node>(n => n.getParentWhile), () => {
        it("should keep getting the parent until a condition is no longer matched", () => {
            const {sourceFile} = getInfoFromText("const t = Test.Test2.Test3.Test4;");
            const deepestNode = sourceFile.getFirstDescendantOrThrow(n => n.getText() === "Test");
            const topParent = deepestNode.getParentWhile(n => n.getKind() === ts.SyntaxKind.PropertyAccessExpression)!;
            expect(topParent.getText()).to.equal("Test.Test2.Test3.Test4");
        });

        it("should return undefined when the initial parent doesn't match the condition", () => {
            const {sourceFile} = getInfoFromText("const t;");
            const child = sourceFile.getVariableStatements()[0];
            expect(child.getParentWhile(() => false)).to.be.undefined;
        });
    });

    describe(nameof<Node>(n => n.getParentWhileOrThrow), () => {
        it("should keep getting the parent until a condition is no longer matched", () => {
            const {sourceFile} = getInfoFromText("const t = Test.Test2.Test3.Test4;");
            const deepestNode = sourceFile.getFirstDescendantOrThrow(n => n.getText() === "Test");
            const topParent = deepestNode.getParentWhileOrThrow(n => n.getKind() === ts.SyntaxKind.PropertyAccessExpression);
            expect(topParent.getText()).to.equal("Test.Test2.Test3.Test4");
        });

        it("should return undefined when the initial parent doesn't match the condition", () => {
            const {sourceFile} = getInfoFromText("const t;");
            const child = sourceFile.getVariableStatements()[0];
            expect(() => child.getParentWhileOrThrow(() => false)).to.throw();
        });
    });

    describe(nameof<Node>(n => n.getParentWhileKind), () => {
        it("should keep getting the parent until a condition is no longer matched", () => {
            const {sourceFile} = getInfoFromText("const t = Test.Test2.Test3.Test4;");
            const deepestNode = sourceFile.getFirstDescendantOrThrow(n => n.getText() === "Test");
            const topParent = deepestNode.getParentWhileKind(ts.SyntaxKind.PropertyAccessExpression)!;
            expect(topParent.getText()).to.equal("Test.Test2.Test3.Test4");
        });

        it("should return undefined when the initial parent doesn't match the condition", () => {
            const {sourceFile} = getInfoFromText("const t;");
            const child = sourceFile.getVariableStatements()[0];
            expect(child.getParentWhileKind(ts.SyntaxKind.PrivateKeyword)).to.be.undefined;
        });
    });

    describe(nameof<Node>(n => n.getParentWhileKindOrThrow), () => {
        it("should keep getting the parent until a condition is no longer matched", () => {
            const {sourceFile} = getInfoFromText("const t = Test.Test2.Test3.Test4;");
            const deepestNode = sourceFile.getFirstDescendantOrThrow(n => n.getText() === "Test");
            const topParent = deepestNode.getParentWhileKindOrThrow(ts.SyntaxKind.PropertyAccessExpression);
            expect(topParent.getText()).to.equal("Test.Test2.Test3.Test4");
        });

        it("should return undefined when the initial parent doesn't match the condition", () => {
            const {sourceFile} = getInfoFromText("const t;");
            const child = sourceFile.getVariableStatements()[0];
            expect(() => child.getParentWhileKindOrThrow(ts.SyntaxKind.PrivateKeyword)).to.throw();
        });
    });

    describe(nameof<Node>(n => n.getFirstChildOrThrow), () => {
        const {sourceFile, firstChild} = getInfoFromText<ClassDeclaration>("class Identifier { prop: string; }\ninterface MyInterface {}");
        const syntaxList = sourceFile.getChildSyntaxListOrThrow();

        it("should get the first child by a condition", () => {
            expect(syntaxList.getFirstChildOrThrow(n => n.getKind() === ts.SyntaxKind.InterfaceDeclaration)).to.be.instanceOf(InterfaceDeclaration);
        });

        it("should throw when it can't find the child", () => {
            expect(() => syntaxList.getFirstChildOrThrow(n => n.getKind() === ts.SyntaxKind.IsKeyword)).to.throw();
        });
    });

    describe(nameof<Node>(n => n.getLastChildOrThrow), () => {
        const {sourceFile} = getInfoFromText<ClassDeclaration>("interface Identifier { prop: string; }\ninterface MyInterface {}");
        const syntaxList = sourceFile.getChildSyntaxListOrThrow();

        it("should get the last child by a condition", () => {
            const interfaceDec = syntaxList.getLastChildOrThrow(n => n.getKind() === ts.SyntaxKind.InterfaceDeclaration) as InterfaceDeclaration;
            expect(interfaceDec.getName()).to.equal("MyInterface");
        });

        it("should throw when it can't find the child", () => {
            expect(() => syntaxList.getLastChildOrThrow(n => n.getKind() === ts.SyntaxKind.IsKeyword)).to.throw();
        });
    });

    describe(nameof<Node>(n => n.getFirstDescendant), () => {
        const {sourceFile} = getInfoFromText<ClassDeclaration>("interface Identifier { prop: string; }\ninterface MyInterface { nextProp: string; }");

        it("should get the first descendant by a condition", () => {
            const prop = sourceFile.getFirstDescendant(n => n.getKind() === ts.SyntaxKind.PropertySignature);
            expect(prop).to.be.instanceOf(PropertySignature);
            expect((prop as PropertySignature).getName()).to.equal("prop");
        });

        it("should return undefined when it can't find it", () => {
            const privateKeyword = sourceFile.getFirstDescendant(n => n.getKind() === ts.SyntaxKind.PrivateKeyword);
            expect(privateKeyword).to.be.undefined;
        });
    });

    describe(nameof<Node>(n => n.getFirstDescendantOrThrow), () => {
        const {sourceFile} = getInfoFromText<ClassDeclaration>("interface Identifier { prop: string; }\ninterface MyInterface { nextProp: string; }");

        it("should get the first descendant by a condition", () => {
            const prop = sourceFile.getFirstDescendantOrThrow(n => n.getKind() === ts.SyntaxKind.PropertySignature);
            expect(prop).to.be.instanceOf(PropertySignature);
            expect((prop as PropertySignature).getName()).to.equal("prop");
        });

        it("should return undefined when it can't find it", () => {
            expect(() => sourceFile.getFirstDescendantOrThrow(n => n.getKind() === ts.SyntaxKind.PrivateKeyword)).to.throw();
        });
    });

    describe(nameof<Node>(n => n.getDescendantsOfKind), () => {
        const {sourceFile} = getInfoFromText("interface Identifier { prop: string; }\ninterface MyInterface { nextProp: string; }");

        it("should get the descendant by a kind", () => {
            const properties = sourceFile.getDescendantsOfKind(ts.SyntaxKind.PropertySignature);
            expect(properties.length).to.equal(2);
            expect(properties[0]).to.be.instanceOf(PropertySignature);
            expect(properties[1]).to.be.instanceOf(PropertySignature);
        });
    });

    describe(nameof<Node>(n => n.getFirstDescendantByKind), () => {
        const {sourceFile} = getInfoFromText<ClassDeclaration>("interface Identifier { prop: string; }\ninterface MyInterface { nextProp: string; }");

        it("should get the first descendant by a condition", () => {
            const prop = sourceFile.getFirstDescendantByKind(ts.SyntaxKind.PropertySignature);
            expect(prop).to.be.instanceOf(PropertySignature);
            expect((prop as PropertySignature).getName()).to.equal("prop");
        });

        it("should return undefined when it can't find it", () => {
            const privateKeyword = sourceFile.getFirstDescendantByKind(ts.SyntaxKind.PrivateKeyword);
            expect(privateKeyword).to.be.undefined;
        });
    });

    describe(nameof<Node>(n => n.getFirstDescendantByKindOrThrow), () => {
        const {sourceFile} = getInfoFromText("interface Identifier { prop: string; }\ninterface MyInterface { nextProp: string; }");

        it("should get the first descendant by a condition", () => {
            const prop = sourceFile.getFirstDescendantByKindOrThrow(ts.SyntaxKind.PropertySignature);
            expect(prop).to.be.instanceOf(PropertySignature);
            expect((prop as PropertySignature).getName()).to.equal("prop");
        });

        it("should return undefined when it can't find it", () => {
            expect(() => sourceFile.getFirstDescendantByKindOrThrow(ts.SyntaxKind.PrivateKeyword)).to.throw();
        });
    });

    describe(nameof<Node>(n => n.getPreviousSibling), () => {
        const {sourceFile} = getInfoFromText("interface Interface1 {}\ninterface Interface2 {}\ninterface Interface3 {}");

        it("should get the previous sibling based on a condition", () => {
            expect(sourceFile.getInterfaces()[2].getPreviousSibling(s => TypeGuards.isInterfaceDeclaration(s) && s.getName() === "Interface1")!.getText())
                .to.equal("interface Interface1 {}");
        });

        it("should get the previous sibling when not supplying a condition", () => {
            expect(sourceFile.getInterfaces()[2].getPreviousSibling()!.getText()).to.equal("interface Interface2 {}");
        });

        it("should return undefined when it can't find the sibling based on a condition", () => {
            expect(sourceFile.getInterfaces()[2].getPreviousSibling(s => false)).to.be.undefined;
        });

        it("should return undefined when there isn't a previous sibling", () => {
            expect(sourceFile.getInterfaces()[0].getPreviousSibling()).to.be.undefined;
        });
    });

    describe(nameof<Node>(n => n.getPreviousSiblingOrThrow), () => {
        const {sourceFile} = getInfoFromText("interface Interface1 {}\ninterface Interface2 {}\ninterface Interface3 {}");

        it("should get the previous sibling based on a condition", () => {
            expect(sourceFile.getInterfaces()[2].getPreviousSiblingOrThrow(s => TypeGuards.isInterfaceDeclaration(s) && s.getName() === "Interface1").getText())
                .to.equal("interface Interface1 {}");
        });

        it("should get the previous sibling when not supplying a condition", () => {
            expect(sourceFile.getInterfaces()[2].getPreviousSiblingOrThrow().getText()).to.equal("interface Interface2 {}");
        });

        it("should throw when it can't find the sibling based on a condition", () => {
            expect(() => sourceFile.getInterfaces()[2].getPreviousSiblingOrThrow(s => false)).to.throw();
        });

        it("should throw when there isn't a previous sibling", () => {
            expect(() => sourceFile.getInterfaces()[0].getPreviousSiblingOrThrow()).to.throw();
        });
    });

    describe(nameof<Node>(n => n.getNextSibling), () => {
        const {sourceFile} = getInfoFromText("interface Interface1 {}\ninterface Interface2 {}\ninterface Interface3 {}");

        it("should get the next sibling based on a condition", () => {
            expect(sourceFile.getInterfaces()[0].getNextSibling(s => TypeGuards.isInterfaceDeclaration(s) && s.getName() === "Interface3")!.getText())
                .to.equal("interface Interface3 {}");
        });

        it("should get the next sibling when not supplying a condition", () => {
            expect(sourceFile.getInterfaces()[0].getNextSibling()!.getText()).to.equal("interface Interface2 {}");
        });

        it("should return undefined when it can't find the sibling based on a condition", () => {
            expect(sourceFile.getInterfaces()[0].getNextSibling(s => false)).to.be.undefined;
        });

        it("should return undefined when there isn't a next sibling", () => {
            expect(sourceFile.getInterfaces()[2].getNextSibling()).to.be.undefined;
        });
    });

    describe(nameof<Node>(n => n.getNextSiblingOrThrow), () => {
        const {sourceFile} = getInfoFromText("interface Interface1 {}\ninterface Interface2 {}\ninterface Interface3 {}");

        it("should get the next sibling based on a condition", () => {
            expect(sourceFile.getInterfaces()[0].getNextSiblingOrThrow(s => TypeGuards.isInterfaceDeclaration(s) && s.getName() === "Interface3").getText())
                .to.equal("interface Interface3 {}");
        });

        it("should get the next sibling when not supplying a condition", () => {
            expect(sourceFile.getInterfaces()[0].getNextSiblingOrThrow().getText()).to.equal("interface Interface2 {}");
        });

        it("should throw when it can't find the sibling based on a condition", () => {
            expect(() => sourceFile.getInterfaces()[0].getNextSiblingOrThrow(s => false)).to.throw();
        });

        it("should throw when there isn't a next sibling", () => {
            expect(() => sourceFile.getInterfaces()[2].getNextSiblingOrThrow()).to.throw();
        });
    });

    describe(nameof<Node>(n => n.getPreviousSiblings), () => {
        const {sourceFile} = getInfoFromText("interface Interface1 {}\ninterface Interface2 {}\ninterface Interface3 {}");

        it("should get the previous siblings going away in order", () => {
            expect(sourceFile.getInterfaces()[2].getPreviousSiblings().map(s => (s as InterfaceDeclaration).getName()))
                .to.deep.equal(["Interface2", "Interface1"]);
        });
    });

    describe(nameof<Node>(n => n.getNextSiblings), () => {
        const {sourceFile} = getInfoFromText("interface Interface1 {}\ninterface Interface2 {}\ninterface Interface3 {}");

        it("should get the previous siblings going away in order", () => {
            expect(sourceFile.getInterfaces()[0].getNextSiblings().map(s => (s as InterfaceDeclaration).getName()))
                .to.deep.equal(["Interface2", "Interface3"]);
        });
    });

    describe(nameof<Node>(n => n.isFirstNodeOnLine), () => {
        function doTest(text: string, index: number, expected: boolean) {
            const {sourceFile} = getInfoFromText(text);
            expect(sourceFile.getFirstChildIfKindOrThrow(ts.SyntaxKind.SyntaxList).getChildren()[index].isFirstNodeOnLine()).to.equal(expected);
        }

        it("should be true if it is and it's on the first line", () => {
            doTest("    interface MyTest {}", 0, true);
        });

        it("should be true if it is and on a line within the file", () => {
            doTest("interface MyTest {}\n    \tclass Test {}", 1, true);
        });

        it("should be false if there's something else and it's the first line", () => {
            doTest("    interface MyTest {} class Test {}", 1, false);
        });

        it("should be false if there's something else and it's on a line within the file", () => {
            doTest("\n\ninterface MyTest {\n} class Test {}", 1, false);
        });
    });

    describe(nameof<Node>(n => n.replaceWithText), () => {
        function doTest(startText: string, replaceText: string | ((writer: CodeBlockWriter) => void), expectedText: string) {
            const {sourceFile} = getInfoFromText(startText);
            const varDeclaration = sourceFile.getVariableDeclarations()[0];
            const propAccess = (varDeclaration.getInitializerOrThrow() as PropertyAccessExpression);
            let newNode: Node;
            if (typeof replaceText === "string")
                newNode = propAccess.replaceWithText(replaceText);
            else
                newNode = propAccess.replaceWithText(replaceText);
            expect(newNode.getText()).to.equal(getReplaceTextAsString());
            expect(sourceFile.getFullText()).to.equal(expectedText);
            expect(() => propAccess.compilerNode).to.throw(); // should be forgotten

            function getReplaceTextAsString() {
                if (typeof replaceText === "string")
                    return replaceText;

                const writer = new CodeBlockWriter();
                replaceText(writer);
                return writer.toString();
            }
        }

        it("should replace when using a string", () => {
            doTest("var t = Some.Prop.Access.Expression;", "NewText", "var t = NewText;");
        });

        it("should replace when using a writer", () => {
            doTest("var t = Some.Prop.Access.Expression;", writer => writer.write("NewText"), "var t = NewText;");
        });

        it("should replace the text for a source file", () => {
            const {sourceFile} = getInfoFromText("var t = Some.Prop.Access;");
            const result = sourceFile.replaceWithText("var t;");
            expect(sourceFile.getFullText()).to.equal("var t;"); // in this case, it will not forget the source file
            expect(result).to.equal(sourceFile);
        });

        it("should replace the jsdoc text", () => {
            const {firstChild, sourceFile} = getInfoFromText("/**\n * Testing\n */\nclass MyClass {}");
            const result = firstChild.replaceWithText("var t;");
            expect(sourceFile.getFullText()).to.equal("var t;");
            expect(result).to.equal(sourceFile.getStatements()[0]);
        });

        it("should throw when replacing with more than one node", () => {
            const {sourceFile} = getInfoFromText("var t = Some.Prop.Access;");
            const varDeclaration = sourceFile.getVariableDeclarations()[0];
            const propAccess = (varDeclaration.getInitializerOrThrow() as PropertyAccessExpression);
            expect(() => {
                propAccess.replaceWithText("SomeTest; Test");
            }).to.throw();
        });
    });

    describe(nameof<Node>(n => n.print), () => {
        const nodeText = "class MyClass {\n    // comment\n    prop: string;\n}";
        const {sourceFile, firstChild} = getInfoFromText(nodeText);

        it("should print the source file", () => {
            expect(sourceFile.print()).to.equal(nodeText + "\n");
        });

        it("should print the node", () => {
            expect(firstChild.print()).to.equal(nodeText);
        });

        it("should print the node with different newlines", () => {
            expect(firstChild.print({ newLineKind: NewLineKind.CarriageReturnLineFeed })).to.equal(nodeText.replace(/\n/g, "\r\n"));
        });
    });

    describe(nameof<Node>(n => n.formatText), () => {
        function doTest(text: string, getNode: (sourceFile: SourceFile) => Node, expectedText: string, settings: FormatCodeSettings = {}) {
            const {sourceFile} = getInfoFromText(text);
            getNode(sourceFile).formatText(settings);
            expect(sourceFile.getFullText()).to.equal(expectedText);
        }

        it("should format only the provided node", () => {
            doTest("class Test{\n   prop:string;\n  }\nclass Test2{\n   prop:string;\n  }\n", f => f.getClassOrThrow("Test2"),
                "class Test{\n   prop:string;\n  }\nclass Test2 {\n    prop: string;\n}\n");
        });

        it("should format only the provided node with the specified settings", () => {
            doTest("class Test{\n\tprop:string;\n}\n       /** Testing */\nclass Test2{\n\t prop:string;\n\t}\n", f => f.getClassOrThrow("Test2"),
                "class Test{\n\tprop:string;\n}\n/** Testing */\nclass Test2 {\n  prop: string;\n}\n", {
                    convertTabsToSpaces: true,
                    indentSize: 2
                });
        });
    });
});
