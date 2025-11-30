import * as ts from "typescript";
import * as tstl from "typescript-to-lua";

export default function consoleToPrintPlugin(program: ts.Program, options: tstl.CompilerOptions): tstl.Plugin {
  return {
    visitors: {
      [ts.SyntaxKind.CallExpression]: (node: ts.CallExpression, context: tstl.TransformationContext) => {
        const expr = node.expression;

        if (ts.isPropertyAccessExpression(expr)) {
          const methodName = ts.isIdentifier(expr.name) ? expr.name.escapedText.toString() : "";
          const target = expr.expression;

          if (ts.isIdentifier(target) && target.escapedText === "console"
            && ["log", "warn", "error"].includes(methodName)) {

            const args = node.arguments.map(arg => context.transformExpression(arg));
            return tstl.createCallExpression(tstl.createIdentifier("print"), args);
          }
        }

        return context.superTransformExpression(node);
      },
    },
  };
}
