﻿import * as ts from "typescript";
import {LeftHandSideExpressionedNode} from "./../expression";
import {Node} from "./../common";
import {TypeNode} from "./TypeNode";

export const ExpressionWithTypeArgumentsBase = LeftHandSideExpressionedNode(TypeNode);
export class ExpressionWithTypeArguments extends ExpressionWithTypeArgumentsBase<ts.ExpressionWithTypeArguments> {
    /**
     * Gets the type arguments.
     */
    getTypeArguments(): TypeNode[] {
        const typeArguments = this.compilerNode.typeArguments;
        if (typeArguments == null)
            return [];

        return typeArguments.map(a => this.getNodeFromCompilerNode<TypeNode>(a));
    }
}
