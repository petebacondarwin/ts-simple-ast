import * as ts from "typescript";
import {PrimaryExpression} from "./../expression";

export const NullLiteralBase = PrimaryExpression;
export class NullLiteral extends NullLiteralBase<ts.NullLiteral> {
}
