﻿import * as ts from "typescript";
import * as errors from "./../../errors";
import {removeChildren, removeChildrenWithFormattingFromCollapsibleSyntaxList, FormattingKind, insertIntoParent} from "./../../manipulation";
import {TypeGuards} from "./../../utils";
import {CallExpression, Expression} from "./../expression";
import {Node, Identifier} from "./../common";
import {TypeNode} from "./../type";

export const DecoratorBase = Node;
export class Decorator extends DecoratorBase<ts.Decorator> {
    /**
     * Gets the decorator name.
     */
    getName() {
        return this.getNameNode().getText();
    }

    /**
     * Gets the name node of the decorator.
     */
    getNameNode() {
        const sourceFile = this.getSourceFile();

        if (this.isDecoratorFactory()) {
            const callExpression = this.getCallExpression()!;
            return getIdentifierFromName(callExpression.getExpression());
        }

        return getIdentifierFromName(this.getExpression());

        function getIdentifierFromName(expression: Expression) {
            const identifier = getNameFromExpression(expression);
            if (!TypeGuards.isIdentifier(identifier)) {
                throw new errors.NotImplementedError(`Expected the decorator expression '${identifier.getText()}' to be an identifier, ` +
                    `but it wasn't. Please report this as a bug.`);
            }
            return identifier;
        }

        function getNameFromExpression(expression: Expression) {
            if (TypeGuards.isPropertyAccessExpression(expression))
                return expression.getNameNode();
            return expression;
        }
    }

    /**
     * Gets the full decorator name.
     */
    getFullName() {
        const sourceFile = this.getSourceFile();
        if (this.isDecoratorFactory())
            return this.getCallExpression()!.getExpression().getText();

        return this.compilerNode.expression.getText(sourceFile.compilerNode);
    }

    /**
     * Gets if the decorator is a decorator factory.
     */
    isDecoratorFactory() {
        return this.compilerNode.expression.kind === ts.SyntaxKind.CallExpression;
    }

    /**
     * Set if this decorator is a decorator factory.
     * @param isDecoratorFactory - If it should be a decorator factory or not.
     */
    setIsDecoratorFactory(isDecoratorFactory: boolean) {
        if (this.isDecoratorFactory() === isDecoratorFactory)
            return this;

        if (isDecoratorFactory) {
            const expression = this.getExpression();
            const expressionText = expression.getText();
            insertIntoParent({
                parent: this,
                childIndex: expression.getChildIndex(),
                insertItemsCount: 1,
                insertPos: expression.getStart(),
                newText: `${expressionText}()`,
                replacing: {
                    nodes: [expression],
                    textLength: expressionText.length
                },
                customMappings: newParent => {
                    // the expression will move into the call expression
                    const callExpression = (newParent as Decorator).getCallExpressionOrThrow();
                    const newExpression = callExpression.getExpression();
                    return [{ currentNode: expression, newNode: newExpression }];
                }
            });
        }
        else {
            const callExpression = this.getCallExpressionOrThrow();
            const expression = callExpression.getExpression();
            const expressionText = expression.getText();

            insertIntoParent({
                parent: this,
                childIndex: callExpression.getChildIndex(),
                insertItemsCount: 1,
                insertPos: callExpression.getStart(),
                newText: `${expressionText}`,
                replacing: {
                    nodes: [callExpression],
                    textLength: callExpression.getWidth()
                },
                customMappings: newParent => {
                    // the expression will move out of the call expression
                    const newExpression = (newParent as Decorator).getExpression();
                    return [{ currentNode: expression, newNode: newExpression }];
                }
            });
        }

        return this;
    }

    /**
     * Gets the call expression if a decorator factory, or throws.
     */
    getCallExpressionOrThrow(): CallExpression {
        return errors.throwIfNullOrUndefined(this.getCallExpression(), "Expected to find a call expression.");
    }

    /**
     * Gets the call expression if a decorator factory.
     */
    getCallExpression(): CallExpression | undefined {
        if (!this.isDecoratorFactory())
            return undefined;

        return this.getExpression() as any as CallExpression;
    }

    /**
     * Gets the expression.
     */
    getExpression(): Expression<ts.LeftHandSideExpression> {
        return this.getNodeFromCompilerNode<Expression<ts.LeftHandSideExpression>>(this.compilerNode.expression);
    }

    /**
     * Gets the decorator's arguments from its call expression.
     */
    getArguments(): Node[] {
        const callExpression = this.getCallExpression();
        return callExpression == null ? [] : callExpression.getArguments();
    }

    /**
     * Gets the decorator's type arguments from its call expression.
     */
    getTypeArguments(): TypeNode[] {
        const callExpression = this.getCallExpression();
        return callExpression == null ? [] : callExpression.getTypeArguments();
    }

    /**
     * Adds a type argument.
     * @param argumentTexts - Argument text.
     */
    addTypeArgument(argumentText: string) {
        return this.getCallExpressionOrThrow().addTypeArgument(argumentText);
    }

    /**
     * Adds type arguments.
     * @param argumentTexts - Argument texts.
     */
    addTypeArguments(argumentTexts: string[]) {
        return this.getCallExpressionOrThrow().addTypeArguments(argumentTexts);
    }

    /**
     * Inserts a type argument.
     * @param index - Index to insert at.
     * @param argumentTexts - Argument text.
     */
    insertTypeArgument(index: number, argumentText: string) {
        return this.getCallExpressionOrThrow().insertTypeArgument(index, argumentText);
    }

    /**
     * Inserts type arguments.
     * @param index - Index to insert at.
     * @param argumentTexts - Argument texts.
     */
    insertTypeArguments(index: number, argumentTexts: string[]) {
        return this.getCallExpressionOrThrow().insertTypeArguments(index, argumentTexts);
    }

    /**
     * Removes a type argument.
     * @param typeArg - Type argument to remove.
     */
    removeTypeArgument(typeArg: Node): this;
    /**
     * Removes a type argument.
     * @param index - Index to remove.
     */
    removeTypeArgument(index: number): this;
    removeTypeArgument(typeArgOrIndex: Node | number) {
        const callExpression = this.getCallExpression();
        if (callExpression == null)
            throw new errors.InvalidOperationError("Cannot remove a type argument from a decorator that has no type arguments.");

        callExpression.removeTypeArgument(typeArgOrIndex);
        return this;
    }

    /**
     * Adds an argument.
     * @param argumentTexts - Argument text.
     */
    addArgument(argumentText: string) {
        return this.addArguments([argumentText])[0];
    }

    /**
     * Adds arguments.
     * @param argumentTexts - Argument texts.
     */
    addArguments(argumentTexts: string[]) {
        return this.insertArguments(this.getArguments().length, argumentTexts);
    }

    /**
     * Inserts an argument.
     * @param index - Index to insert at.
     * @param argumentTexts - Argument text.
     */
    insertArgument(index: number, argumentText: string) {
        return this.insertArguments(index, [argumentText])[0];
    }

    /**
     * Inserts arguments.
     * @param index - Index to insert at.
     * @param argumentTexts - Argument texts.
     */
    insertArguments(index: number, argumentTexts: string[]) {
        this.setIsDecoratorFactory(true);
        return this.getCallExpressionOrThrow().insertArguments(index, argumentTexts);
    }

    /**
     * Removes an argument based on the node.
     * @param node - Argument's node to remove.
     */
    removeArgument(node: Node): this;
    /**
     * Removes an argument based on the specified index.
     * @param index - Index to remove.
     */
    removeArgument(index: number): this;
    removeArgument(argOrIndex: Node | number): this {
        const callExpression = this.getCallExpression();
        if (callExpression == null)
            throw new errors.InvalidOperationError("Cannot remove an argument from a decorator that has no arguments.");

        callExpression.removeArgument(argOrIndex);
        return this;
    }

    /**
     * Removes this decorator.
     */
    remove() {
        const thisStartLinePos = this.getStartLinePos();
        const previousDecorator = this.getPreviousSiblingIfKind(ts.SyntaxKind.Decorator);

        if (previousDecorator != null && previousDecorator.getStartLinePos() === thisStartLinePos) {
            removeChildren({
                children: [this],
                removePrecedingSpaces: true
            });
        }
        else
            removeChildrenWithFormattingFromCollapsibleSyntaxList({
                children: [this],
                getSiblingFormatting: (parent, sibling) => sibling.getStartLinePos() === thisStartLinePos ? FormattingKind.Space : FormattingKind.Newline
            });
    }
}
