﻿import * as ts from "typescript";
import {CallSignatureDeclarationStructure} from "./../../structures";
import {removeInterfaceMember} from "./../../manipulation";
import {callBaseFill} from "./../callBaseFill";
import {Node} from "./../common";
import {JSDocableNode, ChildOrderableNode, TypeParameteredNode, SignaturedDeclaration} from "./../base";

export const CallSignatureDeclarationBase = TypeParameteredNode(ChildOrderableNode(JSDocableNode(SignaturedDeclaration(Node))));
export class CallSignatureDeclaration extends CallSignatureDeclarationBase<ts.CallSignatureDeclaration> {
    /**
     * Fills the node from a structure.
     * @param structure - Structure to fill.
     */
    fill(structure: Partial<CallSignatureDeclarationStructure>) {
        callBaseFill(CallSignatureDeclarationBase.prototype, this, structure);

        return this;
    }

    /**
     * Removes this call signature.
     */
    remove() {
        removeInterfaceMember(this);
    }
}
