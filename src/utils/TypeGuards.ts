﻿// -----------------------
// WARNING - DO NOT modify the TypeGuards class directly. It is code generated by createTypeGuardsUtility.ts
//
// Note: This file is excluded from code coverage reports because it's automatically maintained (low risk).
// -----------------------

/* tslint:disable */
import * as ts from "typescript";
import * as compiler from "./../compiler";

/**
 * Type guards for checking the type of a node.
 */
export class TypeGuards {
    private constructor() {
    }

    /**
     * Gets if the node is an AbstractableNode.
     * @param node - Node to check.
     */
    static isAbstractableNode(node: compiler.Node): node is compiler.AbstractableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.SetAccessor:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is an AmbientableNode.
     * @param node - Node to check.
     */
    static isAmbientableNode(node: compiler.Node): node is compiler.AmbientableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.VariableStatement:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is an ArgumentedNode.
     * @param node - Node to check.
     */
    static isArgumentedNode(node: compiler.Node): node is compiler.ArgumentedNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.CallExpression:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is an ArrayLiteralExpression.
     * @param node - Node to check.
     */
    static isArrayLiteralExpression(node: compiler.Node): node is compiler.ArrayLiteralExpression {
        switch (node.getKind()) {
            case ts.SyntaxKind.ArrayLiteralExpression:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is an AsyncableNode.
     * @param node - Node to check.
     */
    static isAsyncableNode(node: compiler.Node): node is compiler.AsyncableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a BindingNamedNode.
     * @param node - Node to check.
     */
    static isBindingNamedNode(node: compiler.Node): node is compiler.BindingNamedNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.VariableDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a BodiedNode.
     * @param node - Node to check.
     */
    static isBodiedNode(node: compiler.Node): node is compiler.BodiedNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.ModuleDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a BodyableNode.
     * @param node - Node to check.
     */
    static isBodyableNode(node: compiler.Node): node is compiler.BodyableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a CallExpression.
     * @param node - Node to check.
     */
    static isCallExpression(node: compiler.Node): node is compiler.CallExpression {
        switch (node.getKind()) {
            case ts.SyntaxKind.CallExpression:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ClassDeclaration.
     * @param node - Node to check.
     */
    static isClassDeclaration(node: compiler.Node): node is compiler.ClassDeclaration {
        switch (node.getKind()) {
            case ts.SyntaxKind.ClassDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ConstructSignatureDeclaration.
     * @param node - Node to check.
     */
    static isConstructSignatureDeclaration(node: compiler.Node): node is compiler.ConstructSignatureDeclaration {
        switch (node.getKind()) {
            case ts.SyntaxKind.ConstructSignature:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ConstructorDeclaration.
     * @param node - Node to check.
     */
    static isConstructorDeclaration(node: compiler.Node): node is compiler.ConstructorDeclaration {
        switch (node.getKind()) {
            case ts.SyntaxKind.Constructor:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a DeclarationNamedNode.
     * @param node - Node to check.
     */
    static isDeclarationNamedNode(node: compiler.Node): node is compiler.DeclarationNamedNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.Parameter:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a DecoratableNode.
     * @param node - Node to check.
     */
    static isDecoratableNode(node: compiler.Node): node is compiler.DecoratableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.Parameter:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a Decorator.
     * @param node - Node to check.
     */
    static isDecorator(node: compiler.Node): node is compiler.Decorator {
        switch (node.getKind()) {
            case ts.SyntaxKind.Decorator:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a DocumentationableNode.
     * @param node - Node to check.
     */
    static isDocumentationableNode(node: compiler.Node): node is compiler.DocumentationableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.EnumMember:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.ConstructSignature:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.PropertySignature:
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.VariableStatement:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a EnumDeclaration.
     * @param node - Node to check.
     */
    static isEnumDeclaration(node: compiler.Node): node is compiler.EnumDeclaration {
        switch (node.getKind()) {
            case ts.SyntaxKind.EnumDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a EnumMember.
     * @param node - Node to check.
     */
    static isEnumMember(node: compiler.Node): node is compiler.EnumMember {
        switch (node.getKind()) {
            case ts.SyntaxKind.EnumMember:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ExportDeclaration.
     * @param node - Node to check.
     */
    static isExportDeclaration(node: compiler.Node): node is compiler.ExportDeclaration {
        switch (node.getKind()) {
            case ts.SyntaxKind.ExportDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ExportSpecifier.
     * @param node - Node to check.
     */
    static isExportSpecifier(node: compiler.Node): node is compiler.ExportSpecifier {
        switch (node.getKind()) {
            case ts.SyntaxKind.ExportSpecifier:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ExportableNode.
     * @param node - Node to check.
     */
    static isExportableNode(node: compiler.Node): node is compiler.ExportableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.VariableStatement:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a Expression.
     * @param node - Node to check.
     */
    static isExpression(node: compiler.Node): node is compiler.Expression {
        switch (node.getKind()) {
            case ts.SyntaxKind.NumericLiteral:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ExpressionWithTypeArguments.
     * @param node - Node to check.
     */
    static isExpressionWithTypeArguments(node: compiler.Node): node is compiler.ExpressionWithTypeArguments {
        switch (node.getKind()) {
            case ts.SyntaxKind.ExpressionWithTypeArguments:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ExtendsClauseableNode.
     * @param node - Node to check.
     */
    static isExtendsClauseableNode(node: compiler.Node): node is compiler.ExtendsClauseableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.InterfaceDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a FunctionDeclaration.
     * @param node - Node to check.
     */
    static isFunctionDeclaration(node: compiler.Node): node is compiler.FunctionDeclaration {
        switch (node.getKind()) {
            case ts.SyntaxKind.FunctionDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a FunctionLikeDeclaration.
     * @param node - Node to check.
     */
    static isFunctionLikeDeclaration(node: compiler.Node): node is compiler.FunctionLikeDeclaration & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.FunctionDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a GeneratorableNode.
     * @param node - Node to check.
     */
    static isGeneratorableNode(node: compiler.Node): node is compiler.GeneratorableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a GetAccessorDeclaration.
     * @param node - Node to check.
     */
    static isGetAccessorDeclaration(node: compiler.Node): node is compiler.GetAccessorDeclaration {
        switch (node.getKind()) {
            case ts.SyntaxKind.GetAccessor:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a HeritageClause.
     * @param node - Node to check.
     */
    static isHeritageClause(node: compiler.Node): node is compiler.HeritageClause {
        switch (node.getKind()) {
            case ts.SyntaxKind.HeritageClause:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a HeritageClauseableNode.
     * @param node - Node to check.
     */
    static isHeritageClauseableNode(node: compiler.Node): node is compiler.HeritageClauseableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.InterfaceDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a Identifier.
     * @param node - Node to check.
     */
    static isIdentifier(node: compiler.Node): node is compiler.Identifier {
        switch (node.getKind()) {
            case ts.SyntaxKind.Identifier:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ImplementsClauseableNode.
     * @param node - Node to check.
     */
    static isImplementsClauseableNode(node: compiler.Node): node is compiler.ImplementsClauseableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.ClassDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ImportDeclaration.
     * @param node - Node to check.
     */
    static isImportDeclaration(node: compiler.Node): node is compiler.ImportDeclaration {
        switch (node.getKind()) {
            case ts.SyntaxKind.ImportDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ImportSpecifier.
     * @param node - Node to check.
     */
    static isImportSpecifier(node: compiler.Node): node is compiler.ImportSpecifier {
        switch (node.getKind()) {
            case ts.SyntaxKind.ImportSpecifier:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a InitializerExpressionableNode.
     * @param node - Node to check.
     */
    static isInitializerExpressionableNode(node: compiler.Node): node is compiler.InitializerExpressionableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.EnumMember:
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.PropertySignature:
            case ts.SyntaxKind.VariableDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a InterfaceDeclaration.
     * @param node - Node to check.
     */
    static isInterfaceDeclaration(node: compiler.Node): node is compiler.InterfaceDeclaration {
        switch (node.getKind()) {
            case ts.SyntaxKind.InterfaceDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a JSDoc.
     * @param node - Node to check.
     */
    static isJSDoc(node: compiler.Node): node is compiler.JSDoc {
        switch (node.getKind()) {
            case ts.SyntaxKind.JSDocComment:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a MethodDeclaration.
     * @param node - Node to check.
     */
    static isMethodDeclaration(node: compiler.Node): node is compiler.MethodDeclaration {
        switch (node.getKind()) {
            case ts.SyntaxKind.MethodDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a MethodSignature.
     * @param node - Node to check.
     */
    static isMethodSignature(node: compiler.Node): node is compiler.MethodSignature {
        switch (node.getKind()) {
            case ts.SyntaxKind.MethodSignature:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ModifierableNode.
     * @param node - Node to check.
     */
    static isModifierableNode(node: compiler.Node): node is compiler.ModifierableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.PropertySignature:
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.VariableStatement:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a NamedNode.
     * @param node - Node to check.
     */
    static isNamedNode(node: compiler.Node): node is compiler.NamedNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.TypeParameter:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a NamespaceChildableNode.
     * @param node - Node to check.
     */
    static isNamespaceChildableNode(node: compiler.Node): node is compiler.NamespaceChildableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.VariableStatement:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a NamespaceDeclaration.
     * @param node - Node to check.
     */
    static isNamespaceDeclaration(node: compiler.Node): node is compiler.NamespaceDeclaration {
        switch (node.getKind()) {
            case ts.SyntaxKind.ModuleDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a OverloadableNode.
     * @param node - Node to check.
     */
    static isOverloadableNode(node: compiler.Node): node is compiler.OverloadableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ParameterDeclaration.
     * @param node - Node to check.
     */
    static isParameterDeclaration(node: compiler.Node): node is compiler.ParameterDeclaration {
        switch (node.getKind()) {
            case ts.SyntaxKind.Parameter:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ParameteredNode.
     * @param node - Node to check.
     */
    static isParameteredNode(node: compiler.Node): node is compiler.ParameteredNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.ConstructSignature:
            case ts.SyntaxKind.MethodSignature:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a PropertyDeclaration.
     * @param node - Node to check.
     */
    static isPropertyDeclaration(node: compiler.Node): node is compiler.PropertyDeclaration {
        switch (node.getKind()) {
            case ts.SyntaxKind.PropertyDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a PropertyNamedNode.
     * @param node - Node to check.
     */
    static isPropertyNamedNode(node: compiler.Node): node is compiler.PropertyNamedNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.EnumMember:
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.PropertySignature:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a PropertySignature.
     * @param node - Node to check.
     */
    static isPropertySignature(node: compiler.Node): node is compiler.PropertySignature {
        switch (node.getKind()) {
            case ts.SyntaxKind.PropertySignature:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a QualifiedName.
     * @param node - Node to check.
     */
    static isQualifiedName(node: compiler.Node): node is compiler.QualifiedName {
        switch (node.getKind()) {
            case ts.SyntaxKind.QualifiedName:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a QuestionTokenableNode.
     * @param node - Node to check.
     */
    static isQuestionTokenableNode(node: compiler.Node): node is compiler.QuestionTokenableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.PropertySignature:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ReadonlyableNode.
     * @param node - Node to check.
     */
    static isReadonlyableNode(node: compiler.Node): node is compiler.ReadonlyableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.PropertySignature:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ReturnTypedNode.
     * @param node - Node to check.
     */
    static isReturnTypedNode(node: compiler.Node): node is compiler.ReturnTypedNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.ConstructSignature:
            case ts.SyntaxKind.MethodSignature:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ScopeableNode.
     * @param node - Node to check.
     */
    static isScopeableNode(node: compiler.Node): node is compiler.ScopeableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.Parameter:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a ScopedNode.
     * @param node - Node to check.
     */
    static isScopedNode(node: compiler.Node): node is compiler.ScopedNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.SetAccessor:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a SetAccessorDeclaration.
     * @param node - Node to check.
     */
    static isSetAccessorDeclaration(node: compiler.Node): node is compiler.SetAccessorDeclaration {
        switch (node.getKind()) {
            case ts.SyntaxKind.SetAccessor:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a SignaturedDeclaration.
     * @param node - Node to check.
     */
    static isSignaturedDeclaration(node: compiler.Node): node is compiler.SignaturedDeclaration & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.ConstructSignature:
            case ts.SyntaxKind.MethodSignature:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a SourceFile.
     * @param node - Node to check.
     */
    static isSourceFile(node: compiler.Node): node is compiler.SourceFile {
        switch (node.getKind()) {
            case ts.SyntaxKind.SourceFile:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a StatementedNode.
     * @param node - Node to check.
     */
    static isStatementedNode(node: compiler.Node): node is compiler.StatementedNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.SourceFile:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.ModuleDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a StaticableNode.
     * @param node - Node to check.
     */
    static isStaticableNode(node: compiler.Node): node is compiler.StaticableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.SetAccessor:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a TextInsertableNode.
     * @param node - Node to check.
     */
    static isTextInsertableNode(node: compiler.Node): node is compiler.TextInsertableNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.SourceFile:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.ModuleDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a TypeAliasDeclaration.
     * @param node - Node to check.
     */
    static isTypeAliasDeclaration(node: compiler.Node): node is compiler.TypeAliasDeclaration {
        switch (node.getKind()) {
            case ts.SyntaxKind.TypeAliasDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a TypeArgumentedNode.
     * @param node - Node to check.
     */
    static isTypeArgumentedNode(node: compiler.Node): node is compiler.TypeArgumentedNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.CallExpression:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a TypeParameterDeclaration.
     * @param node - Node to check.
     */
    static isTypeParameterDeclaration(node: compiler.Node): node is compiler.TypeParameterDeclaration {
        switch (node.getKind()) {
            case ts.SyntaxKind.TypeParameter:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a TypeParameteredNode.
     * @param node - Node to check.
     */
    static isTypeParameteredNode(node: compiler.Node): node is compiler.TypeParameteredNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.SetAccessor:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.ConstructSignature:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.TypeAliasDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a TypeReferenceNode.
     * @param node - Node to check.
     */
    static isTypeReferenceNode(node: compiler.Node): node is compiler.TypeReferenceNode {
        switch (node.getKind()) {
            case ts.SyntaxKind.TypeReference:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a TypedNode.
     * @param node - Node to check.
     */
    static isTypedNode(node: compiler.Node): node is compiler.TypedNode & compiler.Node {
        switch (node.getKind()) {
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.PropertySignature:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.VariableDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a VariableDeclaration.
     * @param node - Node to check.
     */
    static isVariableDeclaration(node: compiler.Node): node is compiler.VariableDeclaration {
        switch (node.getKind()) {
            case ts.SyntaxKind.VariableDeclaration:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a VariableDeclarationList.
     * @param node - Node to check.
     */
    static isVariableDeclarationList(node: compiler.Node): node is compiler.VariableDeclarationList {
        switch (node.getKind()) {
            case ts.SyntaxKind.VariableDeclarationList:
                return true;
            default:
                return false;
        }
    }

    /**
     * Gets if the node is a VariableStatement.
     * @param node - Node to check.
     */
    static isVariableStatement(node: compiler.Node): node is compiler.VariableStatement {
        switch (node.getKind()) {
            case ts.SyntaxKind.VariableStatement:
                return true;
            default:
                return false;
        }
    }
}
