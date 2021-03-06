﻿import * as ts from "typescript";
import {GlobalContainer} from "./../../../GlobalContainer";
import {SourceFile, Node} from "./../../../compiler";
import {Memoize} from "./../../../utils";
import {TextSpan} from "./TextSpan";
import {ScriptElementKind} from "./../../polyfills";

/**
 * Definition info.
 */
export class DefinitionInfo<TCompilerObject extends ts.DefinitionInfo = ts.DefinitionInfo> {
    /** @internal */
    protected readonly global: GlobalContainer;
    /** @internal */
    private readonly _compilerObject: TCompilerObject;

    /**
     * @internal
     */
    constructor(global: GlobalContainer, compilerObject: TCompilerObject) {
        this.global = global;
        this._compilerObject = compilerObject;
    }

    /**
     * Gets the compiler object.
     */
    get compilerObject() {
        return this._compilerObject;
    }

    /**
     * Gets the source file this reference is in.
     */
    getSourceFile(): SourceFile {
        return this.global.compilerFactory.getSourceFileFromFilePath(this.compilerObject.fileName)!;
    }

    /**
     * Gets the text span.
     */
    @Memoize
    getTextSpan() {
        return new TextSpan(this.compilerObject.textSpan);
    }

    /**
     * Gets the kind.
     */
    getKind() {
        return this.compilerObject.kind as ScriptElementKind;
    }

    /**
     * Gets the name.
     */
    getName() {
        return this.compilerObject.name;
    }

    /**
     * Gets the container kind.
     */
    getContainerKind() {
        return this.compilerObject.containerKind as ScriptElementKind;
    }

    /**
     * Gets the container name.
     */
    getContainerName() {
        return this.compilerObject.containerName;
    }

    /**
     * Gets the definition node.
     */
    getNode(): Node | undefined {
        const start = this.getTextSpan().getStart();
        const identifier = findIdentifier(this.getSourceFile());

        return identifier == null ? undefined : identifier.getParentOrThrow();

        function findIdentifier(node: Node): Node | undefined {
            if (node.getKind() === ts.SyntaxKind.Identifier && node.getStart() === start)
                return node;

            for (const child of node.getChildrenIterator()) {
                if (child.getPos() <= start && child.getEnd() >= start)
                    return findIdentifier(child);
            }

            return undefined;
        }
    }
}
