/**
 * @version 0.0.3
 */

import * as ts from "typescript";
import * as tstl from "typescript-to-lua";

export default function jsonBridgePlugin(program: ts.Program, options: tstl.CompilerOptions): tstl.Plugin {
  return {
    visitors: {
      [ts.SyntaxKind.CallExpression]: (node: ts.CallExpression, context: tstl.TransformationContext) => {
        const expr = node.expression;

        if (ts.isPropertyAccessExpression(expr)) {
          const target = expr.expression;
          const methodName = ts.isIdentifier(expr.name) ? expr.name.escapedText.toString() : "";

          if (ts.isIdentifier(target) && target.escapedText === "JSON") {
            const args = node.arguments.map((arg) => context.transformExpression(arg));

            const stdId = tstl.createIdentifier("std");
            const jsonGet = tstl.createTableIndexExpression(stdId, tstl.createStringLiteral("json"));

            if (methodName === "parse") {
              const encodeGet = tstl.createTableIndexExpression(jsonGet, tstl.createStringLiteral("decode"));
              return tstl.createCallExpression(encodeGet, args);
            }

            if (methodName === "stringify") {
              const decodeGet = tstl.createTableIndexExpression(jsonGet, tstl.createStringLiteral("encode"));
              return tstl.createCallExpression(decodeGet, args);
            }
          }
        }

        return context.superTransformExpression(node);
      },
    },
  };
}
