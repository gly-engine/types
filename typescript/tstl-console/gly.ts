import * as ts from "typescript";
import * as tstl from "typescript-to-lua";

export default function consoleToStdLogPlugin(program: ts.Program, options: tstl.CompilerOptions): tstl.Plugin {
  const MAP: Record<string, string> = {
    log: "debug",
    warn: "warn",
    error: "error",
  };

  return {
    visitors: {
      [ts.SyntaxKind.CallExpression]: (node: ts.CallExpression, context: tstl.TransformationContext) => {
        const expr = node.expression;

        if (ts.isPropertyAccessExpression(expr)) {
          const methodName = ts.isIdentifier(expr.name) ? expr.name.escapedText.toString() : "";
          const target = expr.expression;

          if (ts.isIdentifier(target) && target.escapedText === "console") {
            const args = node.arguments.map(arg => context.transformExpression(arg));
            const mapped = MAP[methodName];

            if (!mapped) {
              context.diagnostics.push({
                file: node.getSourceFile(),
                start: node.getStart(),
                length: node.getWidth(),
                category: ts.DiagnosticCategory.Error,
                code: 9001,
                messageText: `Gly engine does not support console.${methodName}`,
              });

              return tstl.createCallExpression(tstl.createIdentifier("print"), args);
            }

            const stdId = tstl.createIdentifier("std");
            const logGet = tstl.createTableIndexExpression(stdId, tstl.createStringLiteral("log"));
            const methodGet = tstl.createTableIndexExpression(logGet, tstl.createStringLiteral(mapped));
            return tstl.createCallExpression(methodGet, args);
          }
        }

        return context.superTransformExpression(node);
      },
    },
  };
}
